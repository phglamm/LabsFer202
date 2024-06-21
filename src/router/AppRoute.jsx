import { Route, Routes } from "react-router-dom";
import { duongdan } from ".";
import Homepage from "../page/Homepage/Homepage";
import Contactpage from "../page/Contactpage/Contactpage";
import DetailPage from "../page/DetailPage/DetailPage";
import Dashboard from "../page/Dashboard/Dashboard";
import Protected from "./ProtectedRoute";
import Loginpage from "../page/LoginPage/loginpage";

export default function AppRoute() {
  return (
    <Routes>
      <Route path={duongdan.login} element={<Loginpage />} />
      <Route
        path={duongdan.home}
        element={
          <Protected>
            <Homepage />
          </Protected>
        }
      />
      <Route
        path={duongdan.contact}
        element={
          <Protected>
            <Contactpage />
          </Protected>
        }
      />
      <Route
        path={`${duongdan.detail}/:id`}
        element={
          <Protected>
            <DetailPage />
          </Protected>
        }
      />
      <Route
        path={`${duongdan.home}/:pageNumber`}
        element={
          <Protected>
            <Homepage />
          </Protected>
        }
      />
      <Route
        path={duongdan.dashboard}
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
    </Routes>
  );
}
