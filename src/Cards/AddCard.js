import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api';
/**
 * Allows the user to add a new card 
 * @params
 * 
 * @returns
 * path = 'decks/:deckId/cards/new
 * 
 */

export const AddCard = () => {
    const { deckId } = useParams();

    const history = useHistory();

    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState({
        front: '',
        back: '',
    });
    const initalFormData = {
        front: '',
        back: '',
    };
    const [formData, setFormData] = useState({ ...initalFormData });

    // readDeck is used to push the deck name in the bread crumbs
    useEffect(() => {
        const abortController = new AbortController();

        async function getDeck(){
            const deck = await readDeck(deckId, abortController.signal);
            setDeck(deck);
        }
        getDeck();
    }, [deckId])

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };
    // If the user clicks done they are taken to the deck
    const handleDone = () => {
        history.push(`/decks/${deckId}`);
    };
    // If user clicks submit, then the form is submitted and then returned to the home screen
    const handleSubmit = (event) => {
        event.preventDefault();
        card.front = formData.front;
        card.back = formData.back;
        const abortController = new AbortController();
        async function addCard(){
            await createCard(deckId, card, abortController.signal);
            setCard(card);
        }
        addCard();
        setFormData({ ...initalFormData });
    };

    if (!card && !deck && formData.back === undefined) {
        return 'Loading...';
    } else {
        //breadcrumbs
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
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/decks/${deckId}`}>
                                {deck.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                    </ol>
                </nav>
                <h2>{deck.name}: Add Card</h2>
                <form>
                    <div className="form-group">
                        <label for="front">Front</label>
                        <textarea 
                            class="form-control" 
                            id="front" 
                            name='front'
                            rows="3" 
                            placeholder='Front side of card'
                            onChange={handleChange}
                            value={formData.front}
                        ></textarea>
                    </div>
                    <div class="form-group">
                        <label for="back">Back</label>
                        <textarea 
                            className="form-control" 
                            id="back" 
                            name='back'
                            rows="3" 
                            placeholder='back side of card'
                            onChange={handleChange}
                            value={formData.back}
                        ></textarea>
                    </div>
                    <button className='btn btn-secondary' onClick={handleDone}>
                        Done
                    </button>
                    <button className='btn btn-primary' onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </>
        );
    }
};

export default AddCard;