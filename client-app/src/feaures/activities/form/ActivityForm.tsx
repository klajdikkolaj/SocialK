import React, {useState, ChangeEvent, FormEvent} from 'react';
import {Segment, Form, Button} from 'semantic-ui-react';
import {IActivity} from '../../../app/models/activity';
import {v4 as uuid} from 'uuid'

interface IProps {
    setEditMode: (editmode: boolean) => void
    activity: IActivity
    createActivity:(activity:IActivity) =>void
    editActivity:(activity:IActivity) =>void
    submitting:boolean
}


const ActivityForm: React.FC<IProps> = ({setEditMode, activity: initialFormState, createActivity, editActivity,submitting}) => {
    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState
        } else
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm);
    
    const handleSubmit = () =>{
      if(activity.id.length === 0){
          let newActivity = {
              ...activity,
              id: uuid()
          }
          createActivity(newActivity)
      }else{
          return editActivity(activity)
      }
    }
    
    const handleInputChange = (event: FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
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
                        <Button type={'button'} content={"Cancel"} onClick={() => setEditMode(false)}/>
                    </Button.Group>
                </Form>
            </Segment>

        </div>
    );
};

export default ActivityForm;
