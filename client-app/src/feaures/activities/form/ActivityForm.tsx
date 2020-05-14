import React from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

interface IProps {
    setEditMode:(editmode:boolean)=>void
}


const ActivityForm:React.FC<IProps> = ({setEditMode}) => {
    return (
        <div>
            <Segment>
                <Form>
                    <Form.Input placeholder={'Title'}/>
                    <Form.TextArea rows={2} placeholder={'Description'}/>
                    <Form.Input placeholder={'Category'}/>
                    <Form.Input type={'date'} placeholder={'Date'}/>
                    <Form.Input placeholder={'City'}/>
                    <Form.Input placeholder={'Venue'}/>
                    <Button.Group widths={2}>
                        <Button color="green" type ="submit" content={"Create"}/>
                        <Button type={'button'} content={"Cancel"} onClick={()=>setEditMode(false)}/>
                    </Button.Group>
                </Form>
            </Segment>
            
        </div>
    );
};

export default ActivityForm;
