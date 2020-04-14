import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { fetchDailyData } from '../../api';
import styles from './Chart.module.css'

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const initialDailyData = await fetchDailyData();

            setDailyData(initialDailyData);
        };

        fetchAPI();
    }, []);



    const lineChart = (
        dailyData.length
            ? (
                <Line
                    data={{
                        labels: dailyData.map(({ date }) => date),
                        datasets: [{
                            data: dailyData.map((data) => data.confirmed),
                            label: 'Infectados',
                            borderColor: '#3333ff',
                            fill: true

                        }, {
                            data: dailyData.map((data) => data.deaths),
                            label: 'Mortes',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            fill: true

                        },
                        ],
                    }}
                />
            ) : null
    );




    const barChart = (
        confirmed
            ? (
                <Bar
                    data={{
                        labels: ['Infectados', 'Recuparados', 'Mortes'],
                        datasets: [{
                            label: 'Casos',
                            backgroundColor: [
                                'rgba(0, 0, 255,0.5)',
                                'rgba(0, 255, 0,0.5)',
                                'rgba(255, 0, 0,0.5)',
                            ],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }]
                    }
                    }
                    options={{
                        legend: { display: false },
                        title: {
                            display: true,
                            text: `País: ${country}`,
                            fontSize: 20,
                        }
                    }}
                />
            ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}

        </div>
    )
}
export default Chart


