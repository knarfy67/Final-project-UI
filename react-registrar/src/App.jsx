import { Route, Routes,} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import DashBoard from "./pages/DashBoard"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import { AuthLayout } from "./layouts/AuthLayout"
import { GuestLayout } from "./layouts/GuestLayout"
import { ResetLayout } from "./layouts/ResetLayout"
import Evaluate from "./pages/Evaluate"
import EvaluateDashBoard from "./pages/EvaluateDashBoard"
import EvaluateUpdate from "./pages/EvaluateUpdate"
import EvaluateShow from "./pages/EvaluateShow"

// import AccountDashboard from "./pages/AccountDashboard"
// import Settings from "./pages/Settings"


function App() {
    
  return (
   <div className=""> 
      <Routes>
        <Route element={<AuthLayout/>}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/EvaluateDashBoard" element={<EvaluateDashBoard />} />
        <Route path="/evaluate-student/:student_id" element={<Evaluate />} />
        <Route path="/evaluate-update/:student_id" element={<EvaluateUpdate />} />
        <Route path="/evaluate-show/:student_id" element={<EvaluateShow />} />
        {/* <Route path="/settings" element={<Settings />} />  */}
        </Route>
        <Route element={<GuestLayout/>}>
        <Route path="/login" element={<Login />} />
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
