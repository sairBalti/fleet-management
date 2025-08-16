
import profileImg from '../assets/logo(1).png'
const Image = () => (
    <div>
        <img
        src={profileImg}
        alt='profile'
        className='w-24 h-24 sm:h-24 sm:w-24 object-cover'
        ></img>
    </div>
);
export default Image;