import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Dashboard from "./pages/auth/dashboard";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
