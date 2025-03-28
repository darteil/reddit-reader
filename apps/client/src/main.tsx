import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { App } from "./components/App";

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>,
);
