import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  redirect,
} from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";
import CustomerPage from "../containers/CustomerPage/CustomerPage";
import LoginPage from "../containers/LoginPage/LoginPage";
import RegisterPage from "../containers/RegisterPage.js/RegisterPage";
import StatisticsPage from "../containers/StatisticsPage/StatisticsPage";
import RootErrorBoundaryLayout from "../components/ErrorBoundary/RootErrorBoundaryLayout";

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootErrorBoundaryLayout />}>
        <Route path="/" element={<MainLayout />}>
          <Route
            path="/"
            loader={() => {
              return redirect("customers");
            }}
          />
          <Route path="login" element={<LoginPage></LoginPage>} />
          <Route path="register" element={<RegisterPage></RegisterPage>} />
          <Route element={<ProtectedRoute />}>
            <Route path="customers" element={<CustomerPage />} />
            <Route path="statistics" element={<StatisticsPage />} />
          </Route>

          <Route path="*" element={<>404</>} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Routes;
