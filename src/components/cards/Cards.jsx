import React from 'react'

const Cards = ({ title, thumbnail, shortdescr, price }) => {
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
                        <a href="/" class="read-more">
                            Read more <span class="sr-only"></span>
                        </a>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default Cards