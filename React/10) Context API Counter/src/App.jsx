// import { BrowserRouter, Route, Routes } from "react-router";
// import Purchase from "./pages/purchase";
// import Sales from "./pages/sales";
// import Stock from "./pages/stock";
// import Layout from "./layout/layout";
// import ProtectedRoutes from "./components/Protected";

import Counter from "./components/Counter";
import Navbar from "./components/Navbar";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* <Route element={<ProtectedRoutes />}> */}
//           <Route element={<Layout />}>
//             <Route path="/purchase" element={<Purchase />} />
//             <Route path="/sales" element={<Sales />} />
//             <Route path="/stock" element={<Stock />} />
//           </Route>
//         {/* </Route> */}
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

const App = () => {
  return (
    <div>
      <Navbar />
      <Counter />
    </div>
  );
};

export default App;
