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
        default: "https://www.sauvonslaforet.org/uploads/photos/article/wide/xl/baby-pangolin-interpoliert.jpg",
    },
    friends: [{
        type: [Schema.Types.ObjectId],
        ref: "Pangolin"
    }]
});

const PangolinModel = mongoose.model("Pangolin", pangolinSchema);

module.exports = PangolinModel;