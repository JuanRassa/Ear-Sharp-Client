import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProviderWrapper = props => {
  const [isDarkThemeOn, setIsDarkThemeOn] = useState(true);
  const toggleTheme = () => {
    setIsDarkThemeOn((prev) => !prev );
  };
  return <ThemeContext.Provider value={{ isDarkThemeOn, toggleTheme }}>{props.children}</ThemeContext.Provider>;
};
