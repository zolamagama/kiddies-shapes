const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
//const waiterFactory = require('./waiter');
//const routeFactory = require('./waiter-routes')
const pg = require("pg");
const Pool = pg.Pool;

const _ = require('lodash')

const kiddiesShapes = require('./kiddies')

const app = express();

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/kiddies';

const pool = new Pool({
    connectionString
});

//const waiter = waiterFactory(pool);
//const routesInstance = routeFactory(waiter)

app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: "fcsss",
    resave: false,
    saveUninitialized: true
}))
// initialise the flash middleware
app.use(flash());

const kiddies = kiddiesShapes(pool)


app.get('/', async function (req, res) {

    res.render('index')
});

app.post('/', async function (req, res) {
    const player = _.capitalize(req.body.player)

    await kiddies.insert(player)

    res.render('bouncing', {
        player
    })
});

app.get("/add", async function (req, res) {

    res.render("add")

});


app.post('/add', async function (req, res) {

    let shapeName = _.capitalize(req.body.shape);
    let qty = req.body.qty

    if (shapeName && qty !== "") {

        await kiddies.addShape(shapeName, qty)
    }

    res.render('add')

});

app.get('/api/shapes', async function () {



    const shapes = await kiddies.allShapes()

    res.json({
        data: shapes
    })

});


app.post('/api/show', async function () {

    let shapeName = _.capitalize(req.body.shape);
    let qty = req.body.qty

    if (shapeName && qty !== "") {

        try {

            const shapeExists = await kiddies.exists(shapeName)

            if (!shapeExists) {
                await kiddies.addShape(shapeName, qty)
                console.log('added');
                return res.json({
                    message: "Showed a " + shapeName
                })
            }
            else {
                await kiddies.incrementQtyByShapeName(shapeName);
                return res.json({
                    message: "Updated " + shapeName
                });
            }


        } catch (err) {
            console.log(err);
            return res.json({
                message: err
            })
        }

    }

    return res.json({
        message: "no shape name or qty"
    });


});



const PORT = process.env.PORT || 6767;

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});