const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('error', (err) => console.log('MongoDB connection error', err.message))
mongoose.connection.on('connected', () => console.log('MongoDB database connected', mongoose.connection.name))