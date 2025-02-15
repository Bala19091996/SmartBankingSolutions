import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AdminLogin from './AdminPage/AdminLogin';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import CustomerDashboard from './CustomerComponent/CustomerDashboard';
import FundTransfer from './CustomerComponent/FundTransfer';
import AdminDashboard from './AdminPage/AdminDashboard';
import ComplainMang from './AdminPage/ComplainsMang';
import Services from './Components/Services';
import AccountManagement from './ServicesPage/AccountManagement';
import LoanOptions from './ServicesPage/LoanOption';
import NetBanking from './ServicesPage/NetBanking';
import Help from './Components/Help';
import RegisterationPage from './CustomerComponent/RegistrationPage';
import ManageUsers from './AdminPage/ManageUsers';
import AdminSettings from './AdminPage/AdminSettings';
import EmployeeManage from './AdminPage/EmployeeManage';
import LoanManagement from './AdminPage/LoanManagement';
import CrossBorderPayment from './CustomerComponent/CrossBorderPayment';
import DeleteAccount from './CustomerComponent/DeleteAccount';
import BillPayments from './CustomerComponent/BillPayments';
import CarLoan from './ServicesPage/CarLoan';
import HomeLoan from './ServicesPage/HomeLoan';
import PersonalLoan from './ServicesPage/PersonalLoan';
import EducationLoan from './ServicesPage/EducationLoan';
import UserDetails from './AdminPage/UserDetails';
import ClerkDashboard from './AdminPage/ClerkDashboard';
import AddAccount from './AdminPage/AddAccount';
import Transactions from './ServicesPage/Transactions';
import LoanApplicationPage from './ServicesPage/LoanApplicationPage';
import TransactionsHistory from './CustomerComponent/TransactionsHistory';
import LoanStatus from './AdminPage/LoanStatus';
import LoanEligibilityChecker from './ServicesPage/LoanEligibilityChecker';
import AdminEdit from './AdminPage/AdminEdit';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AdminLogin" element={<AdminLogin />} />
                <Route path = "/AboutUs" element = {<AboutUs/>}/>
                <Route path = "/ContactUs" element = {<ContactUs/>} />
                <Route path='/CustomerDashboard' element = { <CustomerDashboard/> }/>
                <Route path='/RegistrationPage' element = {<RegisterationPage/>}/>
                <Route path='/FundTransfer' element = { <FundTransfer/> }/>
                <Route path='/AdminDashboard' element = { <AdminDashboard/> } />
                <Route path='/ComplainMang' element = { <ComplainMang/> }/>
                <Route path="/Services" element={<Services/>} />
                <Route path='/AccountManagement' element = {<AccountManagement/>} />
                <Route path='/LoanOptions' element = {<LoanOptions/>} />
                <Route path = '/NetBanking' element ={<NetBanking/>} />
                <Route path='/Help' element={<Help/>}/>
                <Route path='/manageusers' element = {<ManageUsers/>}/>
                <Route path='/settings' element = {<AdminSettings/>}/>
                <Route path='/employeemanage' element = {<EmployeeManage/>}/>
                <Route path='/loanManagement' element ={<LoanManagement/>}/>
                <Route path='/CrossBorderPayment' element = {<CrossBorderPayment/>}/>
                <Route path='/DeleteAccount' element = {<DeleteAccount/>}/>
                <Route path='/BillPayments' element = {<BillPayments/>}/>
                <Route path='/loan/carloan' element = {<CarLoan/>}/>
                <Route path='/loan/homeLoan' element = {<HomeLoan/>}/>
                <Route path='/loan/personalloan' element = {<PersonalLoan/>}/>
                <Route path='/loan/educationloan' element ={<EducationLoan/>}/>
                <Route path="/userdetails/:userId" element={<UserDetails />} />
                <Route path='/clerkdashboard' element = {<ClerkDashboard/>}/>
                <Route path='/AddAccount' element = {<AddAccount/>}/>
                <Route path='/transactions' element = {<Transactions/>}/>
                <Route path='/loanapplication' element = {<LoanApplicationPage/>}/>
                <Route path='transactionshistory' element = {<TransactionsHistory/>}/>
               <Route path='loanstatus' element = {<LoanStatus/>}/>
               <Route path='loaneligibilitychecker' element = {<LoanEligibilityChecker/>}/> 
               <Route path='/adminedit/:adminId' element = {<AdminEdit/>}/>
            </Routes>
        </Router>
    );
}

export default App;
