import React from 'react';
import Deck from './Deck';

/**
 * @props
 * 
 * @returns
 * a list of Deck components
 */

export const DeckList = ({ decks }) => {
    // map through prop
    const list = decks.map((deck) => <Deck key={deck.id} deck={deck} />);

    return (
        <section className='container'>
            <div className='col'>
                {list}
            </div>
        </section>
    );
}

export default DeckList;