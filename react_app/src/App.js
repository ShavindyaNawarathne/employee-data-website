import React from 'react'; 
import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";

import EmployeeData from './pages/Employee_data.jsx';
import Update from './pages/Update';





function App() {

  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<>
            <EmployeeData/>
            <Update/>
            
          </>
          }> </Route>
        </Routes>
      </BrowserRouter>
    
    </div>
  )
}

export default App;
