import React from 'react'

const WorkshopClassListCards = ({ id, title, thumbnail, shortdescr, price, }) => {


    return (

        <section class="card_container">
            <article>
                <div class="article-wrapper">
                    <figure>
                        <img src={thumbnail} alt="" />
                    </figure>
                    <div class="article-body">
                        <h2>{title}</h2>
                        <p>
                            {shortdescr}
                        </p>
                        <a href={`/workshopslist/${id}`} class="read-more">
                            Read more <span classz="sr-only"></span>
                        </a>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default WorkshopClassListCards;