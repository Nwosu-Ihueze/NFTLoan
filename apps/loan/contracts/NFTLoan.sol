// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../utils/ABDKMath64x64.sol";

/**
 * @title NFTLoan: NFT-collateralized lending
 * @author AdaIhueze and TianenPang
 * @dev Original code works on a bidding system and does not have provision for liquidation and checking borrower loan history
 */

contract Loan {

  // ============ Term Structure ============
  struct Terms {
    address nftAddress; // NFT address
    address nftOwner; // NFT owner/borrower
    address lender; // lender
    uint256 nftId; // NFT ID
    uint256 loanAmount; // Loan amount requested
    uint256 interestRate; // Interest Rate
    uint256 loanDuration; // Loan Duration
    uint256 dueDate; // Due date of loan
    uint256 maxLoanAmount; // Maximum loan amount allowed
    uint256 amountWithdrawn; // Loan amount utilized
    uint256 loanHistory; // Borrower loan history
  }

  // ============ Storage ============
  uint256 public totalLoans; // Total loans issued
  mapping(uint256 => Terms) public terms; // Loan struture mapping

  // ============ Events ============
  // Loan request
  event LoanRequested(
    uint256 id,
    address indexed owner,
    address nftAddress,
    uint256 nftId,
    uint256 maxLoanAmount,
    uint256 dueDate
  );

  event LoanAccepted(uint256 id, address lender); // New lender
  event LoanPaid(uint256 id, address lender, address borrower); // Loan repaid by borrower
  event LoanCancelled(uint256 id); // Loan cancelled by borrower
  event LoanRepossessed(uint256 id, address lender, address collector); // NFT repossessed by lender
  event LoanWithdrawn(uint256 id, address lender); // Amount liquidated/withdrawn by lender

  // ============ Functions ============

  /**
 * Enables loan application, specifying parameters
 * @param _nftAddress NFT address
   * @param _nftId NFT id
   * @param _interestRate interest rate
   * @param _maxLoanAmount maximum allowable loan
   * @param _dueDate due date
   * @return Loan id
   */
  function loanCreated(
    address _nftAddress,
    uint256 _nftId,
    uint256 _interestRate,
    uint256 _maxLoanAmount,
    uint256 _dueDate
  ) external returns (uint256) {
    // Enforces future-dated loan applications
    require(_dueDate > block.timestamp, "Sorry mate, can't go back in time");

    // NFT id
    uint256 loanId = ++totalLoans;

    // Transfers NFT from owner to contract
    IERC721(_nftAddress).transferFrom(msg.sender, address(this), _nftId);

    // Loan application
    terms[loanId].nftAddress = _nftAddress;
    terms[loanId].nftOwner = msg.sender;
    terms[loanId].nftId = _nftId;
    terms[loanId].interestRate = _interestRate;
    terms[loanId].maxLoanAmount = _maxLoanAmount;
    terms[loanId].dueDate = _dueDate;

    // Emit event
    emit LoanRequested(loanId, msg.sender, _nftAddress,  _nftId, _maxLoanAmount, _dueDate);

    // Returns loanid
    return loanId;
  }


  /**
 * Enables an NFT owner to create a loan, specifying parameters
 * @param _loanId Application id
   * @param _future Allows for future accrued interest calculation
   * @return Accured interest on lending, in Ether
   */
  function interestAccrued(uint256 _loanId, uint256 _future) public view returns (uint256) {
    Terms memory loan = terms[_loanId];

    uint256 _duration = block.timestamp + _future - loan.loanAmount; // Loan duration
    int128 _interestRate = ABDKMath64x64.divu(loan.interestRate, 100); // Interest rate
    uint256 _maxInterest = ABDKMath64x64.mulu(_interestRate, loan.loanAmount); // Maximum interest applicable
    return SafeMath.mul(_duration, _maxInterest); // Maximum interest to be paid
  }

  /**
 * Enables an NFT owner to create a loan, specifying parameters
 * @param _loanId Application id
   * @param _future Allows for future accrued capital calculation
   * @return required interest payment to cover lender
   */
  function totalInterest(uint256 _loanId, uint256 _future) public view returns (uint256) {
    Terms memory loan = terms[_loanId];

    // Past interest and current interest
    return loan.loanHistory + interestAccrued(_loanId, _future);
  }

  /**
 * Enables an NFT owner to create a loan, specifying parameters
 * @param _loanId Application id
   * @param _future Allows for future required payment calculation
   * @return required loan repayment i Ether
   */
  function totalPayment(uint256 _loanId, uint _future) public view returns (uint256) {
    Terms memory loan = terms[_loanId];

    // Amount withdrawn and interest
    return loan.amountWithdrawn + totalInterest(_loanId, _future);
  }

  /**
 * Enables an NFT owner to create a loan, specifying parameters
 * @param _loanId id of loan to be assessed
   * @dev Requires an unpaid loan
   */
  function acceptLoan(uint256 _loanId) external payable {
    Terms storage loan = terms[_loanId];
    // Prevents assessment of 0 value
    require(msg.value > 0, "Sorry mate, Ether guage is 0");
    // Prevents assessment of repaid loan
    require(loan.nftOwner != address(0), "Sorry mate, loan repaid");
    // Prevents assessment of expired loan
    require(loan.dueDate >= block.timestamp, "Sorry mate, loan expired");

    // Checks previous loans
    if (loan.loanHistory !=0){

      // Current amount
      uint256 _totalInterest = totalInterest(_loanId, 0);

      // Prevents assessing loan higher than the maximum amount allowed and pending interest
      require(loan.maxLoanAmount + _totalInterest >= msg.value, "Sorry mate, can't accept maximum loan");

      // Increment loan history interest
      loan.loanHistory += _totalInterest;
      // Update to new loan amount
      loan.loanAmount = msg.value - _totalInterest;
    } else {
      // Prevent assessing maximum loan
      require(loan.maxLoanAmount >= msg.value, "Sorry mate, can't accept maximum loan");
      // New loan amount
      loan.loanAmount = msg.value;

    }
    // Update loan duration amount
    loan.loanDuration = block.timestamp;

    // Emit event
    emit LoanAccepted(_loanId, msg.sender);
  }

  /**
* @param _loanId id of loan to be repaid
   */
  function repayAmount(uint256 _loanId) external payable {
    Terms storage loan = terms[_loanId];

    // Prevent repaying a paid loan
    require(loan.nftOwner != address(0), "Sorry mate, can't repay a paid loan");
    // Prevent repayment of expired loan
    require(loan.dueDate >= block.timestamp, "Sorry mate, loan expired");


    uint256 _totalInterest = totalInterest(_loanId, 0);
    // Processing fee for payout
    uint256 _processingFee = loan.amountWithdrawn + _totalInterest;
    // Enforce processing fee
    require(msg.value >= _processingFee, "Sorry mate, insufficient fee");

    // Payout lender
    (bool sent, ) = payable(loan.lender).call{value: (loan.loanAmount + _totalInterest)}("");
    require(sent, "Sorry mate, failed to repay loan.");

    // Transfer NFT back to owner
    IERC721(loan.nftAddress).transferFrom(address(this), loan.nftOwner, loan.nftId);

    // Nullify nftOwner
    loan.nftOwner = address(0);
    // Emit
    emit LoanPaid(_loanId, loan.lender, msg.sender);
  }

  /**
* Enables loan cancellation
* @param _loanId cancelled loan id
   */
  function cancelLoan(uint256 _loanId) external {
    Terms storage loan = terms[_loanId];
    // Enforce loan ownership
    require(loan.nftOwner == msg.sender, "Sorry mate, only NFT owner can cancel.");

    // Return NFT to owner
    IERC721(loan.nftAddress).transferFrom(address(this), msg.sender, loan.nftId);

    loan.nftOwner = address(0);

    // Emit event
    emit LoanCancelled(_loanId);
  }

  /**
   * Enables proxy collateral seizure onbehalf of lender
   * @param _loanId id of loan to seize collateral
   */
  function seizeCollateral(uint256 _loanId) external {
    Terms memory loan = terms[_loanId];
    // Enforce loan ownership
    require(loan.nftOwner != address(0), "Sorry mate, loan repaid.");
    // Prevent premature seizure
    require(loan.dueDate < block.timestamp, "Sorry mate, loan still active.");

    // Transfer NFT to lender
    IERC721(loan.nftAddress).transferFrom(address(this), loan.lender, loan.nftId);

    // Emit event
    emit LoanRepossessed(_loanId, loan.lender, msg.sender);
  }

  /**
   * Enables lender to liquidate/withdraw
   * @param _loanId id of loan to be liquidated
   */
  function liquidateLoan(uint256 _loanId) external {

    Terms memory loan = terms[_loanId];
    // Prevent premature withdrawal
    require(loan.dueDate < block.timestamp, "Sorry mate, loan still active.");
    // Enforce lender ownership
    require(loan.lender == msg.sender, "Sorry mate, only lender can withdraw funds");



    // Emit event
    emit LoanWithdrawn(_loanId, loan.lender);
  }

}
