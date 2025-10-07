import multer from "multer";
import path from "path";



const storage = multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,"uploads/");
    },
    filename:(req,file,cd)=>{
        cd(null,Date.now()+path.extname(file.originalname));
    },
});

const upload=multer({
    storage,
    limits:{fileSize:15*1024*1024},
    fileFilter:(req,file,cd)=>{
        const allowedTypes=[
             "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ];
    if(allowedTypes.includes(file.mimetype)){
        cd(null,true);

    }else{
        cd(new Error("only PDF,WORD and ppt files are allowed..."),false);
    }
    }
});
export default upload;