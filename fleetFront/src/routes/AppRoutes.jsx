import { Routes, Route } from "react-router-dom";


import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Unauthorized from "../pages/Unauthorized";
import MangerPages from "../pages/ManagerPage";
import DriverPages from "../pages/DriverPages";
import RoleProtectedRoute from "./RoleProtectedRoute";
import Layout from "../components/Layout";
import VehicleList from "../pages/Fleet/VehicleList";
import AddVehicle from "../pages/Fleet/AddVehicle";
import EditVehicle from "../pages/Fleet/EditVehicle";
import FleetOverview from "../pages/Fleet/FleetOverview";
import FleetInspectionDetails from "../pages/Fleet/FleetInspectionDetails";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path ='/fleet/vehicles' element={<VehicleList />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/edit-vehicle/:id" element={<EditVehicle />} />
        <Route path='/fleet/overview' element={<FleetOverview />} />
        <Route path='/fleet/inspection' element={<FleetInspectionDetails />} />

        {/* Protected Routes for Manager */}
        <Route element={<RoleProtectedRoute allowedRoles={["Manager"]} />}>
          <Route path="/manager" element={<MangerPages />} />
        </Route>

        {/* Protected Routes for Driver */}
        <Route element={<RoleProtectedRoute allowedRoles={["Driver"]} />}>
          <Route path="/driver" element={<DriverPages />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;