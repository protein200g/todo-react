import { useState } from 'react';
import styled, {
  ThemeProvider,
  keyframes,
} from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Helmet } from 'react-helmet';
import { darkTheme, lightTheme } from './theme';
// import Header from './components/Header';

const GlobalStlye = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&family=Playpen+Sans:wght@100;300&display=swap');
*{
  box-sizing: border-box;
}
body{
  font-family: 'Open Sans', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  ;
}
a{
  text-decoration: none;
  color:inherit;
}`;

function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const Toggle = styled.button`
    padding: 20px;
    position: fixed;
    top: 50px;
    left: 400px;
  `;

  return (
    <>
      <Helmet>
        <title>CoinTracker</title>
      </Helmet>
      <Reset />
      {/* <Header /> */}
      <ThemeProvider
        theme={theme === 'light' ? lightTheme : darkTheme}
      >
        <GlobalStlye />
        <Toggle onClick={toggleTheme}>
          {theme === 'light' ? (
            <span>light_mode</span>
          ) : (
            <span>dark_mode</span>
          )}
        </Toggle>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
