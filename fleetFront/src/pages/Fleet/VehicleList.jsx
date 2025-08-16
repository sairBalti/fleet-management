import { useEffect, useState } from "react";
import {
  deleteMultipleVehicles,
  deleteVehicleById,
  getVehiclesList,
} from "../../services/VehicleService";
import { FaEdit, FaTrash } from "react-icons/fa";
import Checkbox from "../../components/Checkbox";
import SearchButton from "../../components/SearchButton";
import DateRangeFilter from "../../components/DateRangeFilter";
import StatusFilter from "../../components/StatusFilter";
import Pagination from "../../components/Pagination";
import AddButton from "../../components/AddButton";
import { useNavigate } from "react-router-dom";
import SortIcons from "../../components/SortIcons";
import { useLoader } from "../../context/LoaderContext";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [skeleton, setSkeleton] = useState(true);

  // Current filter values
  const [filters, setFilters] = useState({
    status: 'All',
    start: null,
    end: null,
  });

  // Applied filters for API fetch
  const [searchParams, setSearchParams] = useState({
    status: 'All',
    start: null,
    end: null,
    searchText: "",
  });

  const navigate = useNavigate();
  const { setLoading } = useLoader();

  useEffect(() => {
    fetchVehicleList();
  }, [searchParams, currentPage, pageSize, sortColumn, sortDirection]);

  const fetchVehicleList = async () => {
    setSkeleton(true);
    try {
      const request = {
        status: searchParams.status,
        start: searchParams.start,
        end: searchParams.end,
        searchText: searchParams.searchText,
        page: currentPage,
        pageSize,
        sortColumn,
        sortDirection,
      };

      const response = await getVehiclesList(request);
      setVehicles(response.data);
      setTotalEntries(response.total);
      setTotalPages(Math.ceil(response.total / pageSize));
    } catch (error) {
      console.error("Failed to fetch vehicle list:", error);
    } finally {
      setSkeleton(false); // Stop loader
    }

  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this vehicle?");
    if (!confirmed) return;

    try {
      await deleteVehicleById(id);
      fetchVehicleList();
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = vehicles.map((v) => v.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
    setSelectAll(checked);
  };

  const handleSelectOne = (id, checked) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id)
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;

    const confirmed = window.confirm("Are you sure you want to delete selected vehicles?");
    if (!confirmed) return;

    try {
      await deleteMultipleVehicles(selectedIds);
      fetchVehicleList();
      setSelectedIds([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Failed to delete selected vehicles:", error);
    }
  };

  const handleSearchClick = () => {
    setSearchParams({
      status: filters.status,
      start: filters.start,
      end: filters.end,
      searchText: searchText,
    });
    setCurrentPage(1); // reset to first page
  };

  const handleDRFilter = ({ start, end }) => {
    setFilters((prev) => ({ ...prev, start, end }));
  };

  const handleStatusFilter = (status) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };
  const handleAddClick = () => {
    setLoading(true);
    navigate("/add-vehicle");
  };

  const handleEditClick = (id) => {
    setLoading(true); // show loader immediately
    navigate(`/edit-vehicle/${id}`);
  };

  return (
    <div className="space-y-3">
      <div className="p-6 bg-gray-50">
        <div className="flex justify-between">
          <div></div>
          <AddButton label="Add Vehicle" onClick={handleAddClick} />
        </div>
      </div>

      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-6">Vehicle List</h1>
          <div className="flex space-x-4 items-end">
            <StatusFilter onChange={handleStatusFilter} />
            <DateRangeFilter placeholder="Date register filter" onChange={handleDRFilter} />
            <SearchButton onclick={handleSearchClick} />

            {selectedIds.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete Selected ({selectedIds.length})
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto bg-white">
          <div className="max-h-[540px] overflow-y-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-indigo-50 text-gray-700 uppercase text-xs sticky top-0 z-10">
                <tr>
                  <th className="p-4">
                    <span className="flex space-x-3">
                      <span>#</span>
                      <span>
                        <Checkbox checked={selectAll} onChange={handleSelectAll} />
                      </span>
                    </span>
                  </th>
                  <th
                    className="p-4 cursor-pointer select-none"
                    onClick={() => handleSort("registration")}
                  >
                    <span className="flex items-center space-x-1">
                      <span>Registration</span>
                      <SortIcons
                        active={sortColumn === "registration"}
                        direction={sortDirection}
                      />

                    </span>
                  </th>
                  <th
                    className="p-4 cursor-pointer select-none"
                    onClick={() => handleSort("manufacturer")}
                  >
                    <span className="flex items-center space-x-1">
                      <span>Manufacturer</span>
                      <SortIcons
                        active={sortColumn === "manufacturer"}
                        direction={sortDirection}
                      />

                    </span>
                  </th>
                  <th className="p-4">Model</th>
                  <th
                    className="p-4 cursor-pointer select-none"
                    onClick={() => handleSort("date_registered")}
                  >
                    <span className="flex items-center space-x-1">
                      <span>Date Registered</span>
                      <SortIcons
                        active={sortColumn === "date_registered"}
                        direction={sortDirection}
                      />
                    </span>
                  </th>
                  <th className="p-4">Maintenance Interval (months)</th>
                  <th className="p-4">Fuel</th>
                  <th
                    className="p-4 cursor-pointer select-none"
                    onClick={() => handleSort("status")}
                  >
                    <span className="flex items-center space-x-1">
                      <span>Status</span>
                      <SortIcons
                        active={sortColumn === "status"}
                        direction={sortDirection} />
                    </span>
                  </th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {skeleton ? (
                  [...Array(5)].map((_, index) => (
                    <tr key={index} className="animate-pulse border-b">
                      {[...Array(9)].map((_, i) => (
                        <td key={i} className="p-4">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : vehicles.length > 0 ? (
                  vehicles.map((vehicle, index) => (
                    <tr key={vehicle.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <span className="flex space-x-3">
                          <span>{index + 1}</span>
                          <span>
                            <Checkbox
                              checked={selectedIds.includes(vehicle.id)}
                              onChange={(checked) => handleSelectOne(vehicle.id, checked)}
                            />
                          </span>
                        </span>
                      </td>
                      <td className="p-4">{vehicle.registration}</td>
                      <td className="p-4">{vehicle.manufacturer}</td>
                      <td className="p-4">{vehicle.model}</td>
                      <td className="p-4">{vehicle.date_registered}</td>
                      <td className="p-4">{vehicle.maintenance_interval_months}</td>
                      <td className="p-4">{vehicle.fuel_type}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${vehicle.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : vehicle.status === "Unavailable"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"}`}
                        >
                          {vehicle.status || "Maintenance"}
                        </span>
                      </td>
                      <td className="p-4 flex space-x-3 text-blue-500">
                        <button title="Edit" onClick={() => handleEditClick(vehicle.id)}>
                          <FaEdit />
                        </button>
                        <button
                          title="Delete"
                          className="text-red-500"
                          onClick={() => handleDelete(vehicle.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="p-4 text-center text-gray-400">
                      No record found.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>

          </div>

        </div>

        <div className="pt-2 pb-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            totalEntries={totalEntries}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleList;
