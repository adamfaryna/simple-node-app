const mongoose = require("mongoose")

const { Schema } = mongoose
const { Mixed } = Schema.Types

const carsSchema = new Schema({
    name: String,
    brand: String,
    type: String    
})

const Model = mongoose.model("Car", carsSchema)

module.exports = Model