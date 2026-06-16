// server ko create krna 
const express = require("express");
const noteModel = require("./models/note.model");

const app=express();
app.use(express.json()); // middleware to parse incoming JSON data

/**
 * POST api/notes
 * create new note and save data to DB
 * req.body-{title,description}
 */
app.post("/api/notes",async(req,res)=>{
    const{title,description}=req.body;

    // to store data in DB we will use noteModel.create() method
    const note= await noteModel.create({title,description})

    res.status(201).json({
        message:"note created successfully",
        note
    })  

})

/**
 * GET api/notes
 * get all notes from DB and send them as response
 */
app.get("/api/notes",async(req,res)=>{
    const notes=await noteModel.find()
    // .find() - returns data in form of array of objects

    res.status(200).json({
        message:"notes retrieved successfully",
        notes
    })
})

/**
 * DELETE api/notes/:id
 * delete a note from DB based on id
 * req.params.id - id of note to be deleted
 */
app.delete("/api/notes/:id",async(req,res)=>{
    const id=req.params.id;

    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message:`note with id ${id} deleted successfully`
    })
})

/**
 * PATCH api/notes/:id
 * update a note in DB based on id
 * req.body = {description} - new description to be updated
 */
app.patch("/api/notes/:id",async(req,res)=>{
    const id=req.params.id;
    const {description}=req.body;

    await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message:`Note with id ${id} updated successfully`
    })

})

module.exports=app;