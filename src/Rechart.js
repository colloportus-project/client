import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter } from 'recharts';

function RealTimeChart({ jammingData }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("Filtered abnormal data:", jammingData && jammingData.filter((entry) => entry.prediction === -1));
        if (jammingData) {
            const formattedData = jammingData.map((entry) => ({
                timestamp: new Date(entry.timestamp).toLocaleTimeString(), // 시간으로 변환
                signal_strength: entry.signal_strength,
                noise_level: entry.noise_level,
                isAbnormal: entry.isAbnormal,
            }));
            setData(formattedData);
        }
    }, [jammingData]);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />/
                <Legend />

                {/* Signal Strength Line */}
                {/* <Line type="monotone" dataKey="signal_strength" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                <Line type="monotone" dataKey="signal_strength" stroke="#8884d8" dot={false} />

                {/* Noise Level Line */}
                <Line type="monotone" dataKey="noise_level" stroke="#82ca9d" dot={false} />

                {/* Scatter points for abnormal data */}
                {/* <Scatter data={jammingData && jammingData.filter((entry) => entry.prediction === -1)} fill="red" dataKey="signal_strength" />
                <Scatter data={jammingData && jammingData.filter((entry) => entry.prediction === -1)} fill="red" dataKey="noise_level" /> */}
                <Scatter
                    data={data && data.filter((entry) => entry.prediction === -1)}
                    fill="red"
                    shape="circle"
                    dataKey="prediction"
                    name="Abnormal Data"
                />


            </LineChart>
        </ResponsiveContainer>
    );
}

export default RealTimeChart;
