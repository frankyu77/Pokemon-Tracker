import React, { useEffect, useState, useCallback } from 'react';

function TESTING2() {
    const [tableList, setTableList] = useState([]);
    const [isTableVisible, setIsTableVisible] = useState(false);
    const [selectedFields, setSelectedFields] = useState([]);
    const [tableName, setTableName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3001/projection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fields: selectedFields, tableName: tableName })
            });

            // if (!response.ok) {
            //     throw new Error('Failed to fetch projection data');
            // }

            const data = await response.json();
            console.log("reach");
            if (data.success) {
                setTableList(data.data);
                setIsTableVisible(true);
                setErrorMessage('');
            } else {
                setIsTableVisible(false);
                setErrorMessage('Table name or field does not exist');
            }
        } catch (error) {
            console.error('Error fetching projection data:', error);
            setIsTableVisible(false);
            setErrorMessage('Error fetching projection data. Please try again later.');
        }
    }, [selectedFields, tableName]);

    const clearTableList = () => {
        setTableList([]);
        setIsTableVisible(false);
        setErrorMessage('');
    };

    return (
        <div>
            <h2>Projection</h2>

            <div>
                <label>
                    Table Name:
                    <input type="text" onChange={(event) => setTableName(String(event.target.value).toLowerCase())} />
                </label>
                <br />
                <label>
                    Fields:
                    <input type="text" onChange={(event) => setSelectedFields(String(event.target.value).toUpperCase().replaceAll(' ', '').split(','))} />
                </label>
            </div>

            <button onClick={fetchData}>Projection</button>
            <button onClick={clearTableList}>Clear List</button>

            {isTableVisible && tableList.length > 0 && (
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
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
}

export default TESTING2;
