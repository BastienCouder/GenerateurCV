import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "../pages/Form";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages */}
        <Route path="/" element={<Form />} />

        {/*404*/}
        <Route path="*" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
