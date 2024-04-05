import './MainPage.css'
import EntityDisplay from "../subcomponents/EntityDisplay";

function MainPage(props) {
    return (
        <div id="main-page">
                <EntityDisplay name='game' attributes={props.attributes["game"]} data={props.data["game"]} tableName="game"/>
                <EntityDisplay name='items_has' attributes={props.attributes["items"]} data={props.data["items"]} tableName="items_has"/>
                <EntityDisplay name='gym_includes' attributes={props.attributes["gym_includes"]} data={props.data["gym_includes"]} tableName="gym_includes"/>
                <EntityDisplay name='region_apartof' attributes={props.attributes["region_apartof"]} data={props.data["region_apartof"]} tableName="region_apartof"/>
                <EntityDisplay name='enterableAreas' attributes={props.attributes["enterableAreas"]} data={props.data["enterableAreas"]} tableName="enterableAreas"/>
                <EntityDisplay name='leadsTo' attributes={props.attributes["leadsTo"]} data={props.data["leadsTo"]} tableName="leadsTo"/>
                <EntityDisplay name='type_Weakness' attributes={props.attributes["typeWeakness"]} data={props.data["typeWeakness"]} tableName="type_Weakness"/>
                <EntityDisplay name='people_Has' attributes={props.attributes["peopleHas"]} data={props.data["peopleHas"]} tableName="people_Has"/>
                <EntityDisplay name='pokemon_caught' attributes={props.attributes["pokemon"]} data={props.data["pokemon"]} tableName="pokemon_caught"/>
                <EntityDisplay name='badge_Gym' attributes={props.attributes["badgeGym"]} data={props.data["badgeGym"]} tableName="badge_Gym"/>
                <EntityDisplay name='GYMMASTER_OWNS' attributes={props.attributes["gymMasters"]} data={props.data["gymMasters"]} tableName="GYMMASTER_OWNS"/>
                <EntityDisplay name='role_CatchPhrase' attributes={props.attributes["roleCatchPhrase"]} data={props.data["roleCatchPhrase"]} tableName="role_CatchPhrase"/>
                <EntityDisplay name='NPC_LivesIn' attributes={props.attributes["NPCLivesIn"]} data={props.data["NPCLivesIn"]} tableName="NPC_LivesIn"/>
                <EntityDisplay name='trainer' attributes={props.attributes["trainers"]} data={props.data["trainers"]} tableName="trainer"/>
                <EntityDisplay name='difficulty_Reward' attributes={props.attributes["difficultyReward"]} data={props.data["difficultyReward"]} tableName="difficulty_Reward"/>
                <EntityDisplay name='quest_assigned' attributes={props.attributes["quests"]} data={props.data["quests"]} tableName="quest_assigned"/>
        </div>);
}

export default MainPage
