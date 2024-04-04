import './app/App.css';
import React, { useState, useCallback } from 'react';

function AggregateQueryButton(props) {

    const [aggregateValue, setaggregateValue] = useState(null);

    const fetchAggregateValue = useCallback(async () => {
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
                setaggregateValue(data.data);
            } else {
                console.error(`Failed to fetch ${props.aggregateName} data:`, data.error);
            }
        } catch (error) {
            console.error(`Error fetching ${props.aggregateName} data:`, error);
        }
    }, [aggregateValue]);

    return (
        <div>
            <h2>{String(props.aggregateName).toUpperCase()}</h2>
            <button onClick={fetchAggregateValue}>Get value</button>
            <div>{aggregateValue}</div>
        </div>
    );
}

export default AggregateQueryButton;