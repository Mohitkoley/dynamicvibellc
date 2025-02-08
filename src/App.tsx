import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NotFound from "./pages/NotFound";
import Login from "./admin/login/Login";
import CarRental from "./admin/CarRental/CarRental";
import PartyRental from "./admin/partyRental/PartyRental";
import UserProfile from './admin/userProfile/UserProfile';
import Users from './admin/users/Users';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login/>} />
          <Route path="/admin/dashboard/car-rental" element={<CarRental/>} />
          <Route path="/admin/dashboard/party-rental" element={<PartyRental />} />
          <Route path="/admin/dashboard/users" element={<Users />} />
          <Route path="/admin/dashboard/user-profile" element={ <UserProfile /> } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
