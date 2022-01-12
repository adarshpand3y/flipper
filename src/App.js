import Mainarea from "./Components/Mainarea";
import Navbar from "./Components/Navbar";
import {useState} from 'react';


const App = () => {
  const [theme, setTheme] = useState('light');

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
    }
    else {
      setTheme('light');
    }
  }

  return (
    <>
      <Navbar theme={theme} switchTheme={handleThemeChange} />
      <Mainarea difficulty="4" theme={theme} />
    </>
  );
}

export default App;
