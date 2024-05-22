//NOTE: At first I considered to use a single component for all Single Character, Planet, Starship and Vehicle.
//Specially because de format is pretty much the same. The idea was to Map the object stating the
//key and the value of it, but unfortunatelly the information coming from the API was dissorganise and this was 
//afecting the final result in the site, so I was forced to set individual component for each category.

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext"
import "../../styles/SingleCard.css"

export const SingleCharacter = () =>{
    const navigate = useNavigate();
    const {store, actions} = useContext(Context)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [planetLoaded, setPlanetLoaded] = useState(false)
    const [isFavourite, setIsFavourite] = useState(false)
    const {id} = useParams()
    
    useEffect(()=>{
        if (!dataLoaded){
            actions.getSingleCharacter(id)
                .then(()=>setDataLoaded(true))
                .catch((error) => console.log(error))
        }
        else if (!planetLoaded){
            const urlPlanet = store.singleCharacter.properties.homeworld.split('/')
            const planetId = urlPlanet[urlPlanet.length-1]

            actions.getSinglePlanet(planetId)
                .then(()=>setPlanetLoaded(true))
                .catch((error) => console.log(error))
        }
    }, [store.singleCharacter, dataLoaded, planetLoaded])

    useEffect(() => {
        if (dataLoaded && planetLoaded){
            setIsFavourite(store.favourites.some(fav => 
                fav.id === store.singleCharacter.uid && 
                fav.name === store.singleCharacter.properties.name && 
                fav.category === "characters"
            ))
        } 
    }, [store.favourites, dataLoaded, planetLoaded, store.singleCharacter])

    const handleReturn = () => {
        navigate("/")
    }
    
    const clickFavourite = () => {
        const favourite = {
          id: store.singleCharacter.uid,
          name: store.singleCharacter.properties.name,
          category: "characters"
        }
        actions.handleFavourite(favourite)
        isFavourite ? setIsFavourite(false) : setIsFavourite(true)
    }

    if (dataLoaded && planetLoaded){
        return(
            <div className="container row bgSingleCard rounded-5 py-lg-5 py-md-4 py-3">
                <div className="col-12 col-lg-4 d-flex justify-content-center">
                    <img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} 
                        onError={(element)=>{element.target.src="https://starwars-visualguide.com/assets/img/placeholder.jpg"}}
                        className="img-fluid rounded-4"/>
                </div>
                <div className="col-12 col-lg-8 row dataText mt-3 mt-lg-0">
                    <div className="col-12 row">
                        <h1 className="singleName text-center col-8 col-lg-10">{store.singleCharacter.properties.name.toLowerCase()}</h1>
                        <button className="btn me-3 like-single-btn col-4 col-lg-2 ms-auto" onClick={clickFavourite}>
                            <i className={isFavourite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                        </button>
                    </div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Height:</span> {store.singleCharacter.properties.height} cm</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Weight:</span> {store.singleCharacter.properties.mass} Kg</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Gender:</span> {store.singleCharacter.properties.gender} </div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Hair Color:</span> {store.singleCharacter.properties.hair_color}</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Eye Color:</span> {store.singleCharacter.properties.eye_color} </div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Skin Color:</span> {store.singleCharacter.properties.skin_color}</div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Birth:</span> {store.singleCharacter.properties.birth_year} </div>
                    <div className="col-12 col-xl-6"><span className="text-decoration-underline fw-bold">Home Planet:</span> {store.singlePlanet.properties.name}</div>
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