import React, { useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";



export const Navbar = () => {

	const {store, actions} = useContext(Context);
	const navigate = useNavigate()

	const clickFavourites = () => {
		navigate("/favourites")
	}

	const clickTitle = () => {
		navigate("/")
	}

	return (
		<nav className="navbar navbar-light mb-3">
			<span className="navbar-brand mb-0 ms-5" onClick={clickTitle}>STAR WARS</span>
			<div className="ml-auto">
				<button className="btn fav-btn me-5" onClick={clickFavourites}>
					Favourites
					<span className="badge rounded-pill bg-danger ms-2">
						{store.count}
						<span className="visually-hidden">unread messages</span>
					</span>
				</button>
			</div>
		</nav>
	);
};