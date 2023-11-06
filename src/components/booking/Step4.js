import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import consultantService from "../../services/consultant.service";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function Step4({ getFormValues }) {
    const [consultingDetail, setConsultingDetail] = useState(null);
    const [address, setAddress] = useState(null);
    const [consultingTypes, setConsultingTypes] = useState([]);
    const [consultingTypeId, setConsultingTypeId] = useState(null);

    const handleChangeConsultingType =(event)=>{
        setConsultingTypeId(event.target.value.id)
    }

    useEffect(() => {
        consultantService
            .getConsultingType()
            .then((res) => {
                console.log("success workshop list test", res.data);
                setConsultingTypes(res.data);
            })
            .catch((e) => console.log("fail workshop list test", e));
    }, []);

    if (consultingTypes) {
        getFormValues(consultingDetail, address, consultingTypeId);
    }


    return (
        <>
            <FormGroup >
                <TextField onChange={(e) => { setConsultingDetail(e.target.value) }} id="standard-basic" label="Consulting Detail (Optional)" variant="standard" />
                <TextField onChange={(e) => setAddress(e.target.value)} id="standard-basic" label="Address (Optional)" variant="standard" />
                <br/>
                {consultingTypes && <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Consulting Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Consulting Type"
                        onChange={(event) => handleChangeConsultingType(event)}
                    >
                        {consultingTypes.map((consultingType) =>

                            <MenuItem value={consultingType}>{consultingType.name}</MenuItem>

                        )}
                    </Select>
                </FormControl>}
            </FormGroup>
        </>
    );
}

export default Step4;