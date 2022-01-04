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
        setCardArray(tempCardArray);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='container my-3'>
            <h1 className="text-center">Flipper</h1>
            <div className="row">
                {cardArray.map((element)=>{
                    return <Card key={element} value={element} />
                })}
            </div>
        </div>
    )
}
