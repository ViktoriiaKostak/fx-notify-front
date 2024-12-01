declare namespace Telegram {
    interface InitData {
        query_id: string;
        user: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            photo_url?: string;
        };
        auth_date: number;
        hash: string;
    }

    interface WebApp {
        initData: string;
        initDataUnsafe: InitData;
        ready: () => void;
        close: () => void;
        sendData: (data: string) => void;
    }
}

interface Window {
    Telegram: {
        WebApp: Telegram.WebApp;
    };
}
