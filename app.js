const express = require('express');
const passport = require('passport');
const app = express();
const port = 3000;
const pool = require('../users_api/db');

// add websocket
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('Appli lancée!');
});

// connection to the db
pool.connect();

app.route("/login")

    .post( passport.authenticate("local", {failureRedirect: "/login"}), (req, res) => {
    let params = req.body;
    pool.query("SELECT * FROM users WHERE email = $1 AND password = $2", [params.email, params.password], (err, result) => {
        if (err) {
            res.send(err);
        } else {     
            if (result.rows) {
                io.on("connection", (socket) => {
                    socket.emit("connected");
                })
                res.send(result.rows);
            } else {
                res.send('Aucun utilisateur trouvé avec cet identifiant ou ce mot de passe.')
            }
        }
    })
})

app.post("/register", (req, res) => {
    let params = re.body
})

app.get("/logout", (req, res) => {

    res.redirect("/login");
})

//routes
app.route("/user/:id")

    .get( (req, res) => {
        let id = parseInt(req.params.id);
        console.log(req.user);
        pool.query("SELECT (firstname, lastname, email, photo) FROM users WHERE id = $1", [id], (err, result) => {
            if(err) {
                console.log(err);
                res.send(err);
                pool.end;
            } else {
            
                res.json(result.rows);
                pool.end;
            }
        });
    })

    .put( (req, res) => {
        let id = parseInt(req.params.id);
        let user = req.body;
        const updateQuery = {
            text: "UPDATE users SET firstname = $1, lastname = $2, email = $3 WHERE id = $4",
            values: [user.firstname, user.lastname, user.email, id]
        }
        pool.query(updateQuery, (err, result) => {
            if(err) {
                throw err;
                pool.end;
            } else {
                res.status(200).send('Modifications apportées avec succès!');
                pool.end;
            }
        })
    })

    .delete( (req, res) => {
        let id = parseInt(req.params.id);
        const deleteQuery = "DELETE FROM users WHERE id = $1";

        pool.query(deleteQuery, [id], (err, result) => {
            if(err) {
                throw err;
            } else {
                res.status(200).send("Utilisateur supprimé");
            }
        })
    })

//handle connection's events
io.on("connection", (socket) => {
    let id;
    //if user is connected
    socket.on("connected", function(id) {
       id = parseInt(id);
        pool.query("UPDATE users SET status = 'En ligne' WHERE id = $1", [id], (err, result) => {
            if(err) {
                console.log(err);
                throw err;
            }
        })
    })

    //if user is disconnected
    socket.on("disconnected", function(id) {
        id = parseInt(id);
        pool.query("UPDATE users SET status = 'Hors ligne' WHERE id = $1", [id], (err, result) => {
            if(err) {
                console.log(err);
                throw err;
            }
        })
    })
  });



