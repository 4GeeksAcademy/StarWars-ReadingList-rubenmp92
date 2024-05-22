import React from "react";
import "../../styles/home.css";
import { Cards } from "../component/Cards";

export const Home = () => {

	return(
		<div className="mt-5 pb-5 accordion accordion-flush">
			<Cards category="Characters"/>
			<Cards category="Starships"/>
			<Cards category="Planets"/>
			<Cards category="Vehicles"/>
		</div>
	);
};