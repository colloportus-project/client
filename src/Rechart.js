import React, { useEffect, useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Custom Dot Function to show only for abnormal points
const renderAbnormalDot = (props) => {
    const { cx, cy, payload } = props;

    // Render a red dot only if the current data point is "abnormal" (prediction === -1)
    if (payload.prediction === -1) {
        return (
            <circle cx={cx} cy={cy} r={5} fill="red" stroke="none" />
        );
    }

    // Return null to not render dots for normal data points
    return null;
};

function Rechart({ jammingData }) {
    const [data, setData] = useState([]);
    const dataRef = useRef([]); // Keep the data outside state to prevent full re-renders

    // Function to append new data smoothly
    const appendData = (newData) => {
        // Append new data point and maintain only the last 20 points for the chart
        dataRef.current = [...dataRef.current, ...newData].slice(-20);
        console.log(jammingData);
        // Set state only with the updated data to trigger chart re-render
        setData([...dataRef.current]);
    };

    useEffect(() => {
        if (jammingData && jammingData.length > 0) {
            const formattedData = jammingData.map((entry) => ({
                timestamp: new Date(entry.timestamp).toLocaleTimeString(), // Convert to human-readable time
                signal_strength: entry.signal_strength,
                noise_level: entry.noise_level,
                isAbnormal: entry.isAbnormal,
                prediction: entry.prediction, // Maintain abnormal prediction data
            }));

            appendData(formattedData); // Append the formatted data
        }
    }, [jammingData]);

    return (
        <ResponsiveContainer width="100%" height={350}>
            <h3>Jamming Chart</h3>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />

                {/* Signal Strength Line with conditional abnormal dots */}
                <Line
                    strokeWidth={3}
                    type="monotone"
                    dataKey="signal_strength"
                    stroke="#2E9AFE"
                    dot={renderAbnormalDot} // Use custom dot rendering
                    isAnimationActive={false} // Disable animation to prevent jumping
                />

                {/* Noise Level Line with conditional abnormal dots */}
                <Line
                    strokeWidth={3}
                    type="monotone"
                    dataKey="noise_level"
                    stroke="#DA81F5"
                    dot={renderAbnormalDot} // Use custom dot rendering
                    isAnimationActive={false} // Disable animation to prevent jumping
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Rechart;
