import React, {FC, useContext, useEffect} from 'react';
import { Grid} from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore'
import {observer} from 'mobx-react-lite';
import {RouteComponentProps} from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailChat from './ActivityDetailChat';
import ActivityDetailedSidebar from './ActivitydetailedSidebar';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface DetailParams {
    id: string
}

const ActivityDetails: FC<RouteComponentProps<DetailParams>> = ({history, match}) => {

    const rootStore = useContext(RootStoreContext);
    const {activity, loadActivity, loadingInitial} = rootStore.activityStore;

    useEffect(() => {

        loadActivity(match.params.id);
        //before it was .catch(()=>{
        //             history.push('/notfound')
        //         })

    }, [loadActivity, match.params.id, history]);


    if (loadingInitial) return <LoadingComponent content='loading activity...'/>
    if(!activity){
        return <h1>Activity not found</h1>
    } 


    return (
       <Grid>
           <Grid.Column width={10}>
               <ActivityDetailedHeader activity={activity} />
               <ActivityDetailedInfo activity={activity}/>
               <ActivityDetailChat/>
           </Grid.Column>
           <Grid.Column width={6}>
               <ActivityDetailedSidebar/>
           </Grid.Column>
       </Grid>
    );
};

export default observer(ActivityDetails);
