-- this is where the scripts for creating all the tables and populating the tables should be
-- should also have the script for dropping all the tables
select 'drop table '||table_name||' cascade constraints;' from user_tables;

CREATE TABLE GAME
(
    "GAMEID"          NUMBER,
    "GAME_DIFFICULTY" VARCHAR2(15),
    "GENERATION"      VARCHAR2(52),
    PRIMARY KEY ("GAMEID")
);

CREATE TABLE ITEMS_HAS
(
    "ITEM#"    NUMBER,
    "RARITY"   VARCHAR2(15),
    "GAMEID"   NUMBER,
    "ITEMNAME" VARCHAR2(20),
    PRIMARY KEY ("ITEM#"),
    FOREIGN KEY (GAMEID) REFERENCES GAME ON DELETE CASCADE
);

CREATE TABLE GYM_INCLUDES
(
    "GYM#"       NUMBER,
    "DIFFICULTY" VARCHAR2(10),
    "TYPE"       VARCHAR2(10),
    "GAMEID"     NUMBER NOT NULL,
    PRIMARY KEY ("GYM#", "GAMEID"),
    FOREIGN KEY (GAMEID) REFERENCES GAME ON DELETE CASCADE
);

CREATE TABLE REGION_APARTOF
(
    "REGIONNAME" VARCHAR2(30),
    "TYPE"       VARCHAR2(20),
    "GYM#"       NUMBER,
    "GAMEID"     NUMBER,
    PRIMARY KEY ("REGIONNAME"),
    FOREIGN KEY (GYM#, GAMEID) REFERENCES GYM_INCLUDES
);

CREATE TABLE ENTERABLEAREAS
(
    "AREA#" NUMBER,
    "TYPE"  VARCHAR2(30),
    PRIMARY KEY ("AREA#")
);

CREATE TABLE LEADSTO
(	"REGIONNAME" VARCHAR2(20),
     "AREA#" NUMBER,
     FOREIGN KEY ("REGIONNAME")
         REFERENCES REGION_APARTOF,
     FOREIGN KEY ("AREA#")
         REFERENCES ENTERABLEAREAS
);

CREATE TABLE TYPE_WEAKNESS
(
    "TYPE"     VARCHAR2(15),
    "WEAKNESS" VARCHAR2(50),
    PRIMARY KEY ("TYPE")
);

CREATE TABLE PEOPLE_HAS
(
    "PID"    NUMBER,
    "GAMEID" NUMBER,
    PRIMARY KEY ("PID"),
    FOREIGN KEY (GAMEID) REFERENCES GAME ON DELETE CASCADE
);

CREATE TABLE POKEMON_CAUGHT
(
    "NAME"          VARCHAR2(15),
    "TYPE1"         VARCHAR2(10) NOT NULL,
    "TYPE2"         VARCHAR2(10),
    "SPECIALATTACK" VARCHAR2(20),
    "CAUGHT_SINCE"  DATE,
    "PID"           NUMBER,
    PRIMARY KEY ("NAME"),
    FOREIGN KEY ("PID")
        REFERENCES PEOPLE_HAS ON DELETE CASCADE,
    FOREIGN KEY ("TYPE1")
        REFERENCES TYPE_WEAKNESS ON DELETE CASCADE,
    FOREIGN KEY ("TYPE2")
        REFERENCES TYPE_WEAKNESS ON DELETE CASCADE
);

CREATE TABLE BADGE_GYM
(
    "BADGE"  VARCHAR2(50),
    "GYM#"   NUMBER UNIQUE,
    "GAMEID" NUMBER,
    PRIMARY KEY ("BADGE"),
    FOREIGN KEY ("GYM#", "GAMEID")
        REFERENCES GYM_INCLUDES ON DELETE CASCADE
);

CREATE TABLE GYMMASTER_OWNS
(
    "PID"        NUMBER,
    "NAME"       VARCHAR2(25),
    "BADGE"      VARCHAR2(15),
    "OWNS_SINCE" DATE,
    PRIMARY KEY ("PID"),
    FOREIGN KEY ("PID")
        REFERENCES PEOPLE_HAS ON DELETE CASCADE,
    FOREIGN KEY ("BADGE")
        REFERENCES BADGE_GYM ON DELETE CASCADE
);

CREATE TABLE ROLE_CATCHPHRASE
(
    "ROLE"         VARCHAR2(15),
    "CATCH_PHRASE" VARCHAR2(50),
    PRIMARY KEY ("ROLE")
);

CREATE TABLE NPC_LIVESIN
(
    "PID"        NUMBER,
    "NAME"       VARCHAR2(25),
    "ROLE"       VARCHAR2(15),
    "REGIONNAME" VARCHAR2(30),
    PRIMARY KEY ("PID"),
    FOREIGN KEY ("PID")
        REFERENCES PEOPLE_HAS ON DELETE CASCADE,
    FOREIGN KEY ("REGIONNAME")
        REFERENCES REGION_APARTOF ON DELETE CASCADE,
    FOREIGN KEY ("ROLE")
        REFERENCES ROLE_CATCHPHRASE ON DELETE CASCADE
);

CREATE TABLE TRAINER
(
    "PID"         NUMBER,
    "NAME"        VARCHAR2(25),
    "FAV_POKEMON" VARCHAR2(15),
    PRIMARY KEY ("PID"),
    FOREIGN KEY ("PID")
        REFERENCES PEOPLE_HAS ON DELETE CASCADE
);

CREATE TABLE DIFFICULTY_REWARD
(
    "DIFFICULTY" VARCHAR2(15),
    "REWARD"     VARCHAR2(20),
    PRIMARY KEY ("DIFFICULTY")
);

CREATE TABLE QUEST_ASSIGNED
(
    "QUESTID"       NUMBER,
    "DIFFICULTY"    VARCHAR2(15),
    "PID"           NUMBER,
    "DATE_ACCEPTED" DATE,
    PRIMARY KEY ("QUESTID"),
    FOREIGN KEY ("PID")
        REFERENCES TRAINER ON DELETE CASCADE,
    FOREIGN KEY ("DIFFICULTY")
        REFERENCES DIFFICULTY_REWARD ON DELETE CASCADE
);

Insert into game(gameid, game_difficulty, generation) values(0, 'hardcore', 'Generation I (Kanto): Science');
Insert into game(gameid, game_difficulty, generation) values(1, 'hard', 'Generation II (Johto): Cultural Traditions');
Insert into game(gameid, game_difficulty, generation) values(2, 'hard', 'Generation III (Hoenn): The Environment');
Insert into game(gameid, game_difficulty, generation) values(3, 'medium', 'Generation IV (Sinnoh): Time and Space');
Insert into game(gameid, game_difficulty, generation) values(4, 'hardcore', 'Generation V (Unova): Truth and Ideals');
Insert into game(gameid, game_difficulty, generation) values(5, 'beginner', 'Generation VI (Kalos): Life, Death and the Ecosystem');
Insert into game(gameid, game_difficulty, generation) values(6, 'medium', 'Generation VII (Alola): Day and Night');
Insert into game(gameid, game_difficulty, generation) values(7, 'easy', 'Generation VIII (Galar): England and Its Culture');
Insert into game(gameid, game_difficulty, generation) values(8, 'easy', 'Generation IX (Paldea): Past vs. the Future');


insert into items_has(item#, rarity, gameid, itemname) values(1, 'common', 0, 'Poke Ball');
insert into items_has(item#, rarity, gameid, itemname) values(2, 'common', 1, 'Poke Ball');
insert into items_has(item#, rarity, gameid, itemname) values(3, 'common', 2, 'Poke Ball');
insert into items_has(item#, rarity, gameid, itemname) values(4, 'common', 3, 'Poke Ball');
insert into items_has(item#, rarity, gameid, itemname) values(5, 'common', 4, 'Poke Ball');
insert into items_has(item#, rarity, gameid, itemname) values(6, 'common', 5, 'Poke Ball');
insert into items_has(item#, rarity, gameid, itemname) values(7, 'common', 6, 'Poke Ball');
insert into items_has(item#, rarity, gameid, itemname) values(8, 'common', 7, 'Poke Ball');
insert into items_has(item#, rarity, gameid, itemname) values(9, 'common', 8, 'Poke Ball');
insert into items_has(item#, rarity, gameid, itemname) values(10, 'common', 0, 'Antidote');
insert into items_has(item#, rarity, gameid, itemname) values(11, 'common', 0, 'Bicycle');
insert into items_has(item#, rarity, gameid, itemname) values(12, 'uncommon', 0, 'Burn Heal');
insert into items_has(item#, rarity, gameid, itemname) values(13, 'common', 0, 'Elixir');
insert into items_has(item#, rarity, gameid, itemname) values(14, 'rare', 0, 'Exp. Share');
insert into items_has(item#, rarity, gameid, itemname) values(15, 'uncommon', 0, 'Full Heal');
insert into items_has(item#, rarity, gameid, itemname) values(16, 'uncommon', 1, 'Full Heal');
insert into items_has(item#, rarity, gameid, itemname) values(17, 'uncommon', 2, 'Full Heal');
insert into items_has(item#, rarity, gameid, itemname) values(18, 'uncommon', 3, 'Full Heal');
insert into items_has(item#, rarity, gameid, itemname) values(19, 'uncommon', 4, 'Full Heal');
insert into items_has(item#, rarity, gameid, itemname) values(20, 'uncommon', 5, 'Full Heal');
insert into items_has(item#, rarity, gameid, itemname) values(21, 'uncommon', 6, 'Full Heal');
insert into items_has(item#, rarity, gameid, itemname) values(22, 'uncommon', 7, 'Full Heal');
insert into items_has(item#, rarity, gameid, itemname) values(23, 'uncommon', 8, 'Full Heal');
insert into items_has(item#, rarity, gameid, itemname) values(24, 'rare', 0, 'Full Restore');
insert into items_has(item#, rarity, gameid, itemname) values(25, 'rare', 1, 'Full Restore');
insert into items_has(item#, rarity, gameid, itemname) values(26, 'rare', 2, 'Full Restore');
insert into items_has(item#, rarity, gameid, itemname) values(27, 'rare', 3, 'Full Restore');
insert into items_has(item#, rarity, gameid, itemname) values(28, 'rare', 4, 'Full Restore');
insert into items_has(item#, rarity, gameid, itemname) values(29, 'rare', 5, 'Full Restore');
insert into items_has(item#, rarity, gameid, itemname) values(30, 'rare', 6, 'Full Restore');
insert into items_has(item#, rarity, gameid, itemname) values(31, 'rare', 7, 'Full Restore');
insert into items_has(item#, rarity, gameid, itemname) values(32, 'rare', 8, 'Full Restore');
insert into items_has(item#, rarity, gameid, itemname) values(33, 'rare', 0, 'Master Ball');
insert into items_has(item#, rarity, gameid, itemname) values(34, 'rare', 1, 'Master Ball');
insert into items_has(item#, rarity, gameid, itemname) values(35, 'rare', 2, 'Master Ball');
insert into items_has(item#, rarity, gameid, itemname) values(36, 'rare', 3, 'Master Ball');
insert into items_has(item#, rarity, gameid, itemname) values(37, 'rare', 4, 'Master Ball');
insert into items_has(item#, rarity, gameid, itemname) values(38, 'rare', 5, 'Master Ball');
insert into items_has(item#, rarity, gameid, itemname) values(39, 'rare', 6, 'Master Ball');
insert into items_has(item#, rarity, gameid, itemname) values(40, 'rare', 7, 'Master Ball');
insert into items_has(item#, rarity, gameid, itemname) values(41, 'rare', 8, 'Master Ball');
insert into items_has(item#, rarity, gameid, itemname) values(42, 'ultra rare', 0, 'Nugget');
insert into items_has(item#, rarity, gameid, itemname) values(43, 'uncommon', 0, 'Old Rod');
insert into items_has(item#, rarity, gameid, itemname) values(44, 'rare', 0, 'Rare Candy');
insert into items_has(item#, rarity, gameid, itemname) values(45, 'rare', 0, 'Ultra Ball');
insert into items_has(item#, rarity, gameid, itemname) values(46, 'rare', 1, 'Ultra Ball');
insert into items_has(item#, rarity, gameid, itemname) values(47, 'rare', 2, 'Ultra Ball');
insert into items_has(item#, rarity, gameid, itemname) values(48, 'rare', 3, 'Ultra Ball');
insert into items_has(item#, rarity, gameid, itemname) values(49, 'rare', 4, 'Ultra Ball');
insert into items_has(item#, rarity, gameid, itemname) values(50, 'rare', 5, 'Ultra Ball');
insert into items_has(item#, rarity, gameid, itemname) values(51, 'rare', 6, 'Ultra Ball');
insert into items_has(item#, rarity, gameid, itemname) values(52, 'rare', 7, 'Ultra Ball');
insert into items_has(item#, rarity, gameid, itemname) values(53, 'rare', 8, 'Ultra Ball');
insert into items_has(item#, rarity, gameid, itemname) values(54, 'rare', 0, 'Super Rod');
insert into items_has(item#, rarity, gameid, itemname) values(55, 'uncommon', 0, 'Revive');
insert into items_has(item#, rarity, gameid, itemname) values(56, 'uncommon', 1, 'Revive');
insert into items_has(item#, rarity, gameid, itemname) values(57, 'uncommon', 2, 'Revive');
insert into items_has(item#, rarity, gameid, itemname) values(58, 'uncommon', 3, 'Revive');
insert into items_has(item#, rarity, gameid, itemname) values(59, 'uncommon', 4, 'Revive');
insert into items_has(item#, rarity, gameid, itemname) values(60, 'uncommon', 5, 'Revive');
insert into items_has(item#, rarity, gameid, itemname) values(61, 'uncommon', 6, 'Revive');
insert into items_has(item#, rarity, gameid, itemname) values(62, 'uncommon', 7, 'Revive');
insert into items_has(item#, rarity, gameid, itemname) values(63, 'uncommon', 8, 'Revive');
insert into items_has(item#, rarity, gameid, itemname) values(64, 'rare', 1, 'Blue Card');
insert into items_has(item#, rarity, gameid, itemname) values(65, 'rare', 1, 'Dragon Fang');
insert into items_has(item#, rarity, gameid, itemname) values(66, 'rare', 1, 'Dragon Scale');
insert into items_has(item#, rarity, gameid, itemname) values(67, 'common', 1, 'Fast Ball');
insert into items_has(item#, rarity, gameid, itemname) values(68, 'common', 2, 'Fast Ball');
insert into items_has(item#, rarity, gameid, itemname) values(69, 'common', 3, 'Fast Ball');
insert into items_has(item#, rarity, gameid, itemname) values(70, 'common', 4, 'Fast Ball');
insert into items_has(item#, rarity, gameid, itemname) values(71, 'common', 5, 'Fast Ball');
insert into items_has(item#, rarity, gameid, itemname) values(72, 'common', 6, 'Fast Ball');
insert into items_has(item#, rarity, gameid, itemname) values(73, 'common', 7, 'Fast Ball');
insert into items_has(item#, rarity, gameid, itemname) values(74, 'common', 8, 'Fast Ball');
insert into items_has(item#, rarity, gameid, itemname) values(75, 'common', 1, 'Lucky Egg');
insert into items_has(item#, rarity, gameid, itemname) values(76, 'uncommon', 1, 'Lost Item');
insert into items_has(item#, rarity, gameid, itemname) values(77, 'rare', 1, 'Squirt Bottle');
insert into items_has(item#, rarity, gameid, itemname) values(78, 'rare', 1, 'Quick Claw');
insert into items_has(item#, rarity, gameid, itemname) values(79, 'uncommon', 1, 'Upgrade');
insert into items_has(item#, rarity, gameid, itemname) values(80, 'uncommon', 2, 'Data ROM');
insert into items_has(item#, rarity, gameid, itemname) values(81, 'rare', 2, 'Excite Scent');
insert into items_has(item#, rarity, gameid, itemname) values(82, 'uncommon', 2, 'Honed Berry');
insert into items_has(item#, rarity, gameid, itemname) values(83, 'uncommon', 2, 'Mach Bike');
insert into items_has(item#, rarity, gameid, itemname) values(84, 'rare', 2, 'PP Max');
insert into items_has(item#, rarity, gameid, itemname) values(85, 'uncommon', 2, 'Sun Shard');
insert into items_has(item#, rarity, gameid, itemname) values(86, 'common', 2, 'Battle CD');
insert into items_has(item#, rarity, gameid, itemname) values(87, 'common', 2, 'Hondew Berry');
insert into items_has(item#, rarity, gameid, itemname) values(88, 'uncommon', 3, 'Digger Drill');
insert into items_has(item#, rarity, gameid, itemname) values(89, 'common', 3, 'Flame Orb');
insert into items_has(item#, rarity, gameid, itemname) values(90, 'rare', 3, 'Life Orb');
insert into items_has(item#, rarity, gameid, itemname) values(91, 'uncommon', 3, 'Magmarizer');
insert into items_has(item#, rarity, gameid, itemname) values(92, 'ultra rare', 3, 'Pure Incense');
insert into items_has(item#, rarity, gameid, itemname) values(93, 'ultra rare', 3, 'Shiny Stone');
insert into items_has(item#, rarity, gameid, itemname) values(94, 'ultra rare', 3, 'Heal Ball');
insert into items_has(item#, rarity, gameid, itemname) values(95, 'ultra rare', 4, 'Heal Ball');
insert into items_has(item#, rarity, gameid, itemname) values(96, 'ultra rare', 5, 'Heal Ball');
insert into items_has(item#, rarity, gameid, itemname) values(97, 'ultra rare', 6, 'Heal Ball');
insert into items_has(item#, rarity, gameid, itemname) values(98, 'ultra rare', 7, 'Heal Ball');
insert into items_has(item#, rarity, gameid, itemname) values(99, 'ultra rare', 8, 'Heal Ball');
insert into items_has(item#, rarity, gameid, itemname) values(100, 'uncommon', 3, 'Quick Ball');
insert into items_has(item#, rarity, gameid, itemname) values(101, 'uncommon', 4, 'Quick Ball');
insert into items_has(item#, rarity, gameid, itemname) values(102, 'uncommon', 5, 'Quick Ball');
insert into items_has(item#, rarity, gameid, itemname) values(103, 'uncommon', 6, 'Quick Ball');
insert into items_has(item#, rarity, gameid, itemname) values(104, 'uncommon', 7, 'Quick Ball');
insert into items_has(item#, rarity, gameid, itemname) values(105, 'uncommon', 8, 'Quick Ball');


insert into gym_includes(gym#, difficulty, type, gameid) values(0, 'easy', 'water', 0);
insert into gym_includes(gym#, difficulty, type, gameid) values(1, 'hard', 'water', 1);
insert into gym_includes(gym#, difficulty, type, gameid) values(2, 'medium', 'water', 2);
insert into gym_includes(gym#, difficulty, type, gameid) values(3, 'easy', 'water', 3);
insert into gym_includes(gym#, difficulty, type, gameid) values(4, 'easy', 'water', 4);
insert into gym_includes(gym#, difficulty, type, gameid) values(5, 'hard', 'water', 5);
insert into gym_includes(gym#, difficulty, type, gameid) values(6, 'hard', 'water', 6);
insert into gym_includes(gym#, difficulty, type, gameid) values(7, 'easy', 'water', 7);
insert into gym_includes(gym#, difficulty, type, gameid) values(8, 'medium', 'water', 8);
insert into gym_includes(gym#, difficulty, type, gameid) values(9, 'medium', 'ice', 0);
insert into gym_includes(gym#, difficulty, type, gameid) values(10, 'medium', 'ice', 1);
insert into gym_includes(gym#, difficulty, type, gameid) values(11, 'easy', 'ice', 2);
insert into gym_includes(gym#, difficulty, type, gameid) values(12, 'hard', 'ice', 3);
insert into gym_includes(gym#, difficulty, type, gameid) values(13, 'hard', 'ice', 4);
insert into gym_includes(gym#, difficulty, type, gameid) values(14, 'easy', 'ice', 5);
insert into gym_includes(gym#, difficulty, type, gameid) values(15, 'medium', 'ice', 6);
insert into gym_includes(gym#, difficulty, type, gameid) values(16, 'medium', 'ice', 7);
insert into gym_includes(gym#, difficulty, type, gameid) values(17, 'easy', 'ice', 8);
insert into gym_includes(gym#, difficulty, type, gameid) values(17, 'hard', 'steel', 0);
insert into gym_includes(gym#, difficulty, type, gameid) values(18, 'medium', 'steel', 1);
insert into gym_includes(gym#, difficulty, type, gameid) values(19, 'medium', 'steel', 2);
insert into gym_includes(gym#, difficulty, type, gameid) values(20, 'hard', 'steel', 3);
insert into gym_includes(gym#, difficulty, type, gameid) values(21, 'hard', 'steel', 4);
insert into gym_includes(gym#, difficulty, type, gameid) values(22, 'easy', 'steel', 5);
insert into gym_includes(gym#, difficulty, type, gameid) values(23, 'easy', 'steel', 6);
insert into gym_includes(gym#, difficulty, type, gameid) values(24, 'medium', 'steel', 7);
insert into gym_includes(gym#, difficulty, type, gameid) values(25, 'easy', 'steel', 8);
insert into gym_includes(gym#, difficulty, type, gameid) values(26, 'medium', 'dark', 0);
insert into gym_includes(gym#, difficulty, type, gameid) values(27, 'hard', 'dark', 1);
insert into gym_includes(gym#, difficulty, type, gameid) values(28, 'hard', 'dark', 2);
insert into gym_includes(gym#, difficulty, type, gameid) values(29, 'medium', 'dark', 3);
insert into gym_includes(gym#, difficulty, type, gameid) values(30, 'easy', 'dark', 4);
insert into gym_includes(gym#, difficulty, type, gameid) values(31, 'easy', 'dark', 5);
insert into gym_includes(gym#, difficulty, type, gameid) values(32, 'medium', 'dark', 6);
insert into gym_includes(gym#, difficulty, type, gameid) values(33, 'easy', 'dark', 7);
insert into gym_includes(gym#, difficulty, type, gameid) values(34, 'hard', 'dark', 8);
insert into gym_includes(gym#, difficulty, type, gameid) values(35, 'hard', 'psychic', 0);
insert into gym_includes(gym#, difficulty, type, gameid) values(36, 'medium', 'psychic', 1);
insert into gym_includes(gym#, difficulty, type, gameid) values(37, 'hard', 'psychic', 2);
insert into gym_includes(gym#, difficulty, type, gameid) values(38, 'hard', 'psychic', 3);
insert into gym_includes(gym#, difficulty, type, gameid) values(39, 'easy', 'psychic', 4);
insert into gym_includes(gym#, difficulty, type, gameid) values(40, 'easy', 'psychic', 5);
insert into gym_includes(gym#, difficulty, type, gameid) values(41, 'medium', 'psychic', 6);
insert into gym_includes(gym#, difficulty, type, gameid) values(42, 'hard', 'psychic', 7);
insert into gym_includes(gym#, difficulty, type, gameid) values(43, 'easy', 'psychic', 8);
insert into gym_includes(gym#, difficulty, type, gameid) values(44, 'hard', 'fire', 0);
insert into gym_includes(gym#, difficulty, type, gameid) values(45, 'easy', 'fire', 1);
insert into gym_includes(gym#, difficulty, type, gameid) values(46, 'easy', 'fire', 2);
insert into gym_includes(gym#, difficulty, type, gameid) values(47, 'easy', 'fire', 3);
insert into gym_includes(gym#, difficulty, type, gameid) values(48, 'medium', 'fire', 4);
insert into gym_includes(gym#, difficulty, type, gameid) values(49, 'medium', 'fire', 5);
insert into gym_includes(gym#, difficulty, type, gameid) values(50, 'easy', 'fire', 6);
insert into gym_includes(gym#, difficulty, type, gameid) values(51, 'hard', 'fire', 7);
insert into gym_includes(gym#, difficulty, type, gameid) values(52, 'medium', 'fire', 8);
insert into gym_includes(gym#, difficulty, type, gameid) values(53, 'medium', 'ghost', 0);
insert into gym_includes(gym#, difficulty, type, gameid) values(54, 'hard', 'ghost', 1);
insert into gym_includes(gym#, difficulty, type, gameid) values(55, 'hard', 'ghost', 2);
insert into gym_includes(gym#, difficulty, type, gameid) values(56, 'medium', 'ghost', 3);
insert into gym_includes(gym#, difficulty, type, gameid) values(57, 'medium', 'ghost', 4);
insert into gym_includes(gym#, difficulty, type, gameid) values(58, 'easy', 'ghost', 5);
insert into gym_includes(gym#, difficulty, type, gameid) values(59, 'easy', 'ghost', 6);
insert into gym_includes(gym#, difficulty, type, gameid) values(60, 'medium', 'ghost', 7);
insert into gym_includes(gym#, difficulty, type, gameid) values(61, 'hard', 'ghost', 8);


insert into region_apartof(regionname, type, gym#, gameid) values('Celestic City', 'City', 1, 1);
insert into region_apartof(regionname, type, gym#, gameid) values('Jubilife City', 'City', 54, 1);
insert into region_apartof(regionname, type, gym#, gameid) values('Full Moon Island', 'Island',27, 1);
insert into region_apartof(regionname, type, gym#, gameid) values('Twin Leaf Town', 'town', 28, 2);
insert into region_apartof(regionname, type, gym#, gameid) values('Hearthrome City', 'town', 2, 2);
insert into region_apartof(regionname, type, gym#, gameid) values('Lilycove City', 'city', 9, 0);
insert into region_apartof(regionname, type, gym#, gameid) values('Mossui Town', 'town', 26, 0);
insert into region_apartof(regionname, type, gym#, gameid) values('Nuvema Town', 'town', 36, 1);
insert into region_apartof(regionname, type, gym#, gameid) values('Seafolk Village', 'village', 18, 1);
insert into region_apartof(regionname, type, gym#, gameid) values('Seven Island', 'island', 37, 2);
insert into region_apartof(regionname, type, gym#, gameid) values('Snowpoint City', 'city', 38, 3);
insert into region_apartof(regionname, type, gym#, gameid) values('Undella Town', 'town', 12, 3);
insert into region_apartof(regionname, type, gym#, gameid) values('Veilstone City', 'city', 47, 3);
insert into region_apartof(regionname, type, gym#, gameid) values('White Forest', 'forest', 48, 4);
insert into region_apartof(regionname, type, gym#, gameid) values('Seven Island', 'island', 39, 4);
insert into region_apartof(regionname, type, gym#, gameid) values('Violet City', 'city', 13, 4);
insert into region_apartof(regionname, type, gym#, gameid) values('Puzzle Village', 'village', 40, 5);
insert into region_apartof(regionname, type, gym#, gameid) values('Serene Village', 'village', 49, 5);
insert into region_apartof(regionname, type, gym#, gameid) values('Mossdeep City', 'city', 58, 5);
insert into region_apartof(regionname, type, gym#, gameid) values('Rustboro City', 'city', 59, 6);
insert into region_apartof(regionname, type, gym#, gameid) values('Safari Zone Gate', 'gate', 41, 6);
insert into region_apartof(regionname, type, gym#, gameid) values('Cinnabar Island', 'island', 32, 6);
insert into region_apartof(regionname, type, gym#, gameid) values('Black City', 'city', 24, 7);
insert into region_apartof(regionname, type, gym#, gameid) values('Cherrygrove City', 'city', 33, 7);
insert into region_apartof(regionname, type, gym#, gameid) values('Accumula Town', 'town', 60, 7);
insert into region_apartof(regionname, type, gym#, gameid) values('Blackthorn City', 'city', 61, 8);
insert into region_apartof(regionname, type, gym#, gameid) values('Nuvema Town', 'town', 34, 8);
insert into region_apartof(regionname, type, gym#, gameid) values('Pastoria City', 'city', 52, 8);


insert into enterableareas(area#, type) values(0, 'house');
insert into enterableareas(area#, type) values(1, 'forest');
insert into enterableareas(area#, type) values(2, 'cave');
insert into enterableareas(area#, type) values(3, 'store');
insert into enterableareas(area#, type) values(4, 'Pokemon Center');
insert into enterableareas(area#, type) values(5, 'tunnle');


insert into leadsto(regionname, area#) values('Celestic City', 1);
insert into leadsto(regionname, area#) values('Celestic City', 2);
insert into leadsto(regionname, area#) values('Hearthrome City', 3);
insert into leadsto(regionname, area#) values('Hearthrome City', 4);
insert into leadsto(regionname, area#) values('Nuvema Town', 0);
insert into leadsto(regionname, area#) values('Nuvema Town', 1);
insert into leadsto(regionname, area#) values('Nuvema Town', 5);


insert into type_weakness(type, weakness) values('fire', 'water, ground, rock');
insert into type_weakness(type, weakness) values('normal', 'fighting');
insert into type_weakness(type, weakness) values('electric', 'ground');
insert into type_weakness(type, weakness) values('grass', 'fire, ice, poison, flying, bug');
insert into type_weakness(type, weakness) values('ice', 'fire, fighting, rock, steel');
insert into type_weakness(type, weakness) values('fighting', 'flying, psychic');
insert into type_weakness(type, weakness) values('poison', 'ground, psychic, fairy');
insert into type_weakness(type, weakness) values('ground', 'water, grass, ice');
insert into type_weakness(type, weakness) values('flying', 'electric, ice, rock');
insert into type_weakness(type, weakness) values('psychic', 'bug, ghost, dark');
insert into type_weakness(type, weakness) values('bug', 'fire, flying, rock');
insert into type_weakness(type, weakness) values('rock', 'water, grass, fighting, ground');
insert into type_weakness(type, weakness) values('ghost', 'ghost, dark');
insert into type_weakness(type, weakness) values('dragon', 'ice, dragon, fairy');
insert into type_weakness(type, weakness) values('dark', 'fighting, bug, fairy');
insert into type_weakness(type, weakness) values('steel', 'fire, fighting, ground');
insert into type_weakness(type, weakness) values('fairy', 'poison, steel');
insert into type_weakness(type, weakness) values('water', 'electric, grass');


insert into people_has(pid, gameid) values(0, 0);
insert into people_has(pid, gameid) values(1, 0);
insert into people_has(pid, gameid) values(2, 0);
insert into people_has(pid, gameid) values(3, 0);
insert into people_has(pid, gameid) values(4, 1);
insert into people_has(pid, gameid) values(5, 1);
insert into people_has(pid, gameid) values(6, 1);
insert into people_has(pid, gameid) values(7, 2);
insert into people_has(pid, gameid) values(8, 2);
insert into people_has(pid, gameid) values(9, 3);
insert into people_has(pid, gameid) values(10, 4);
insert into people_has(pid, gameid) values(11, 3);
insert into people_has(pid, gameid) values(12, 3);
insert into people_has(pid, gameid) values(13, 4);
insert into people_has(pid, gameid) values(14, 4);
insert into people_has(pid, gameid) values(15, 5);
insert into people_has(pid, gameid) values(16, 5);
insert into people_has(pid, gameid) values(17, 6);
insert into people_has(pid, gameid) values(18, 6);
insert into people_has(pid, gameid) values(19, 6);
insert into people_has(pid, gameid) values(20, 5);
insert into people_has(pid, gameid) values(21, 7);
insert into people_has(pid, gameid) values(22, 7);
insert into people_has(pid, gameid) values(23, 8);
insert into people_has(pid, gameid) values(24, 8);
insert into people_has(pid, gameid) values(25, 8);
insert into people_has(pid, gameid) values(26, 8);
insert into people_has(pid, gameid) values(67, 8);
insert into people_has(pid, gameid) values(68, 8);
insert into people_has(pid, gameid) values(69, 8);
insert into people_has(pid, gameid) values(70, 8);
insert into people_has(pid, gameid) values(71, 8);
insert into people_has(pid, gameid) values(72, 8);
insert into people_has(pid, gameid) values(73, 8);
insert into people_has(pid, gameid) values(74, 8);
insert into people_has(pid, gameid) values(75, 8);
insert into people_has(pid, gameid) values(76, 8);
insert into people_has(pid, gameid) values(77, 8);
insert into people_has(pid, gameid) values(78, 8);
insert into people_has(pid, gameid) values(79, 8);
insert into people_has(pid, gameid) values(80, 8);
insert into people_has(pid, gameid) values(81, 8);
insert into people_has(pid, gameid) values(82, 8);


insert into pokemon_caught(name, type1, type2, specialattack, caught_since, pid) values('Bulbasaur', 'grass', 'poison', 'Max Overgrowth', to_date('21-03-2020', 'DD-MM-YYYY'), 1);
insert into pokemon_caught(name, type1, type2, specialattack, caught_since, pid) values('Venusaur', 'grass', 'poison', 'Trailblze', to_date('21-05-2020', 'DD-MM-YYYY'), 1);
insert into pokemon_caught(name, type1, type2, specialattack, caught_since, pid) values('Charizard', 'fire', 'flying', 'Inferno', to_date('21-02-2022', 'DD-MM-YYYY'), 1);
insert into pokemon_caught(name, type1, specialattack, caught_since, pid) values('Blastoise', 'water', 'Hydro Pump', to_date('21-01-2020', 'DD-MM-YYYY'), 0);
insert into pokemon_caught(name, type1, type2, specialattack, caught_since, pid) values('Beedrill', 'bug', 'poison', 'Poison Jab', to_date('07-01-2015', 'DD-MM-YYYY'), 8);
insert into pokemon_caught(name, type1, type2, specialattack, caught_since, pid) values('Butterfree', 'bug', 'flying', 'Supersonic', to_date('10-09-2010', 'DD-MM-YYYY'), 6);
insert into pokemon_caught(name, type1, type2, specialattack, caught_since, pid) values('Pidgeot', 'normal', 'flying', 'Gust', to_date('19-09-2004', 'DD-MM-YYYY'), 4);
insert into pokemon_caught(name, type1, specialattack, caught_since, pid) values('Rattata', 'normal', 'Super Fang', to_date('11-12-2002', 'DD-MM-YYYY'), 5);
insert into pokemon_caught(name, type1, specialattack, caught_since, pid) values('Arbok', 'poison', 'Glare', to_date('19-10-2023', 'DD-MM-YYYY'), 5);
insert into pokemon_caught(name, type1, specialattack, caught_since, pid) values('Pikachu', 'electric', 'Thunderbold', to_date('13-09-2000', 'DD-MM-YYYY'), 9);
insert into pokemon_caught(name, type1, specialattack, caught_since, pid) values('Sandslash', 'ground', 'Scorching Sands', to_date('23-10-2000', 'DD-MM-YYYY'), 9);
insert into pokemon_caught(name, type1, specialattack, caught_since, pid) values('Ninetales', 'fire', 'Solar Beam', to_date('07-12-2013', 'DD-MM-YYYY'), 9);
insert into pokemon_caught(name, type1, type2, specialattack, caught_since, pid) values('Magneton', 'electric', 'steel', 'Thunder Shock', to_date('17-10-2006', 'DD-MM-YYYY'), 2);
insert into pokemon_caught(name, type1, type2, specialattack, caught_since, pid) values('Muk', 'poison', 'dark', 'Sludge Bomb', to_date('12-11-2001', 'DD-MM-YYYY'), 2);
insert into pokemon_caught(name, type1, type2, specialattack, caught_since, pid) values('Gengar', 'ghost', 'poison', 'Shadow Ball', to_date('13-05-2007', 'DD-MM-YYYY'), 7);
insert into pokemon_caught(name, type1, type2, specialattack, caught_since, pid) values('Onix', 'rock', 'ground', 'Rock Slide', to_date('21-04-2008', 'DD-MM-YYYY'), 7);
insert into pokemon_caught(name, type1, type2, specialattack, caught_since, pid) values('Rhydon', 'ground', 'rock', 'Mud Slap', to_date('24-12-2010', 'DD-MM-YYYY'), 3);
insert into pokemon_caught(name, type1, type2, specialattack, caught_since, pid) values('Scyther', 'bug', 'flying', 'Aerial Strike', to_date('14-11-2011', 'DD-MM-YYYY'), 3);


insert into badge_gym(badge, gym#, gameid) values('Volcano Badge', 44, 0);
insert into badge_gym(badge, gym#, gameid) values('Marsh Badge', 40, 5);
insert into badge_gym(badge, gym#, gameid) values('Rainbow Badge', 25, 8);
insert into badge_gym(badge, gym#, gameid) values('Cascade Badge', 52, 8);
insert into badge_gym(badge, gym#, gameid) values('Boulder Badge', 60, 7);


insert into gymmaster_owns(pid, name, badge, owns_since) values(16, 'Gym Master Brock', 'Boulder Badge', to_date('13-01-2019', 'DD-MM-YYYY'));
insert into gymmaster_owns(pid, name, badge, owns_since) values(17, 'Gym Master Mist', 'Cascade Badge', to_date('10-03-2005', 'DD-MM-YYYY'));
insert into gymmaster_owns(pid, name, badge, owns_since) values(18, 'Gym Master Erika', 'Rainbow Badge', to_date('20-02-2000', 'DD-MM-YYYY'));
insert into gymmaster_owns(pid, name, badge, owns_since) values(19, 'Gym Master Sabrina', 'Marsh Badge', to_date('01-01-2001', 'DD-MM-YYYY'));
insert into gymmaster_owns(pid, name, badge, owns_since) values(20, 'Gym Master Blaine', 'Volcano Badge', to_date('13-11-2007', 'DD-MM-YYYY'));


insert into role_catchphrase(role, catch_phrase) values('Store Owner', 'Hey how can I help you?');
insert into role_catchphrase(role, catch_phrase) values('Nurse', 'What seems to be the problem?');
insert into role_catchphrase(role, catch_phrase) values('Cyclist', 'On your left!');
insert into role_catchphrase(role, catch_phrase) values('Walker', 'Hey slow down!');
insert into role_catchphrase(role, catch_phrase) values('Professor', 'Any new information for me today?');
insert into role_catchphrase(role, catch_phrase) values('Fisherman', 'Quiet down, the fish can hear you!');


insert into npc_livesin(pid, name, role, regionname) values(0, 'Store Owner Jim', 'Store Owner', 'Celestic City');
insert into npc_livesin(pid, name, role, regionname) values(10, 'Store Owner Bill', 'Store Owner', 'Mossdeep City');
insert into npc_livesin(pid, name, role, regionname) values(11, 'Nurse Jenny', 'Nurse', 'Pastoria City');
insert into npc_livesin(pid, name, role, regionname) values(12, 'Walker Jack', 'Walker', 'Pastoria City');
insert into npc_livesin(pid, name, role, regionname) values(13, 'Cyclist Tom', 'Cyclist', 'Hearthrome City');
insert into npc_livesin(pid, name, role, regionname) values(14, 'Professor Oak', 'Professor', 'Violet City');
insert into npc_livesin(pid, name, role, regionname) values(15, 'Fisherman Joe', 'Fisherman', 'Seven Island');
insert into npc_livesin(pid, name, role, regionname) values (16, 'Fisherman Joe', 'Fisherman', 'city');
insert into npc_livesin(pid, name, role, regionname) values (17, 'Fisherman Joe', 'Fisherman', 'testing');
insert into npc_livesin(pid, name, role, regionname) values (18, 'Fisherman Joe', 'Fisherman', 'Hearthrome City');
insert into npc_livesin(pid, name, role, regionname) values (19, 'Fisherman Joe', 'Fisherman', 'Celestic City');
insert into npc_livesin(pid, name, role, regionname) values (20, 'Fisherman Joe', 'Fisherman', 'Jubilife City');
insert into npc_livesin(pid, name, role, regionname) values (21, 'Fisherman Joe', 'Fisherman', 'Full Moon Island');
insert into npc_livesin(pid, name, role, regionname) values (22, 'Fisherman Joe', 'Fisherman', 'Twin Leaf Town');
insert into npc_livesin(pid, name, role, regionname) values (23, 'Fisherman Joe', 'Fisherman', 'Lilycove City');
insert into npc_livesin(pid, name, role, regionname) values (24, 'Fisherman Joe', 'Fisherman', 'Mossui Town');
insert into npc_livesin(pid, name, role, regionname) values (26, 'Fisherman Joe', 'Fisherman', 'Seafolk Village');
insert into npc_livesin(pid, name, role, regionname) values (25, 'Fisherman Joe', 'Fisherman', 'Nuvema Town');
insert into npc_livesin(pid, name, role, regionname) values (67, 'Fisherman Joe', 'Fisherman', 'Snowpoint City');
insert into npc_livesin(pid, name, role, regionname) values (68, 'Fisherman Joe', 'Fisherman', 'Undella Town');
insert into npc_livesin(pid, name, role, regionname) values (69, 'Fisherman Joe', 'Fisherman', 'Veilstone City');
insert into npc_livesin(pid, name, role, regionname) values (70, 'Fisherman Joe', 'Fisherman', 'White Forest');
insert into npc_livesin(pid, name, role, regionname) values (71, 'Fisherman Joe', 'Fisherman', 'Violet City');
insert into npc_livesin(pid, name, role, regionname) values (72, 'Fisherman Joe', 'Fisherman', 'Puzzle Village');
insert into npc_livesin(pid, name, role, regionname) values (73, 'Fisherman Joe', 'Fisherman', 'Serene Village');
insert into npc_livesin(pid, name, role, regionname) values (74, 'Fisherman Joe', 'Fisherman', 'Mossdeep City');
insert into npc_livesin(pid, name, role, regionname) values (75, 'Fisherman Joe', 'Fisherman', 'Rustboro City');
insert into npc_livesin(pid, name, role, regionname) values (76, 'Fisherman Joe', 'Fisherman', 'Safari Zone Gate');
insert into npc_livesin(pid, name, role, regionname) values (77, 'Fisherman Joe', 'Fisherman', 'Cinnabar Island');
insert into npc_livesin(pid, name, role, regionname) values (78, 'Fisherman Joe', 'Fisherman', 'Black City');
insert into npc_livesin(pid, name, role, regionname) values (79, 'Fisherman Joe', 'Fisherman', 'Cherrygrove City');
insert into npc_livesin(pid, name, role, regionname) values (80, 'Fisherman Joe', 'Fisherman', 'Accumula Town');
insert into npc_livesin(pid, name, role, regionname) values (81, 'Fisherman Joe', 'Fisherman', 'Blackthorn City');
insert into npc_livesin(pid, name, role, regionname) values (82, 'Fisherman Joe', 'Fisherman', 'Pastoria City');


insert into trainer(pid, name, fav_pokemon) values(9, 'Ash', 'Pikachu');
insert into trainer(pid, name, fav_pokemon) values(1, 'Arven', 'Vaporeon');
insert into trainer(pid, name, fav_pokemon) values(2, 'Greevil', 'Lunastone');
insert into trainer(pid, name, fav_pokemon) values(3, 'Archie', 'Scyther');
insert into trainer(pid, name, fav_pokemon) values(4, 'Barry', 'Electabuzz');
insert into trainer(pid, name, fav_pokemon) values(5, 'Green', 'Scizor');
insert into trainer(pid, name, fav_pokemon) values(6, 'Hilbert', 'Hitmonchan');
insert into trainer(pid, name, fav_pokemon) values(7, 'Hilda', 'Flareon');
insert into trainer(pid, name, fav_pokemon) values(8, 'Chase', 'Snorlax');


insert into difficulty_reward(difficulty, reward) values('Easy', '200 Poke Coins');
insert into difficulty_reward(difficulty, reward) values('Medium', '300 Poke Coins');
insert into difficulty_reward(difficulty, reward) values('Hard', '400 Poke Coins');
insert into difficulty_reward(difficulty, reward) values('Super Hard', '800 Poke Coins');
insert into difficulty_reward(difficulty, reward) values('Impossible', '2000 Poke Coins');


insert into quest_assigned(questid, difficulty, pid, date_accepted) values(1, 'Easy', 3, to_date('13-01-2020', 'DD-MM-YYYY'));
insert into quest_assigned(questid, difficulty, pid, date_accepted) values(2, 'Easy', 9, to_date('16-04-2021', 'DD-MM-YYYY'));
insert into quest_assigned(questid, difficulty, pid, date_accepted) values(3, 'Medium', 1, to_date('16-06-2021', 'DD-MM-YYYY'));
insert into quest_assigned(questid, difficulty, pid, date_accepted) values(4, 'Hard', 1, to_date('17-12-2019', 'DD-MM-YYYY'));
insert into quest_assigned(questid, difficulty, pid, date_accepted) values(5, 'Impossible', 6, to_date('26-04-2020', 'DD-MM-YYYY'));
