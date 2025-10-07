import Course from "../models/course.js"


export const createCourse = async (req ,res)=>{
    try{
        const course =new Course(req.body);
        await course.save();
        res.status(201).json(course);
    }catch(err){
        res.status(400).json({error : err.message});
    }
};


export const getCourse = async (req, res)=>{
    try{
        const courses = await Course.find();
        res.json(courses);
    }catch(err){
        res.status(500).json({error:err.message})
    }




}