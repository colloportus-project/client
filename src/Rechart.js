import React, { useEffect, useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter } from 'recharts';

function Rechart({ jammingData }) {
    const [data, setData] = useState([]);
    const dataRef = useRef([]); // Keep the data outside state to prevent full re-renders

    // Function to append new data smoothly
    const appendData = (newData) => {
        // Append new data point and maintain only the last 20 points for the chart
        dataRef.current = [...dataRef.current, ...newData].slice(-20);

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
        <ResponsiveContainer width="100%" height={500}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />

                {/* Signal Strength Line without jumpy animations */}
                <Line
                    type="monotone"
                    dataKey="signal_strength"
                    stroke="#8884d8"
                    dot={false}
                    isAnimationActive={false} // Disable animation to prevent jumping
                />

                {/* Noise Level Line without jumpy animations */}
                <Line
                    type="monotone"
                    dataKey="noise_level"
                    stroke="#82ca9d"
                    dot={false}
                    isAnimationActive={false} // Disable animation to prevent jumping
                />

                {/* Scatter points for abnormal data */}
                <Scatter
                    data={data.filter((entry) => entry.prediction === -1)}
                    fill="red"
                    shape="circle"
                    dataKey="signal_strength"
                    name="Abnormal Data"
                />
                <Scatter
                    data={data.filter((entry) => entry.prediction === -1)}
                    fill="red"
                    shape="circle"
                    dataKey="noise_level"
                    name="Abnormal Data"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Rechart;
