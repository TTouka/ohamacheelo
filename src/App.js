import { createTheme, ThemeProvider } from "@mui/material";
import Board from "./Ohama/Board";
import { ConfigContextProvider } from "./Ohama/Store/useConfig";
import { GameContextProvider } from "./Ohama/Store/useGame";
import { MembersContextProvider } from "./Ohama/Store/useMembers";

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
      ].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MembersContextProvider>
        <ConfigContextProvider>
          <GameContextProvider>
            <Board />
          </GameContextProvider>
        </ConfigContextProvider>
      </MembersContextProvider>
    </ThemeProvider>
  );
}

export default App;
