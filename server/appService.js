// async function insertPokemon(pname, ptype1, ptype2, pspecialattack, pcaught_since, ppid, db) {
//     // const db = new dbConnection();
//     try {
//         // await db.connect(); // Connect to the database
//         const result = await db.executeQuery(
//             'INSERT INTO POKEMON_CAUGHT (name, type1, type2, specialattack, caught_since, pid) ' +
//             'values(:name, :type1, :type2, :specialattack, to_date(:caught_since, \'DD-MM-YYYY\'), :pid)',
//             [pname, ptype1, ptype2, pspecialattack, pcaught_since, ppid],
//             {autoCommit : true}
//         );
//         console.log("Pokemon inserted successfully");
//
//         // await db.executeQuery('COMMIT');
//
//         return result.rowsAffected && result.rowsAffected > 0;
//     } catch (error) {
//         console.error('Error inserting Pokemon:', error);
//         return false;
//     }
// }
//
// module.exports = {
//     insertPokemon,
// };
