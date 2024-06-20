import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5';

function BoxWrapper({ children }) {
    return (
        <div className="bg-white rounded-lg p-4 flex-1 shadow-md border border-gray-200 flex items-center">
            {children}
        </div>
    );
}

export default function DashboardStatsGrid() {
    const [stats, setStats] = useState({
        bookingsCount: 0,
        registeredCount: 0,
        hallsCount: 0,
        requestsCount: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        bookings: false,
        registered: false,
        halls: false,
        requests: false,
    });

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const endpoints = [
                { url: 'https://dream-day-rentals-wrfn.onrender.com/weeding/booking/list', key: 'bookingsCount' },
                { url: 'https://dream-day-rentals-16.onrender.com/weeding/service/list', key: 'registeredCount' },
                { url: 'https://dream-day-rentals-16.onrender.com/weeding/halls/list', key: 'hallsCount' },
                { url: 'https://dream-day-rentals-16.onrender.com/weeding/requests/list', key: 'requestsCount' },
            ];

            const fetchPromises = endpoints.map(endpoint =>
                axios.get(endpoint.url)
                    .then(response => ({ key: endpoint.key, count: response.data.length }))
                    .catch(() => ({ key: endpoint.key, error: true }))
            );

            const results = await Promise.all(fetchPromises);

            results.forEach(result => {
                if (result.error) {
                    setError(prevError => ({ ...prevError, [result.key.replace('Count', '')]: true }));
                } else {
                    setStats(prevStats => ({ ...prevStats, [result.key]: result.count }));
                }
            });

            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                    <IoBagHandle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Bookings</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{stats.bookingsCount}</strong>
                        <span className="text-sm text-green-500 pl-2">+343</span>
                    </div>
                </div>
                {error.bookings && <div className="text-sm text-red-500">Error fetching bookings data</div>}
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-600">
                    <IoPieChart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Registered</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{stats.registeredCount}</strong>
                        <span className="text-sm text-green-500 pl-2">-343</span>
                    </div>
                </div>
                {error.registered && <div className="text-sm text-red-500">Error fetching registered data</div>}
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-200">
                    <IoPeople className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Halls</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{stats.hallsCount}</strong>
                        <span className="text-sm text-red-500 pl-2">-30</span>
                    </div>
                </div>
                {error.halls && <div className="text-sm text-red-500">Error fetching halls data</div>}
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-900">
                    <IoCart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Requests</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{stats.requestsCount}</strong>
                        <span className="text-sm text-red-500 pl-2">-43</span>
                    </div>
                </div>
                {error.requests && <div className="text-sm text-red-500">Error fetching requests data</div>}
            </BoxWrapper>
        </div>
    );
}



