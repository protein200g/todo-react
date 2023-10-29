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
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atom';

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
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <Helmet>
        <title>CoinTracker</title>
      </Helmet>
      <Reset />
      <ThemeProvider
        theme={isDark ? darkTheme : lightTheme}
      >
        <GlobalStlye />

        <Outlet />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
