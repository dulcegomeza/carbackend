const mongoose = require('mongoose');

const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        throw new Error('Error al iniciar la base de datos');
    }
}

module.exports = {dbConnection};