import './MainPage.css'
import EntityDisplay from "../subcomponents/EntityDisplay";

function MainPage(props) {
    return (
        <div id="main-page">
                <EntityDisplay name='game' attributes={props.attributes["game"]} data={props.data["game"]} tableName="game"/>
                <EntityDisplay name='items_has' attributes={props.attributes["items_has"]} data={props.data["items_has"]} tableName="items_has"/>
                <EntityDisplay name='gym_includes' attributes={props.attributes["gym_includes"]} data={props.data["gym_includes"]} tableName="gym_includes"/>
                <EntityDisplay name='region_apartof' attributes={props.attributes["region_apartof"]} data={props.data["region_apartof"]} tableName="region_apartof"/>
                <EntityDisplay name='enterableAreas' attributes={props.attributes["enterableAreas"]} data={props.data["enterableAreas"]} tableName="enterableAreas"/>
                <EntityDisplay name='leadsTo' attributes={props.attributes["leadsTo"]} data={props.data["leadsTo"]} tableName="leadsTo"/>
                <EntityDisplay name='type_Weakness' attributes={props.attributes["type_Weakness"]} data={props.data["type_Weakness"]} tableName="type_Weakness"/>
                <EntityDisplay name='people_Has' attributes={props.attributes["people_Has"]} data={props.data["people_Has"]} tableName="people_Has"/>
                <EntityDisplay name='pokemon_caught' attributes={props.attributes["pokemon_caught"]} data={props.data["pokemon_caught"]} tableName="pokemon_caught"/>
                <EntityDisplay name='badge_Gym' attributes={props.attributes["badge_Gym"]} data={props.data["badge_Gym"]} tableName="badge_Gym"/>
                <EntityDisplay name='GYMMASTER_OWNS' attributes={props.attributes["GYMMASTER_OWNS"]} data={props.data["GYMMASTER_OWNS"]} tableName="GYMMASTER_OWNS"/>
                <EntityDisplay name='role_CatchPhrase' attributes={props.attributes["role_CatchPhrase"]} data={props.data["role_CatchPhrase"]} tableName="role_CatchPhrase"/>
                <EntityDisplay name='NPC_LivesIn' attributes={props.attributes["NPC_LivesIn"]} data={props.data["NPC_LivesIn"]} tableName="NPC_LivesIn"/>
                <EntityDisplay name='trainer' attributes={props.attributes["trainer"]} data={props.data["trainer"]} tableName="trainer"/>
                <EntityDisplay name='difficulty_Reward' attributes={props.attributes["difficulty_Reward"]} data={props.data["difficulty_Reward"]} tableName="difficulty_Reward"/>
                <EntityDisplay name='quest_assigned' attributes={props.attributes["quest_assigned"]} data={props.data["quest_assigned"]} tableName="quest_assigned"/>
        </div>);
}

export default MainPage
