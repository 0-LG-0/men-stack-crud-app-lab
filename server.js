require('dotenv').config()
const express = require('express')
const app = express()
const Planet = require('./models/planet.js')
const methodOverride = require('method-override')

// Middlewares
require('./db/connections.js')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

// Routes

app.get('/test', (req, res) => {
    res.render('./test/test.ejs')
})

// Create: Implement the ability to add new entries to your database.
// Read: Display the data from your database on your application’s front end.
// Update: Allow users to modify existing data entries.
// Delete: Give users the ability to remove entries.

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/planets', async (req, res) => {
    try {
        const planets = await Planet.find()
        res.render('planets/find.ejs', { planets })
    } catch (error) {
        res.json({ err: error.message })
    }
})

app.get('/planets/new', (req, res) => {
    res.render('planets/new.ejs')
})

app.post('/planets', async (req, res) => {
    try {
        req.body.isHabitable = req.body.isHabitable === 'on' ? true : false
        await Planet.create(req.body) 
        res.redirect('/planets')
    } catch (error) {
        res.json({ err: error.name, err: error.message, err: error.stack })
    }
})

app.get('/planets/:id', async (req, res) => {
    try {
    const planet = await Planet.findById(req.params.id)
    if (!planet) {
        throw new Error(`Failed to find ${req.params.id}`)
    }
    res.render('planets/index.ejs', { 
        planet,
    })
    } catch (error) {
        res.json({ err: error.message })
    }
})

app.get('/planets/:id/edit', async (req, res) => {
    try {
        const planet = await Planet.findById(req.params.id)
        if (!planet) {
            throw new Error('Cannot find chosen planet')
        }
        res.render('planets/edit.ejs', { planet })
    } catch (error) {
        res.json({ err: error.message })
    }
})

app.put('/planets/:id', async (req, res) => {
    try {
        req.body.isHabitable = req.body.isHabitable === 'on'
        await Planet.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/planets/${req.params.id}`)
    } catch (error) {
        res.json({ err: error.message, err: error.stack })
    }
})

app.get('/planets/:id/delete', async (req, res) => {
    try {
        const planet = await Planet.findById(req.params.id)
        if (!planet) {
            throw new Error('Cannot find chosen planet')
        }
        res.render('planets/delete.ejs', { planet })
    } catch (error) {
        res.json({ err: error.message })
    }
})

app.delete('/planets/:id', async (req, res) => {
    try {
        await Planet.findByIdAndDelete(req.params.id) 
        res.redirect('/planets')
    } catch (error) {
        res.json({ err: error.message })
    }
})

app.listen(3000, () => {
    console.log('Running on 3000...')
})


