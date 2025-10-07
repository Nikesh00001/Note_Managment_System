import api from "./api";

export const getCourses =()=>api.get("/courses/courses");
export const addCourse =(data)=>api.post("/courses/courses",data);

export const getYears =(courseId)=>api.get(`/year/${courseId}/years`);
export const addYear =(courseId,data)=>api.post(`/year/${courseId}/years`,data);


export const getSemesters =(yearId)=>api.get(`/semester/${yearId}/semesters`);
export const addSemester =(yearId,data)=>api.post(`/semester/${yearId}/semesters`,data);


export const getSubjects =(semesterId)=>api.get(`/subject/${semesterId}/subjects`);
export const addSubject =(semesterId,data)=>api.post(`/subject/${semesterId}/subjects`,data);

export const getNotes =(subjectId)=>api.get(`/note/${subjectId}/notes`);
export const addNote=(selectedSubject,formData)=>api.post(`/note/${selectedSubject}/notes`,formData,{
    headers:{"Content-Type":"multipart/form-data"}
});

