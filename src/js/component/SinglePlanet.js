//NOTE: At first I considered to use a single component for all Single Character, Planet, Starship and Vehicle.
//Specially because de format is pretty much the same. The idea was to Map the object stating the
//key and the value of it, but unfortunatelly the information coming from the API was dissorganise and this was 
//afecting the final result in the site, so I was forced to set individual component for each category.

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext"
import "../../styles/SingleCard.css"

export const SinglePlanet = () =>{
    const navigate = useNavigate();
    const {store, actions} = useContext(Context)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [isFavourite, setIsFavourite] = useState(false)
    const {id} = useParams()
    
    useEffect(()=>{
        if (!dataLoaded){
            actions.getSinglePlanet(id)
                .then(()=>setDataLoaded(true))
                .catch((error) => console.log(error))
        }
    }, [store.singlePlanet, dataLoaded])    
    
    useEffect(() => {
        if (dataLoaded){
            setIsFavourite(store.favourites.some(fav => 
                fav.id === store.singlePlanet.uid && 
                fav.name === store.singlePlanet.properties.name && 
                fav.category === "planets"
            ))
        } 
    }, [store.favourites, dataLoaded, store.singlePlanet])
    
    const handleReturn = () => {
        navigate("/")
    }

    const clickFavourite = () => {
        const favourite = {
          id: store.singlePlanet.uid,
          name: store.singlePlanet.properties.name,
          category: "planets"
        }
        actions.handleFavourite(favourite)
        isFavourite ? setIsFavourite(false) : setIsFavourite(true)
    }

    if (dataLoaded){
        return(
            <div className="container row bgSingleCard rounded-5 py-lg-5 py-md-4 py-3">
                <div className="col-12 col-lg-4 d-flex justify-content-center">
                    <img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} 
                        onError={(element)=>{element.target.src="https://starwars-visualguide.com/assets/img/placeholder.jpg"}}
                        className="img-fluid rounded-4"/>
                </div>
                <div className="col-12 col-lg-8 row dataText mt-3 mt-lg-0">
                    <div className="col-12 row">
                        <h1 className="singleName text-center col-8 col-lg-10">{store.singlePlanet.properties.name.toLowerCase()}</h1>
                        <button className="btn me-3 like-single-btn col-4 col-lg-2 ms-auto" onClick={clickFavourite}>
                            <i className={isFavourite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                        </button>
                    </div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Population:</span> {store.singlePlanet.properties.population}</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Diameter:</span> {store.singlePlanet.properties.diameter} Km</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Rotation Period:</span> {store.singlePlanet.properties.rotation_period} hours</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Orbital Period:</span> {store.singlePlanet.properties.orbital_period} days</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Climate:</span> {store.singlePlanet.properties.climate} </div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Terrain:</span> {store.singlePlanet.properties.terrain}</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Gravity:</span> {store.singlePlanet.properties.gravity} </div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Surface Water:</span> {store.singlePlanet.properties.surface_water}</div>
                    <div className="row justify-content-center pt-3 pt-lg-0">
                        <button className="btn ms-3 return-btn" onClick={handleReturn}>Return</button>
                    </div>
                </div>
            </div>
        );
    }
    else{
        return(
            <img src="https://media2.giphy.com/media/JsDzMHc0Edo4YnDQxP/200w.gif?cid=6c09b9527pxbsm4fz11ieesmfzymnd9jmv5cmk8ytzbi5uhf&ep=v1_gifs_search&rid=200w.gif&ct=g"
            className="loading position-absolute top-50 start-50 translate-middle"/>
        );
    };
};