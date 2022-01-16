import React from 'react'

function Home(props) {
    return (
        <>
        <h1 className={`text-center text-${props.theme==="light"?"dark":"light"}`}>Home</h1>
        </>
    )
}

export default Home
