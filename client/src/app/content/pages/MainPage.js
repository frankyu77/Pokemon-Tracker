import './MainPage.css'
import EntityDisplay from "../subcomponents/EntityDisplay";

function MainPage(props) {
    return (
        <div id="main-page">
                <EntityDisplay name='game' attributes={props.attributes["game"]} data={props.data["game"]} />
                <EntityDisplay name='items' attributes={props.attributes["items"]} data={props.data["items"]} />
                <EntityDisplay name='gym_includes' attributes={props.attributes["gym_includes"]} data={props.data["gym_includes"]} />
                <EntityDisplay name='region_apartof' attributes={props.attributes["region_apartof"]} data={props.data["region_apartof"]} />
                <EntityDisplay name='enterableAreas' attributes={props.attributes["enterableAreas"]} data={props.data["enterableAreas"]} />
                <EntityDisplay name='leadsTo' attributes={props.attributes["leadsTo"]} data={props.data["leadsTo"]} />
                <EntityDisplay name='typeWeakness' attributes={props.attributes["typeWeakness"]} data={props.data["typeWeakness"]} />
                <EntityDisplay name='peopleHas' attributes={props.attributes["peopleHas"]} data={props.data["peopleHas"]} />
                <EntityDisplay name='pokemon' attributes={props.attributes["pokemon"]} data={props.data["pokemon"]} />
                <EntityDisplay name='badgeGym' attributes={props.attributes["badgeGym"]} data={props.data["badgeGym"]} />
                <EntityDisplay name='gymMasters' attributes={props.attributes["gymMasters"]} data={props.data["gymMasters"]} />
                <EntityDisplay name='roleCatchPhrase' attributes={props.attributes["roleCatchPhrase"]} data={props.data["roleCatchPhrase"]} />
                <EntityDisplay name='NPCLivesIn' attributes={props.attributes["NPCLivesIn"]} data={props.data["NPCLivesIn"]} />
                <EntityDisplay name='trainers' attributes={props.attributes["trainers"]} data={props.data["trainers"]} />
                <EntityDisplay name='difficultyReward' attributes={props.attributes["difficultyReward"]} data={props.data["difficultyReward"]} />
                <EntityDisplay name='quests' attributes={props.attributes["quests"]} data={props.data["quests"]} />
        </div>);
}

export default MainPage
