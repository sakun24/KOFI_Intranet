import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './assets/components/homePage/navigation/Navigation.jsx';
import HomePage from './assets/components/homePage/HomePage';
import ContactList from './assets/components/contactlist/ContactList';
import DepartmentPage from './assets/components/department/DepartmentPage';
import Finance from './assets/components/department/departmentInfo/finance/Finance.jsx';
import Finance_Eform from './assets/components/department/departmentInfo/finance/Finance_Eform.jsx';
import Meetingroom from './assets/components/meetingroom/Meetingroom.jsx';
import ProcurementEform from './assets/components/department/departmentInfo/procurement/ProcurementEform.jsx';
import ITForm from './assets/components/department/departmentInfo/it/itForm.jsx';
import Technical from './assets/components/department/departmentInfo/teachnical/Technical.jsx';
import Operation from './assets/components/department/departmentInfo/operation/Operation.jsx';
import Monin from './assets/components/department/departmentInfo/monin/Monin.jsx';
import Sales from './assets/components/department/departmentInfo/sales/Sales.jsx';
import HrAdmin from './assets/components/department/departmentInfo/hradmin/HrAdmin.jsx';
import Footer from './assets/components/homePage/footer/Footer.jsx';
import FoodMenu from './assets/components/food_menu/FoodMenu.jsx';
import ProcurementExcel from './assets/components/department/departmentInfo/procurement/ProcurementExcel.jsx';
import ProductionEform from './assets/components/department/departmentInfo/production/ProductionEform.jsx';
import { AuthProvider } from './assets/components/Auth/AuthContext.jsx'; 
import ProtectedRoute from './assets/components/Auth/ProtectedRoute.jsx'; 
import Login from './assets/components/Auth/Login.jsx'; 
import HrPolicy from './assets/components/department/departmentInfo/hradmin/HrPolicy.jsx';
// Import NotFound component
import NotFound from './assets/components/NotFound.jsx';
import ProcurementUpdate from './assets/components/department/departmentInfo/procurement/ProcurementUpdate.jsx';
import HrIdp from './assets/components/department/departmentInfo/hradmin/HrIdp.jsx';
import Department_idp from './assets/components/department/departmentInfo/hradmin/idp_departments/2024/Department_idp.jsx';
import DepartmentList from './assets/components/Kofi_dashboard/DepartmentList/DepartmentList.jsx';
import KposPage from './assets/components/Kofi_dashboard/KposPage/KposPage.jsx';
import Dashboard from './assets/components/Kofi_dashboard/Dashboard.jsx';
import PasswordProtection from './assets/components/Auth/PasswordProtection.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/landing/production_eform" 
                 element={<ProtectedRoute><ProductionEform /></ProtectedRoute>} 
          />
          <Route path="/landing/" element={<HomePage />} />
          <Route path="/landing" element={<HomePage />} />
          <Route path="/landing/meeting-room" element={<Meetingroom />} />
          <Route path="/landing/contact-list" element={<ContactList />} />
          <Route path="/landing/departments" element={<DepartmentPage />} />
          <Route path="/landing/finance" element={<Finance />} /> 
          <Route path="/landing/finance_eform" element={<Finance_Eform />} /> 
          <Route path="/landing/procurement_eform" element={<ProcurementEform />} /> 
          <Route path="/landing/procurement_files" element={<ProcurementExcel />} /> 
          <Route path="/landing/it_form" element={<ITForm/>} /> 
          <Route path="/landing/technical_eform" element={<Technical />} /> 
          <Route path="/landing/operation_eform" element={<Operation />} /> 
          <Route path="/landing/monin_eform" element={<Monin />} /> 
          <Route path="/landing/sales_eform" element={<Sales />} /> 
          <Route path="/landing/hradmin_eform" element={<HrAdmin />} /> 
          <Route path="/landing/foodmenu" element={<FoodMenu />} /> 
          <Route path="/landing/hr-policy" element={<HrPolicy />} /> 
          <Route path="/landing/hr-idp" element={<HrIdp />} /> 
          <Route path="/landing/hr-idp/department_idp" element={<Department_idp/>} /> 
          <Route path="/landing/procurement_purchase_update" element={<ProcurementUpdate />} /> 
          <Route path="/landing/kofi_dashboard/department" element={<DepartmentList/>} />
          <Route
            path="/landing/kofi_dashboard"
            element={
              <PasswordProtection>
                <Dashboard />
              </PasswordProtection>
            }
          />
          <Route path="/landing/v1/department/:departmentId/kpos" element={<KposPage />} />


          
          {/* Fallback route for 404 errors */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
