import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form'
import { Button, Form, Header } from 'semantic-ui-react';
import { EMPTY_ARRAY } from "mobx/lib/utils/utils";
import TextInput from '../../app/common/form/Textinput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { observer } from 'mobx-react-lite';
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import { Dir } from "fs";
import ErrorMessage from '../../app/common/form/ErrorMessage';

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('Password')
})

const LoginForm = () => {
    const routeStore = useContext(RootStoreContext)
    const {login} = routeStore.userStore
    return (
        <FinalForm onSubmit={(values: IUserFormValues) => login(values).catch(error => ({
            [FORM_ERROR]: error
        }))}
                   validate={validate}
                   render={({
                                handleSubmit,
                                submitting,
                                submitError,
                                invalid,
                                pristine,
                                dirtySinceLastSubmit,
                                form
                            }) => (

                       <Form onSubmit={handleSubmit} error>
                           <Header as={'h2'} content='Login to reactivities' color={'teal'} textAlign={'center'}/>
                           <Field name={'email'} component={TextInput} placeholder='Email'/>
                           <Field name='password'
                                  component={TextInput}
                                  placeholder='Password'
                                  type='password'
                           />
                           {submitError && !dirtySinceLastSubmit &&
                           <ErrorMessage error={submitError} text={'Invalid email or password'}/>}
                           <br/>
                           <Button
                               disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                               loading={submitting}
                               positive
                               content={'Login'}
                               fluid
                           />
                           {/*/**/}
                           {/*<pre>{JSON.stringify(form.getState(), null, 2)}</pre>*/}
                           
                       </Form>
                   )}
        />
    );
};

export default observer(LoginForm);
