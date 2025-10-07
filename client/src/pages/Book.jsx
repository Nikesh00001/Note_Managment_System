import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Book = () => {
  const [courses, setCourses] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemester] = useState([]);
  const [subjects, setSubject] = useState([]);
  const [notes, setNote] = useState([]);

  const [showAdd, setShowAdd] = useState("courses");
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:5000/api/courses/courses");
    setCourses(res.data);
  };

  const fetchYear = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/year/${id}/years`);
    setYears(res.data);
  };

  const fetchSemester = async (id) => {
    const res = await axios.get(
      `http://localhost:5000/api/semester/${id}/semesters`
    );
    setSemester(res.data);
  };

  const fetchSubject = async (id) => {
    const res = await axios.get(
      `http://localhost:5000/api/subject/${id}/subjects`
    );
    setSubject(res.data);
  };

  const fetchNote = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/note/${id}/notes`);
    setNote(res.data);
    setSelectedSubjectId(id);
  };

  const handleclick = (id, name) => {
    if (name === "courses") {
      fetchYear(id);
      setShowAdd("Years");
    } else if (name === "Years") {
      fetchSemester(id);
      setShowAdd("Semesters");
    } else if (name === "Semesters") {
      fetchSubject(id);
      setShowAdd("Subjects");
    }
  };
  const handlearrow =()=>{
    if(showAdd==="Subjects"){
    setShowAdd("Semesters");
    setNote([]);
      
    }
    else if(showAdd==="Semesters"){
      setShowAdd("Years");
    }
    else if(showAdd==="Years"){
      setShowAdd("courses");
    }

  }

  return (
    <div className="w-screen flex flex-col items-center bg-gray-100 pt-12 min-h-screen">
      {showAdd==="courses"?'':<div className="fixed left-24 top-14 text-3xl text-blue-400" onClick={handlearrow}><FaArrowAltCircleLeft /></div>}
      <h2 className="bg-indigo-500 text-white px-6 py-2 rounded-lg text-xl mb-8 shadow">
        Select your {showAdd}
      </h2>

      {/* COURSES */}
      {showAdd === "courses" && (
        <div className="grid grid-cols-1 gap-4">
          {courses.map((course) => (
            <div
              key={course._id}
              onClick={() => handleclick(course._id, "courses")}
              className="w-[20rem] cursor-pointer font-semibold text-lg text-white mb-4 flex justify-center items-center h-[4rem] rounded-lg bg-green-600 hover:bg-green-700 transition"
            >
              {course.name}
            </div>
          ))}
        </div>
      )}

      {/* YEARS */}
      {showAdd === "Years" && (
        <div className="grid grid-cols-1 gap-4">
          {years.map((year) => (
            <div
              key={year._id}
              onClick={() => handleclick(year._id, showAdd)}
              className="w-[20rem] cursor-pointer font-semibold text-lg text-white mb-4 flex justify-center items-center h-[4rem] rounded-lg bg-purple-600 hover:bg-purple-700 transition"
            >
              {year.name}
            </div>
          ))}
        </div>
      )}

      {/* SEMESTERS */}
      {showAdd === "Semesters" && (
        <div className="grid grid-cols-1 gap-4">
          {semesters.map((semester) => (
            <div
              key={semester._id}
              onClick={() => handleclick(semester._id, showAdd)}
              className="w-[20rem] cursor-pointer font-semibold text-lg text-white mb-4 flex justify-center items-center h-[4rem] rounded-lg bg-blue-600 hover:bg-blue-700 transition"
            >
              {semester.name}
            </div>
          ))}
        </div>
      )}

      {/* SUBJECTS + NOTES (Side by side) */}
      {showAdd === "Subjects" && (
        <div className="flex gap-6 w-[80%]">
          {/* LEFT: Subjects */}
          <div className="w-1/2 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4 border-b pb-2">
              Subjects List
            </h3>
            {subjects.map((sub) => (
              <div
                key={sub._id}
                onClick={() => fetchNote(sub._id)}
                className={`cursor-pointer p-3 mb-3 rounded-lg text-center font-medium ${
                  selectedSubjectId === sub._id
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {sub.name}
              </div>
            ))}
          </div>

          {/* RIGHT: Notes */}
          <div className="w-1/2 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4 border-b pb-2">
              Notes for Selected Subject
            </h3>
            {notes.length > 0 ? (
              notes.map((note) => (
                <div
                  key={note._id}
                  className="p-3 mb-3 border rounded-lg flex justify-between items-center"
                >
                  <span className="font-medium">{note.title}</span>
                  
                  {note.fileUrl?
                    <a
                    href={note.fileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Download
                  </a>:
                  <p className="text-red-700 w-full flex justify-center">Technical issues... note not found!</p>
                  }
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">
                Select a subject to see its notes
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
