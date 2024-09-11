import * as React from 'react';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './TrafficMonitor.css';

// 기본 테마 생성
const theme = createTheme();

export default function TrafficMonitor({ trafficData }) {
    // Safeguard to ensure trafficData is always an array, if it's undefined or null
    const safeTrafficData = Array.isArray(trafficData) ? trafficData : [];

    // Reverse the traffic data for display
    const reversedData = [...safeTrafficData].reverse();

    // Log reversed data to check the result
    useEffect(() => {
        console.log('Received trafficData in TrafficMonitor:', reversedData);
    }, [reversedData]);

    return (
        <ThemeProvider theme={theme}>
                <h3>Traffic Monitor</h3>
            <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' , heigth: '100%'}}>
                <Table sx={{ minWidth: 50, width: '100%', tableLayout: 'auto' }} size="medium" aria-label="traffic table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ paddingLeft: '16px', paddingRight: '16px', minWidth: 50 }}>IP Address</TableCell>
                            <TableCell align="center" sx={{ paddingLeft: '16px', paddingRight: '16px', minWidth: 50 }}>Status</TableCell>
                            <TableCell align="center" sx={{ paddingLeft: '16px', paddingRight: '16px', minWidth: 100 }}>Date/Time</TableCell>
                            <TableCell align="center" sx={{ paddingLeft: '16px', paddingRight: '16px', minWidth: 50 }}>Packet Size</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reversedData.length > 0 ? (
                            reversedData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.ip}</TableCell>
                                    <TableCell align="center">
                                        {row.judge === "정상" ? (
                                            <span style={{
                                                // border: '0.3px solid #4caf50',
                                                // backgroundColor: '#e8f5e9', // 파란색 배경
                                                color: '#4caf50',
                                                // padding: '3px 10px', // 안쪽 여백
                                                // borderRadius: '15px', // 둥근 모서리
                                                // display: 'inline-block', // 크기 조정
                                            }}>
                                                {row.judge}
                                            </span>
                                        ) : row.judge === "비정상" ? (
                                            <span style={{
                                                // border: '0.3px solid #f44336',
                                                // backgroundColor: '#ffebee', // 빨간색 배경
                                                color: '#f44336', // 흰색 텍스트
                                                // padding: '3px 10px', // 안쪽 여백
                                                // borderRadius: '15px', // 둥근 모서리
                                                display: 'inline-block',
                                            }}>
                                                {row.judge}
                                            </span>
                                        ) : (
                                            row.judge
                                        )}</TableCell>
                                    <TableCell align="center">{row.time}</TableCell>
                                    <TableCell align="center">{row.size}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No traffic data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
}
