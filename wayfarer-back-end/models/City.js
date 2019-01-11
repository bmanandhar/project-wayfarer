const mongoose = require('mongoose')

const CitySchema = new mongoose.Schema({
	name: {
		type: String,
	},
	description: {
        type: String,
    },
    image: {
        type: String,
    }
})

const City = mongoose.model('City', CitySchema)

module.exports = City