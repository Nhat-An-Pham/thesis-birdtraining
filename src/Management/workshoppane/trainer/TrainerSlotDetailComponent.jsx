import { useEffect } from "react";
import { useState } from "react";
import trainerWorkshopService from "../../../services/trainer-workshop.service";
import { toast } from "react-toastify";

const TrainerSlotDetailComponent = ({entityId}) => {
    const [slotDetail, setSlotDetail] = useState(null);
    
    async function fetchSlot(){
        try {
            let response = await trainerWorkshopService.getTrainerSlotByEntityId(entityId);
            console.log(response.data);
            setSlotDetail(response.data);
        } catch (error) {
            toast.error('An error has occured!');
        }
    }
    useEffect(() => {
      fetchSlot();
    
      return () => {
        
      }
    }, [])
    
    return (
        <>
        
        </>
    );
}
export default TrainerSlotDetailComponent;