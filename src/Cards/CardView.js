import React from 'react';
import { Link, useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { deleteCard } from '../utils/api';

/**
 * @props
 * an indvidual card
 * @returns 
 * a component that allows to edit or delete a card
 */

export const CardView = ({ card }) => {
    
    const { deckId } = useParams();
    // delete push back to the deck
    const history = useHistory();
    
    const { url } = useRouteMatch();
    // function for handledelete
    const handleDelete = async () => {
        const abortController = new AbortController();
        const result = window.confirm('Delete this card?\n\nYou will not be able to recover it');
        if (result) {
            await deleteCard(card.id, abortController.signal);
            history.push(`/decks/${deckId}`);
        }
    };

    return (
        <div className="card">
        <div className="card-body">
            <div className='col'>
                <p>{card.front}</p>
            </div>
            <div className='col'>
                <p>{card.back}</p>
                <Link to={`${url}/cards/${card.id}/edit`}>
                    <button className='btn btn-secondary'>
                        <span className='oi oi-pencil mr-2'></span>
                        Edit
                    </button>
                </Link>
                <button className='btn btn-danger' onClick={handleDelete}>
                    <span className='oi oi-trash'></span>
                </button>
            </div>
        </div>
      </div>
    );
};

export default CardView;