import React, { useEffect, useState } from 'react';
import styles from './ScoreBoard.module.css';
import { getData } from './api';

function ScoreBoard() {
    const [data, setData] = useState();
    const fetchData = async () => {
        let data = await getData()
        setData(data);
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
        {!data || data.length===0 ? "No data available" :
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.td}>Player</th>
                        <th className={styles.td}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr className={styles.tr}>
                            <td className={styles.td}>{user.name}</td>
                            <td className={styles.td}>{`${user.min}:${user.sec}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
}</>
    )
}

export default ScoreBoard