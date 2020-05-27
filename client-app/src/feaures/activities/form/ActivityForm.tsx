import React, {useState, FormEvent, useContext, useEffect} from 'react';
import {Segment, Form, Button} from 'semantic-ui-react';
import {IActivity} from '../../../app/models/activity';
import {v4 as uuid} from 'uuid'
import ActivityStore from '../../../app/stores/activityStore'
import {observer} from 'mobx-react-lite';
import {RouteComponentProps} from 'react-router-dom';

interface DetailParam {
    id: string
}


const ActivityForm: React.FC<RouteComponentProps<DetailParam>> = ({match, history}) => {
    const activityStore = useContext(ActivityStore);
    const {createActivity, editActivity, submitting, activity: initialFormState, loadActivity, clearActivity} = activityStore


    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });
    useEffect(() => {
        if (match.params.id && activity.id.length === 0) {

            loadActivity(match.params.id).then(() => initialFormState && setActivity(initialFormState))
        }
        return (() => {
            clearActivity()
        })

    }, [loadActivity, clearActivity, match.params.id, initialFormState, activity.id.length]);

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            return editActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget
        setActivity({...activity, [name]: value})
    }

    return (
        <div>
            <Segment>
                <Form key={activity.id} onSubmit={handleSubmit}>
                    <Form.Input
                        onChange={handleInputChange}
                        name='title'
                        value={activity.title}
                        placeholder={activity.title}/>
                    <Form.TextArea
                        onChange={handleInputChange}
                        name='description'
                        rows={2}
                        value={activity.description}
                        placeholder={activity.description}/>
                    <Form.Input
                        onChange={handleInputChange}
                        name='category'
                        value={activity.category}
                        placeholder={activity.category}/>
                    <Form.Input
                        type={'datetime-local'} onChange={handleInputChange}
                        name='date'
                        value={activity.date}
                        placeholder={activity.date}/>
                    <Form.Input
                        onChange={handleInputChange}
                        name='city'
                        value={activity.city}
                        placeholder={activity.city}/>
                    <Form.Input
                        onChange={handleInputChange}
                        name='venue'
                        value={activity.venue}
                        placeholder={activity.venue}/>
                    <Button.Group widths={2}>
                        <Button color="green" type="submit" content={"Submit"} loading={submitting}/>
                        <Button type={'button'} content={"Cancel"} onClick={()=>history.push('/activities')}/>
                    </Button.Group>
                </Form>
            </Segment>

        </div>
    );
};

export default observer(ActivityForm);
