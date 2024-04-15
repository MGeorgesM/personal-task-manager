import React, { useState, useEffect } from 'react';

import { Pie } from 'react-chartjs-2';
import { Chart, Tooltip, Legend, ArcElement } from 'chart.js';

import { sendRequest, requestMethods } from '../../core/tools/apiRequest';

import './index.css';

Chart.register(Tooltip, Legend, ArcElement);

const Analytics = () => {
    const [chartData, setChartData] = useState(null);

    const colors = [
        '#FFA07A',
        '#87CEFA',
        '#FFD700',
        '#20B2AA',
        '#BA55D3',
    ];

    useEffect(() => {
        const processData = (boards) => {
            const columnCounts = {};

            boards.forEach((board) => {
                board.columns.forEach((column) => {
                    const columnName = column.title;
                    const taskCount = column.tasks.length;

                    if (columnCounts[columnName]) {
                        columnCounts[columnName] += taskCount;
                    } else {
                        columnCounts[columnName] = taskCount;
                    }
                });
            });

            const pieChartData = Object.entries(columnCounts).map(([columnName, count]) => ({
                label: columnName,
                value: count,
            }));

            setChartData(pieChartData);
        };

        const getBoards = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, '/boards', null);
                if (response.status !== 200) throw new Error();
                console.log(response.data);

                processData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getBoards();
    }, []);

    return (
        <div className="analytics-main expand flex center">
            {chartData && (
                <Pie
                    data={{
                        labels: chartData.map((data) => data.label),
                        datasets: [
                            {
                                data: chartData.map((data) => data.value),
                                backgroundColor: colors,
                            },
                        ],
                    }}
                />
            )}
        </div>
    );
};

export default Analytics;
