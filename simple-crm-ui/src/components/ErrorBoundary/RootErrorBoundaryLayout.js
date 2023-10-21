import { Outlet } from "react-router-dom";
import DefaultErrorBoundary from "./RootErrorBoundary";

const RootErrorBoundaryLayout = () => (
  <DefaultErrorBoundary>
    <Outlet />
  </DefaultErrorBoundary>
);

export default RootErrorBoundaryLayout;