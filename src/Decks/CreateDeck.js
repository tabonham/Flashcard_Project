import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../utils/api';

/**
 * Allows the user to create a new deck
 * @params
 * 
 * @returns
 * path = '/decks/new'
 * 
 */

export const CreateDeck = () => {
    const history = useHistory();

    const [deck, setDeck] = useState({
        name: '',
        description: '',
    });
    const initalFormData = {
        name: '',
        description: '',
    };
    const [formData, setFormData] = useState({ ...initalFormData });

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };
    // click cancel then taken to the homepage
    const handleCancel = () => {
        history.push('/');
    };
    // submit the form and then return to the deck screen
    const handleSubmit = (event) => {
        event.preventDefault();
        deck.name = formData.name;
        deck.description = formData.description;
        const abortController = new AbortController();
        async function addDeck(){
            const newDeck = await createDeck(deck, abortController.signal);
            console.log(newDeck);
            setFormData({ ...initalFormData });
            history.push(`/decks/${newDeck.id}`);
        }
        addDeck();
        
        
    };

    if (!deck) {
        return 'Loading...';
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
                        <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                    </ol>
                </nav>
                <h2>Create Deck</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            className="form-control" 
                            id="name" 
                            name='name'
                            rows="4" 
                            placeholder='Deck Name'
                            onChange={handleChange}
                            value={formData.name}
                        ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            class="form-control" 
                            id="description" 
                            name='description'
                            rows="4" 
                            placeholder='Brief description of the deck'
                            onChange={handleChange}
                            value={formData.description}
                        ></textarea>
                    </div>
                    <button className='btn btn-secondary' onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className='btn btn-primary' onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </>
        );
    }
};

export default CreateDeck;