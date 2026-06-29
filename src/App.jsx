import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ReportIssue from "./pages/ReportIssue/ReportIssue";
import LiveIssues from "./pages/LiveIssues/LiveIssues";
import MyReports from "./pages/MyReports/MyReports";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="report" element={<ReportIssue />} />
          <Route path="live" element={<LiveIssues />} />
          <Route path="my-reports" element={<MyReports />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;