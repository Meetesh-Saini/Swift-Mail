import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
	return (
		<div>

			<ToastContainer	/>
			<BrowserRouter>

				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/account/sign-in" element={<Login />} />
					<Route path="/account/sign-up" element={<Register />} />
				</Routes>
			</BrowserRouter>
		</div>

	);
}

export default App;
