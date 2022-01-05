import React, {useState, useEffect} from 'react'
import Card from './Card'

export default function Mainarea(props) {

    const {difficulty} = props;

    const [cardArray, setCardArray] = useState([]);

    useEffect(() => {
        let tempCardArray = [];
        for (let i = 0; i < difficulty*difficulty; i++) {
            tempCardArray.push(i);
        }
        console.log(tempCardArray);
        let shuffledArray = [];
        for (let i = 0; i < difficulty*difficulty; i++) {
            const randomIndex = Math.floor(Math.random()*tempCardArray.length);
            shuffledArray.push(tempCardArray[randomIndex]);
            tempCardArray.splice(randomIndex, 1);
        }
        console.log(shuffledArray);
        setCardArray(shuffledArray);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='container my-3'>
            <h1 className="text-center">Flipper</h1>
            <div className="row">
                {cardArray.map((element)=>{
                    return <Card key={element} visible={false} value={element} />
                })}
            </div>
        </div>
    )
}
