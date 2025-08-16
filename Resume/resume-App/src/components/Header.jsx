import profileImg from '../assets/logo(1).png'
const Header = () => (
    <div>
        <div className='text-2xl sm:text-3xl font-bold text-gray-800'>
            <p className="text-lg sm:text-xl">Marina Lakotka</p>
            <p className="text-lg sm:text-xl">UI/UX Designer</p>
        </div>

            {/* Availability */}
        <div className="flex items-center gap-2 pt-3">
            <div className="w-6 h-3 bg-red-100 rounded-full relative">
            <div className="w-3 h-3 bg-white rounded-full absolute right-0 top-0 shadow-md"></div>
        </div>
        <span className="text-sm text-gray-700">Available</span>
    </div>
        
    </div>
);
export default Header;