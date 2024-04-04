import './app/App.css';
import React, { useState, useCallback } from 'react';

function AggregateQueryButton(props) {

    const [tableList, setTableList] = useState([]);

    const fetchTableList = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3001${props.fetchUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.success) {
                if (data.data.length === 0) {
                    setTableList([{data: 'does not exist'}])
                } else {
                    setTableList(data.data);
                }
            } else {
                console.error(`Failed to fetch ${props.aggregateName} data:`, data.error);
            }
        } catch (error) {
            console.error(`Error fetching ${props.aggregateName} data:`, error);
        }
    }, [tableList]);

    return (
        <div>
            <h2>{String(props.aggregateName).toUpperCase()}</h2>
            <button onClick={fetchTableList}>Get value</button>
            <table>
                <tbody>
                    {tableList.map((item, index) => (
                        <tr key={index}>
                            <td>{String(props.aggregateName).toUpperCase()}: </td>
                            <td>{String(Object.values(item)[0]).toUpperCase()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AggregateQueryButton;