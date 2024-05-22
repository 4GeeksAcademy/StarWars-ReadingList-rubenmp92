
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/Cards.css";
import { Card } from "../component/Card";
import { useNavigate } from "react-router-dom";

export const Favourites = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    if (!store.favourites) {
        return <div>Loading...</div>;
    }

    const clickReturn = () => {
        navigate("/")
    }

    return (
        <div className="mt-5 pb-5 accordion accordion-flush">
            <div className="accordion-item">
                <h1 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#favourites" aria-expanded="false" aria-controls="favourites">
                        <span className='ms-3 my-3'>Favourites</span>
                    </button>
                </h1>
                <div id="favourites" className="accordion-collapse collapse mt-3">
                    <div className="accordion-body d-flex pb-3 overflow-x-auto">
                        {store.count > 0 ? (
                            store.favourites.map((item) => (
                                <Card key={item.category+item.id} name={item.name} category={item.category} id={item.id} />
                            ))
                        ) : (
                            <div>
                                <h1 className="text-white">No favourites yet. Click on the button to start adding Favourites</h1>
                                <button className="btn ms-3 return-btn" onClick={clickReturn}>Return</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
