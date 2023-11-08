import { useState } from "react";
import classManagementService from "../../../services/class-management.service";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ClassSlotsPaneComponent from "./ClassSlotsPaneComponent";
import ClassSlotViewComponent from "./ClassSlotViewComponent";
import { Grid } from "@mui/material";

export default function ClassDetailViewComponent ({selectedClassId}) {
    const [selectedClass, setSelectedClass] = useState();
    const [slot, setSlot] = useState();
    async function fetchClass(){
        try {
            let params = {
                $filter : `id eq ${selectedClassId}`
            }
            let response = await classManagementService.getClasses(params);
            setSelectedClass(response.data[0]);
        } catch (error) {
            toast.error(error);
        }
    }
    const onCallbackSlotSelect = (slot) => {
        setSlot(slot);
    }
    useEffect(() => {
      fetchClass();      
      return () => {
        
      }
    }, [selectedClassId]);
    return (
        <>
        <Grid container item spacing={3}>
            <Grid item xs={3}>
                <ClassSlotsPaneComponent selectedClassId={selectedClassId} callbackSelectSlot={onCallbackSlotSelect} />
            </Grid>
            <Grid item xs={9}>
                <ClassSlotViewComponent slot={slot}/>
            </Grid>
        </Grid>
        </>
    );
    
}