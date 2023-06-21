import AdminPage from "./pages/AdminPage";
import BuyerPage from "./pages/BuyerPage";
import Login from "./pages/Login";
import OrderPage from "./pages/OrderPage";
import Signup from "./pages/Signup";

import { Link, createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
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
			path: "/Signup",
			element: <Signup />,
		},
		{
			path: "/orderpage",
			element: <OrderPage />,
		},
		{
			path: "/admin",
			element: <AdminPage />,
		},
	]);
	return <RouterProvider router={router} />;
}

export default App;
