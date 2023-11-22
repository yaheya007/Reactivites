import React, { useEffect, useState, } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../Models/activity';
import NavBar from './NavBar';
import './styles.css';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const[selectedActivity, setSelectedActivity]= useState<Activity | undefined>(undefined);
  const[editMode,setEditMode] = useState(false);


  useEffect(() =>{
    axios.get<Activity[]>('http://Localhost:5000/api/activities').then(response =>{
      let sortedActivities = response.data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setActivities(sortedActivities);
    })
  },[]) 

  function handleSelectActivity(id: String){
    setSelectedActivity(activities.find(x =>
      x.id === id))
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined)
  }

  function handleFormOpen(id? : string){
    id? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActitvity(activity:Activity){
    activity.id
    ?setActivities([...activities.filter(x => x.id !== activity.id),activity])
    : setActivities([...activities, {...activity, id:uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
}

function handleDeleteActivity(id:string){
  setActivities([...activities.filter(x=> x.id !== id)]);

}



  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style ={{marginTop: '5em'}}>
          <ActivityDashboard activities={activities}
          selectedActivity ={selectedActivity}
          selectActivity = {handleSelectActivity} 
          cancelSelectActivity = {handleCancelSelectActivity}
          editMode = {editMode}
          openForm = {handleFormOpen}
          closeForm = {handleFormClose}
          createOrEdit = {handleCreateOrEditActitvity}
          deleteActivity = {handleDeleteActivity}
          />
      </Container>
      
    </>
  );
}

export default App;
