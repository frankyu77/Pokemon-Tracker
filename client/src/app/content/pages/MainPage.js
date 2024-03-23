import './MainPage.css'
import EntityDisplay from "../subcomponents/EntityDisplay";

function MainPage(props) {
    return (
        <div id="main-page">
            <EntityDisplay name='game' attributes={props.attributes["game"]} data={props.data["game"]} />
            <EntityDisplay name='pokemon' attributes={props.attributes["pokemon"]} data={props.data["pokemon"]} />
            <EntityDisplay name='items' attributes={props.attributes["items"]} data={props.data["items"]} />

            <EntityDisplay name='people' attributes={props.attributes["people"]} data={props.data["people"]} />
            <EntityDisplay name='gyms' attributes={props.attributes["gyms"]} data={props.data["gyms"]} />
            <EntityDisplay name='gym masters' attributes={props.attributes["gym masters"]} data={props.data["gym masters"]} />

            <EntityDisplay name='npcs' attributes={props.attributes["npcs"]} data={props.data["npcs"]} />
            <EntityDisplay name='trainers' attributes={props.attributes["trainers"]} data={props.data["trainers"]} />
            <EntityDisplay name='regions' attributes={props.attributes["regions"]} data={props.data["regions"]} />

            <EntityDisplay name='quests' attributes={props.attributes["quests"]} data={props.data["quests"]} />
            <EntityDisplay name='enterable areas' attributes={props.attributes["enterable areas"]} data={props.data["enterable areas"]} />
        </div>);
}

export default MainPage