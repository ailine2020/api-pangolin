const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pangolinSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: String,
    famille: String,
    race: String,
    nourriture: String,
    image: {
        type: String,
        default: "https://m.media-amazon.com/images/I/51F8phoVIyL._AC_SX425_.jpg",
    },
    friends: [{
        type: [Schema.Types.ObjectId],
        ref: "Pangolin"
    }]
});

const PangolinModel = mongoose.model("Pangolin", pangolinSchema);

module.exports = PangolinModel;