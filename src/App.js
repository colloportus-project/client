import React, { useEffect, useState } from 'react';
import './App.css';
import Rechart from "./Rechart";
import TrafficMonitor from "./TrafficMonitor";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trafficResponse = await axios.get('https://246e-115-92-127-144.ngrok-free.app/traffic/', {
          headers: {
            'ngrok-skip-browser-warning': '69420',
            'Accept': 'application/json',
          },
        });

        setTraffic(trafficResponse.data);

        const jammingResponse = await axios.get('https://246e-115-92-127-144.ngrok-free.app/jamming/', {
          headers: {
            'ngrok-skip-browser-warning': '69420',
            'Accept': 'application/json',
          },
        });

        setJamming(jammingResponse.data);
      } catch (error) { 
        console.error('API 요청 오류:', error);
      }
    };

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-container">
      <div className="flex-item">
        <ThemeProvider theme={theme}>
          <TrafficMonitor trafficData={trafficData} />
        </ThemeProvider>
      </div>
      <div className="flex-item vertical-container">
        <Rechart jammingData={jammingData} />
      </div>
      <div className="flex-item">
        <NotificationCenter trafficData={trafficData} />
      </div>
    </div>
  );
}

export default App;
