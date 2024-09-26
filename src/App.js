import React from 'react';
import Header from './Components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
// import AddNewTask from './Components/AddNewTask';
import Home from './Components/Page/Home';
import NewTask from './Components/Page/NewTask';
function App() {
  return (
    <Router> 
      <div>
        <Header />
        <Routes> 
        <Route exact path="/" element={<Home />} />
          <Route path='/newtask' element={<NewTask />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;