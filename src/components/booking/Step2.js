import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// STEP 2 IS WHERE WE GET AND POPULATE SERVICES FOR THE BUSINESS
export default function Step2({businessId, services, getServiceAndLengthMinutes}) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [radioID, setRadioID] = useState(null);
  const[serviceLength, setServiceLength] = useState(null);
  const handleListItemClick = (business, index) => {

    setSelectedIndex(index);
  };

const handleRadioSelectionChange = async (name, serviceId, lengthMinutes) =>{
  setRadioID(serviceId)

  await getServiceAndLengthMinutes(name, serviceId, lengthMinutes)

}


  return (
    <Box sx={{ width: '100%', minWidth:400, bgcolor: 'background.paper' }}>
     
     <FormControl>
        {services.length > 0 ? services.map((parentService, idx1) =>{
            return(
                <>
                 <Accordion defaultExpanded ={idx1 === 0 ?true:false}>
                  <AccordionSummary     expandIcon={<ExpandMoreIcon />}>
                  <FormLabel style={{color:"#5A5A5A"}} id="demo-radio-buttons-group-label">{parentService.service_category}</FormLabel>
                  </AccordionSummary>
                  <AccordionDetails>
                {JSON.parse(parentService.serviceNames).map((childService, idx2) =>{
                    return(
                        <>
                       
                          <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue={idx1== 0 && idx2 ==0 ? childService.service_id : ''}
                          name="radio-buttons-group"
                          >

                            <FormControlLabel value={childService.service_id} control={
                            <Radio 
                            checked={childService.service_id === radioID}   
                            onChange={() => 
                              handleRadioSelectionChange(childService.service_name,childService.service_id, childService.length_minutes)
                            } />} 
                            label={childService.service_name} />
                          </RadioGroup>
                        </>
                    )
                })}
                </AccordionDetails>
                </Accordion>
                </>
            )
        }) : <b>No services available for this business</b>}   
</FormControl>
    </Box>
  );
}
