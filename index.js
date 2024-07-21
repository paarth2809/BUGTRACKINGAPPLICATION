const express = require('express');
const mongoose = require('mongoose');
const port_configs = require('./configs/port.configs');
const db_configs = require('./configs/db.configs');
const bcrypt = require('bcryptjs');
const user_model = require('./models/user.models');

const app = express();
app.use(express.json());

require('./routes/user.routes')(app);
require('./routes/bug.route')(app);

app.listen(port_configs.PORT, () => {
    console.log(`Server has started on port ${port_configs.PORT}`);
});

mongoose.connect(db_configs.db_url);
const db = mongoose.connection;

db.once('open', () => {
    console.log('MongoDB connection established');
    init();
});
db.on('error', () => {
    console.log('Failed to establish connection with MongoDB');
});

async function init() {
    try {
        const user = await user_model.find({ userType: 'ADMIN' });

        if (user.length > 0) {
            console.log('ADMIN already exists');
        } else {
            const admin = {
                name: 'admin',
                userType: 'ADMIN',
                password: bcrypt.hashSync('qwer4321', 8)
            };
            await user_model.create(admin);
            console.log('Admin created');
        }
    } catch (err) {
        console.error('Error while creating admin:', err);
    }
}
