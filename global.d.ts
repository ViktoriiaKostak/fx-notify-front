interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    language_code?: string;
}

interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
        user?: TelegramUser;
        auth_date: number;
        query_id?: string;
        hash: string;
    };
    close(): void;
    ready(): void;
    themeParams: Record<string, string>;
}

interface Window {
    Telegram: {
        WebApp: TelegramWebApp;
    };
}
