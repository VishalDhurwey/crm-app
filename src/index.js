import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import CustomerList from './components/Customer/CustomerList/CustomerList';
import CustomerForm from './components/Customer/CustomerForm/CustomerForm';
import SignUp from './components/Customer/SignUp/SignUp';
import LogIn from './components/Customer/LogIn/LogIn';
import SecuredRoutes from './components/Customer/SecuredRoutes/SecuredRoutes';
import Userlist from './components/Customer/User/Userlist';
import UserForm from './components/Customer/User/UserForm/UserForm';
import Ticketlist from './components/Customer/Ticket/Ticketlist/Ticketlist';
import Ticketform from './components/Customer/Ticket/Ticketform/Ticketform';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import Navbar from './components/Customer/Navbar/Navbar';
import Sidemenu from './components/Sidemenu/Sidemenu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <div>
      {/* <Navbar/>
      <Sidemenu/> */}
   <BrowserRouter>
    <Routes>
        <Route path='/' element={
           <SecuredRoutes>
            <CustomerList/>
           </SecuredRoutes>
        }></Route> 
         <Route path='/tickets' element={
           <SecuredRoutes>
            <Ticketlist/>
           </SecuredRoutes>
        }></Route>
        <Route path='/ticketform' element={
           <SecuredRoutes>
            <Ticketform/>
           </SecuredRoutes>
        }></Route> 

         <Route path='ticketform/:desc' element={
            <SecuredRoutes>
         <Ticketform/>
         </SecuredRoutes>
         }></Route>


        <Route path='/users' element={
           <SecuredRoutes>
            <Userlist/>
           </SecuredRoutes>
        }></Route> 
        <Route path='/userForm' element={
           <SecuredRoutes>
            <UserForm/>
           </SecuredRoutes>
        }></Route> 
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<LogIn/>}></Route>
        <Route path='/form' element={
          <SecuredRoutes>
            <CustomerForm/>
          </SecuredRoutes>
        }></Route>
        <Route path='form/:customername' element={<CustomerForm/>}></Route>
        <Route path='userform/:username' element={<UserForm/>}></Route>
        
    </Routes>
    </BrowserRouter>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
