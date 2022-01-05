import React from 'react'

const questionmarkClass = "bi bi-question-diamond-fill";
const iconClass = ["bi bi-alarm-fill",
    "bi bi-bell-fill",
    "bi bi-bug-fill",
    "bi bi-chat-left-text-fill",
    "bi bi-controller",
    "bi bi-git",
    "bi bi-code-slash",
    "bi bi-camera-reels-fill"
];

export default function Card(props) {
    return (
        <div className='col-3'>
            <center>
                <div className="card mx-2 my-3 py-2">
                    <h2><i className={`${props.visible?iconClass[props.value%8]:questionmarkClass}`}></i> {props.value}</h2>
                </div>
            </center>
        </div>
    )
}
