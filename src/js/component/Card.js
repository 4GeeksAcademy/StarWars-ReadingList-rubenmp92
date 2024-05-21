import React, {useContext, useState, useEffect} from 'react';
import { Context } from '../store/appContext';
import "../../styles/Card.css"
import { useNavigate } from 'react-router-dom';

export const Card = (props) => {

  const navigate = useNavigate()
  const {store, actions} = useContext(Context)
  const [isFavourite, setIsFavourite] = useState(false)

  const handleLearnMore = () => {
    navigate(`/${props.category}/${props.id}`)
  }
  const clickFavourite = () => {
    const favourite = {
      id: props.id,
      name: props.name,
      category: props.category
    }
    actions.handleFavourite(favourite)
    isFavourite ? setIsFavourite(false) : setIsFavourite(true)
  }

  useEffect(()=>{
    setIsFavourite(store.favourites.some(fav => 
      fav.id === props.id && 
      fav.name === props.name && 
      fav.category === props.category
    ))  
  }, [])

  return (
    <div className='card rounded-4 mx-2 d-flex flex-column'>
        <img 
            src={`https://starwars-visualguide.com/assets/img/${props.category}/${props.id}.jpg`} 
            onError={(element)=>{element.target.src="https://starwars-visualguide.com/assets/img/placeholder.jpg"}}
            className="card-img-top rounded-top-4"/>
        <div className="card-body rounded-bottom-4 d-flex flex-column justify-content-between">
          <h3 className="card-title">{props.name ? props.name : "Card Title"}</h3>
          <div className='row justify-content-between pt-3 mt-auto'>
            <button className="btn ms-3 more-btn col-6" onClick={handleLearnMore}>Learn more!</button>
            <button className="btn me-3 like-btn col-2" onClick={clickFavourite}><i className={isFavourite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i></button>
          </div>
        </div>
    </div>
  );
};