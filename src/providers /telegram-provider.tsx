"use client";

import { useEffect } from "react";
import {
    init,
    backButton,
    miniApp,
    themeParams,
    initData,
    viewport,
} from "@telegram-apps/sdk-react";

type Props = {
    children: React.ReactNode;
};

const TelegramProvider = ({ children }: Props) => {
    useEffect(() => {
        init();

        if (backButton.isSupported()) {
            backButton.mount();
        }
        miniApp.mount();
        themeParams.mount();
        initData.restore();
        viewport
            .mount()
            .catch(console.error)
            .then(() => {
                viewport.bindCssVars();
            });

        // Initial configuration
        miniApp.setBackgroundColor("#ffffff");
        miniApp.setHeaderColor("#ffffff");
        viewport.expand();

        // Define components-related CSS variables.
        if (!miniApp.isCssVarsBound()) {
            miniApp.bindCssVars();
        }
        if (!themeParams.isCssVarsBound()) {
            themeParams.bindCssVars();
        }
    }, []);

    return children;
};

export default TelegramProvider;