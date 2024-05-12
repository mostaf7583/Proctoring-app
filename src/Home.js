import React, { useState } from "react";
import CardList from "./Cources componets/courses";
import StudentTable from "./Cources componets/extraload";
import { Button } from '@mui/material';
import Uploaded from "./Cources componets/uploadfiles"; // Changed component name to start with uppercase

const Home = () => {
  const [showCardList, setShowCardList] = useState(true);
  const [showUploaded, setShowUploaded] = useState(false); // State for showing the uploaded component

  const handleTabClick = (isCardList) => {
    setShowCardList(isCardList);
    setShowUploaded(false); // Hide uploaded component when switching tabs
  };

  const handleShowUploaded = () => {
    setShowUploaded(true);
  };

  return (
    <div>
      <div>
        <Button onClick={() => handleTabClick(true)} style={{ marginRight: '10px' }}>Add Quiz</Button>
        <Button onClick={() => handleTabClick(false)}>Extra Load Table</Button>
        <Button onClick={handleShowUploaded}>Upload Files</Button> {/* Button to show uploaded component */}
      </div>

      {/* Conditional rendering based on state */}
      {showUploaded ? <Uploaded /> : (showCardList ? <CardList /> : <StudentTable />)}

    </div>
  );
}

export default Home;
