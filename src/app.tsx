import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestroMitra from "./restromitra (1)";
import MemsabJi from "./memsab";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RestroMitra/>}/>
        <Route path="/memsab" element={<MemsabJi />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;