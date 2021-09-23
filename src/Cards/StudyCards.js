import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck } from '../utils/api';
import Card from './Card';
import NotEnoughCards from './NotEnoughCards';

/**
 * Allows the user to studty the cards from certian decks
 * @returns
 * A componenet that allows the user to flip through a deck of flashcards and either reset or return to the home screen
 */

export const StudyCards = () => {
    //get the deckId
    const { deckId } = useParams();
   
    const [deck, setDeck] = useState({});
   
    useEffect(() => {
        const abortController = new AbortController();
        async function fetchDeck() {
            const data = await readDeck(deckId, abortController.signal);
            setDeck(data);
        }
        fetchDeck();
    }, [deckId])
    // if the deck.id doesnt exsist load
    if (!deck.id) {
        return "Loading..."
    } 
    // if there are not enough cards, return the component to addCards 
    if (deck.cards.length < 3) {
        return (
            <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to='/'>
                            <span className='oi oi-home mr-2'></span>
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <NotEnoughCards deck={deck}/>
            </>
        );
    } else {
        return (
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to='/'>
                        <span className='oi oi-home mr-2'></span>
                        Home
                    </Link>
                </li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
        </nav>
        <h3>Study: {deck.name}</h3>
        <div>
            <Card deck={deck}/>
        </div>
        </>
        );
    }
};

export default StudyCards;