import React, { useState, useEffect } from 'react'
import Card from './Card'
import Timer from './Timer';

export default function Mainarea(props) {

    const theme = props.theme;

    const { difficulty } = props;
    const modValue = difficulty * 2;

    const [cardArray, setCardArray] = useState([]);
    const [revealedCardsArray, setRevealedCardsArray] = useState([]);
    const [cardsColArr, setcardsColArr] = useState([]);
    const [selection1, setSelection1] = useState(null);
    const [selection2, setSelection2] = useState(null);
    const [totalFlips, setTotalFlips] = useState(0);
    const [flipsRemaining, setflipsRemaining] = useState((difficulty * 4) / 2);
    const [canSelect, setCanSelect] = useState(true);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let tempCardArray = [];
        for (let i = 0; i < difficulty * 4; i++) {
            tempCardArray.push(i);
        }
        let shuffledArray = [];
        let revealedCards = [];
        let tempCardColArr = [];
        for (let i = 0; i < difficulty * 4; i++) {
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
            let newCardColArr = { ...cardsColArr };
            newCardColArr[selection1] = "info";
            setcardsColArr(newCardColArr);
        }
    }, [selection1]);

    useEffect(() => {
        if (selection1 !== null && selection2 !== null) {
            setTotalFlips(prevState => prevState + 1);
            let newCardColArr = { ...cardsColArr };
            newCardColArr[selection2] = "info";
            setcardsColArr(newCardColArr);
            if (selection1 % modValue === selection2 % modValue) {
                newCardColArr = { ...cardsColArr };
                newCardColArr[selection1] = "success";
                newCardColArr[selection2] = "success";
                setcardsColArr(newCardColArr);
                handleReset();
                setflipsRemaining(prevState => prevState - 1);
            }
            else {
                setCanSelect(false);
                newCardColArr = { ...cardsColArr };
                newCardColArr[selection1] = "danger";
                newCardColArr[selection2] = "danger";
                setcardsColArr(newCardColArr);
                setTimeout(() => {
                    newCardColArr = { ...cardsColArr };
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

    const handleTimeIncrement = () => {
        setSeconds(prevState => prevState + 1);
    }

    useEffect(() => {
        if (seconds === 60) {
            setSeconds(0);
            setMinutes(prevState => prevState + 1);
        }
    }, [seconds]);

    return (
        <div className='container my-3'>
            <h1 className={`text-center text-${theme === 'light' ? "dark" : "light"}`}>Flipper</h1>
            {
                flipsRemaining > 0 ?
                    <>
                        <div className="d-flex justify-content-between py-2">
                            <h4 className={`text-${theme === 'light' ? "dark" : "light"}`}>Total Flips Made: {totalFlips}</h4>
                            <h4 className={`d-flex align-items-center text-${theme === 'light' ? "dark" : "light"}`}>
                                <Timer
                                    minutes={minutes}
                                    seconds={seconds}
                                    incrementTime={handleTimeIncrement} />
                            </h4>
                            <h4 className={`text-${theme === 'light' ? "dark" : "light"}`}>Flips Remaining: {flipsRemaining}</h4>
                        </div>
                        <div className="row">
                            {cardArray.map((element) => {
                                return <Card
                                    key={element}
                                    value={element}
                                    visible={revealedCardsArray[element]}
                                    bgCol={cardsColArr[element]}
                                    handleSelection={handleSelection}
                                    difficulty={difficulty}
                                    theme={theme} />
                            })}
                        </div> </> :
                    <div className="my-4">
                        <h2 className={`text-center text-${theme === 'light' ? "dark" : "light"}`}>You Win</h2>
                        <h4 className={`text-center text-${theme === 'light' ? "dark" : "light"}`}>Total Flips Made: {totalFlips}</h4>
                        <h4 className={`text-center text-${theme === 'light' ? "dark" : "light"}`}>Total Time Taken: {minutes}:{seconds}</h4>
                    </div>
            }
        </div>
    )
}
