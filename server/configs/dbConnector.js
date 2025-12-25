const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose
        .connect('mongodb://localhost:27017/factoryDB')
        .then(() => console.log('Connected to factoryDB'))
        .catch(console.log);
}

module.exports = connectToDB;