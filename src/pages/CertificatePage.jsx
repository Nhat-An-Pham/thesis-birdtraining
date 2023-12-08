import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import onlinecourseService from '../services/onlinecourse.service';
import { Img } from 'react-image';
import { Button, Typography } from '@mui/material';
import { saveAs } from 'file-saver'
import { jwtDecode } from 'jwt-decode';
import RawHTMLRenderer from '../Management/component/htmlRender/htmlRender';
import DownloadIcon from '@mui/icons-material/Download';


const CertificatePage = () => {

    let token = localStorage.getItem("user-token");
    let userName = null
    if (token) {
        userName = jwtDecode(JSON.parse(token)).name;
    }


    const { courseId } = useParams();
    const [certiImage, setCertiImage] = useState()
    const [currentCourse, setCurrentCourse] = useState()

    useEffect(() => {
        onlinecourseService.getCertificate({ courseId: courseId })
            .then((res) => {
                setCertiImage(res.data)
            })
            .catch((e) => {
                console.log("Cannot Get Certificate:", e)
            })
        onlinecourseService.getOnlineCourseById({ id: courseId })
            .then((res) => {
                console.log(res.data)
                setCurrentCourse(res.data)
            })
            .catch((e) => {
                console.log("Cannot Get Current Course", e)
            })
    }, [])

    const downloadImage = () => {
        if (certiImage && currentCourse) {
            saveAs(`${certiImage}`, `${userName}_${currentCourse.title}.jpg`) // Put your image URL here.
        }
    }

    return (
        <>
            {certiImage && currentCourse ?
                <div className='certificatepage'>
                    <div className='certificatepage_box-container'>
                        <div className='certificatepage_box_element certificatepage_box_element-left'>
                            <Link to="/courseslist" style={{ color: "#C8AE7D" }}>Back to Online Course List Page</Link>
                            <Button
                                onClick={downloadImage}><DownloadIcon />Download Certificate</Button>
                            <div className='ctfcpage_box_element_left_section ctfcpage_box_element_left_section-description'>
                                <h5>About the Course</h5>
                                <Typography><RawHTMLRenderer htmlContent={currentCourse.shortDescription}></RawHTMLRenderer></Typography>
                            </div>
                            <div className='ctfcpage_box_element_left_section ctfcpage_box_element_left_section-section'>
                                <h5>Summarize</h5>
                                {currentCourse.sections.map((section) => (
                                    <Typography><RawHTMLRenderer htmlContent={section.description}></RawHTMLRenderer></Typography>
                                ))}
                            </div>
                            <div className='ctfcpage_box_element_left_section ctfcpage_box_element_left_section-contact'>
                                <h5>For More Detail</h5>
                                <Button>Call Us: (+84) 90 456 0264</Button>
                            </div>
                        </div>
                        <div className='certificatepage_box_element certificatepage_box_element-right'>
                            <img src={`data:image/png;base64,${certiImage}`} />
                        </div>
                    </div>
                </div>
                : null}
        </>
    )
}

export default CertificatePage