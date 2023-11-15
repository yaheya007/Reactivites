import React, { useEffect, useState, } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../Models/activity';
import NavBar from './NavBar';
import './styles.css';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() =>{
    axios.get<Activity[]>('http://Localhost:5000/api/activities').then(response =>{
      let sortedActivities = response.data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setActivities(sortedActivities);
    })
  },[]) 
  return (
    <div>
      <NavBar/>
      <Container style ={{marginTop: '5em'}}>
          <ActivityDashboard activities={activities}/>
      </Container>
      
    </div>
  );
}

export default App;
