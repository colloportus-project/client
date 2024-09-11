import React, { useEffect, useState } from 'react';
import './App.css';
import Rechart from "./Rechart";
import TrafficMonitor from "./TrafficMonitor";
import JammingLog from "./JammingLog";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NotificationCenter from './NotificationCenter';
import axios from 'axios';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const [trafficData, setTraffic] = useState(null);
  const [jammingData, setJamming] = useState(null);
  const [jammingLogData, setJammingLog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trafficResponse = await axios.get('https://b8af-115-92-127-144.ngrok-free.app/traffic/', {
          headers: {
            'ngrok-skip-browser-warning': '69420',
            'Accept': 'application/json',
          },
        });

        setTraffic(trafficResponse.data);

        const jammingResponse = await axios.get('https://b8af-115-92-127-144.ngrok-free.app/jamming/', {
          headers: {
            'ngrok-skip-browser-warning': '69420',
            'Accept': 'application/json',
          },
        });

        setJamming(jammingResponse.data);

        const jammingLogResponse = await axios.get('https://b8af-115-92-127-144.ngrok-free.app/handle/', {
          headers: {
            'ngrok-skip-browser-warning': '69420',
            'Accept': 'application/json',
          },
        });
        console.log("Handle: ", typeof(jammingLogResponse));

        setJammingLog(jammingLogResponse.data);
      } catch (error) { 
        console.error('API 요청 오류:', error);
      }
    };

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-container">
      <div className="flex-item">
        <ThemeProvider theme={theme}>
          <TrafficMonitor  trafficData={trafficData} />
        </ThemeProvider>
      </div>
      <div className="flex-item vertical-container ">
        <Rechart jammingData={jammingData} />
        <JammingLog jammingLogData={jammingLogData} />
      </div>
      <div className="flex-item">
        <NotificationCenter trafficData={trafficData} />
      </div>
    </div>
  );
}

export default App;
