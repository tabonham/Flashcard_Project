import React, { useState } from 'react';
import CardView from './CardView';

/**
 * @props
 * take in the deck to get the cards  
 * @returns 
 * a list of cards 
 */

export const CardList = ({ deck }) => {
    // map through the list of cards
    const [cards, setCards] = useState(deck.cards);

    const list = cards.map((card) => <CardView key={card.id} card={card} />)
    
    return (
        <section className='container'>
            <div className='row'>
                {list}
            </div>
        </section>
    );
};

export default CardList;