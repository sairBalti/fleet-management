import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaTachometerAlt, FaTruck, FaChartBar, FaUser, FaCogs, FaTools, 
  FaRoute, FaComments, FaQuestionCircle 
} from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Sidebar = () => {
  const location = useLocation();
  const [openModule, setOpenModule] = useState(null);
  const [activeItem, setActiveItem] = useState("");

  // Update active item when location changes
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  // Sidebar menu data
  const menuItems = [
    {
      title: "Dashboard",
      icon: <FaTachometerAlt />,
      submodules: [
        { name: "KPIs", path: "/dashboard/kpis" },
        { name: "Real Time Statistics", path: "/dashboard/realtime" },
      ],
    },
    {
      title: "Fleet",
      icon: <FaTruck />,
      submodules: [
        { name: "Vehicle List", path: "/fleet/vehicles" },
        { name: "Fleet Overview", path: "/fleet/overview" },
        { name: "Fleet Inspection", path: "/fleet/inspection" },
        { name: "Fleet Assignment", path: "/fleet/assignment" },
      ],
    },
    {
      title: "Reports",
      icon: <FaChartBar />,
      submodules: [
        { name: "Monthly Reports", path: "/reports/monthly" },
        { name: "Annual Reports", path: "/reports/annual" },
      ],
    },
    {
      title: "Driver",
      icon: <FaUser />,
      submodules: [
        { name: "Driver Overview", path: "/driver/overview" },
        { name: "Driver Schedule", path: "/driver/schedule" },
        { name: "Driver Performance", path: "/driver/performance" },
      ],
    },
    { title: "Maintenance", icon: <FaTools />, path: "/maintenance" },
    { title: "Trips", icon: <FaRoute />, path: "/trips" },
    { title: "Chat", icon: <FaComments />, path: "/chat" },
    {
      title: "Settings",
      icon: <FaCogs />,
      submodules: [
        { name: "Account Settings", path: "/settings/account" },
        { name: "User Management", path: "/settings/users" },
        { name: "System Preferences", path: "/settings/preferences" },
      ],
    },
    { title: "Help Desk", icon: <FaQuestionCircle />, path: "/helpdesk" },
  ];

  // Toggle Submodule Visibility
  const toggleSubmenu = (index) => {
    setOpenModule(openModule === index ? null : index);
  };

  return (
    <div className="w-60 bg-white text-neutral-500 text-sm font-semibold h-screen p-4">
      <h2 className="text-xl font-bold text-center mb-4">Fleet Portal</h2>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="mb-2">
            {item.submodules ? (
              <>
                {/* Module with Submodules */}
                <button
                  onClick={() => toggleSubmenu(index)}
                  className={`flex items-center justify-between w-full p-2 rounded 
                    ${openModule === index || item.submodules.some(sub => sub.path === activeItem) ? "text-primary-500" : "text-neutral-500"}
                  `}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  <span>{openModule === index ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                </button>

                {/* Submodules */}
                {openModule === index && (
                  <ul className="pl-6 mt-1">
                    {item.submodules.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.path}
                          className={`block p-2 rounded transition-all 
                            ${activeItem === subItem.path ? "text-primary-500 font-semibold" : "text-neutral-500"}
                          `}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              // Module without Submodules
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded transition-all w-full 
                  ${activeItem === item.path ? "text-primary-500 font-semibold" : "text-neutral-500"}
                `}
              >
                <span className="mr-2">{item.icon}</span>
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
