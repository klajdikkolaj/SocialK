import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../feaures/nav/NavBar';
import ActivityDashboard from '../../feaures/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite'
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import HomePage from '../../feaures/home/HomePage';
import ActivityForm from '../../feaures/activities/form/ActivityForm';
import ActivityDetails from '../../feaures/activities/details/ActivityDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify'
import LoginForm from '../../feaures/user/LoginForm';
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalComponent'
const App: React.FC<RouteComponentProps> = ({location}) => {
  
    const rootStore = useContext(RootStoreContext);
    const {setAppLoaded,token,appLoaded} = rootStore.commonStore;
    const{getUser}= rootStore.userStore;

    useEffect(() => {
        if(token){
            getUser().finally(()=>setAppLoaded())
        }else {setAppLoaded()}
        
    }, [getUser,setAppLoaded,token]);
    
    if(!appLoaded) return <LoadingComponent content={'Loading App...'}/>
    return (
        <Fragment>
            <ModalContainer />
            <ToastContainer position={'bottom-right'}/>
            <Route exact path='/' component={HomePage}/>
            <Route path={'/(.+)'} render={() => (
                <Fragment>
                    <NavBar/>
                    <Container style={{marginTop: '7em'}}>
                        <Switch>
                            <Route exact path='/activities' component={ActivityDashboard}/>
                            <Route path='/activities/:id' component={ActivityDetails}/>
                            <Route key={location.key}
                                   path={['/createActivity', '/manage/:id']}
                                   component={ActivityForm}/>
                            <Route path={'/login'} component={LoginForm}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Container>
                </Fragment>
            )}/>

        </Fragment>
    );

}

export default withRouter(observer(App));
