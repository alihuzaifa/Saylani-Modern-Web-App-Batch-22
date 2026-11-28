// import { Outlet } from "react-router";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import "../styles/layout.css";

import { Outlet } from "react-router";

// const Layout = () => {
//   return (
//     <>
//       <div className="app">
//         <Sidebar />

//         <div className="main-layout">
//           <Topbar />

//           <main className="main-content">
//             <Outlet />
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Layout;

const Layout = () => {
  return (
    <>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id velit
        accusamus mollitia aut odit architecto ab dolor suscipit commodi laborum
        error illum assumenda at ad, consectetur unde hic perspiciatis, officia
        doloribus fugit. Eveniet aliquid voluptatem maiores animi at ea. Modi,
        dolorum rem quaerat tempora, consequuntur commodi, exercitationem
        tenetur nemo minima fugit corrupti optio quasi! Facilis at qui vero
        ipsum, illo suscipit molestiae quisquam porro labore enim ducimus,
        tempore quo distinctio tenetur veritatis exercitationem itaque facere
        officiis nam dolorum dolorem inventore. Nam quam dolores maiores
        corrupti sapiente illum iusto modi! Nostrum cum vel magnam perferendis,
        nulla tempora ullam. Corrupti, aliquid beatae.
      </p>
      <Outlet />
    </>
  );
};
export default Layout;
