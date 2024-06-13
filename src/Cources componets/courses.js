import React, { useState } from "react";
import {  List, ListItem, ListItemText, TextField } from "@material-ui/core";
import { Autocomplete, FormControl,InputLabel,Select } from "@mui/material";
import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { MenuItem } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import * as XLSX from 'xlsx';
import './CardInput.css'; // Import the CSS file

function CardInput() {

  const [quizDATE, setQuizDATE] = useState(null);
  const [quizzes, setQuizzes] = useState([
    { quiz_date: quizDATE, num_of_slots: 0, slot: "", course_codes: [] }
  ]);
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [Slot, setSlot] = useState([]);

  const courses = [
    { code: "MATH3BI", name: "Math III (BI)" },
    { code: "MATH5", name: "Discrete Mathematics" },
    { code: "CSEN704", name: "Advanced Computer lab (Sem7)" },
    { code: "CSEN1022", name: "Machine Learning" },
    { code: "CSEN301", name: "Data structures and Algorithms" },
    { code: "CSEN903", name: "Advanced Computer lab (Unity)" },
    { code: "DMET904", name: "Advanced Media Lab" },
    { code: "DMET901", name: "Computer Vision" },
    { code: "CSEN901", name: "Artificial Intelligence" },
    { code: "CSEN703", name: "Analysis and Design of Algorithms" },
    { code: "CSEN701", name: "Embedded Systems" },
    { code: "CSEN702", name: "Microprocessors" },
    { code: "CSEN605", name: "Digital System Design" },
    { code: "CSEN501", name: "Database I" },
    { code: "DMET501", name: "Introduction to Digital Media" },
    { code: "CSIS301", name: "Data Structures & Algorithms" },
    { code: "CSIS104", name: "CS1 Pharmacy" },
    { code: "CSIS105", name: "Introduction to Computer Science" },
    { code: "CSEN503", name: "Introduction To Communication Networks" },
    { code: "CSIS101", name: "Introduction to Computer Science I" },
    { code: "DMET502", name: "Computer Graphics" },
    { code: "CSEN909", name: "Human Computer Interaction" },
    { code: "BINF711", name: "Information Security (BI)" },
    { code: "CSEN933", name: "Artificial Intelligence (BI)" },
    { code: "DMET706", name: "Advanced Media Lab" },
    { code: "DMET703", name: "Video and Audio Technology" },
    { code: "DMET702", name: "Visualization and Animation" },
    { code: "DMET704", name: "Multimedia and Networking" },
    { code: "CSEN102", name: "Introduction to computer science" },
    { code: "CSIS102", name: "Introduction to Computer Science" },
    { code: "CSIS402", name: "Computer Organization and System Programming" },
    { code: "CSEN401", name: "Computer Programming Lab (Game)" },
    { code: "CSEN403", name: "Concepts of Programming Languages" },
    { code: "CSEN404", name: "Introduction to Networks (BI)" },
    { code: "CSEN601", name: "Computer Architecture" },
    { code: "DMET602", name: "Networks and Media Lab" },
    { code: "CSEN602", name: "Operating Systems" },
    { code: "CSEN603", name: "Software Engineering" },
    { code: "CSEN604", name: "Database II" },
    { code: "NETW1009", name: "Cloud Computing" },
    { code: "CSEN202", name: "CS2 Engineering" },
    { code: "CSIS202", name: "CS2 Management" }
];

  const [quizDate, setQuizDate] = useState(null);

  const handleQuizChange = (index, field, value, slotNumber = 1) => {
    const updatedQuizzes = [...quizzes]; //

    updatedQuizzes[index][field] = value;
    setQuizzes(updatedQuizzes);
    console.log(updatedQuizzes);
  };

  const handleAddQuiz = () => {
    setQuizzes([...quizzes, { quiz_date: null, num_of_slots: 0, slot: "", course_codes: [] }]);
  };
  const handleRemoveQuiz = (index) => {
    const updatedQuizzes = quizzes.filter((_, i) => i !== index);
    setQuizzes(updatedQuizzes);
  };
  const handleSubmit = () => {
    if (quizzes.some((quiz) => quiz.course_codes.length === 0)) {
      alert("Please enter  quizzes information");
      return;
    }
    setLoading(true);
    console.log(quizzes);
    axios
      .post("https://mostafasallam.pythonanywhere.com/process_data", {
        quizzes: quizzes.map((quiz) => ({
          ...quiz,
          quiz_date: dayjs(quiz.quiz_date).format("YYYY-MM-DD"), // Format the date
        })),
      })
      .then((response) => {
        setLoading(false);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="card-input">
      {quizzes.map((quiz, index) => (
        <div key={index} className="quiz-container">
          <div className="container1">
          <Autocomplete
          className="courses"
            multiple
            options={courses}
            getOptionLabel={(option) => `${option.code}: ${option.name}`}
            value={courses.filter((course) => quiz.course_codes.includes(course.code))}
            onChange={(event, newValue) => {
              if (newValue) {
                handleQuizChange(index, "course_codes", newValue.map((course) => course.code));
              } else {
                handleQuizChange(index, "course_codes", []);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Course Codes" variant="outlined" className="text-field" />
            )}
            isOptionEqualToValue={(option, value) =>
              option && value && option.code === value.code
            }
          />
          </div>
            <div className="container2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              required
              label="Quiz Date"
              format="YYYY-MM-DD"
              value={quiz.quiz_date}
              onChange={(newValue) => {
                handleQuizChange(index, "quiz_date", newValue);
              }}
              shouldDisableDate={(day) => day.day() === 5} // Disables Fridays
              className="date-picker"
            />
          </LocalizationProvider>
            
          <TextField
            type="number"
            label="Number of TAs"
            value={quiz.num_of_slots}
            onChange={(e) => {
              handleQuizChange(index, "num_of_slots", e.target.value);
              console.log(e.target.value);
            }}
            className="text-field"
            required
          />

          
<FormControl className="select-field">
      <InputLabel id="slot-label">Slot</InputLabel>
      <Select
        labelId="slot-label"
        value={quiz.slot}
        label="Slot"
        onChange={(e) => handleQuizChange(index, "slot", e.target.value)}
        required
      >
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="3">3</MenuItem>
        <MenuItem value="4">4</MenuItem>
        <MenuItem value="5">5</MenuItem>
      </Select>
    </FormControl>

          

          <Button onClick={() => handleRemoveQuiz(index)} className="button">Remove Quiz</Button>
          </div>
        </div>
      ))}

      <Button onClick={handleAddQuiz} className="button">Add Quiz</Button>

      {loading ? (
        <CircularProgress className="button" />
      ) : (
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          className="button"
        >
          Submit
        </Button>
      )}

      {Data && <ScheduleTable data={Data} />}
    </div>
  );
}

export default CardInput;

function ScheduleTable({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return <h2>Please enter data first</h2>;
  }
  console.log(data);
  const freeSchedule = data.free_schedule;

  function generateExcel(data, fileName) {
    const wb = XLSX.utils.book_new();

    const bestScheduleData = [];
    for (let slot in data.best_schedule) {
      const sheetData = data.best_schedule[slot].map((name, index) => ({ Slot: slot, Index: index + 1, Name: name }));
      bestScheduleData.push(...sheetData);
    }
    const bestScheduleWS = XLSX.utils.json_to_sheet(bestScheduleData);
    XLSX.utils.book_append_sheet(wb, bestScheduleWS, 'Best Schedule');
    // Check if data.free_schedule is an object
    if (typeof data.free_schedule === 'object') {
      // Transform the data directly
      const freeScheduleData = Object.entries(data.free_schedule).map(([slot, tas]) => ({
        Slot: slot,
        TA_Name: tas.join(', ')
      }));

      // Create the Excel sheets
      const freeScheduleWS = XLSX.utils.json_to_sheet(freeScheduleData);

      // Append the sheet to the workbook
      XLSX.utils.book_append_sheet(wb, freeScheduleWS, 'Free Schedule');
    } else {
      console.error('data.free_schedule is not an object.');
    }

    const initialProctoringData = [];
    for (let dateSlot in data.initial_proctoring) {
      const [slot, date] = dateSlot.split(' ');
      const exams = data.initial_proctoring[dateSlot].map(([course, proctors]) => ({
        Slot: slot,
        Date: date,
        Course: course,
        Proctors: proctors.join(', ')
      }));
      initialProctoringData.push(...exams);
    }
    const initialProctoringWS = XLSX.utils.json_to_sheet(initialProctoringData);
    XLSX.utils.book_append_sheet(wb, initialProctoringWS, 'Initial Proctoring');

    XLSX.writeFile(wb, fileName + '.xlsx');
  }

  const handleExport = () => {
    console.log(data.best_schedule);
    console.log(data.initial_proctoring);
    console.log(freeSchedule);
    generateExcel(data, 'Schedule');
  };

  return (
    <div className="table-container">
      <Button 
        onClick={handleExport}
        className="export-button"
      >
        Export to XLSX
      </Button>

      <div>
        <h2 className="table-header">Best Schedule</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Day/Time Slot</TableCell>
                <TableCell>TAs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(data.best_schedule).map((daySlot) => (
                <TableRow key={daySlot}>
                  <TableCell>{daySlot}</TableCell>
                  <TableCell>
                    <Table>
                      <TableBody>
                        {data.best_schedule[daySlot].map((student, index) => (
                          <TableRow key={index}>
                            <TableCell>{student}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div>
        <h2 className="table-header">Free Schedule</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Day/Time Slot</TableCell>
                <TableCell>TA Name</TableCell>
                <TableCell>TA Courses</TableCell>
                <TableCell>TA Day Off</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(freeSchedule).map((slot) => (
                <TableRow key={slot}>
                  <TableCell>{slot}</TableCell>
                  <TableCell>
                    <TableCell>
                      <Table>
                        <TableBody>
                          {freeSchedule[slot].map((name, index) => (
                            <TableRow key={index}><TableCell>{name}</TableCell></TableRow >
                          ))}
                        </TableBody>
                      </Table>

                    </TableCell>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div>
        <h2 className="table-header">Initial Proctoring</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date/Time Slot</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>TAs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(data.initial_proctoring).map((dateTime) => (
                <TableRow key={dateTime}>
                  <TableCell>{dateTime}</TableCell>
                  <TableCell>
                    {data.initial_proctoring[dateTime][0][0]}
                  </TableCell>
                  <TableCell>
                    <Table>
                      <TableBody>
                        {data.initial_proctoring[dateTime][0][1].map((ta, index) => (
                          <TableRow key={index}>
                            <TableCell>{ta}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
