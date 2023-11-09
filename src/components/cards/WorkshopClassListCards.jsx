import React from 'react'
import { Link } from 'react-router-dom';

const WorkshopClassListCards = ({ id, title, thumbnail, shortdescr, price }) => {


    return (
        <Link class="card_container" to={`/workshopslist/${id}`}>
            <article>
                <div class="article-wrapper">
                    <figure>
                        <img src={thumbnail} alt="" />
                    </figure>
                    <div class="article-body">
                        <h2>{title}</h2>
                        <p className='card_article-description'>
                            {shortdescr}
                        </p>    
                        <p>
                            {price}$
                        </p>
                        <a href={`/workshopslist/${id}`} class="read-more">
                            Read more <span classz="sr-only"></span>
                        </a>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default WorkshopClassListCards;