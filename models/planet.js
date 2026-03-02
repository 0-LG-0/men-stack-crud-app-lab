const mongoose = require('mongoose')

const planetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isHabitable: Boolean , 
  color: { type: String, required: true },
  image: { type: String },
  description: { type: String},
})

const Planet = mongoose.model("Planet", planetSchema)
module.exports = Planet
