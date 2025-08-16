import design from '../assets/logo(1).png'
import fdi from '../assets/Group10(0).png'
import ddi from '../assets/Group10(2).png'
import ss from '../assets/Group10(1).png'
import cs from '../assets/Group10.png'
import se from '../assets/Group10(3).png'
import ellips1 from '../assets/Ellipse1.png'
import ellips2 from '../assets/Ellipse1(1).png'
import ellips3 from '../assets/Ellipse.png'
import iicon from '../assets/Group2.png'

const Experience = () => (
    <div className="flex flex-col mb-8">
      <h2 className="text-xl font-bold mb-4">Work experience</h2>
      {/* Entry 1 */}
      <div className="mb-10 mt-10">
        <p className="text-sm text-gray-500">Jul 2019 – Present</p>
        <span className='flex flex-row items-center'>
          <p className="font-semibold text-blue-700">Freelance Designer </p>
          <img src={fdi} alt='fdi' className='pl-2 w-10 h-4'></img>
        </span>
        <p className="text-sm">Netherlands, Worldwide</p>
        <p className="text-sm mt-1">Available for a project or job in UX/UI, Visual and Product design.</p>
        <u className='flex flex-col text-blue-500 text-sm mt-1'>
              <a href="#">Commercial tryouts</a>
              <a href="#">Personal projects</a>
          </u>
      </div>
      {/* Entry 2 */}
      <div className="mb-7">
          <p className="text-sm text-gray-500">Jun 2017 – Sep 2018</p>
          <span className='flex flex-row items-center'>
            <p className="font-semibold">Digital Designer</p>
            <img src={ddi} alt='ddi' className='pl-2' />
          </span>
          <span className='flex flex-row items-center pt-2'>
            <img src={ellips1} alt='ellips1' className='pr-2' />
            <p className="text-sm font-semibold">J Creative Solutions </p>
            <p className='text-sm pl-1'>Digital agency in Minsk, Belarus</p>
          </span>
          <p className="text-sm mt-2">Created visuals for digital marketing channels such as social media,<br /> promo web and online ads. Developed visual language from scratch<br />
          or following the branding guidelines. Designed presentations<br />
          for clients and indoor purposes.</p>
          <u className='text-blue-500 text-sm'>
              <a href="#">Agency projects</a>
          </u>
      </div>
      {/* Entry 3 */}
      <div className="mb-7">
        <p className="text-sm text-gray-500">Mar 2014 – Feb 2017</p>
        <span className='flex flex-row items-center'>
          <p className="font-semibold">SEO Specialist → Lead SEO Specialist</p>
          <img src={ss} alt='ss' className='pl-2'/>
        </span>
        <span className='flex flex-row items-center pt-2'>
          <img src={ellips2} alt='ellips2' className='pr-2'/>
          <p className="text-sm font-semibold">OZ.by</p>
          <p className='text-sm pl-2'>Online bookstore in Minsk, Belarus</p>
        </span >
        <p className="text-sm mt-1">Improved website performance and user experience of the biggest<br /> online bookstore OZ in Belarus, being a part of the marketing team,<br />
          I interpreted Google Analytics data to IT, content and marketing<br />
          colleagues. Advised on tech and content optimization strategy,<br />
          automated processes, provided reports, increased organic traffic up<br /> to 150%.</p>
          <u className='text-blue-500 text-sm'>
              <a href="#">Annual company report 2016</a>
          </u>
      </div>
      {/* Entry 4 */}
      <div className="mb-7">
          <p className="text-sm text-gray-500">Aug 2012 – Nov 2013</p>
          <span className='flex flex-row items-center'>
            <p className="font-semibold">Content Specialist</p>
            <img src={cs} alt='cs' className='pl-2'/>
          </span>
          <span className='flex flex-row items-center pt-2'>
            <img src={ellips3} alt='ellips2' className='pr-2'/>
            <p className="text-sm font-semibold">21vek.by</p>
            <p className='text-sm pl-2'>E-commerce store in Minsk, Belarus</p>
        </span >
          
          <p className="text-sm mt-1">Added and modified the product information, prepared images and<br />
              text for the website, developed categories filters, ensure all info is<br />
              correct in the catalogue with the goal of improving online shopper<br /> experience.</p>
        </div>
        {/* Entry 5 */}
        <div className="mb-7 mt-6">
            <p className="text-sm text-gray-500">Aug 2011 – Nov 2014</p>
            <span className='flex flex-row items-center'>
              <p className="font-semibold">Software Support Engineer</p>
              <img  src={se} alt='se' className='pl-2'/>

            </span>
            <span className='flex flex-row items-center pt-2'>
              <img src={iicon} alt='ellips2' className='pr-2'/>
              <p className="text-sm font-semibold">Integral</p>
              <p className='text-sm pl-2'>Microelectronics factory, Minsk, Belarus</p>
            </span >
            <p className="text-sm mt-1">Supported retail accounting system LS Trade, troubleshoot technical<br /> problems.</p>
          </div>

    </div>
  );
  export default Experience;