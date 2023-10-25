import React from 'react'

const CoursesListCards = ({ id, title, thumbnail, shortdescr, price, link }) => {
    console.log(link);


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
                        <a href={`/courseslist/${id}`} class="read-more">
                            Read more <span classz="sr-only"></span>
                        </a>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default CoursesListCards;