import React, { useState } from "react";

const NotificationCenter = () => {
    // 알림 데이터
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            ipAddress: "127.0.0.1",
        },
        {
            id: 2,
            ipAddress: "0.0.0.0",
        },
        // {
        //     id: 1,
        //     ipAddress: "127.0.0.1",
        // },
        // {
        //     id: 2,
        //     ipAddress: "0.0.0.0",
        // },
        // {
        //     id: 1,
        //     ipAddress: "127.0.0.1",
        // },
        // {
        //     id: 2,
        //     ipAddress: "0.0.0.0",
        // },
        // {
        //     id: 1,
        //     ipAddress: "127.0.0.1",
        // },
        // {
        //     id: 2,
        //     ipAddress: "0.0.0.0",
        // },
    ]);

    // Confirm 버튼을 눌렀을 때 처리
    const handleConfirm = (id) => {
        setNotifications(notifications.filter((notification) => notification.id !== id));
        alert("Confirmed!");
    };

    // Delete 버튼을 눌렀을 때 처리
    const handleDelete = (id) => {
        setNotifications(notifications.filter((notification) => notification.id !== id));
        alert("Blocked!");
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
                <p>No new notifications</p>
            ) : (
                notifications.map((notification) => (
                    <div
                        key={notification.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "10px",
                            padding: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div>
                                <p style={{ margin: 0 }}>
                                    <strong>{notification.ipAddress}</strong> Try to access
                                </p>
                                <span style={{ fontSize: "12px", color: "#999" }}>{notification.time}</span>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={() => handleConfirm(notification.id)}
                                style={{
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    marginRight: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Access
                            </button>
                            <button
                                onClick={() => handleDelete(notification.id)}
                                style={{
                                    backgroundColor: "#ccc",
                                    color: "black",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Block
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default NotificationCenter;
