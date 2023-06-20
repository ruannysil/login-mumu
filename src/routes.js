import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import ForgotPassword from "./components/ForgotPassword"

export default function RoutesApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
             </Routes>
        </Router>
    )
}