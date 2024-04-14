import React, { useState } from 'react';

function CardInput({ onAddCard }) {
  const [slotName, setSlotName] = useState('');
  const [quizDate, setQuizDate] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [numOfSlots, setNumOfSlots] = useState('');
   
  const courses = [
    { code: 'MATH3BI', name: 'Mathematics III (BI)' },
    { code: 'MATH5', name: 'Mathematics V' },
    { code: 'CSEN1022', name: 'Computer Programming for Engineers' },
    { code: 'CSEN301', name: 'Data Structures and Algorithms' },
    { code: 'CSEN903', name: 'Advanced Algorithms' },
    { code: 'DMET904', name: 'Digital Image Processing' },
    { code: 'DMET901', name: 'Computer Vision' },
    { code: 'CSEN901', name: 'Artificial Intelligence' },
    { code: 'CSEN703', name: 'Systems Analysis and Design' },
    { code: 'CSEN701', name: 'Embedded Systems' },
    { code: 'CSEN702', name: 'Microprocessors' },
    { code: 'CSEN605', name: 'Digital System Design' },
    { code: 'CSEN501', name: 'Software Engineering' },
    { code: 'DMET501', name: 'Introduction to Media Technology' },
    { code: 'CSIS301', name: 'Information Security' },
    { code: 'CSIS104', name: 'Introduction to Pharmacy Informatics' },
    { code: 'CSIS105', name: 'Computer Ethics' },
    { code: 'CSEN503', name: 'Computer Networks' },
    { code: 'CSIS101', name: 'Introduction to Computer Science' },
    { code: 'DMET502', name: 'Computer Graphics' },
    { code: 'CSEN909', name: 'Selected Topics in Computer Engineering' },
    { code: 'BINF711', name: 'Bioinformatics' },
    { code: 'CSEN933', name: 'Advanced Topics in Computer Engineering' },
    { code: 'DMET706', name: 'Multimedia Systems' },
    { code: 'DMET703', name: 'Human-Computer Interaction' },
    { code: 'DMET702', name: 'Computer Animation' },
    { code: 'DMET704', name: 'Virtual Reality' },
    { code: 'CSEN102', name: 'Introduction to Computer Science' },
    { code: 'CSIS102', name: 'Introduction to Information Technology' },
    { code: 'CSIS402', name: 'Introduction to Network Security' },
    { code: 'CSEN401', name: 'Computer Architecture' },
    { code: 'CSEN403', name: 'Operating Systems' },
    { code: 'CSEN404', name: 'Introduction to Networks' }, 
    { code: 'CSEN601', name: 'Computer Architecture' },
    { code: 'DMET602', name: 'Networks and Media Lab' },
    { code: 'CSEN602', name: 'Operating Systems' },
    { code: 'CSEN603', name: 'Software Engineering' },
    { code: 'CSEN604', name: 'Database Systems II' },
    { code: 'NETW1009', name: 'Cloud Computing' },
    { code: 'CSEN202', name: 'Introduction to Computer Science II' },
    { code: 'CSIS202', name: 'Introduction to Information Technology II' }
];

  const handleAddCard = () => {
    onAddCard({ slot_name: slotName, quiz_date: quizDate, course_code: courseCode, num_of_slots: numOfSlots });
    setSlotName('');
    setQuizDate('');
    setCourseCode('');
    setNumOfSlots('');
  };

  return (
    <div className="card-input">
      <input
        type="text"
        placeholder="Slot Name"
        value={slotName}
        onChange={(e) => setSlotName(e.target.value)}
      />
      <input
        type="date"
        placeholder="Quiz Date"
        value={quizDate}
        onChange={(e) => setQuizDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Course Code"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
      />
      <input
        type="number"
        placeholder="Number of Slots"
        value={numOfSlots}
        onChange={(e) => setNumOfSlots(e.target.value)}
      />
      <button onClick={handleAddCard}>+</button>
    </div>
  );
}

function CardList() {
  const [cards, setCards] = useState([]);

  const handleAddCard = (newCard) => {
    setCards([...cards, newCard]);
  };

  return (
    <div className="card-list">
      <CardInput onAddCard={handleAddCard} />
      {cards.map((card, index) => (
        <div key={index} className="card">
          <p>Slot Name: {card.slot_name}</p>
          <p>Quiz Date: {card.quiz_date}</p>
          <p>Course Code: {card.course_code}</p>
          <p>Number of Slots: {card.num_of_slots}</p>
        </div>
      ))}
    </div>
  );
}

export default CardList;