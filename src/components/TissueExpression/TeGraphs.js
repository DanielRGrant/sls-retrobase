import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Chartjs from 'chart.js';

const TeGraphComponent = (props) => {
    
    const [tissue, setTissue] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        const FetchData = async () => {
            const tissueSelectedGet = { "tissue": props.tissueSelected }
            const response = await axios.get('https://9fqebvawee.execute-api.us-east-1.amazonaws.com/dev/tegraphs', tissueSelectedGet);
            setTissue(response.data.tissue)
            setData(response.data.counts)
        }
        FetchData();
    }, [props.tissueSelected]);


    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {

        if (data) {
            const rtClass = Object.keys(data)[0];
            const y = Object.keys(data[rtClass]);
            const x = Object.values(data[rtClass])

            const chartConfig = {
                responsive: true,
                maintainAspectRatio: false,
                type: 'bar',
                data: {
                    labels: y,
                    datasets: [{
                        label: '#Detections',
                        data: x,
                        borderWidth: 1,
                        backgroundColor: '#2e70b3'
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                precision: 0
                            }
                        }]
                    }
                }
            }
            if (chartContainer && chartContainer.current) {
                const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
                setChartInstance(newChartInstance);
            }
        }
    }, [data]);


    return (
        <canvas ref={chartContainer} className="GraphBox"/>

    );
};

export default TeGraphComponent