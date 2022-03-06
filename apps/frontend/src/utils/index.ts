export * from './seo';
export * from './theme';

export const isDev = Boolean(process.env.NODE_ENV === 'development');

export const isProd = Boolean(process.env.NODE_ENV === 'production');

export const isClient = Boolean(typeof global.window !== 'undefined');

export const isServer = Boolean(typeof global.window === 'undefined');
