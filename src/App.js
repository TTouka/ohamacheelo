import { createTheme, ThemeProvider } from "@mui/material";
import ErrorBoundary from "./ErrorBoundary";
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
      <ErrorBoundary>
        <MembersContextProvider>
          <ConfigContextProvider>
            <GameContextProvider>
              <Board />
            </GameContextProvider>
          </ConfigContextProvider>
        </MembersContextProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
