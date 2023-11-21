'use client'

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Diagramma from "../../components/Diagrammalar/Diagramma"
import Chiziqli from "../../components/Diagrammalar/Chiziqli"

const getTopics = async () => {
    try {
        const res = await fetch('/api/topics', {
            cache: 'no-store',
        });
        if (!res.ok) {
            throw new Error('Mavzular yuklanmadi');
        }

        return res.json();
    } catch (error) {
        console.log('Mavzular yuklanishda xatolik: ', error);
        return { mavzula: [] };
    }
};

const Filter = () => {
    const [topiclar, setTopiclar] = useState([]);
    const [filteredMavzula, setFilteredMavzula] = useState([]);
    const [filterValue, setFilterValue] = useState({ newIsm: "", newSinfi: "", school: "" });

    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar?.filter((t) => t.MFY === '2-sektor') ?? [];

            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);
        };

        fetchData();
    }, []);

    const [usersAddedByDate, setUsersAddedByDate] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const usersGroupedByDate = filteredMavzula.reduce((acc, t) => {
                const dateKey = new Date(t.createdAt).toLocaleDateString();
                acc[dateKey] = (acc[dateKey] || 0) + 1;
                return acc;
            }, {});

            setUsersAddedByDate(usersGroupedByDate);
        };

        fetchData();
    }, [filteredMavzula]);

    const [percentageIncreaseByDate, setPercentageIncreaseByDate] = useState({});

    useEffect(() => {
        const calculatePercentageIncrease = () => {
            const dates = Object.keys(usersAddedByDate);
            const percentageIncrease = {};

            for (let i = 1; i < dates.length; i++) {
                const currentDate = dates[i];
                const previousDate = dates[i - 1];

                const currentCount = usersAddedByDate[currentDate];
                const previousCount = usersAddedByDate[previousDate];

                const increasePercentage = ((currentCount - previousCount) / previousCount) * 100;

                percentageIncrease[currentDate] = increasePercentage.toFixed(2);
            }

            setPercentageIncreaseByDate(percentageIncrease);
        };

        calculatePercentageIncrease();
    }, [usersAddedByDate]);

    const [countSababli, setCountSababli] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar?.filter((t) => t.MFY === '2-sektor') ?? [];

            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);
            // Count items where newDarsQoldirish === "Sababli"
            const sababliCount = filteredTopics.filter((t) => t.newDarsQoldirish === "Sababli").length;
            setCountSababli(sababliCount);
        };

        fetchData();
    }, []);

    const [countNotSababli, setCountNotSababli] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar?.filter((t) => t.MFY === '2-sektor') ?? [];


            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);

            // Count items where newDarsQoldirish !== "Sababli"
            const notSababliCount = filteredTopics.filter((t) => t.newDarsQoldirish !== "Sababli").length;
            setCountNotSababli(notSababliCount);
        };

        fetchData();
    }, []);

    const [percentageSababli, setPercentageSababli] = useState(0);
    const [percentageNotSababli, setPercentageNotSababli] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar?.filter((t) => t.MFY === '2-sektor') ?? [];
            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);


            const sababliCount = filteredTopics.filter((t) => t.newDarsQoldirish === "Sababli").length;
            const sababliPercentage = (sababliCount / filteredTopics.length) * 100;
            setPercentageSababli(sababliPercentage.toFixed(2));
            const notSababliCount = filteredTopics.filter((t) => t.newDarsQoldirish !== "Sababli").length;
            const notSababliPercentage = (notSababliCount / filteredTopics.length) * 100;
            setPercentageNotSababli(notSababliPercentage.toFixed(2));
        };

        fetchData();
    }, []);




    const [chartData, setChartData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar?.filter((t) => t.MFY === '2-sektor') ?? [];

            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);

            const usersGroupedByDate = filteredTopics.reduce((acc, t) => {
                const dateKey = new Date(t.createdAt).toLocaleDateString();
                acc[dateKey] = (acc[dateKey] || 0) + 1;
                return acc;
            }, {});

            setUsersAddedByDate(usersGroupedByDate);
            setChartData({
                labels: Object.keys(usersAddedByDate),
                datasets: [
                    {
                        label: 'Sanalik kiritilgan o`quvchilar',
                        data: Object.values(usersAddedByDate),
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 1,
                    },
                ],
            });
        };

        fetchData();
    }, [filteredMavzula, usersAddedByDate]);

    const [sinfiCounts, setSinfiCounts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar?.filter((t) => t.MFY === '2-sektor') ?? [];
            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);

            // Count occurrences of each newSinfi value
            const sinfiCounts = filteredTopics.reduce((acc, t) => {
                const sinfi = t.newSinfi;
                acc[sinfi] = (acc[sinfi] || 0) + 1;
                return acc;
            }, {});

            setSinfiCounts(sinfiCounts);
        };

        fetchData();
    }, []);


    const [mostFrequentSinfi, setMostFrequentSinfi] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar?.filter((t) => t.MFY === '2-sektor') ?? [];
            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);

            // Count occurrences of each newSinfi value
            const sinfiCounts = filteredTopics.reduce((acc, t) => {
                const sinfi = t.newSinfi;
                acc[sinfi] = (acc[sinfi] || 0) + 1;
                return acc;
            }, {});

            // Find the most frequent newSinfi
            let maxCount = 0;
            let mostFrequent = '';
            for (const sinfi in sinfiCounts) {
                if (sinfiCounts[sinfi] > maxCount) {
                    maxCount = sinfiCounts[sinfi];
                    mostFrequent = sinfi;
                }
            }

            setMostFrequentSinfi(mostFrequent);
        };

        fetchData();
    }, []);


    const [mostFrequentClass, setMostFrequentClass] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar?.filter((t) => t.MFY === '2-sektor') ?? [];
            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);

            // Count occurrences of each newIsm value for Sababli and Not Sababli
            const sababliCountsByClass = filteredTopics
                .filter((t) => t.newDarsQoldirish === 'Sababli')
                .reduce((acc, t) => {
                    const newIsm = t.newIsm;
                    acc[newIsm] = (acc[newIsm] || 0) + 1;
                    return acc;
                }, {});

            const notSababliCountsByClass = filteredTopics
                .filter((t) => t.newDarsQoldirish !== 'Sababli')
                .reduce((acc, t) => {
                    const newIsm = t.newIsm;
                    acc[newIsm] = (acc[newIsm] || 0) + 1;
                    return acc;
                }, {});

            // Find the most frequent newIsm for Sababli and Not Sababli
            const mostFrequentSababli = findMostFrequent(sababliCountsByClass);
            const mostFrequentNotSababli = findMostFrequent(notSababliCountsByClass);

            // Determine overall most frequent newIsm
            const overallCounts = Object.assign({}, sababliCountsByClass, notSababliCountsByClass);
            const mostFrequent = findMostFrequent(overallCounts);

            setMostFrequentClass(mostFrequent);
        };

        fetchData();
    }, []);

    const findMostFrequent = (counts) => {
        let maxCount = 0;
        let mostFrequent = '';
        for (const item in counts) {
            if (counts[item] > maxCount) {
                maxCount = counts[item];
                mostFrequent = item;
            }
        }
        return mostFrequent;
    };


    return (
        <>
            <div>
                <Navbar />
                <Diagramma />
                <Chiziqli />
                <div className="max-w-[1000px] mx-auto w-full">
                    <div className="flex flex-col justify-start w-full">
                        <h2 className="text-3xl poppins font-bold mb-2">Foizdagi o`zgarish</h2>
                        {Object.keys(percentageIncreaseByDate).map((date) => (
                            <p className='poppins' key={date}>{date}: Avvalgi kundan farqi %{percentageIncreaseByDate[date]}</p>
                        ))}
                    </div>
                </div>
                <div className="max-w-[1000px] w-full mx-auto mt-20 mb-5">
                    <div className="flex justify-between w-full">
                        <div className="mb-4">
                            <h2 className="text-3xl poppins font-bold mb-2">Sababli dars qoldirilgan o`quvchilar</h2>
                            <p className='poppins'>{countSababli} ta o`quvchi sababli dars qoldirgan</p>
                            <p className='poppins'>Bu barcha oquvchilarning <b>{percentageSababli}%</b> ni tashkil etadi</p>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-3xl poppins font-bold mb-2">Sababsiz dars qoldirgan o`quvchilar</h2>
                            <p className='poppins'> {countNotSababli} ta o`quvchi sababsiz dars qoldirgan</p>
                            <p className='poppins'> Bu barcha oquvchilarning <b>{percentageNotSababli}%</b> ni tashkil etadi</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1000px] w-full mx-auto mt-20 mb-5">
                    <div className="flex flex-col">
                        {Object.keys(sinfiCounts).map((sinfi) => (
                            <div key={sinfi} className="flex ">
                                <p className="poppins font-bold mb-2">{sinfi} sinfda</p>
                                <p className='poppins'>{sinfiCounts[sinfi]} ta o`quvchi</p>
                            </div>
                        ))}
                        <div className="max-w-[1000px] w-full mx-auto mt-20 mb-5">
                            <div className="flex flex-col">
                                <p className="text-3xl poppins font-bold mb-2">Eng ko'p qo'shilgan sinf:</p>
                                <p className="poppins">{mostFrequentSinfi}</p>
                            </div>
                        </div>
                        <div className="max-w-[1000px] w-full mx-auto mt-20 mb-5">
                            <div className="flex flex-col">
                                <p className="text-3xl poppins font-bold mb-2">Eng ko'p dars qoldirgan sinf:</p>
                                <p className="poppins">{mostFrequentClass}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Filter;