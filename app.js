const express = require('express');
const app = express();

const PORT = 3000;

const db = require('./database/models');

app.use(express.json());

app.get('/', (req, res) => {

    console.log('users', db['User']);

    return res.send('Hello world');
});

app.post('/user', async (req, res) => {

    const { username, password } = req.body;
    
    const UserModel = db['User'];

    try {
        const newUser = await UserModel.create({
            username: username,
            password: password
        });
    
        return res.send(newUser);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

app.get('/user', async (req, res) => {
    const UserModel = db['User'];

    try {
        const users = await UserModel.findAll();
    
        return res.send(users);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const UserModel = db['User'];

    try {
        const user = await UserModel.findByPk(id);
    
        return res.send(user);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

app.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    const UserModel = db['User'];

    try {
        const User = await UserModel.findByPk(id);
        await User.destroy();
    
        return res.send('Usuário deletado com sucesso!');
    } catch (e) {
        return res.status(500).send(e.message);
    }
});



app.listen(PORT, () => console.log(`running on ${PORT}`));