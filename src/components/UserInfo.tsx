import React from "react";

const UserInfo: React.FC = () => {
    const user = window.Telegram.WebApp.initDataUnsafe?.user;

    if (!user) return <p>No user data available</p>;

    return (
        <div className="user-info">
            <img
                src={user.photo_url || "https://via.placeholder.com/150"}
                alt={user.first_name || "User Avatar"}
                className="user-avatar"
            />
            <p>{`Hello, ${user.first_name} ${user.last_name || ""}`}</p>
            <p>{`Username: ${user.username || "N/A"}`}</p>
        </div>
    );
};

export default UserInfo;
