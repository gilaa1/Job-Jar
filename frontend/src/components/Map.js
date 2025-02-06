"use client";

import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useContext } from "react";
import { JobContext } from '../App';
import GeocodeService from '../services/geocodeService';
import '../styles/style.css';

const Map = ({pageJobs : pageJobs}) => {
    const mapRef = useRef(null);
    //const allJobs = useContext(JobContext);

    const getLatLng = async (address) => {
        const { lat, lng } = await GeocodeService.convertAddressToLatLng(address);
        return { lat, lng };
    };

    const createCustomMarker = (jobCount) => {
        const svgMarker = `
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="#4285F4" />
                <text x="50%" y="50%" fill="white" font-size="30px" text-anchor="middle" dy=".3em">${jobCount}</text>
            </svg>
        `;
        return {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgMarker)}`,
            scaledSize: new window.google.maps.Size(40, 40),
        };
    };

    useEffect(() => {

        let currentInfoWindow = null;

        const initMap = async () => {
            if (!mapRef.current) {
                console.error('Map container is not ready');
                return;
            }

            const loader = new Loader({
                apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                version: 'weekly',
            });

            const { Map } = await loader.importLibrary('maps');

            const defaultPosition = { lat: 43.642693, lng: -79.3871189 };

            console.log(pageJobs);

            let centerPosition = defaultPosition;
            if (pageJobs && Array.isArray(pageJobs) && pageJobs[0]?.user?.address) {
                const { lat, lng } = await getLatLng(pageJobs[0].user.address);
                console.log(lat, lng);
                centerPosition = { lat, lng };
            }

            const mapOptions = {
                center: centerPosition,
                zoom: 10,
                mapId: 'mymap',
            };

            const map = new Map(mapRef.current, mapOptions);

            const jobMarkers = {};

            if (pageJobs && Array.isArray(pageJobs)) {
                for (const job of pageJobs) {
                    if (job.user?.address) {
                        const { lat, lng } = await getLatLng(job.user.address);
                        const key = `${lat},${lng}`;
                        
                        if (!jobMarkers[key]) {
                            jobMarkers[key] = [];
                        }
                        jobMarkers[key].push(job);
                    }
                }

                Object.keys(jobMarkers).forEach((key) => {
                    const [lat, lng] = key.split(',').map(Number);
                    const jobsAtLocation = jobMarkers[key];

                    const marker = new window.google.maps.Marker({
                        position: { lat, lng },
                        map,
                        icon: createCustomMarker(jobsAtLocation.length),
                    });

                    const jobListContent = jobsAtLocation
                        .map(
                            (job) => `<li><strong>${job.title}</strong></li>`
                        )
                        .join('');
                    
                        const header =
                        jobsAtLocation.length > 1
                            ? `<h3>${jobsAtLocation.length} Jobs at this location:</h3>`
                            : `<h3>${jobsAtLocation.length} Job at this location:</h3>`;
                    
                    const infoWindowContent = `
                        <div class='infowindow-container'>
                            ${header}
                            <ul>${jobListContent}</ul>
                        </div>
                    `;
                    

                    const infoWindow = new window.google.maps.InfoWindow({
                        content: infoWindowContent,
                        maxWidth: 220,
                    });

                    marker.addListener('click', () => {
                        if (currentInfoWindow) {
                            currentInfoWindow.close(); // Close the currently open InfoWindow
                        }

                        infoWindow.open(map, marker);
                        currentInfoWindow = infoWindow;
                    });

                    infoWindow.addListener('closeclick', () => {
                        currentInfoWindow = null;
                    });
                        
                });
            }
        };

        initMap();
    }, [pageJobs]);

    return (
        <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
    );
};

export default Map;
