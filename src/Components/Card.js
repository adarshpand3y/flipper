import React from 'react'

export default function Card(props) {
    return (
        <div className='col-3'>
            <center>
                <div className="card mx-2 my-3 py-2">
                    <h2><i className="bi bi-question-diamond-fill"></i> {props.value}</h2>
                </div>
            </center>
        </div>
    )
}
