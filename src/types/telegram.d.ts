import WebApp from '@twa-dev/sdk';

// Use the types from the SDK
export type TelegramInitData = typeof WebApp.initDataUnsafe;
export type TelegramUser = typeof WebApp.initDataUnsafe.user;