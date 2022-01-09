import React, { useState, useEffect } from 'react'
import Card from './Card'

export default function Mainarea(props) {

    const { difficulty } = props;

    const [cardArray, setCardArray] = useState([]);
    const [revealedCardsArray, setRevealedCardsArray] = useState([]);
    const [cardsColArr, setcardsColArr] = useState([]);
    const [selection1, setSelection1] = useState(null);
    const [selection2, setSelection2] = useState(null);
    const [totalFlips, setTotalFlips] = useState(0);
    const [flipsRemaining, setflipsRemaining] = useState((props.difficulty * props.difficulty)/2);
    const [canSelect, setCanSelect] = useState(true);

    useEffect(() => {
        let tempCardArray = [];
        for (let i = 0; i < difficulty * difficulty; i++) {
            tempCardArray.push(i);
        }
        let shuffledArray = [];
        let revealedCards = [];
        let tempCardColArr = [];
        for (let i = 0; i < difficulty * difficulty; i++) {
            const randomIndex = Math.floor(Math.random() * tempCardArray.length);
            shuffledArray.push(tempCardArray[randomIndex]);
            tempCardArray.splice(randomIndex, 1);
            revealedCards.push(false);
            tempCardColArr.push("light")
        }
        setCardArray(shuffledArray);
        setRevealedCardsArray(revealedCards);
        setcardsColArr(tempCardColArr);
        // eslint-disable-next-line
    }, [])

    const handleSelection = (value) => {
        if (canSelect) {
            if (selection1 === null) {
                setSelection1(value);
                let newVisibleCardsArray = revealedCardsArray;
                newVisibleCardsArray[value] = true;
                setRevealedCardsArray(newVisibleCardsArray);
            }
            else if (selection1 !== value) {
                setSelection2(value);
                let newVisibleCardsArray = revealedCardsArray;
                newVisibleCardsArray[value] = true;
                setRevealedCardsArray(newVisibleCardsArray);
            }
        }
    }

    const hideCards = () => {
        let newVisibleCardsArray = revealedCardsArray;
        newVisibleCardsArray[selection1] = false;
        newVisibleCardsArray[selection2] = false;
        setRevealedCardsArray(newVisibleCardsArray);
    }

    const handleReset = () => {
        setSelection1(null);
        setSelection2(null);
    }

    useEffect(() => {
        if (selection1 !== null) {
            let newCardColArr = {...cardsColArr};
            newCardColArr[selection1] = "info";
            setcardsColArr(newCardColArr);
        }
    }, [selection1]);

    useEffect(() => {
        if (selection1 !== null && selection2 !== null) {
            setTotalFlips(prevState => prevState+1);
            let newCardColArr = {...cardsColArr};
            newCardColArr[selection2] = "info";
            setcardsColArr(newCardColArr);
            if (selection1 % 8 === selection2 % 8) {
                newCardColArr = {...cardsColArr};
                newCardColArr[selection1] = "success";
                newCardColArr[selection2] = "success";
                setcardsColArr(newCardColArr);
                handleReset();
                setflipsRemaining(prevState => prevState-1);
            }
            else {
                setCanSelect(false);
                newCardColArr = {...cardsColArr};
                newCardColArr[selection1] = "danger";
                newCardColArr[selection2] = "danger";
                setcardsColArr(newCardColArr);
                setTimeout(() => {
                    newCardColArr = {...cardsColArr};
                    newCardColArr[selection1] = "light";
                    newCardColArr[selection2] = "light";
                    setcardsColArr(newCardColArr);
                    hideCards();
                    handleReset();
                    setCanSelect(true);
                }, 1000);
            }
        }
    }, [selection2]);

    return (
        <div className='container my-3'>
            <h1 className="text-center">Flipper</h1>
            <h3>Selection1: {selection1}</h3>
            <h3>Selection2: {selection2}</h3>
            <h3>totalFlips: {totalFlips}</h3>
            <h3>flipsRemaining: {flipsRemaining}</h3>
            <div className="row">
                {cardArray.map((element) => {
                    return <Card key={element} value={element} visible={revealedCardsArray[element]} bgCol={cardsColArr[element]} handleSelection={handleSelection} />
                })}
            </div>
        </div>
    )
}
