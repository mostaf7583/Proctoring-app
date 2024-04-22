import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Button } from '@material-ui/core';
import * as XLSX from 'xlsx';
const StudentTable = () => {
    const [extraLoadData, setExtraLoadData] = useState([]);

    useEffect(() => {
        const getExtraLoadData = async () => {
            try {
                const response = await axios.get("https://mostafasallam.pythonanywhere.com/extra_load");
                console.log(response.data);
                setExtraLoadData(response.data);
            } catch (error) {
                console.error("Error fetching extra load data:", error);
            }
        };
        getExtraLoadData();
    }, []);
    const extraloadxlsx = () => {
        // Transform the object into an array of objects
        const excelData = Object.entries(extraLoadData).map(([student, slots]) => {
            // Split the student string to extract name, course, and day
            const matches = student.match(/^(.*?) \[(.*?)\] (.*?)$/);
            if (matches && matches.length === 4) {
                const name = matches[1];
                const course = matches[2];
                const day = matches[3];
                return {
                    Name: name,
                    Course: course,
                    Day: day,
                    Slots: slots
                };
            } else {
                console.error("Invalid student format:", student);
                return null; // Skip invalid data
            }
        }).filter(data => data !== null); // Remove null entries
    
        // Create Excel sheet
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Extra Load Data");
        XLSX.writeFile(wb, "Extra Load Data.xlsx");
    };
    
    
   
    
    return (
        <div>
        <Button
        onClick={extraloadxlsx}
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

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>TA Name</TableCell>
                        <TableCell>Previous Extra Load</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {extraLoadData && Object.keys(extraLoadData).map((name, index) => (
                        <TableRow key={index}>
                            <TableCell>{name}</TableCell>
                            <TableCell>{extraLoadData[name]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}

export default StudentTable;
