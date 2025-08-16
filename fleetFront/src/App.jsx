
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import { LoaderProvider, useLoader } from "./context/LoaderContext";
import CustomLoader from "./components/CustomLoader";

const AppContent = () =>{
  const  { loading } = useLoader();
  return(
    <>
      {loading && <CustomLoader />}
      <AppRoutes />
    </>
  );
};
function App() {
  return (
    <LoaderProvider>
      <Router>
        <AppContent />
      </Router>
    </LoaderProvider>
    
  );
}

export default App;
