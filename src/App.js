import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Rechart from "./Rechart";
import TrafficMonitor from "./TrafficMonitor";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // MUI 기본 스타일 초기화
import MyMap from "./Map";
import NotificationCenter from './NotificationCenter';
import axios from 'axios';
import { Table } from '@mui/material';

function App() {
  // 테마 설정
  const theme = createTheme({
    palette: {
      mode: 'light', // 다크 모드로 설정하려면 'dark'로 변경
    },
  });

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://99ff-115-92-127-144.ngrok-free.app/test/', {
          headers: {
            'ngrok-skip-browser-warning': '69420',  // 헤더 추가
            'Accept': 'application/json' // 서버에 JSON 응답을 요청
          },
        });
        // for (const key in Object.keys(data)) {
        //   console.log(data[key].name)
        // }
        setData(response.data);
        console.log(data)
      } catch (error) {
        console.error('API 요청 오류:', error);
      }
    };

    fetchData(); // 함수 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>} */}
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
            <TrafficMonitor trafficData={data} />
          </ThemeProvider>
        </div>
        <div style={{ width: '33.33%', height: 400 }}> {/* MyMap을 더 크게 */}
          <Rechart />
          <div style={{ height: 800, width: '100%' }}> {/* MyMap의 높이 조정 */}
            <MyMap />
          </div>
        </div>
        <div style={{ width: '33.33%', height: 400 }}>
          <NotificationCenter />
        </div>
      </div>
    </div>
  );
}

export default App;

