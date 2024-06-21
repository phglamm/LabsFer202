import { useContext } from "react";
import "./scss/App.scss";
import AppRoute from "./router/AppRoute";
import { ThemeContext } from "./theme/themeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { mode, setMode } = useContext(ThemeContext);
  console.log("App:", { mode, setMode });
  return (
    <div className={`App ${mode} roboto-regular`}>
      <ToastContainer />
      <AppRoute />
    </div>
  );
}

export default App;
