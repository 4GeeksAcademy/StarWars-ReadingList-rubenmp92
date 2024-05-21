import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import "../../styles/Cards.css"
import { Card } from './Card';

export const Cards = (props) => {
    const { store, actions } = useContext(Context);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = () => {
        if (loading || !hasMore) return;
        setLoading(true);
        switch (props.category) {
            case "Characters":
                actions.getCharacters(page).then((hasMorePages) => {
                    setHasMore(hasMorePages);
                    setLoading(false);
                });
                break;
            case "Starships":
                actions.getStarships(page).then((hasMorePages) => {
                    setHasMore(hasMorePages);
                    setLoading(false);
                });
                break;
            case "Planets":
                actions.getPlanets(page).then((hasMorePages) => {
                    setHasMore(hasMorePages);
                    setLoading(false);
                });
                break;
            case "Vehicles":
                actions.getVehicles(page).then((hasMorePages) => {
                    setHasMore(hasMorePages);
                    setLoading(false);
                });
                break;
            default:
                setLoading(false);
                break;
        }
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        setPage(1);
        setHasMore(true);
        loadMore();
    }, [props.category]);

    useEffect(() => {
        const handleScroll = (e) => {
            if (e.target.scrollWidth - e.target.scrollLeft === e.target.clientWidth) {
                loadMore();
            }
        };
        const scrollContainer = document.getElementById(`scroll-${props.category}`);
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [props.category, loading]);

    return (
        <div className="accordion-item">
            <h1 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${props.category}`} aria-expanded="false" aria-controls={props.category}>
                    <span className='ms-3 my-3'>{props.category ? props.category : "Ejemplo"}</span>
                </button>
            </h1>
            <div id={props.category} className="accordion-collapse collapse mt-3">
                <div id={`scroll-${props.category}`} className="accordion-body d-flex pb-3 overflow-x-auto">
                    {store[props.category.toLowerCase()].map((item) => (
                        <Card key={item.uid} name={item.name} category={props.category.toLowerCase()} id={item.uid} />
                    ))}
                    {loading && <div>Loading...</div>}
                </div>
            </div>
        </div>
    );
};