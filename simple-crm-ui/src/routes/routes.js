import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, redirect } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";
import CustomerPage from "../containers/CustomerPage/CustomerPage";
import LoginPage from "../containers/LoginPage/LoginPage";
import RegisterPage from "../containers/RegisterPage.js/RegisterPage";
import StatisticsPage from "../containers/StatisticsPage/StatisticsPage";

const Routes = () => { 
  const routesForPublic = [
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/",
          element: <div>User Home Page</div>,
        },
        {
          path: "/customers",
          element: <CustomerPage></CustomerPage>,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    // {
    //   path: "/",
    //   element: <MainLayout></MainLayout>,
    //   children: [
    //     {
    //       path: "/login",
    //       element: <LoginPage></LoginPage>,
    //     }
    //   ],
      
    // },
    {
      path: "/login",
      element: <LoginPage></LoginPage>,
    }
  ];

  // const router = createBrowserRouter([
  //   ...routesForPublic,
  //   ...(!token ? routesForNotAuthenticatedOnly : []),
  //   ...routesForAuthenticatedOnly,
  // ]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route
          path="/"
          loader={() => {
            return redirect("customers");
          }}
        />
        <Route
          path="login"
          element={<LoginPage></LoginPage>}
          // loader={({ request }) =>
          //   fetch("/api/dashboard.json", {
          //     signal: request.signal,
          //   })
          // }
        />
        <Route
          path="register"
          element={<RegisterPage></RegisterPage>}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="customers"
            element={<CustomerPage />}
            // loader={redirectIfUser}
          />
          <Route
            path="statistics"
            element={<StatisticsPage />}
            // loader={redirectIfUser}
          />
          {/* <Route path="logout" action={logoutUser} /> */}
        </Route>
        
        <Route path="*" element={<>404</>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Routes;