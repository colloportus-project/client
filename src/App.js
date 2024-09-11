import React, { useEffect, useState } from 'react';
import './App.css';
import Rechart from "./Rechart";
import TrafficMonitor from "./TrafficMonitor";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MyMap from "./Map";
import NotificationCenter from './NotificationCenter';
import axios from 'axios';

function App() {
  // 테마 설정
  const theme = createTheme({
    palette: {
      mode: 'light', // 다크 모드로 설정하려면 'dark'로 변경
    },
  });

  const [trafficData, setTraffic] = useState(null);
  const [jammingData, setJamming] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // /traffic/ 데이터 가져오기
        const trafficResponse = await axios.get('https://246e-115-92-127-144.ngrok-free.app/traffic/', {
          headers: {
            'ngrok-skip-browser-warning': '69420',
            'Accept': 'application/json'
          },
        });

        setTraffic(trafficResponse.data);

        // /jamming/ 데이터 가져오기
        const jammingResponse = await axios.get('https://246e-115-92-127-144.ngrok-free.app/jamming/', {
          headers: {
            'ngrok-skip-browser-warning': '69420',
            'Accept': 'application/json'
          },
        });

        setJamming(jammingResponse.data);

      } catch (error) {
        console.error('API 요청 오류:', error);
      }
    };

    // 데이터 새로고침을 1초마다 실행
    const interval = setInterval(fetchData, 5000);

    // 컴포넌트 언마운트 시 setInterval 정리
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>
        {/* {trafficData ? <pre>{JSON.stringify(trafficData, null, 2)}</pre> : <p>Loading traffic data...</p>} */}
        {/* {jammingData ? <pre>{JSON.stringify(jammingData, null, 2)}</pre> : <p>Loading jamming data...</p>} */}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        <div style={{ width: '33.33%', height: 400 }}>
          <ThemeProvider theme={theme}>
            <TrafficMonitor trafficData={trafficData} />
          </ThemeProvider>
        </div>
        <div style={{ width: '33.33%', height: 400 }}>
          <Rechart jammingData={jammingData} />
          <div style={{ height: 800, width: '100%' }}>
            <MyMap />
          </div>
        </div>
        <div style={{ width: '33.33%', height: 400 }}>
          <NotificationCenter trafficData={trafficData} />
        </div>
      </div>
    </div>
  );
}

export default App;
