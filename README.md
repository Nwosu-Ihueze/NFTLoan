# NFT Collateralized Loan Protocol

## Project Description

![alt text](https://github.com/Nwosu-Ihueze/NFTLoan/blob/main/Screenshot%202022-03-06%20214101.png?raw=true)

NFTLoan is an NFT based collateralized loan protocol that is wrapped in ETH for effective pricing thereby increasing their ability to be used as collateral. This protocol is mainly to achieve:

- Better pricing for NFT assets
- Fixed interest for lenders.
- Short dated price on these assets with premium paid to lender.

The functionalities of this project are as follows:
- Applying for a loan.
- Loan repayment with interests.
- Cancellation of loan by borrower.
- Collateral seizure when loan is defaulted.
- Withdrawing money as a lender.

## Tools
- [Pnpm](https://pnpm.io/)
- [Turborepo](https://turborepo.org/)
- [Solidity](https://soliditylang.org/)
- [Hardhat](https://hardhat.org/)
- [Alchemy](https://www.alchemy.com/)
- [Next.JS](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)

## Getting Started
To run this code locally:

### Clone This Repo
```
git clone https://github.com/Nwosu-Ihueze/NFTLoan
cd NFTLoan
```

### Install Dependencies
Using the **[pnpm](https://pnpm.io)** package manager. [How to install pnpm?](https://pnpm.io/installation)
```
pnpm install
```

### Compile The Contract
```
pnpm build:loan
```

### Frontend Instructions

```bash
# start dev server, default on localhost:3000
$ pnpm dev:frontend

# build production
$ pnpm build:frontend

# run production server
$ pnpm start:frontend
```

## Collaborators
[TianenPang](https://github.com/TianenPang)

## License
GPL-3.0-or-later

## Contact
Rosemary - @twitter/adaihueze

TianenPang - [TianenPang](https://github.com/TianenPang)

## Credits
Guide implementation of this project is from [Anish-Agnihotri](https://github.com/Anish-Agnihotri) except the bidding and capital implementations.
