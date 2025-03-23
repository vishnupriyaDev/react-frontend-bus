import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import './BusDetails.css';

const BusDetails = () => {
    const { busId } = useParams();
    const [bus, setBus] = useState(null); // Track bus details state

    // Bus details with route info
    const busDetails = {
        1: {
            busNumber: 'BUS101',
            driver: 'John Doe',
            route: 'Route 1',
            start: [51.505, -0.09],  // Start point coordinates (latitude, longitude)
            end: [51.515, -0.1],    // End point coordinates (latitude, longitude)
        },
        2: {
            busNumber: 'BUS102',
            driver: 'Jane Doe',
            route: 'Route 2',
            start: [51.505, -0.1],
            end: [51.525, -0.11],
        },
    };

    // Effect for setting bus details when busId changes
    useEffect(() => {
        if (busDetails[busId]) {
            setBus(busDetails[busId]);
        } else {
            setBus(null); // In case busId doesn't match, reset bus state
        }
    }, [busId]); // Runs whenever busId changes

    useEffect(() => {
        if (bus) {
            // Initialize Leaflet map
            const map = L.map('map').setView(bus.start, 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            // Add markers for start and end points
            const startMarker = L.marker(bus.start).addTo(map);
            startMarker.bindPopup('Start: ' + bus.route);

            const endMarker = L.marker(bus.end).addTo(map);
            endMarker.bindPopup('End: ' + bus.route);

            // Create and add route using Leaflet Routing Machine
            const route = L.Routing.control({
                waypoints: [
                    L.latLng(bus.start),
                    L.latLng(bus.end),
                ],
                routeWhileDragging: true,
                createMarker: () => null, // Disables default markers on the route
            }).addTo(map);

            // Clean up map when component unmounts
            return () => {
                map.remove();
            };
        }
    }, [bus]); // Runs whenever bus details change (bus state)

    // Early return for invalid busId
    if (!bus) {
        return <div>Bus not found</div>; // Bus details are not found, return early
    }

    return (
        <div className="bus-details-container">
            <div className="bus-details">
                <h2>{bus.busNumber} Details</h2>
                <p><strong>Driver:</strong> {bus.driver}</p>
                <p><strong>Route:</strong> {bus.route}</p>
                <p>
                    <strong>Start Point:</strong> ({bus.start[0]}, {bus.start[1]})
                </p>
                <p>
                    <strong>End Point:</strong> ({bus.end[0]}, {bus.end[1]})
                </p>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    View Route Map
                </a>
            </div>

            <div className="map-container" id="map">
                {/* Leaflet Map will render here */}
            </div>
        </div>
    );
};

export default BusDetails;
