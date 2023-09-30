import React from 'react'

const Cards = ({id,title,thumbnail, shortdescr,price}) => {
    return (
        <div className='cards_container'>
            <div className='cards_img'>
                <img src={thumbnail} alt=''></img>
            </div>
            <div className='cards_content'>
                <h2>{title}</h2>
                <p>{shortdescr}</p>
            </div>
        </div>
    )
}

export default Cards