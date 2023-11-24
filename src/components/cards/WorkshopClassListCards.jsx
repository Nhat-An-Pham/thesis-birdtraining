import React from 'react'
import { Link } from 'react-router-dom';
import RawHTMLRenderer from '../../Management/component/htmlRender/htmlRender';

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
                        <RawHTMLRenderer htmlContent={shortdescr}/>
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