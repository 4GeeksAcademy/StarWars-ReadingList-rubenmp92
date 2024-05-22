//NOTE: At first I considered to use a single component for all Single Character, Planet, Starship and Vehicle.
//Specially because de format is pretty much the same. The idea was to Map the object stating the
//key and the value of it, but unfortunatelly the information coming from the API was dissorganise and this was 
//afecting the final result in the site, so I was forced to set individual component for each category.

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/SingleCard.css";

export const SingleStarship = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [pilotsLoaded, setPilotsLoaded] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false)
    const { id } = useParams();
    
    const handleReturn = () => {
        navigate("/")
    }

    const clickFavourite = () => {
        const favourite = {
          id: store.singleStarship.uid,
          name: store.singleStarship.properties.name,
          category: "starships"
        }
        actions.handleFavourite(favourite)
        isFavourite ? setIsFavourite(false) : setIsFavourite(true)
    }

    useEffect(() => {
        actions.getSingleStarship(id)
            .then(() => {
                setDataLoaded(true);
                if (store.singleStarship.properties.pilots.length > 0) {
                    return actions.getPilots(store.singleStarship.properties.pilots);
                } else {
                    return Promise.resolve();
                }
            })
            .then(() => setPilotsLoaded(true))
            .catch(error => console.log(error));
    }, [id]);

    useEffect(() => {
        if (dataLoaded && pilotsLoaded){
            setIsFavourite(store.favourites.some(fav => 
                fav.id === store.singleStarship.uid && 
                fav.name === store.singleStarship.properties.name && 
                fav.category === "starships"
            ))
        } 
    }, [store.favourites, dataLoaded, pilotsLoaded, store.singleStarship])

    useEffect(() => {
        return () => {
            actions.clearPilotsList();
        };
    }, [id]);

    if (dataLoaded && pilotsLoaded) {
        return (
            <div className="container row bgSingleCard rounded-5 py-lg-5 py-md-4 py-3">
                <div className="col-12 col-lg-4 d-flex justify-content-center">
                    <img
                        src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
                        onError={(element) => {
                            element.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                        }}
                        className="img-fluid rounded-4"
                    />
                </div>
                <div className="col-12 col-lg-8 row dataText mt-3 mt-lg-0">
                    <div className="col-12 row">
                        <h1 className="singleName text-center col-8 col-lg-10">{store.singleStarship.properties.name.toLowerCase()}</h1>
                        <button className="btn me-3 like-single-btn col-4 col-lg-2 ms-auto" onClick={clickFavourite}>
                            <i className={isFavourite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                        </button>
                    </div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Model:</span> {store.singleStarship.properties.model}</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Class:</span> {store.singleStarship.properties.starship_class}</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Manufacturer:</span> {store.singleStarship.properties.manufacturer}</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Cost:</span> {store.singleStarship.properties.cost_in_credits} credits</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Length:</span> {store.singleStarship.properties.length}</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Cargo Capacity:</span> {store.singleStarship.properties.cargo_capacity} Tons</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Crew:</span> {store.singleStarship.properties.crew}</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Passengers:</span> {store.singleStarship.properties.passengers}</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Consumables:</span> {store.singleStarship.properties.consumables}</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Max Speed:</span> {store.singleStarship.properties.max_atmosphering_speed}</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Hyperdrive rate:</span> {store.singleStarship.properties.hyperdrive_rating}</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Sublight Speed:</span> {store.singleStarship.properties.MGLT}</div>
                    <div className="col-12"><span className="text-decoration-underline fw-bold">Pilots:</span> {store.pilotList.length > 0 ? store.pilotList.join(', ') : "unknown"}</div>
                    <div className="row justify-content-center pt-3 pt-lg-2">
                        <button className="btn ms-3 return-btn" onClick={handleReturn}>Return</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <img
                src="https://media2.giphy.com/media/JsDzMHc0Edo4YnDQxP/200w.gif?cid=6c09b9527pxbsm4fz11ieesmfzymnd9jmv5cmk8ytzbi5uhf&ep=v1_gifs_search&rid=200w.gif&ct=g"
                className="loading position-absolute top-50 start-50 translate-middle"
            />
        );
    }
};