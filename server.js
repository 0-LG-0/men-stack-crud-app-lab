require('dotenv').config()
const express = require('express')
const app = express()
const Planet = require('./models/planet.js')

// Middlewares

// Routes
app.get('/test', (req, res) => {
    res.render('./test/test.ejs')
})

// Create: Implement the ability to add new entries to your database.
// Read: Display the data from your database on your application’s front end.
// Update: Allow users to modify existing data entries.
// Delete: Give users the ability to remove entries.

app.listen(3000, () => {
    console.log('Running on 3000...')
})


