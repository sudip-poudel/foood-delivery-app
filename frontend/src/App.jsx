import AdminPage from "./pages/AdminPage";
import BuyerPage from "./pages/BuyerPage";
import Login from "./pages/Login";
import OrderPage from "./pages/OrderPage";
import Signup from "./pages/Signup";
import ManageProducts from "./components/Admin/ManageProducts";
import AddProducts from "./components/Admin/AddProducts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditItems from "./components/Admin/EditItems";
import AdminLogin from "./pages/AdminLogin";
import Managecategory from "./components/Admin/ManageCategory";
import Checkout from "./pages/Checkout";
import useAuth from "../hooks/useAuth";
import Page404 from "./pages/Page404";

function App() {
  const { auth } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <BuyerPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/adminlogin",
      element: <AdminLogin />,
    },
    {
      path: "/Signup",
      element: <Signup />,
    },
    {
      path: "/checkout",
      element: auth.user ? <Checkout /> : <Page404 />,
    },
    // {
    // 	path: "/orderpage",
    // 	element: <OrderPage />,
    // },
    {
      path: "/admin",
      element: <AdminPage />,
      children: [
        {
          path: "order",
          element: <OrderPage />,
        },
        {
          path: "manageproducts",
          element: <ManageProducts />,
        },
        {
          path: "addproducts",
          element: <AddProducts />,
        },
        {
          path: "editproduct/:id",
          element: <EditItems />,
        },
        {
          path: "managecategory",
          element: <Managecategory />,
        },
      ],
    },
    {
      path: "/*",
      element: <Page404 />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
