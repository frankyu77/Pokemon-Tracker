import React, { useEffect, useState, useCallback } from 'react';

function TESTING2() {
    const [tableList, setTableList] = useState([]);
    const [isTableHeaderVisible, setIsTableHeaderVisible] = useState(false);
    const [selectedFields, setSelectedFields] = useState([]);
    const [tableName, setTableName] = useState('');

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3001/projection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fields: selectedFields, tableName: tableName })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.success) {
                setTableList(data.data);
                setIsTableHeaderVisible(true);
            } else {
                console.error(`Failed to fetch projection data:`, data.error);
            }
        } catch (error) {
            console.error(`Error fetching projection data:`, error);
        }
    }, [selectedFields, tableName]);

    const clearTableList = () => {
        setTableList([]);
        setIsTableHeaderVisible(false);
    };

    return (
        <div>
            <h2>Projection</h2>

            <div>
                <label>
                    Table Name:
                    <input type="text" onChange={(event) => setTableName(String(event.target.value).toLowerCase())}></input>
                </label>
                <br></br>
                <label>
                    Fields:
                    <input type="text" onChange={(event) => setSelectedFields(String(event.target.value).toUpperCase().replaceAll(' ', '').split(','))}></input>
                </label>
            </div>

            <button onClick={fetchData}> Projection</button>
            <button onClick={clearTableList}> Clear List</button>

            {isTableHeaderVisible && ( // Conditionally render the table header
                <table>
                    <thead>
                        <tr>
                            {selectedFields.map(fieldName => (
                                <th key={fieldName}>{fieldName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableList.map((item, index) => (
                            <tr key={index}>
                                {selectedFields.map(field => (
                                    <td key={field}>{item[field]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TESTING2;
