import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {

    const member = [
        {
            id: "1",
            name: "Nhat An Pham",
            descr: "avian behaviour and training consultant,general manager - cape sanctuary, Hawkes bay",
            thumbnail: (require("../assets/pages/home/member/Nhat An Pham.jpeg")),

        }, {
            id: "2",
            name: "Nhat An Pham",
            descr: "avian behaviour and training consultant,general manager - cape sanctuary, Hawkes bay",
            thumbnail: (require("../assets/pages/home/member/Nhat An Pham.jpeg")),

        }, {
            id: "3",
            name: "Nhat An Pham",
            descr: "avian behaviour and training consultant,general manager - cape sanctuary, Hawkes bay",
            thumbnail: (require("../assets/pages/home/member/Nhat An Pham.jpeg")),

        }, {
            id: "4",
            name: "Nhat An Pham",
            descr: "avian behaviour and training consultant,general manager - cape sanctuary, Hawkes bay",
            thumbnail: (require("../assets/pages/home/member/Nhat An Pham.jpeg")),

        },
    ]

    const service = [
        {
            id: "1",
            name: "Private Consultation",
            descr: "In-home and Online Consultations for all of your parrot related questions or concerns including foundations, behaviour problems, enrichment and more!",
            image: (require("../assets/pages/home/service/Parrot.avif")),
            link: "/consultation",
        },
        {
            id: "2",
            name: "Professional Workshops and Services",
            descr: "Customised workshops/presentations or consulting services for professional organisations such as vets, rescues, shelters, zoos and other animal related businesses.",
            image: (require("../assets/pages/home/service/Parrot.avif")),
            link: "/workshops",
        },
        {
            id: "3",
            name: "Online Courses, webinars and more",
            descr: "On-demand, self paced courses and webinars on parrot training, behaviour, husbandry, enrichment and more.",
            image: (require("../assets/pages/home/service/Parrot.avif")),
            link: "/courses",
        },
        {
            id: "4",
            name: "Parrot Training Academy",
            descr: "Our unique Parrot Training Academy workshop series aimed at parrot enthusiasts of all skill levels and knowledge! In-person, Virtual and On Demand!",
            image: (require("../assets/pages/home/service/Parrot.avif")),
            link: "/birdacademy",
        },
    ]

    const review = {
        img: (require("../assets/pages/home/review/review.jpeg")),
        name: "Nhat An Pham",
        review: ".... My bird has been better since I use ... service, hoping this site will improve and go further in the future",
    }

    return (
        <div className='homepage'>
            {/* carousel */}
            <div className='home_section home_section-carousel'>
                <div className='home_carousel'>
                    <h1 className="home_carousel_section home_carousel_section-title">
                        Want To Train Your Bird
                        or Solve a Problem Behavior?
                    </h1>
                    <div className='home_carousel_section'>
                        <div className="home_carousel_section-curve"></div>
                    </div>
                    <button className="home_carousel_section home_carousel_section-button">Contact Us</button>
                    <div className="home_carousel_section home_carousel_section-achievement">
                        <div className='achievements_section achievements_section-icon'>
                            <img alt='' src={require("../assets/icons/achievements.png")}></img>
                            <h5>Experienced Instructors</h5>
                        </div>
                        <div className='achievements_section achievements_section-icon'>
                            <img alt='' src={require("../assets/icons/achievements.png")}></img>
                            <h5>Quality Videos</h5>
                        </div>
                        <div className='achievements_section achievements_section-icon'>
                            <img alt='' src={require("../assets/icons/achievements.png")}></img>
                            <h5>Affordable Prices</h5>
                        </div>
                    </div>
                </div>
            </div>
            {/* banner */}
            <div className='home_section home_section-banner'>
                <div className='homebanner_title'>
                    <h1>Our Mission</h1>
                </div>
                <div className='homebanner_description'>
                    <p>
                        Our mission is simple: to empower bird enthusiasts with the tools
                        and information necessary to create enriching experiences for their
                        avian companions. We believe that through proper training, care, and
                        understanding, every bird and their owner can share a harmonious and
                        fulfilling life together.
                    </p>
                </div>
            </div>
            {/* team member */}
            <div className='home_section home_section-member'>
                <div className='homemember_section homemember_section-title'>
                    <h2>Meet Our Team</h2>
                </div>
                <div className='homemember_section homemember_section-cards'>
                    {member.map((members) => (
                        <div key={members.id} className='homecard_container'>
                            <img alt='' src={members.thumbnail}></img>
                            <h5>{members.name}</h5>
                            <p>{members.descr}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Our Services */}
            <div className='home_section home_section-services'>
                <div className='homeservice_section homeservice_section-title'>
                    <h1>Our Services</h1>
                </div>
                <div className='homeservice_section homeservice_section-cards'>
                    {service && service.map((services) => (
                        <div key={services.id} className='homecardservice_container'
                            style={{ backgroundImage: `url(${services.image}) ` }}>
                            <h5>{services.name}</h5>
                            <p>{services.descr}</p>
                            <div className='homecardservice_button'>
                                <Link to={services.link}>Learn More</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Review */}
            <div className='home_section home_section-review'>
                <div className='homereview_section homereview_section-title'>
                    <h5>Happy Story</h5>
                    <h3>Hear it from people that trust us</h3>
                </div>
                <div className='homereview_section homereview_section-body'>
                    <div className='homereviewbody homereviewbody-image'>
                        <img alt='' src={review.img} ></img>
                    </div>
                    <div className='homereviewbody homereviewbody-content'>
                        <h4>" REVIEW "</h4>
                        <p1>{review.review}</p1>
                        <p>- {review.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage