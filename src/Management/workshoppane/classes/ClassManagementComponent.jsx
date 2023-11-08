import { useState } from "react";
import ClassOverviewComponent from "./ClassOverviewComponent";
import ClassDetailViewComponent from "./ClassDetailViewComponent";

export default function ClassManagementComponent({selectedWorkshop}){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedClassId, setSelectedClassId] = useState();
    const handleClassSelect = (selectedClassId)=> {                
        setSelectedClassId(selectedClassId);
        setCurrentIndex(1);
    }
    const handleClassCreateDemand = () => {
        setCurrentIndex(1);
    }
    const handleSlotSelect = (slot) => {
        
    }
    let components = [
        <ClassOverviewComponent workshop={selectedWorkshop} callbackClassSelect={handleClassSelect}/>,
        <ClassDetailViewComponent selectedClassId={selectedClassId}/>
    ]
    return (
        <>
        {components[currentIndex]}
        </>
    );
}