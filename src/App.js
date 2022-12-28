import { createTheme, ThemeProvider } from "@mui/material";
import Board from "./Ohama/Board";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Helvetica Neue"',
        "Arial",
        '"M PLUS Rounded 1c"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Board />
    </ThemeProvider>
  );
}

export default App;
