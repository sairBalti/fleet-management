import { useState, useEffect, useRef  } from 'react';
import { FaStar } from 'react-icons/fa';
import venDaigram from '../../assets/car2.svg';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Modal from '../../components/Modal';
import { getVehicleInspection } from "../../services/VehicleService";
import VanCar from '../../components/vanCar';

const FleetInspectionDetails = () => {
  const [inspectionList, setInspectionList] = useState([]);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchInspectionData();
  }, []);

  const fetchInspectionData = async () => {
    try {
      const data = await getVehicleInspection();
      setInspectionList(data); // this should be an array of inspection detail objects
    } catch (error) {
      console.error("Error fetching inspections:", error);
    }
  };

  const handleOpenModal = (item) => {
    setSelectedInspection(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInspection(null);
  };
  const handleContainerScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const isNearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 100;

    if (isNearBottom && visibleCount < inspectionList.length) {
      setVisibleCount((prev) => prev + 6);
    }
  };

   return (
      <div
        className="h-[calc(100vh-100px)] overflow-y-auto px-2"
        onScroll={handleContainerScroll}
        ref={containerRef}
      >
      <div className="min-h-[112vh] grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-6">
        {inspectionList.slice(0, visibleCount).map((item, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-3 relative">
            <h1 className="text-sm font-medium text-green-600">{item.inspectionInfo.inspection_result}</h1>
            <div className='flex justify-between items-center pr-12 '>
              <div className="grid grid-cols-2 gap-x-4 text-sm text-gray-700 ">
                  <div className="flex gap-4"><span className="font-medium">Inspection ID:</span><span>{item.inspectionInfo.inspection_id}</span></div>
                  <div className="flex gap-4"><span className="font-medium">Fleet:</span><span>{item.inspectionInfo.fleet}</span></div>
                  <div className="flex gap-4"><span className="font-medium">Inspector:</span><span>{item.inspectionInfo.inspector_name}</span></div>
                  <div className="flex gap-4"><span className="font-medium">Date:</span><span>{item.inspectionInfo.inspection_date}</span></div>
              </div>
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={parseFloat(item.inspectionInfo.overall_score)}
                  maxValue={5}
                  text={`${item.inspectionInfo.overall_score}/5`}
                />
              </div>
            </div>

            {/* Rating Stars */}
            <div className="mt-4 grid grid-cols-4 gap-1 text-sm">
              {item.ratings.map((r, i) => (
                <div key={i}>
                  <span className="text-gray-500">{r.category}</span>
                  <div className="text-yellow-400">
                    {[...Array(parseInt(r.rating))].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* View Details Link */}
            <div className="mt-4 text-right">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenModal(item);
                }}
                className="text-blue-500 font-medium hover:underline text-sm"
              >
                Detail View
              </a>
            </div>
          </div>
        ))}

        {/* Modal */}
        {isModalOpen && selectedInspection && (
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className="space-y-4"> {/* controls spacing between sections */}

              {/* Rating Guide */}
              <div>
                <h4 className="font-semibold mb-1">Rating Guide</h4>
                <div className="w-full h-5 bg-gradient-to-r from-blue-700 to-blue-100 rounded-full relative">
                  {selectedInspection.rating_guide.map((guide, index) => (
                    <span
                      key={index}
                      className="absolute text-white text-xs pl-2"
                      style={{ left: `${(index / selectedInspection.rating_guide.length) * 100}%` }}
                    >
                      {guide.max_value}
                    </span>
                  ))}
                </div>
              </div>

              {/* SVG Car
              <div className="relative">
                <img src="/src/assets/4f22244e-1ed6-4b0e-ab72-6192e72ebab7_removalai_preview.png" alt="Van Logo" />
                <div className="absolute top-[20%] left-[30%] text-green-500 text-xl"><i className="fas fa-info-circle"></i></div>
                <div className="absolute top-[40%] left-[45%] text-red-500 text-xl"><i className="fas fa-exclamation-circle"></i></div>
              </div> */}

              {/* Documents and Notes Section (merged together to remove spacing between them) */}
              <div className="">
                {/* PDF Documents */}
                <div>
                  <h4 className="font-semibold mb-2">Documents of Inspection</h4>
                  <div className="flex flex-wrap gap-4">
                    {selectedInspection.documents && selectedInspection.documents.length > 0 ? (
                      selectedInspection.documents.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.file_path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-red-100 p-2 rounded shadow text-center w-24"
                        >
                          <div className="bg-red-500 text-white font-bold px-4 py-2 rounded">PDF</div>
                          <p className="text-xs mt-2 break-words text-gray-700">{doc.file_name}</p>
                        </a>
                      ))
                    ) : (
                      <p className="text-sm text-gray-700">No documents available.</p>
                    )}
                  </div>
                </div>

                {/* Notes & Action */}
                <div>
                  <h4 className="font-semibold mb-2">Notes And Comments</h4>
                  <p className="text-sm text-gray-700 mb-4">
                    {selectedInspection.inspectionInfo.notes}
                  </p>

                  <h4 className="font-semibold mb-2">Action Taken</h4>
                  <p className="text-sm text-gray-700">
                    {selectedInspection.inspectionInfo.action_taken}
                  </p>
                </div>
              </div>

  </div>

          </Modal>
        )}
        </div>
  
    </div>

  );
};

export default FleetInspectionDetails;







// import { FaStar, FaRegStar } from 'react-icons/fa';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import 'react-icons/fa';
// import venDaigram from '../../assets/car2.svg';
// import { getVehicleInspection } from "../../services/VehicleService";
// import { useEffect, useState } from 'react';

// const FleetInspectionDetails = () => {
//     const ratingCategories = [
//         'Exterior', 'Mirrors', 'Tires', 'Engine Lights', 'Interior',
//         'Engine', 'Safety Equip', 'Fluid Leaks'
//     ];
//     const [inspectionData, setInspectionData] = useState([]);
//     const [selectedInspection, setSelectedInspection] = useState(null);

//     useEffect(() => {
//         fetch('/api/inspection/list')
//             .then(res => res.json())
//             .then(data => setInspectionData(data))
//             .catch(err => console.error("Failed to fetch inspections", err));
//     }, []);


//     return (
//         <div className="space-y-3">
//             {/* Header */}
//             <div className="text-sm text-gray-400">Fleet Inspection / <span className="text-black font-medium">Inspection Details</span></div>
//             {inspectionData.map((entry, idx) => (
//                 <div key={idx} className="bg-white p-4 shadow rounded flex flex-col lg:flex-row items-center gap-4">
//                     <div className="w-28 h-28">
//                         <CircularProgressbar value={entry.inspectionInfo.overall_score * 20} text={`${entry.inspectionInfo.overall_score}/5`} maxValue={100} />
//                     </div>
//                     <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
//                         {entry.ratings.map((rating, i) => (
//                             <div key={i} className="text-center text-sm">
//                                 <p className="text-gray-500 font-medium mb-1">{rating.category}</p>
//                                 <div className="flex justify-center text-yellow-400">
//                                     {[...Array(5)].map((_, j) => (
//                                         <FaStar key={j} className={j < rating.rating ? 'text-yellow-400' : 'text-gray-300'} />
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <button
//                         onClick={() => setSelectedInspection(entry)}
//                         className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
//                     >
//                         View Inspection Detail
//                     </button>
//                 </div>
//             ))}

//             {selectedInspection && (
//                 <InspectionDetailModal
//                     data={selectedInspection}
//                     onClose={() => setSelectedInspection(null)}
//                 />
//             )}
     
  

//       {/* Top Card */ }
//     <div className="bg-white p-4 shadow rounded">
//         <h2 className="text-xl font-semibold mb-4">Inspection Details</h2>
//         <div className="grid md:grid-cols-5 text-sm text-gray-700 gap-2">
//             <div><strong>Inspection ID:</strong> Inspection #123</div>
//             <div><strong>Fleet:</strong> Truck A</div>
//             <div><strong>Inspector:</strong> Johan Doe</div>
//             <div><strong>Inspection Date:</strong> 23/09/23</div>
//             <div><strong>Inspection Result:</strong> <span className="text-green-600 font-semibold">Pass</span></div>
//         </div>
//     </div>

//     {/* Score and Ratings */ }
//     <div className="bg-white p-4 shadow rounded flex flex-col lg:flex-row items-center gap-4">
//         <div className="w-32 h-32">
//             <CircularProgressbar value={84} text={`4.7/5`} maxValue={5} className='' />
//         </div>
//         <div className="flex-1 grid grid-cols-2 md:grid-cols-8 gap-4 pl-[3rem]">
//             {ratingCategories.map((label) => (
//                 <div key={label} className="text-start text-sm">
//                     <p className="text-gray-500 font-medium mb-1">{label}</p>
//                     <div className="flex justify-start text-yellow-400">
//                         {[...Array(5)].map((_, i) => <FaStar key={i} />)}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     </div>

//     {/* Rating Guide */ }
//     <div className="bg-white p-4 shadow rounded">
//         <h3 className="text-md font-semibold mb-2">Rating Guide</h3>
//         <div className="w-full bg-gradient-to-r from-blue-700 to-blue-100 h-6 rounded-full relative ">
//             <div className="absolute left-0 text-white text-xs font-medium pl-2">Very Good</div>
//             <div className="absolute left-[20%] text-white font-medium text-xs">Good</div>
//             <div className="absolute left-[40%] text-white text-xs font-medium">Fair</div>
//             <div className="absolute left-[60%] text-white text-xs font-medium">Poor</div>
//             <div className="absolute left-[80%] text-white text-xs font-medium">Very Poor</div>

//         </div>
//     </div>

//     {/* Van Diagram */ }
//     <div className="bg-white p-1 shadow rounded flex justify-center ">
//         <img src={venDaigram} alt="Van Diagram" className="max-w-2xl w-full h-[600px] " />
//         <div className="absolute top-[20%] left-[30%] text-green-500 text-xl"><i className="fas fa-info-circle"></i></div>
//         <div className="absolute top-[40%] left-[45%] text-red-500 text-xl"><i className="fas fa-exclamation-circle"></i></div>
//         {/* Add more icons as needed */}
//     </div>

 

  
//     </div >
//   );
// };

// export default FleetInspectionDetails;
