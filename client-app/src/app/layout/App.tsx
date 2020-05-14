import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios'
import {Icon, List, Container} from 'semantic-ui-react'
import {IActivity} from '../models/activity';
import NavBar from '../../feaures/nav/NavBar';
import ActivityDashboard from '../../feaures/activities/dashboard/ActivityDashboard';


const App = () => {
    const [activities, setActivities] = useState<IActivity[]>([])
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    const [editMode, setEditmode] = useState(false);

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.filter(a => a.id === id)[0])
    }
    const handleOpenCreateForm = () =>{
        setSelectedActivity(null);
        setEditmode(true);
    }
    

    useEffect(() => {
        axios.get<IActivity[]>('http://localhost:5000/api/activities')
            .then((response) => {
                setActivities(response.data)
            })
    }, [])


    return (
        <Fragment>
            <NavBar openCreateForm ={handleOpenCreateForm}/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard activities={activities}
                                   selectActivity={handleSelectActivity}
                                   selectedActivity={selectedActivity!}
                                   editMode={editMode}
                                   setEditMode={setEditmode}
                                   setSelectedActivity={setSelectedActivity}
                />
            </Container>
        </Fragment>
    );

}

export default App;
