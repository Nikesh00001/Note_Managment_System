import express from "express";
import cors from "cors";
import connectDB from "./database.js";
import dotenv from "dotenv";
import courseRoutes from "./routes/courseRoutes.js";
import yearRoutes from "./routes/yearRouters.js";
import semesterRoutes from "./routes/semesterRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoute.js"
import path from "path";


dotenv.config();
connectDB();
const app =express();
app.use(cors());
app.use(express.json());


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api",authRoutes);


//courseRoute
app.use("/api/courses",courseRoutes);


// yearRoute
app.use("/api/year",yearRoutes);

//semesterRoute
app.use("/api/semester",semesterRoutes);


// subject
app.use("/api/subject",subjectRoutes);

// note
app.use("/api/note",noteRoutes);

app.get("/api",(req,res)=>{
 res.json({
    message : "hello from backend"
 });
});

app.listen(5000,()=>{
    console.log("server running at http://localhost:5000");
})