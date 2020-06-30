import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import {  ActivityFormValues } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/Textinput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from 'revalidate'
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
    title: isRequired({message: 'The title is requierd'}),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 caracters'})
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')

})

interface DetailParam {
    id: string
}


const ActivityForm: React.FC<RouteComponentProps<DetailParam>> = ({match, history}) => {
   
   
    const rootStore = useContext(RootStoreContext);
    const {createActivity, editActivity, submitting, loadActivity} = rootStore.activityStore


    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (match.params.id) {
            setLoading(true)
            loadActivity(match.params.id).then((activity) => setActivity(new ActivityFormValues(activity))).finally(() => setLoading(false))
        }


    }, [loadActivity, match.params.id]);


    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const {date, time, ...activity} = values; //all the props minus date and time
        activity.date = dateAndTime;

        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        } else {
            return editActivity(activity);
        }
    }
    

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        initialValues={activity}
                        onSubmit={handleFinalFormSubmit} 
                        render={({handleSubmit, invalid,pristine}) => (

                        <Form key={activity.id} onSubmit={handleSubmit} loading={loading}>
                            <Field

                                name='title'
                                placeholder='Title'
                                value={activity.title}
                                component={TextInput}
                            />
                            <Field
                                component={TextAreaInput}
                                name='description'
                                rows={3}
                                value={activity.description}
                                placeholder='Description'/>
                            <Field
                                component={SelectInput}
                                options={category}
                                name='category'
                                value={activity.category}
                                placeholder='Category'/>
                            <Form.Group widths={"equal"}>
                                <Field
                                    component={DateInput}
                                    date={true}
                                    name='date'
                                    value={activity.date}
                                    placeholder='Date'/>
                                <Field
                                    component={DateInput}
                                    time={true}
                                    name='time'
                                    value={activity.time}
                                    placeholder='Time'/>
                            </Form.Group>
                            <Field
                                component={TextInput}
                                name='city'
                                value={activity.city}
                                placeholder='City'/>
                            <Field
                                component={TextInput}
                                name='venue'
                                value={activity.venue}
                                placeholder='Venue'/>
                            <Button.Group widths={2}>
                                <Button color="green" type="submit" content={"Submit"} loading={submitting}
                                        disabled={loading || invalid || pristine}/>
                                <Button type={'button'} content={"Cancel"}
                                        onClick={activity.id ? () => history.push(`/activities/${activity.id}`) : () => history.push('/activities')}/>
                            </Button.Group>
                        </Form>

                    )}
                    />

                </Segment>
            </Grid.Column>

        </Grid>
    );
};

export default observer(ActivityForm);
