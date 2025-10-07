import React, { useEffect, useState } from "react";
import {
  getCourses,
  getYears,
  getSemesters,
  getSubjects,
  addCourse,
  addYear,
  addSemester,
  addSubject,
  addNote,
} from "../api/noteApi";

const AddNotes = () => {
  const [courses, setCourses] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState({ title: "", file: null, type: "" });

  const [selectedCourses, setSelectedCourses] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [selectedYears, setSelectedYears] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const [showAdd, setShowAdd] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputform, setInputForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const[uploading,setUploading]=useState(false);

  const handlechange = (e) => {
    const { name, value, files } = e.target;
    setNotes((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  useEffect(() => {
    fetchcourses();
  }, []);

  const fetchcourses = async () => {
    const res = await getCourses();
    setCourses(res.data);
  };

  const fetchYears = async (courseId) => {
    if (!courseId) return;
    const res = await getYears(courseId);
    setYears(res.data);
  };

  const fetchSemester = async (yearId) => {
    const res = await getSemesters(yearId);
    setSemesters(res.data);
  };

  const fetchSubject = async (semesterId) => {
    const res = await getSubjects(semesterId);
    setSubjects(res.data);
  };

  const handleNote = async (e) => {
    setUploading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", notes.title);
    formData.append("file", notes.file);
    formData.append("type", notes.type);
    await addNote(selectedSubject,formData);
    setUploading(false);
  };

  const handleAdd = async (type) => {
    if (type === "course") {
      const res = await addCourse({ name: inputValue, code: courseCode });
      setCourses([...courses, res.data]);
    } else if (type === "years") {
      const res = await addYear(selectedCourses,{ name: inputValue });
      setYears([...years, res.data]);
    } else if (type === "semester") {
      const res = await addSemester(selectedYears,{ name: inputValue });
      setSemesters([...semesters, res.data]);
    } else if (type === "subject") {
      const res = await addSubject(selectedSemester,{ name: inputValue });
      setSubjects([...subjects, res.data]);
    }

    setCourseCode("");
    setInputValue("");
    setShowAdd(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 border-b pb-4">
          Add Notes
        </h1>

        <div className="space-y-8">
          {/* Dropdowns */}
          {[
            {
              label: "Course",
              value: selectedCourses,
              setValue: (val) => {
                setSelectedCourses(val);
                fetchYears(val);
                setShowAdd("");
              },
              options: courses,
              addType: "course",
              extraField: (
                <input
                  type="text"
                  placeholder="Course Code"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 focus:ring-2 focus:ring-indigo-500"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                />
              ),
            },
            {
              label: "Year",
              value: selectedYears,
              setValue: (val) => {
                setSelectedYears(val);
                fetchSemester(val);
                setShowAdd("");
              },
              options: years,
              addType: "years",
            },
            {
              label: "Semester",
              value: selectedSemester,
              setValue: (val) => {
                setSelectedSemester(val);
                fetchSubject(val);
                setShowAdd("");
              },
              options: semesters,
              addType: "semester",
            },
            {
              label: "Subject",
              value: selectedSubject,
              setValue: (val) => {
                setSelectedSubject(val);
                setInputForm(true);
                setShowAdd("");
              },
              options: subjects,
              addType: "subject",
            },
          ].map((dropdown, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {dropdown.label}
              </label>
              <div className="space-y-3">
                <select
                  value={dropdown.value}
                  className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-700 focus:ring-2 focus:ring-indigo-500 transition"
                  onChange={(e) => dropdown.setValue(e.target.value)}
                >
                  <option value="">Select {dropdown.label}</option>
                  {dropdown.options.map((opt) => (
                    <option key={opt._id} value={opt._id}>
                      {opt.name}
                    </option>
                  ))}
                </select>

                {showAdd === dropdown.addType ? (
                  <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 space-y-3">
                    <input
                      type="text"
                      placeholder={`New ${dropdown.addType}`}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    {dropdown.extraField && dropdown.extraField}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAdd(dropdown.addType)}
                        className="flex-1 bg-indigo-600 text-white py-2 rounded-lg shadow hover:bg-indigo-700 transition"
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={() => setShowAdd("")}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg shadow hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAdd(dropdown.addType)}
                    className="text-indigo-600 text-sm font-medium hover:underline"
                  >
                    + Add {dropdown.label}
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Note Form */}
          {inputform && (
            <form onSubmit={handleNote} className="pt-6 border-t space-y-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Note Details
              </h2>
              <input
                type="text"
                name="title"
                placeholder="Enter Note Title"
                value={notes.title}
                onChange={handlechange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              />

              <select
                value={notes.type}
                onChange={handlechange}
                name="type"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Note Type</option>
                <option value="note">Note</option>
                <option value="question-paper">Question Paper</option>
                <option value="book">Book PDF</option>
                <option value="assignment">Assignment</option>
                <option value="lab-report">Lab Report</option>
                <option value="syllabus">Syllabus</option>
                <option value="presentation">Presentation (PPT)</option>
                <option value="project">Project / Mini Project</option>
                <option value="reference">Reference Material</option>
                <option value="solution">Solutions / Answer Key</option>
                <option value="other">Other</option>
              </select>

              <input
                type="file"
                name="file"
                onChange={handlechange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
              />

              <button
  type="submit"
  disabled={uploading}
  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
>
  {uploading ? (
    <>
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      Uploading...
    </>
  ) : (
    "Save"
  )}
</button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNotes;
