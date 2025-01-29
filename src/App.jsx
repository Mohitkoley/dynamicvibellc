import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import ContactUs from "./pages/ContactUs/ContactUs";
import QuoteRequest from './pages/QuoteRequest/QuoteRequest';
import AboutUs from './pages/AboutUs/AboutUs';
import Login from "./admin/login/Login.jsx";
import CarRental from "./admin/CarRental/CarRental.jsx";

function App() {
console.log("Checking from App");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/request" element={<QuoteRequest />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/admin/login" element={<Login/>} />
        <Route path="/admin/dashboard/car-rental" element={<CarRental/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
