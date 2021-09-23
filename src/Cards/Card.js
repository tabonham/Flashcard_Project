import React, { useState, } from 'react';
import { useHistory } from 'react-router-dom';

export const Card = ({ deck }) => {
    // window for reset and push back to homepage
    const history = useHistory();
    
    const [cards, setCards] = useState(deck.cards);
    // The state of the indivdual card side
    const [cardSide, setCardSide] = useState(deck.cards[0].front);
    
    const [cardIndex, setCardIndex] = useState(0);
    // handle for the flip, to go back and forth
    const handleFlip = (event) => {
        event.preventDefault();
        if (cardSide === cards[cardIndex].front) {
            setCardSide(cards[cardIndex].back);
        }
        if (cardSide === cards[cardIndex].back) {
            setCardSide(cards[cardIndex].front);
        }
    };
    // handle next 
    const handleNext = (event) => {
        event.preventDefault();
        setCardIndex((currentIndex) => currentIndex + 1);
        setCardSide(cards[cardIndex + 1].front);
    };
    // handle the last next button and the restart and push home
    const handleLast = async () => {
        const result = window.confirm("Restart Cards?\n\nClick 'cancel' to return to the home page");
        if (result) {
            setCardIndex(0);
            setCardSide(cards[0].front);
        } else {
            history.push('/');
        }
    } 
    // checks for last first 
    if ((cardSide === cards[cardIndex].back) && (cardIndex + 1 === cards.length)){
        return (
            <>
                <div className="card-body">
                    <h5 className="card-title">Card {cardIndex + 1} of {cards.length}</h5>
                    <p classname="card-text">{cardSide}</p>
                    <button className="btn btn-secondary" onClick={handleFlip}>
                        Flip
                    </button>
                    <button className="btn btn-primary" onClick={handleLast}>
                        Next
                    </button>
                </div>
            </>
        );
    } else if (cardSide === cards[cardIndex].front) {
        return (
            <>
                <div className="card-body">
                    <h5 className="card-title">Card {cardIndex + 1} of {cards.length}</h5>
                    <p className="card-text">{cardSide}</p>
                    <button className="btn btn-secondary" onClick={handleFlip}>
                        Flip
                    </button>
                </div>
            </>
        );
    } else if (cardSide === cards[cardIndex].back) {
        return (
            <>
                <div className="card-body">
                    <h5 className="card-title">Card {cardIndex + 1} of {cards.length}</h5>
                    <p className="card-text">{cardSide}</p>
                    <button className="btn btn-secondary" onClick={handleFlip}>
                        Flip
                    </button>
                    <button className="btn btn-primary" onClick={handleNext}>
                        Next
                    </button>
                </div>
            </>
        );
    } 
}

export default Card;