import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useTheme from '../hooks/useTheme';
import ErrorCard from './ErrorCard';
import LoadingCard from './LoadingCard';

interface Position {
    lat: number;
    lng: number;
}

const MapCard: React.FC = () => {
    const [position, setPosition] = useState<Position | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    useEffect(() => {
        const fetchLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (location) => {
                        const { latitude, longitude } = location.coords;
                        setPosition({ lat: latitude, lng: longitude });
                    },
                    (err) => {
                        console.error('Error fetching location:', err);
                        setError('Unable to fetch current location.');
                    }
                );
            } else {
                setError('Geolocation is not supported by your browser.');
            }
        };

        fetchLocation();
    }, []);

    if (error) {
        return <ErrorCard title="Current Location" message={error} />;
    }

    if (!position) {
        return <LoadingCard title="Current Location" />;
    }

    return (
       <div className={`card-base min-h-[25vh] ${isDarkMode ? 'card-dark' : 'card-light'}`}>
            <h2 className="text-base sm:text-lg font-bold text-dark dark:text-light pb-4">Current Location</h2>
            <MapContainer
                center={[position.lat, position.lng]} // Ensure center is passed as [number, number]
                zoom={13}
                style={{ height: '100%', borderRadius: '8px' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[position.lat, position.lng]}>
                    <Popup>You are here</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapCard;
