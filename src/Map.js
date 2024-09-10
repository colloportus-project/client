import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// 경로의 위도/경도 배열을 정의
const waypoints = [
    L.latLng(36.12, -5.35),  // 출발지 (예: 스페인 근처 해역)
    L.latLng(38.90, 1.43),   // 경유지 1 (예: 지브롤터 해협)
    L.latLng(40.73, 14.39),  // 경유지 2 (예: 이탈리아 나폴리)
    L.latLng(42.36, 16.52)   // 목적지 (예: 아드리아 해)
];

function RoutingControl() {
    const map = useMap();

    useEffect(() => {
        if (!map) return;



        map.whenReady(() => {
            const routingControl = L.Routing.control({
                waypoints: waypoints,
                lineOptions: {
                    styles: [{ color: 'blue', weight: 4 }]
                },
                createMarker: () => null
            }).addTo(map);

            return () => {
                // if (routingControl) {
                // }
                // if (map && routingControl) {
                //     map.removeControl(routingControl);
                // }
                routingControl.remove();
                map.removeControl(routingControl);
            };
        });
    }, [map]);


    return null;
}

function MyMap() {
    return (
        <MapContainer center={[36.12, -5.35]} zoom={6} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
            />
            <RoutingControl />
        </MapContainer>
    );
}

export default MyMap;

