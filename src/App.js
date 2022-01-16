import Mainarea from "./Components/Mainarea";
import Navbar from "./Components/Navbar";
import {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";

const App = () => {
  const [theme, setTheme] = useState('dark');

  if (theme === 'light') {
    document.body.style.backgroundColor = "#fff";
  }
  else {
    document.body.style.backgroundColor = "#181818";
  }

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.body.style.backgroundColor = "#181818";
    }
    else {
      setTheme('light');
      document.body.style.backgroundColor = "#fff";
    }
  }

  return (
    <>
      <BrowserRouter>
      <Navbar theme={theme} switchTheme={handleThemeChange} />
      <Routes>
        <Route path="/" element={<Home theme={theme} />} />
        <Route path="/play" element={<Mainarea difficulty="4" theme={theme} />} />
      </Routes>
    </BrowserRouter>
      
      {/* <Mainarea difficulty="4" theme={theme} /> */}
    </>
  );
}

export default App;
