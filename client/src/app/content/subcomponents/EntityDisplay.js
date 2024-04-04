import './EntityDisplay.css'
import { Link } from 'react-router-dom'

function EntityDisplay(props) {
    return (
        <div id={props.name} className="entity">
            <h2 id="name">{props.name}</h2>
            <div className="table-container">
                <table id="data" className="data-table">
                    <tbody>
                        {populateTable(props.attributes, props.data)}
                    </tbody>
                </table>
            </div>
            <div id="buttons">
                <Link to='/addpage' state={props.name}>
                    <button id="add-button">Add</button>
                </Link>
                <button id="remove-button">Remove</button>
            </div>
        </div>
    );
}

const populateTable = (attributes, rawData) => {
    if (!attributes || !rawData || rawData.length === 0) {
        return null; // Handle empty data gracefully
    }

    const table = [];
    const tableHeaders = attributes.map((attribute, index) => (
        <th key={index}>{attribute}</th>
    ));

    table.push(<tr key="header">{tableHeaders}</tr>);

    rawData.forEach((dataRow, rowIndex) => {
        const tableRow = dataRow.map((dataColumn, colIndex) => (
            <td key={`${rowIndex}-${colIndex}`}>{dataColumn}</td>
        ));
        table.push(<tr key={`row-${rowIndex}`}>{tableRow}</tr>);
    });

    return table;
};


export default EntityDisplay
