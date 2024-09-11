import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

function NotificationCenter({ trafficData }) {
    // State to track the message for each IP (e.g., "Accepted" or "Blocked" after a response)
    const [responseMessages, setResponseMessages] = useState({});

    // Function to send the request and temporarily display the server response message
    const handleRequest = async (ip, action) => {
        try {
            const response = await axios.post('https://246e-115-92-127-144.ngrok-free.app/warning/', {
                ip: ip,
                action: action
            });

            // Extract message from the response
            const message = response.data.message || `${action} request processed for IP: ${ip}`;
            
            // Set the response message for this IP
            setResponseMessages(prevMessages => ({
                ...prevMessages,
                [ip]: message
            }));

            // Remove the message after 2 seconds
            setTimeout(() => {
                setResponseMessages(prevMessages => {
                    const newMessages = { ...prevMessages };
                    delete newMessages[ip];  // Remove the message for this IP
                    return newMessages;
                });
            }, 2000);
        } catch (error) {
            console.error(`Error sending ${action} request for IP: ${ip}`, error);

            // Display an error message in case of failure
            setResponseMessages(prevMessages => ({
                ...prevMessages,
                [ip]: `Failed to process ${action} for IP: ${ip}`
            }));

            // Remove the message after 2 seconds
            setTimeout(() => {
                setResponseMessages(prevMessages => {
                    const newMessages = { ...prevMessages };
                    delete newMessages[ip];  // Remove the error message for this IP
                    return newMessages;
                });
            }, 2000);
        }
    };

    const handleAccess = (ip) => {
        handleRequest(ip, "accept");
    };

    const handleBlock = (ip) => {
        handleRequest(ip, "block");
    };

    // Filter abnormal traffic data
    const abnormalData = trafficData ? trafficData.filter(item => item.judge === "비정상") : [];

    return (
        <div className="notification-container">
            {abnormalData.length > 0 ? (
                abnormalData.map((item, index) => (
                    <div key={index} className="notification">
                        {responseMessages[item.ip] ? (
                            // Display the response message if it exists for this IP
                            <div className="response-message">{responseMessages[item.ip]}</div>
                        ) : (
                            // Display normal notification content if no response message
                            <>
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
                            </>
                        )}
                    </div>
                ))
            ) : (
                <p>No abnormal access attempts</p>
            )}
        </div>
    );
}

export default NotificationCenter;
