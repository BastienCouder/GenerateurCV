import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "../pages/Form";
import Cv from "../pages/PdfGenerator";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages */}
        <Route path="/" element={<Form />} />
        <Route path="/cv" element={<Cv />} />

        {/*404*/}
        <Route path="*" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
