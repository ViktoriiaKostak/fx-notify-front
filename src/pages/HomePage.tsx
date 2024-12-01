import React, { useEffect } from "react";
import { miniApp } from "@telegram-apps/sdk-react";
import UserInfo from "../components/UserInfo.tsx";

const HomePage: React.FC = () => {
    useEffect(() => {
        miniApp.ready();
    }, []);

    const handleClose = () => {
        miniApp.close();
    };

    return (
        <div className="home-container">
            <h1>Welcome to Telegram Mini App</h1>
            <UserInfo />
            <button onClick={handleClose} className="btn">Close App</button>
        </div>
    );
};

export default HomePage;
