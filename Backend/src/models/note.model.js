const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
})

const noteModel=mongoose.model("notes", noteSchema);
// notes ka data "notes" collection me store hoga

module.exports=noteModel;