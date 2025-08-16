import profileImg from '../assets/logo(1).png'
const Skills = () => (
    <div>
        <h2 className="text-xl font-bold mb-4 mt-10">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 text-sm mt-7">
          <div >
            <p className="font-semibold">Adobe Creative Suite</p>
            <p>Photoshop, Illustrator,<br /> InDesign, XD, After<br /> Effects</p>
          </div>
          <div>
            <p className="font-semibold">Prototyping</p>
            <p>Sketch, Figma, InVision,<br /> Marvel, Principle,<br /> Balsamiq</p>
          </div>
          <div>
            <p className="font-semibold">Additional</p>
            <p>HTML, CSS, Google<br /> Analytics, Keynote, Miro</p>
          </div>
          <div>
            <p className="font-semibold">Languages</p>
            <p>Conversational English<br /> and Native Russian</p>
          </div>
        </div>
        
    </div>
);
export default Skills;