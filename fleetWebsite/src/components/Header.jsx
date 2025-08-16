import { Link } from "react-router-dom";
import logo from "../assets/logoimg.png"; 
function Header() {
  return (
    <header className="flex justify-center items-center py-4">
      <div className="border-b border-gray-300 py-4 px-6 flex justify-between items-center w-[80%]">
      <div className="text-2xl font-bold">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-20" />
    
        </Link>
      </div>

      <nav>
        <Link
          to="http://localhost:5175/login"
          className="bg-white text-gray-600 px-4 py-2 rounded-sm hover:bg-gray-100 transition"
        >
          Login
        </Link>
      </nav>

      </div>
     
      
    </header>
  );
}

export default Header;
