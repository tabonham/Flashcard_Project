import React from 'react';
import {  Link, useHistory } from 'react-router-dom';
import { deleteDeck } from '../utils/api';

/**
 * @props
 * a indvidual deck
 * @returns
 * Shows name and description of deck with the buttons view/study/delete
 */
export const Deck = ({ deck }) => {
    // useHsitory for if delete deck button is used taken back to homepage
    const history = useHistory();
    
    const handleDelete = async () => {
        const abortController = new AbortController();
        const result = window.confirm('Delete this deck?\n\nYou will not be able to recover it');
        if (result) {
            await deleteDeck(deck.id, abortController.signal);
            history.push('/');
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className='row'>
                    <h5 className="card-title">{deck.name}
                    <small className="float-right">{deck.cards.length} cards</small>
                    </h5>
                </div>
                <p className="card-text">{deck.description}</p>
                <div>
                    <Link to={`/decks/${deck.id}`}>
                        <button className='btn btn-secondary'>
                            <span className='oi oi-eye mr-2'></span>
                            View
                        </button>
                    </Link>
                    <Link to={`/decks/${deck.id}/study`}>
                        <button className='btn btn-primary'>
                            <span className='oi oi-book mr-2'></span>
                            Study
                        </button>
                    </Link>
                        <button className='btn btn-danger' onClick={handleDelete}>
                            <span className='oi oi-trash'></span>
                        </button>
                </div>       
            </div>
        </div>
    );
}

export default Deck;