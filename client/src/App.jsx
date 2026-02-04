import { Routes, Route } from 'react-router-dom';

import Login from './components/login';
import Home from './pages/Home';
import Employees from './components/Employees/Employees';
import EmployeeEditing from './components/Employees/EmployeeEditing';
import Departments from './components/Departments/Departments';
import Shifts from './components/Shifts/Shifts';

function App() {

  return (
    <>
      <div style={{ border: '2px solid blue', placeItems: 'center', textAlign: 'center', padding:'10px 0 10px 0'}}>
        <Routes>
          
          <Route path='/' element={<Login />} />

          <Route path='home' element={<Home />}>

            <Route path='employees' element={<Employees/>}/> 
            <Route path='employees/:id' element={<EmployeeEditing/>}/> 
            
            <Route path='departments' element={<Departments/>}/> 
            <Route path='shifts' element={<Shifts/>}/> 

          </Route>
        
        </Routes>
      </div>
    </>
  )
}

export default App
