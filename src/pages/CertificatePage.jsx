import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import onlinecourseService from '../services/onlinecourse.service';
import { Img } from 'react-image';


const CertificatePage = () => {

    const { courseId } = useParams();
    const [certiImage, setCertiImage] = useState()

    useEffect(() => {
        onlinecourseService.getCertificate({ courseId: courseId })
            .then((res) => {
                console.log("Test Certificate", res.data)
                setCertiImage(res.data)
            })
    }, [])

    return (
        <>
            {certiImage ?
                <div style={{ paddingTop: "80px" }}>
                    <h1>Test Certificate</h1>
                    <img src={`data:image/jpeg;base64,${certiImage}`} />
                </div>
                : null}
        </>
    )
}

export default CertificatePage