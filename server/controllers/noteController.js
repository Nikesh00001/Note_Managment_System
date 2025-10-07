import Note from "../models/note.js";
import Subject from "../models/subject.js";

export const createNote = async (req, res) => {
    try {
        const subjectId =req.params.subjectId;
        const {title,type} =req.body;
        if(!req.file){
            return res.status(400).json({error:"file is required"});
        }
        const note = new Note({
            title,
            file:req.file.filename,
            type,
            subject:subjectId});
        await note.save();
        await Subject.findByIdAndUpdate(subjectId,{$push:{notes:note._id}});
        res.status(201).json({
            ...note.toObject(),
            fileUrl:`http://localhost:5000/uploads/${note.file}`
        });
    }
    catch (err) {
        console.error("error creating note:",err);
        res.status(500).json({ error: err.message });

    }
}
export const getNote = async (req, res) => {
    try {
        const {subjectId}=req.params;
        const notes = await Note.find({subject:subjectId});

        const noteWithUrl =notes.map(note=>({
            ...note.toObject(),
            fileUrl:note.file?`http://localhost:5000/uploads/${note.file}`:null
        }))


        res.json(noteWithUrl);
    }
    catch(err){

        res.status(500).json({error:err.message});

    }
}
