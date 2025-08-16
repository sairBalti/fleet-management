import edu1 from '../assets/group3.png'
import edu2 from '../assets/rectangle4.png'
import edu3 from '../assets/rectangle4(1).png'
import edu4 from '../assets/rectangle4(2).png'
import edu5 from '../assets/rectangle4(3).png'
import edu6 from '../assets/rectangle4(4).png'
const Education = () => (
    <div className='text-center'>
        <h2 className="text-xl font-bold mb-4">Education</h2>
    
        <div className="flex flex-col items-center mb-6">
            <img src={edu1} alt="group3" className="mb-2" />
            <p className="font-semibold">Interface Design: <br /> Web & Mobile</p>
            <p className="text-base text-gray-500">IT-Academy, 2020</p>
        </div>
        {/* Entry 2 */}
        <div className="flex flex-col items-center mb-6">
            <img src={edu2} alt='group3' className='mb-2'></img>
            <p className="font-semibold">Fundamentals <br /> of Usability</p>
            <p className="text-sm text-gray-500">Skillshare, Oct 2018</p>
        </div>
        {/* Entry 3 */}
        <div className="flex flex-col items-center mb-6">
            <img src={edu3} alt='group3' className='mb-2'></img>
            <p className="font-semibold">CG Artist</p>
            <p className="text-sm text-gray-500">Polygon CG School,</p>
            <p className="text-sm text-gray-500">May–Sep 2017</p>
        </div>
        {/* Entry 4 */}
        <div className="flex flex-col items-center mb-6">      
            <img src={edu4} alt='group3' className='mb-2'></img>
            <p className="font-semibold">Graphic Design</p>
            <p className="text-sm text-gray-500">Belarusian State<br /> Academy of Arts,<br /> 2015–2017</p>
            <p className="text-sm">Postgraduate Diploma</p>
        </div>
        {/* Entry 4 */}
        <div className="flex flex-col items-center mb-6">
            <img src={edu5} alt='group3'className='mb-2'></img>
            <p className="font-semibold">Graphic Design</p>
            <p className="font-semibold">SEO Specialist</p>
            <p className="text-sm text-gray-500">ARTOX Media,<br /> Jun–Aug 2012</p>
        </div>
        {/* Entry 5 */}
        <div className="flex flex-col items-center mb-6">
            <img src={edu6} alt='group3' className='mb-2'></img>
            <p className="font-semibold">Graphic Design</p>
            <p className="font-semibold">Information <br />Technology Software</p>
            <p className="text-sm text-gray-500">Belarusian State<br /> University of Informatics<br /> and Radioelectronics,<br /> 2011–2015</p>
            <p className="text-sm">Bachelor’s degree</p>
            <p className="text-sm text-gray-500 pt-1">Polotsk State Economic<br /> College, <br />2007–2011</p>
            <p className="text-sm">Associate’s degree</p>
        </div> 
        
    </div>
);
export default Education;