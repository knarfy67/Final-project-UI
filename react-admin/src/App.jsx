import { Route, Routes,} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import { AuthLayout } from "./layouts/AuthLayout"
import { GuestLayout } from "./layouts/GuestLayout"
import { ResetLayout } from "./layouts/ResetLayout"
import DashBoard from "./pages/DashBoard"
import AccountDashboard from "./pages/AccountDashboard"
import CreateStaff from "./pages/CreateStaff"
import CreateStudent from "./pages/CreateStudent"
import EditStudent from "./pages/EditStudent"
import EditStaff from "./pages/EditStaff"
import Settings from "./pages/Settings"
import Reports from "./pages/Reports"


function App() {
    
  return (
   <div className=""> 
      <Routes>
        <Route element={<AuthLayout/>}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/create-staff" element={<CreateStaff />} />
        <Route path="/create-student" element={<CreateStudent />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
        <Route path="/accounts-dashboard" element={<AccountDashboard />} />
        <Route path="/edit-staff/:id" element={<EditStaff />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reports" element={<Reports />} />
        </Route>
        <Route element={<GuestLayout/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgotPassword />} /> 
        </Route>
        <Route element={<ResetLayout />}>
        <Route path="/reset-password"  element={<ResetPassword />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
   </div>
  )
}

export default App
