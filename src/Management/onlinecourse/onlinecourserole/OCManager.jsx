import React from 'react'
import { Button, Grid } from "@mui/material";
import { AddNewCourse } from './component/AddNewCourse';
import { useState } from 'react';
import ViewCourses from './component/ViewCourses';
import CourseDetail from './component/CourseDetail';

const OCManager = () => {
    const [renderIndex, setRenderIndex] = useState(0);
    const [selectedCourse, setSelectedCourse] = useState(null);
    //Event Handler
    const SelectedCourseIndex = (e) => {
        setSelectedCourse(e);
        setRenderIndex(2);
    }

    let renderedComponents = [
        <ViewCourses setSelectedCourseCallBack={SelectedCourseIndex} />,
        <AddNewCourse />,
        <CourseDetail selectedCourse={selectedCourse} />
    ]


    return (
        <>
            <Grid container item xs={6} justifyContent="flex-start">
                {renderIndex === 0 ? (
                    <Button
                        variant="contained"
                        color="ochre"
                        onClick={() => setRenderIndex(1)}
                    >
                        Add new Course
                    </Button>
                ) : (
                    <Button
                        color="ochre"
                        variant="contained"
                        onClick={() => setRenderIndex(0)}
                    >
                        Back
                    </Button>
                )}
            </Grid>
            <Grid item xs={12}>
                {renderedComponents[renderIndex]}
            </Grid>

        </>
    )
}

export default OCManager