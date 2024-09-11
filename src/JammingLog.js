import React, { useEffect } from 'react';

function JammingLog({ jammingLogData }) {
    // Check if data is a string and parse it to JSON if necessary
    let parsedJammingData = Array.isArray(jammingLogData) ? jammingLogData : [];

    if (typeof jammingLogData === 'string') {
        try {
            parsedJammingData = JSON.parse(jammingLogData); // Try parsing string to JSON
        } catch (error) {
            console.error("Error parsing JSON string:", error);
        }
    }

    // Reverse the data for display
    const reversedData = [...parsedJammingData].reverse();

    useEffect(() => {
        console.log('Received jammingLog:', reversedData);
    }, [reversedData]);

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', width: '100%', paddingTop: '50px', backgroundColor: 'transparent' }}>
            <h2 style={{ textAlign: 'left', fontSize: '24px', marginBottom: '20px', color: '#a1e1f4'}}>Jamming Log</h2>
            {reversedData.length > 0 ? (
                <ul style={{ paddingLeft: '0' }}>
                    {reversedData.map((row, index) => (
                        <li key={index} style={logEntryStyle}>
                            <p><strong>Time:</strong> <span style={textStyle}>{row.time}</span></p>
                            <p><strong>Noise Level:</strong> <span style={textStyle}>{row.noise}</span></p>
                            <p><strong>Signal Power:</strong> <span style={textStyle}>{row.signal_power}</span></p>
                            <p><strong>Backup Status:</strong> <span style={backupStyle(row.backup)}>{row.backup === 1 ? 'Backup path is active' : 'No backup path active'}</span></p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ textAlign: 'center', color: 'white' }}>No data available</p>
            )}
        </div>
    );
}

// Readable styling for log entries
const logEntryStyle = {
    marginBottom: '15px',
    padding: '15px',
    listStyleType: 'none',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    color: '#a1e1f4',
    lineHeight: '1.6',
};

// Text styling for visibility
const textStyle = {
    color: 'white',
    fontWeight: 'normal',
};

// Conditional styling for backup status
const backupStyle = (backup) => ({
    color: backup === 1 ? '#82ca9d' : '#F44336',
    fontWeight: 'bold',
});

export default JammingLog;
