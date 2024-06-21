import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./scss/index.scss";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProviderWrapper } from "./theme/themeContext.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { AuthContextProvider } from "./context/AuthContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProviderWrapper>
          <App />
        </ThemeProviderWrapper>
      </Provider>
    </BrowserRouter>
  </AuthContextProvider>
);
