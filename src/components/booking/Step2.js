import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ConsultantService from '../../services/consultant.service';


// STEP 2 IS WHERE WE GET AND SET TRAINER FOR THE APPLY
export default function Step2({getTrainerId}) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [listOfTrainers, setListOfTrainers] = useState([]);


  useEffect(() => {
    ConsultantService
        .getTrainerList()
        .then((res) => {
            // console.log("success Trainer list test", res.data);
            setListOfTrainers(res.data);
        })
        .catch((e) => console.log("fail Trainer list test", e));
}, []);

  const handleListItemClick = (trainerId, trainerName, index) => {
    //this function sets business id into state
    getTrainerId(trainerId);
    setSelectedIndex(index);
  };

  //  const serviceList = [{
  //   id:"1",
  //   label: "online"
  //  }]

  //use effect to populate list of businesses
  // useEffect(() => {
  //   //GET REQUEST TO POPULATE listOfBusinesses state array  d

  //   axios.get("https://instabookapi.azurewebsites.net/api/get_all_businesses")
  //     .then((results) => {

  //       setListOfBusinesses(results.data);

  //     })

  // }, [])
  return (
    <Box sx={{ width: '100%', minWidth: 400, bgcolor: 'background.paper' }}>

      <List component="nav" aria-label="secondary mailbox folder">
        {listOfTrainers.map((trainer, idx) => {
          return (
            <>
              <ListItemButton
                selected={selectedIndex === idx}
                onClick={(event) => handleListItemClick(trainer.id, trainer.name, idx)}
              >
                <ListItemText primary={trainer.name} />
              </ListItemButton>
            </>
          )
        })}

      </List>
    </Box>
  );
}

