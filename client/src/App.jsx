import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/context/theme";


import Landing from "./components/auth/Landing";
import HomePage from "./components/Landing/HomePage";
import PageNotFound from "./components/Basic/PageNotFound";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!token || !userData) {
      return;
    }

    if (userData.type === "expert") {
      dispatch(setExpertAuthToken(token));
      dispatch(setExpertData(userData));
    } else if (userData.type === "student") {
      dispatch(setStudentAuthToken(token));
      dispatch(setStudentData(userData));
    }
  }, [dispatch]);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <TranslateToggle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Landing" element={<Landing />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
