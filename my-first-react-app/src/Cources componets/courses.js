import React, { useState } from "react";
import { List, ListItem, ListItemText, TextField } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
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


function CardInput() {
  const [slotNumber, setSlotNumber] = useState(1);
  const [quizDate, setQuizDate] = useState(null); // Initialize quizDate state
  const [courseCodes, setCourseCodes] = useState([]); // Update to array state
  const [numOfSlots, setNumOfSlots] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [Data, setData] = useState([]); // State for data from API

  const courses = [
    { code: "MATH3BI", name: "Mathematics III (BI)" },
    { code: "MATH5", name: "Mathematics V" },
    { code: "CSEN1022", name: "Computer Programming for Engineers" },
    { code: "CSEN301", name: "Data Structures and Algorithms" },
    { code: "CSEN903", name: "Advanced Algorithms" },
    { code: "DMET904", name: "Digital Image Processing" },
    { code: "DMET901", name: "Computer Vision" },
    { code: "CSEN901", name: "Artificial Intelligence" },
    { code: "CSEN703", name: "Systems Analysis and Design" },
    { code: "CSEN701", name: "Embedded Systems" },
    { code: "CSEN702", name: "Microprocessors" },
    { code: "CSEN605", name: "Digital System Design" },
    { code: "CSEN501", name: "Software Engineering" },
    { code: "DMET501", name: "Introduction to Media Technology" },
    { code: "CSIS301", name: "Information Security" },
    { code: "CSIS104", name: "Introduction to Pharmacy Informatics" },
    { code: "CSIS105", name: "Computer Ethics" },
    { code: "CSEN503", name: "Computer Networks" },
    { code: "CSIS101", name: "Introduction to Computer Science" },
    { code: "DMET502", name: "Computer Graphics" },
    { code: "CSEN909", name: "Selected Topics in Computer Engineering" },
    { code: "BINF711", name: "Bioinformatics" },
    { code: "CSEN933", name: "Advanced Topics in Computer Engineering" },
    { code: "DMET706", name: "Multimedia Systems" },
    { code: "DMET703", name: "Human-Computer Interaction" },
    { code: "DMET702", name: "Computer Animation" },
    { code: "DMET704", name: "Virtual Reality" },
    { code: "CSEN102", name: "Introduction to Computer Science" },
    { code: "CSIS102", name: "Introduction to Information Technology" },
    { code: "CSIS402", name: "Introduction to Network Security" },
    { code: "CSEN401", name: "Computer Architecture" },
    { code: "CSEN403", name: "Operating Systems" },
    { code: "CSEN404", name: "Introduction to Networks" },
    { code: "CSEN601", name: "Computer Architecture" },
    { code: "DMET602", name: "Networks and Media Lab" },
    { code: "CSEN602", name: "Operating Systems" },
    { code: "CSEN603", name: "Software Engineering" },
    { code: "CSEN604", name: "Database Systems II" },
    { code: "NETW1009", name: "Cloud Computing" },
    { code: "CSEN202", name: "Introduction to Computer Science II" },
    { code: "CSIS202", name: "Introduction to Information Technology II" },
  ];

  const handleSubmit = () => {
    if (!quizDate ||  courseCodes.length === 0 || !numOfSlots) {
      alert("Please fill all fields");
      return;
    }
    console.log(quizDate.format("YYYY-MM-DD"));
    console.log(quizDate.format("ddd"));
    console.log(slotNumber);
    setLoading(true); // Set loading to true when API request is made
    axios
      .post("http://127.0.0.1:4000/process_data", {
        slot_name: (quizDate.format("ddd") + "" + slotNumber).toUpperCase(),
        quiz_date: quizDate.format("YYYY-MM-DD"),
        course_code: courseCodes,
        num_of_slots: 20,
      })
      .then((response) => {
        setLoading(false); // Set loading to false when API request is complete
        setData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      className="card-input"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        paddingRight: "10%",
        marginBottom: "20px",
      }}
    >
       <Autocomplete
        multiple  // Allow multiple selections
        options={courses}
        getOptionLabel={(option) => `${option.code}: ${option.name}`}
        value={courses.filter((course) => courseCodes.includes(course.code))}
        onChange={(event, newValue) => {
          if (newValue) {
            setCourseCodes(newValue.map((course) => course.code));
          } else {
            setCourseCodes([]);
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Course Codes" variant="outlined" />
        )}
        isOptionEqualToValue={(option, value) =>
          option && value && option.code === value.code
        }
        style={{ width: "100%", marginBottom: "2%" }}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          required
          label="QuizDate"
          value={quizDate}
          onChange={(newValue) => setQuizDate(newValue)}
        />
      </LocalizationProvider>
      <TextField
        type="number"
        label="Number of TAs"
        value={numOfSlots}
        onChange={(e) => setNumOfSlots(e.target.value)}
        style={{ width: "100%", marginBottom: "2%" }}
        required
      />
      <Select
        labelId="num-of-slots-label"
        id="num-of-slots-select"
        value={slotNumber}
        onChange={(e) => setSlotNumber(e.target.value)}
        label="slotNumber"
        style={{ width: "100%", marginBottom: "2%" }}
        required
      >
        {[1, 2, 3, 4, 5].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>

      {loading ? (
        <CircularProgress style={{ marginBottom: "2%" }} /> // Display loading indicator if loading is true
      ) : (
        <Button
          onClick={handleSubmit}
          style={{ width: "100%", marginBottom: "2%" }}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      )}
      {Data && <ScheduleTable data={Data} />}
      {/* export data into excel */}
    </div>
  );
}

export default CardInput;
function ScheduleTable({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return <h2>Please enter data first</h2>;
  }
  
  const freeSchedule = JSON.parse(data.free_schedule);
  function generateExcel(data, fileName) {
    const wb = XLSX.utils.book_new();
  
    // Parse best_schedule
    const bestScheduleData = [];
    for (let slot in data.best_schedule) {
      const sheetData = data.best_schedule[slot].map((name, index) => ({ Slot: slot, Index: index + 1, Name: name }));
      bestScheduleData.push(...sheetData);
    }
    const bestScheduleWS = XLSX.utils.json_to_sheet(bestScheduleData);
    XLSX.utils.book_append_sheet(wb, bestScheduleWS, 'Best Schedule');
  
    // Parse free_schedule
    const freeScheduleData = JSON.parse(data.free_schedule).map(item => ({
      Slot: item.slot,
      TA_Name: item.ta_name.trim(),
      TA_Courses: item.ta_courses.join(', '),
      TA_Day_Off: item.ta_day_off
    }));
    const freeScheduleWS = XLSX.utils.json_to_sheet(freeScheduleData);
    XLSX.utils.book_append_sheet(wb, freeScheduleWS, 'Free Schedule');
  
    // Parse initial_proctoring
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
  
    // Save the Excel file
    XLSX.writeFile(wb, fileName + '.xlsx');
  }
  
  const handleExport = () => {
    console.log(data.best_schedule);
    console.log(data.initial_proctoring);
    console.log(freeSchedule);
    generateExcel(data, 'Schedule')
  };
  return (
    <>
         <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginBottom: "20px" }}>
      <Button
        onClick={handleExport}
        style={{
          backgroundColor: "#52c41a", // Green color
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adding shadow
          transition: "background-color 0.3s",
          cursor: "pointer",
          alignSelf: "center",
          marginBottom: "10px"
        }}
        // Add hover effect
        onMouseEnter={e => e.target.style.backgroundColor = "#389e0d"}
        onMouseLeave={e => e.target.style.backgroundColor = "#52c41a"}
      >
        Export to XLSX
      </Button>

      <div>
        <h2 style={{ marginBottom: "10px" }}>Best Schedule</h2>
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
        <h2 style={{ marginBottom: "10px" }}>Free Schedule</h2>
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
              {freeSchedule.map((schedule, index) => (
                <TableRow key={index}>
                  <TableCell>{schedule.slot}</TableCell>
                  <TableCell>{schedule.ta_name}</TableCell>
                  <TableCell>{schedule.ta_courses.join(", ")}</TableCell>
                  <TableCell>{schedule.ta_day_off}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div>
        <h2 style={{ marginBottom: "10px" }}>Initial Proctoring</h2>
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
                        {data.initial_proctoring[dateTime][0][1].map(
                          (ta, index) => (
                            <TableRow key={index}>
                              <TableCell>{ta}</TableCell>
                            </TableRow>
                          )
                        )}
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
    </>
  );
}
