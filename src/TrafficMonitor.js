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
import "./TrafficMonitor.css"
// 기본 테마 생성
const theme = createTheme();


export default function TrafficMonitor({ trafficData }) { // 기본값을 빈 배열로 설정
    console.log('test: ', trafficData);
    useEffect(() => {
        console.log('Received trafficData in TrafficMonitor:', trafficData);
    }, [trafficData]); // trafficData가 변경될 때마다 로그 출력
    return (
        <ThemeProvider theme={theme}> {/* ThemeProvider로 테마 적용 */}
            <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
                <h3>Traffic Monixtor</h3>
                <Table sx={{ minWidth: 50, width: '100%', tableLayout: 'auto' }} size="medium" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ paddingLeft: '16px', paddingRight: '16px', minWidth: 50 }}>IP Address</TableCell>
                            <TableCell align="center" sx={{ paddingLeft: '16px', paddingRight: '16px', minWidth: 50 }}>Status</TableCell>
                            <TableCell align="center" sx={{ paddingLeft: '16px', paddingRight: '16px', minWidth: 100 }}>Date/Time</TableCell>
                            <TableCell align="center" sx={{ paddingLeft: '16px', paddingRight: '16px', minWidth: 50 }}>Packet Size</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trafficData?.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell colSpan={4}>
                                    <div display="inline-block">
                                        <div>{row.ip}</div>
                                        <div>{row.judge}</div>
                                        <div>{row.time}</div>
                                        <div>{row.size}</div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableBody>

                        {/* 데이터가 존재하는지 확인 */}
                        {trafficData > 0 ? (
                            trafficData?.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ height: '50px', '&:last-child td, &:last-child th': { border: 0 } }} // 각 행의 높이 줄이기
                                >
                                    {/* <TableCell>
                                        <pre>{JSON.stringify(row, null, 2)}</pre> {/* row 전체 데이터를 출력 */}
                                    {/* </TableCell> */} */}
                                    <TableCell component="th" scope="row" sx={{ paddingTop: '4px', paddingBottom: '4px', minWidth: 50 }}>
                                        {row.ip}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.judge === 1 ? ( // 정상
                                            <span style={{
                                                border: '0.3px solid #4caf50',
                                                backgroundColor: '#e8f5e9', // 파란색 배경
                                                color: '#4caf50',
                                                padding: '3px 10px', // 안쪽 여백
                                                borderRadius: '15px', // 둥근 모서리
                                                display: 'inline-block', // 크기 조정
                                            }}>
                                                {row.judge}
                                            </span>
                                        ) : row.status === -1 ? (    // 비정상
                                            <span style={{
                                                border: '0.3px solid #f44336',
                                                backgroundColor: '#ffebee', // 빨간색 배경
                                                color: '#f44336', // 흰색 텍스트
                                                padding: '3px 10px', // 안쪽 여백
                                                borderRadius: '15px', // 둥근 모서리
                                                display: 'inline-block',
                                            }}>
                                                {row.judge}
                                            </span>
                                        ) : (
                                            row.judge
                                        )}
                                    </TableCell>
                                    <TableCell align="center" sx={{ paddingTop: '4px', paddingBottom: '4px', minWidth: 100 }}>{row.time}</TableCell>
                                    <TableCell align="center" sx={{ paddingTop: '4px', paddingBottom: '4px', minWidth: 50 }}>{row.packet_size}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">No data available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>


                </Table>
            </TableContainer>
        </ThemeProvider>
    );
}

