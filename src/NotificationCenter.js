import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import './NotificationCenter.css'; // Import custom CSS for overlay

function NotificationCenter({ trafficData }) {
    const [responseMessages, setResponseMessages] = useState({});

    const handleRequest = async (ip, action) => {
        try {
            const response = await axios.post('https://246e-115-92-127-144.ngrok-free.app/warning/', {
                ip: ip,
                action: action
            });

            const message = response.data.message || `${action} request processed for IP: ${ip}`;

            setResponseMessages(prevMessages => ({
                ...prevMessages,
                [ip]: message
            }));

            setTimeout(() => {
                setResponseMessages(prevMessages => {
                    const newMessages = { ...prevMessages };
                    delete newMessages[ip];  // Remove the message for this IP
                    return newMessages;
                });
            }, 2800);
        } catch (error) {
            console.error(`Error sending ${action} request for IP: ${ip}`, error);

            setResponseMessages(prevMessages => ({
                ...prevMessages,
                [ip]: `Failed to process ${action} for IP: ${ip}`
            }));

            setTimeout(() => {
                setResponseMessages(prevMessages => {
                    const newMessages = { ...prevMessages };
                    delete newMessages[ip];  // Remove the error message for this IP
                    return newMessages;
                });
            }, 2800);
        }
    };

    const handleAccess = (ip) => {
        handleRequest(ip, "accept");
    };

    const handleBlock = (ip) => {
        handleRequest(ip, "block");
    };

    const abnormalData = trafficData ? trafficData.filter(item => item.judge === "비정상") : [];

    return (
        <div className="notification-container">
            {abnormalData.length > 0 ? (
                abnormalData.map((item, index) => (
                    <div key={index} className="notification">
                        <div className="content-container">
                            {responseMessages[item.ip] && (
                                <div className="response-message-overlay">
                                    {responseMessages[item.ip]}
                                </div>
                            )}
                            <div className={`content ${responseMessages[item.ip] ? 'hidden' : ''}`}>
                                <div>
                                    <strong>{item.ip}</strong> Try to access <br />
                                    Time: {item.time} <br />
                                    Protocol: {item.protocol}
                                </div>
                                <div className="notification-actions">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleAccess(item.ip)}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() => handleBlock(item.ip)}
                                    >
                                        Block
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                // Placeholder when there's no data
                <div className="placeholder">
                    <p>No abnormal access attempts</p>
                </div>
            )}
        </div>
    );
}

export default NotificationCenter;
