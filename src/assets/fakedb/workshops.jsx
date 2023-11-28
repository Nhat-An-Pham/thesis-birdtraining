const workshops = [
    {
        workshopId: "1",
        title: "Workshop 1",
        shortdescr: "This is the first Workshop",
        backgroundimage: (require("../pages/ocp/ocp_carousel.jpg")),
        status: "available",
        classes: [
            {
                classId: "1.1",
                name: "class 1.1",
                descr: "description of class 1.1",
                backgroundimage: (require("../pages/ocp/ocp_carousel.jpg")),
                location: "FPT University",
                price: "3$"
            },
            {
                classId: "1.2",
                name: "class 1.2",
                descr: "description of class 1.2",
                backgroundimage: (require("../pages/ocp/ocp_carousel.jpg")),
                location: "FPT University",
                price: "3$"
            },

        ]
    }, {
        workshopId: "2",
        title: "Workshop 2",
        backgroundimage: (require("../pages/ocp/ocp_carousel.jpg")),
        shortdescr: "This is the second Workshop",
        status: "available",
        classes: [
            {
                classId: "2.1",
                name: "class 2.1",
                descr: "description of class 2.1",
                backgroundimage: (require("../pages/ocp/ocp_carousel.jpg")),
                location: "FPT University",
                price: "3$"
            },
            {
                classId: "2.2",
                name: "class 2.2",
                descr: "description of class 2.2",
                backgroundimage: (require("../pages/ocp/ocp_carousel.jpg")),
                location: "FPT University",
                price: "3$"
            },

        ]
    }
]

export default workshops;