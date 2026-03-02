const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => console.log('MongoDB database connected', mongoose.connection.name))
mongoose.connection.on('error', (err) => console.log('MongoDB connection error', err.message))
