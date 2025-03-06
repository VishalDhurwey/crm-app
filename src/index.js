import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import CustomerList from './components/Customer/CustomerList/CustomerList';
import CustomerForm from './components/Customer/CustomerForm/CustomerForm';
import SignUp from './components/Customer/SignUp/SignUp';
import LogIn from './components/Customer/LogIn/LogIn';
import SecuredRoutes from './components/Customer/SecuredRoutes/SecuredRoutes';
import Userlist from './components/Customer/User/Userlist';
import UserForm from './components/Customer/User/UserForm/UserForm';
import Ticketlist from './components/Customer/Ticket/Ticketlist/Ticketlist';
import Ticketform from './components/Customer/Ticket/Ticketform/Ticketform';
import Dashboard from './components/Dashboard/Dashboard';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/Customer/Navbar/Navbar';

const AppLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <div>
   <BrowserRouter>
    <Routes>
        {/* Auth routes */}
        <Route path='/login' element={<LogIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        
        {/* Dashboard - main landing page when logged in */}
        <Route path='/' element={
          <SecuredRoutes>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </SecuredRoutes>
        } />
        
        <Route path='/dashboard' element={
          <SecuredRoutes>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </SecuredRoutes>
        } />

        {/* Customer routes */}
        <Route path='/customers' element={
          <SecuredRoutes>
            <AppLayout>
              <CustomerList />
            </AppLayout>
          </SecuredRoutes>
        } />
        
        <Route path='/customerform' element={
          <SecuredRoutes>
            <AppLayout>
              <CustomerForm />
            </AppLayout>
          </SecuredRoutes>
        } />
        
        <Route path='/customerform/:customername' element={
          <SecuredRoutes>
            <AppLayout>
              <CustomerForm />
            </AppLayout>
          </SecuredRoutes>
        } />

        {/* Ticket routes */}
        <Route path='/tickets' element={
          <SecuredRoutes>
            <AppLayout>
              <Ticketlist />
            </AppLayout>
          </SecuredRoutes>
        } />
        
        <Route path='/ticketform' element={
          <SecuredRoutes>
            <AppLayout>
              <Ticketform />
            </AppLayout>
          </SecuredRoutes>
        } />

        <Route path='/ticketform/:desc' element={
          <SecuredRoutes>
            <AppLayout>
              <Ticketform />
            </AppLayout>
          </SecuredRoutes>
        } />

        {/* User routes */}
        <Route path='/users' element={
          <SecuredRoutes>
            <AppLayout>
              <Userlist />
            </AppLayout>
          </SecuredRoutes>
        } />
        
        <Route path='/userform' element={
          <SecuredRoutes>
            <AppLayout>
              <UserForm />
            </AppLayout>
          </SecuredRoutes>
        } />
        
        <Route path='/userform/:username' element={
          <SecuredRoutes>
            <AppLayout>
              <UserForm />
            </AppLayout>
          </SecuredRoutes>
        } />

        {/* Catch all - redirect to dashboard if logged in, otherwise to login */}
        <Route path="*" element={
          <SecuredRoutes>
            <Navigate to="/dashboard" replace />
          </SecuredRoutes>
        } />
        
    </Routes>
    </BrowserRouter>
    </div>
  </React.StrictMode>
);

reportWebVitals();
