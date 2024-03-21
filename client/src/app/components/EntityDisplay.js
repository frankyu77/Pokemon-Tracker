import './EntityDisplay.css'

function EntityDisplay(props) {

    const rawData = props.data

    const table = []

    for (const dataRow of rawData) {

        const tableRow = []

        for (const dataColumn of dataRow) {
            tableRow.push(<td> {dataColumn} </td>)
        }

        table.push(<tr> {tableRow} </tr>)
    }

    return (
        <div id="entity">
            <h2 id="name">{props.name}</h2>
            <table id="data"> {table} </table>
        </div>
    );
}

export default EntityDisplay