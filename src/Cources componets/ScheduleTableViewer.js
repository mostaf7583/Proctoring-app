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
  export default ScheduleTable;