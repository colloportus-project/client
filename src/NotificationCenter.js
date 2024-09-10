import React from 'react';
import { Button } from '@mui/material';
// import "./NotificationCenter.css"

function NotificationCenter({ trafficData }) {
    // 비정상적인 데이터 필터링
    const abnormalData = trafficData
        ? trafficData.filter(item => item.judge === "비정상")
        : [];

    const handleAccess = (ip) => {
        console.log(`Access granted for IP: ${ip}`);
    };

    const handleBlock = (ip) => {
        console.log(`Blocked IP: ${ip}`);
    };

    return (
        <div className="notification-container">
            {abnormalData.length > 0 ? (
                abnormalData.map((item, index) => (
                    <div key={index} className="notification">
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
                ))
            ) : (
                <p>No abnormal access attempts</p>
            )}
        </div>
    );
}

export default NotificationCenter;
