import './EntityDisplay.css'
import { Link } from 'react-router-dom'

function EntityDisplay(props) {
    return (
        <div id={props.name} class="entity">
            <h2 id="name">{props.name}</h2>
            <table id="data"> {populateTable(props.attributes, props.data)} </table>
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
    const table = [];
    const tableHeaders = [];

    for (const attribute of attributes) {
        tableHeaders.push(<th>{attribute}</th>)
    }

    table.push(<tr> {tableHeaders} </tr>)

    for (const dataRow of rawData) {

        const tableRow = []

        for (const dataColumn of dataRow) {
            tableRow.push(<td> {dataColumn} </td>)
        }

        table.push(<tr> {tableRow} </tr>)
    }

    return table;
};

export default EntityDisplay