import { NextSeoProps } from 'next-seo';

const DEFAULT_TITLE = 'NFTLoan';

export const seoConfig: NextSeoProps = {
  title: DEFAULT_TITLE,
  defaultTitle: DEFAULT_TITLE,
  titleTemplate: `%s | ${DEFAULT_TITLE}`,
  description: 'A DeFi protocol built on Polygon blockchain that allows for loan application using NFTs as collateral.'
};
