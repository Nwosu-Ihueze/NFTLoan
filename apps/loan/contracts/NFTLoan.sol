// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "utils/ABDKMath64x64.sol";

contract Loan {

    struct Terms {
      address nftAddress;
      address nftOwner;
      address lender;
      uint256 nftId;
      uint256 loanAmount;
      uint256 interestRate;
      uint256 loanDuration;
      uint256 dueDate;
      uint256 maxLoanAmount;
      uint256 amountWithdrawn;
    }

    uint256 public totalLoans;
    mapping(uint256 => Terms) public terms;

    event LoanRequested(
      uint256 id,
      address indexed owner,
      address nftAddress,
      uint256 nftId,
      uint256 maxLoanAmount,
      uint256 dueDate
    );

    event LoanAccepted(uint256 id, address lender);
    event LoanCapital(uint256 id);
    event LoanPaid(uint256 id, address lender, address borrower);
    event LoanCancelled(uint256 id);
    event LoanRepossessed(uint256 id, address lender, address collector);
    event LoanWithdrawn(uint256 id, address lender);

    function loanCreated(
      address _nftAddress,
      uint256 _nftId,
      uint256 _interestRate,
      uint256 _maxLoanAmount,
      uint256 _dueDate
    ) external returns (uint256) {
      require(_dueDate > block.timestamp, "Sorry mate, can't go back in time");

      uint256 loanId = ++totalLoans;

      IERC721(_nftAddress).transferFrom(msg.sender, address(this), _nftId);

      terms[loanId].nftAddress = _nftAddress;
      terms[loanId].nftOwner = msg.sender;
      terms[loanId].nftId = _nftId;
      terms[loanId].interestRate = _interestRate;
      terms[loanId].maxLoanAmount = _maxLoanAmount;
      terms[loanId].dueDate = _dueDate;

      emit LoanRequested(loanId, msg.sender, _nftAddress,  _nftId, _maxLoanAmount, _dueDate);

      return loanId;
    }

    function interestAccrued(uint256 _loanId, uint256 _future) public view returns (uint256) {
      Terms memory loan = terms[_loanId];
      
      uint256 _duration = block.timestamp + _future - loan.loanAmount;
      int128 _interestRate = ABDKMath64x64.divu(loan.interestRate, 100);
      uint256 _maxInterest = ABDKMath64x64.mulu(_interestRate, loan.loanAmount);
      return SafeMath.mul(_duration, _maxInterest);
    }

    function totalInterest(uint256 _loanId, uint256 _future) public view returns (uint256) {
      Terms memory loan = terms[_loanId];
      return interestAccrued(_loanId, _future);
    }

    function totalPayment(uint256 _loanId, uint _future) public view returns (uint256) {
      Terms memory loan = terms[_loanId];

      return loan.loanAmount + totalPayment(_loanId, _future);
    }

    function acceptLoan(uint256 _loanId) external payable {
      Terms storage loan = terms[_loanId];
      require(msg.value > 0, "Sorry mate, Ether guage is 0");
      require(loan.nftOwner != address(0), "Sorry mate, loan repaid");
      require(loan.dueDate >= block.timestamp, "Sorry mate, loan expired");

      if (loan.dueDate !=0){
        uint256 _totalInterest = totalInterest(_loanId, 0);
        loan.loanAmount = msg.value - _totalInterest;
      } else {
        require(loan.maxLoanAmount >= msg.value, "Sorry mate, can't accept maximum loan");
        loan.loanAmount = msg.value;
        
      }
      loan.loanDuration = block.timestamp;

      emit LoanAccepted(_loanId, msg.sender);
    }

    function borrowerCapital(uint256 _loanId) external {
      Terms storage loan = terms[_loanId];

      require(loan.nftOwner == msg.sender, "Sorry mate, Only NFT owner can perform this operation");
      require(loan.amountWithdrawn < loan.loanAmount, "Sorry mate, maximum amount reached");

      uint256 _availableCapital = loan.loanAmount - loan.amountWithdrawn;
      loan.amountWithdrawn = loan.loanAmount;

      (bool sent, ) = payable(msg.sender).call{value: _availableCapital}("");
      require(sent, "Sorry mate, failed to draw capital.");

    // Emit draw event
    emit LoanCapital(_loanId);
    }

     function repayAmount(uint256 _loanId) external payable {
       Terms storage loan = terms[_loanId];

       require(loan.nftOwner != address(0), "Sorry mate, can't repay a paid loan");
       require(loan.dueDate >= block.timestamp, "Sorry mate, loan expired");

       uint256 _totalInterest = totalInterest(_loanId, 0);
       uint256 _processingFee = loan.amountWithdrawn + _totalInterest;
       require(msg.value >= _processingFee, "Sorry mate, insufficient fee");

       IERC721(loan.nftAddress).transferFrom(address(this), loan.nftOwner, loan.nftId);

       loan.nftOwner = address(0);
       emit LoanPaid(_loanId, loan.lender, msg.sender);
     }

     function cancelLoan(uint256 _loanId) external {
        Terms storage loan = terms[_loanId];
        require(loan.nftOwner == msg.sender, "Sorry mate, only NFT owner can cancel.");
        
        IERC721(loan.nftAddress).transferFrom(address(this), msg.sender, loan.nftId);

        loan.nftOwner = address(0);

        emit LoanCancelled(_loanId);
  }

  function seizeCollateral(uint256 _loanId) external {
    Terms memory loan = terms[_loanId];
    require(loan.nftOwner != address(0), "Sorry mate, loan repaid.");
    require(loan.dueDate < block.timestamp, "Sorry mate, loan still active.");

    // Transfer NFT to lender
    IERC721(loan.nftAddress).transferFrom(address(this), loan.lender, loan.nftId);

    // Emit seize event
    emit LoanRepossessed(_loanId, loan.lender, msg.sender);
  }

  function liquidateLoan(uint256 _loanId) external {

    Terms memory loan = terms[_loanId];
    require(loan.dueDate < block.timestamp, "Sorry mate, loan still active.");
    require(loan.lender == msg.sender, "Sorry mate, only lender can withdraw funds");

    

    // Emit seize event
    emit LoanWithdrawn(_loanId, loan.lender);
  }

}