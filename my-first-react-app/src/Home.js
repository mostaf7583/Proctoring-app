import React, { useState } from "react";
import CardList from "./Cources componets/courses";
import StudentTable from "./Cources componets/extraload";
import { Button } from '@mui/material';

const Home = () => {
  const [showCardList, setShowCardList] = useState(true);

  const handleTabClick = (isCardList) => {
    setShowCardList(isCardList);
  };

  return (
    <div>
      <div>
        <Button onClick={() => handleTabClick(true)} style={{ marginRight: '10px' }}>Add Quiz</Button>
        <Button onClick={() => handleTabClick(false)}>Extra Load Table</Button>
      </div>

      {showCardList ? <CardList /> : <StudentTable />}

    </div>
  );
}

export default Home;
