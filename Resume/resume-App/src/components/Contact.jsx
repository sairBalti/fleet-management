import { FaLinkedin, FaBehance } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="text-sm sm:text-base text-gray-700 space-y-2">
      <p>im.mmarinko@gmail.com</p>
      <p>+31 64 0123 178</p>
      <p>Amstelveen, Netherlands</p>
      <div className="flex space-x-3 pt-2">
        <FaLinkedin className="text-black text-xl cursor-pointer" />
        <FaBehance className="text-black text-xl cursor-pointer" />
      </div>
    </div>
  );
};
export default Contact;