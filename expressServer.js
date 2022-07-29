import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 4000;
const pool = new pg.Pool({
    database: "ownerPets"
});

app.use(express.static("static"));
app.use(express.json());
app.use(cors());

const unknownHTTP = (req, res, next) => {
    res.sendStatus(404);
    next();
}

app.get('/api/pets', (req, res, next) =>{
    pool.query('SELECT * FROM pets').then((data) =>{
        res.send(data.rows);
    })
    .catch(next);
})

app.get('/api/owner', (req, res, next) =>{
    pool.query('SELECT * FROM owner').then((data) =>{
        res.send(data.rows);
    })
    .catch(next);
})

app.get('/api/pets/:id', (req, res, next) => {
    const { id } = req.params;
    pool.query('SELECT * FROM pets WHERE id = $1;', [id]).then((data) =>{
        let pet = data.rows[0]
        if(pet) {
            res.send(pet)
        };
    }).catch(next);
})

app.get('/api/owner/:id', (req, res, next) => {
    const { id } = req.params;
    pool.query('SELECT * FROM owner WHERE id = $1;', [id]).then((data) =>{
        let owner = data.rows[0];
        if (owner){
            res.send(owner);
        }
    }).catch(next);
})

app.delete('api/pets/:id', (req, res, next)=> {
    const { id } = req.params;
    pool.query("DELETE FROM pets WHERE id = $1 RETURNING *;", [id]). then((data) => {
        res.sendStatus(204);
    }).catch(next);
})

app.delete('api/owner/:id', (req, res, next)=> {
    const { id } = req.params;
    pool.query("DELETE FROM owner WHERE id = $1 RETURNING *;", [id]). then(() => {
        res.sendStatus(204);
    }).catch(next);
})

app.post('/api/pets', (req, res, next)=> {
    const newPet = req.body;
    newPet.age = Number(newPet.age);
    if (newPet.owner_id && newPet.type && newPet.name && newPet.age && newPet.colors){
        pool.query('INSERT INTO pets(owner_id, type, name, age, colors) VALUES ($1, $2, $3, $4, $5);', [newPet.owner_id, newPet.type, newPet.name, newPet.age, newPet.colors])
        .then((data) => {
            res.status(201).send(newPet)
        }).catch(next);
    } else {
        res.status(400).send('give correct format');
    }
})

app.post('/api/owner', (req, res, next)=> {
    const newOwner = req.body;
    newOwner.age = Number(newOwner.age);
    if (newOwner.name && newOwner.address && newOwner.phone_number && newOwner.married){
        pool.query('INSERT INTO owner(name, address, phone_number, married) VALUES ($1, $2, $3, $4);', [newOwner.name, newOwner.address, newOwner.phone_number, newOwner.married])
        .then((data) => {
            res.status(201).send(newOwner)
        }).catch(next);
    } else {
        res.sendStatus(400);
    }
})

app.patch("/api/pets/:id", (req, res, next) => {
    const { id } = req.params;
    const { owner_id, type, name, age, colors } = req.body;
    if (Number.isNaN(id)){
        res.sendStatus(400)
    }
    if (owner_id || type || name || age || colors) {
        pool.query("UPDATE pets SET owner_id = COALESCE ($1, owner_id), type = COALESCE ($2, type), name = COALESCE ($3, name), age = COALESCE ($4, age), colors = COALESCE ($5, colors);", [owner_id, type, name, age, colors])
        .then((data) => {
            if(data.rows.length === 0){
                res.sendStatus(404);
            } else {
                res.status(200).send(data.rows[0]);
            }
        }).catch(next);
    } else {
        res.sendStatus(400);
    }
})

app.patch("/api/owner/:id", (req, res, next) => {
    const { id } = req.params;
    const { name, address, phone_number, married } = req.body;
    if (Number.isNaN(id)){
        res.sendStatus(400)
    }
    if (name || address || phone_number || married) {
        pool.query("UPDATE owner SET name = COALESCE ($1, name), address = COALESCE ($2, address), phone_number = COALESCE ($3, phone_number), married = COALESCE ($4, married);", [name, address, phone_number, married])
        .then((data) => {
            if(data.rows.length === 0){
                res.sendStatus(404);
            } else {
                res.status(200).send(data.rows[0]);
            }
        }).catch(next);
    } else {
        res.sendStatus(400);
    }
})

app.use(unknownHTTP);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});

app.use((err, req, res, next) => {
    res.sendStatus(500)
})