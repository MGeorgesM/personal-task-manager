import React, { useState, useEffect } from 'react';

import { Pie } from 'react-chartjs-2';
import { Chart, Tooltip, Legend, ArcElement } from 'chart.js';

import { sendRequest, requestMethods } from '../../core/tools/apiRequest';

Chart.register(Tooltip, Legend, ArcElement);

const Analytics = () => {
    useEffect(() => {
        const getBoards = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, '/boards', null);
                if (response.status !== 200) throw new Error();
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getBoards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        // <Pie data={}/>
        <div>
            <h1>Analytics</h1>
        </div>
    );
};

export default Analytics;
