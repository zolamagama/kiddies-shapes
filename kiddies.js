
module.exports = function (pool) {

    async function insert(name) {

        const playerInfo = await pool.query('insert into player_info (player_name) values ($1)', [name])
        return playerInfo.rows
    }

    async function addShape(name, counter) {
        const shapeName = await pool.query('insert into shapes (shape_name, shape_counter) values ($1, $2)', [name, counter])
        return shapeName.rows
    }

    async function incrementQtyByShapeName(name) {
        pool.query("update shapes set counter = counter + 1 where name = $1", [name]);
    }

    async function exists(name) {
        const result = await pool.query("select count(*) from shapes where name = $1 ", [name]);
        return result.rows[0].count > 0;
    }

    async function allShapes() {
        const list = await pool.query('select * from shapes')
        return list.rows
    }






    return {
        insert,
        addShape,
        incrementQtyByShapeName,
        exists,
        allShapes
    }

}