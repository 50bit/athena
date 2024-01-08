import { Routes, Route } from "react-router-dom";
import BottomNavigation from './Pages/Global/BottomNav';
import Home from "./Pages/Home";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Notifications from "./Pages/Notifications";
import Teachers from "./Pages/Teachers";
import Students from "./Pages/Students";
import UserInfo from "./Pages/UserInfo";
import Complaints from "./Pages/Complaints";
import JoinRequests from "./Pages/JoinRequests";
import Activites from "./Pages/Activites";
import Login from "./Pages/Login";
import { useEffect, useState } from "react";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from './Pages/NotFound';
function App() {
  const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false)
  useEffect(() => {
    setIsAuthorized(localStorage.getItem('token') ? true : false)
  }, [])
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* <Sidebar isSidebar={isSidebar} /> */}
          <main className="content">
            <Routes>
              <Route element={<PrivateRoutes />} >
                <Route path="/" element={<Home />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/students" element={<Students />} />
                <Route path="/user" element={<UserInfo />} />
                <Route path="/complaints" element={<Complaints />} />
                <Route path="/join-request" element={<JoinRequests />} />
                <Route path="/activities" element={<Activites />} />
                {/* <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} /> */}
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
            {(isAuthorized && <BottomNavigation />)}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;