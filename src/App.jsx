import BuyerPage from "./pages/BuyerPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import {
	Route,
	Link,
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
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
			path: "/sell",
			element: (
				<div>
					Seller
					<Link to="sell">Sell</Link>
				</div>
			),
		},
	]);
	return <RouterProvider router={router} />;
}

export default App;
