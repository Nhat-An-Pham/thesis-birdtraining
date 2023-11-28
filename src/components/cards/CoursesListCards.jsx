import React from 'react'
import { Link } from 'react-router-dom';
import RawHTMLRenderer from '../../Management/component/htmlRender/htmlRender';

const CoursesListCards = ({ id, title, thumbnail, shortdescr, price, link }) => {
    return (

        <Link class="card_container" to={`/courseslist/${id}`}>
            <article>
                <div class="article-wrapper">
                    <figure>
                        <img src={thumbnail} alt="" />
                    </figure>
                    <div class="article-body">
                        <h2>{title}</h2>
                        <RawHTMLRenderer htmlContent={shortdescr} />
                        <p>
                            {price}$
                        </p>
                        <a href={`/courseslist/${id}`} class="read-more">
                            Read more <span classz="sr-only"></span>
                        </a>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default CoursesListCards;