import React from 'react';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';
import { FieldRenderProps } from 'react-final-form';
import { DateTimePicker } from 'react-widgets'

interface IProps extends FieldRenderProps<any>, FormFieldProps {

};


const DateInput: React.FC<IProps> = ({
                                         input,
                                         width,
                                         id = null,
                                         date = false,
                                         time = false,
                                         placeholder,
                                         meta: {touched, error},
                                         ...rest
                                     }) => {
    return (
        <Form.Field error={touched && !!error}>
            <DateTimePicker placeholder={placeholder}
                            value={input.value || null}
                            onChange={input.onChange}
                            {...rest}
                            onKeyDown={e => e.preventDefault()}
                            date={date}
                            time={time}
                            onBlur={input.onBlur}

            />
            {touched && error && (
                <Label basic color={'red'}>
                    {error}
                </Label>
            )}
        </Form.Field>
    )


}
export default DateInput;