import React from 'react';
import { Form, Row, Col } from 'antd';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useToasts } from 'react-toast-notifications';


const GET_USER = gql`
    query getUser($userId: ID!) {
        getUser(userId: $userId ) {
            firstName
            lastName
            username
            email
            password
        }

    }
`

const UPDATE_USER = gql`
    mutation updateUser($user: UserInput) {
        updateUser(user: $user) 
    }
`
const UpdateUser = ({ userId }) => {
    const [updateUser] = useMutation(UPDATE_USER);
    const { addToast } = useToasts();

    const { loading, data, refetch } = useQuery(GET_USER, {
        variables: {
            userId
        }
    })

    if (loading) return <h6>Loading....</h6>
    const initialValues = data.getUser;

    const handleUpdate = () => {
        addToast('Updated.', { appearance: 'success', autoDismiss: true });
        refetch();
    }

    return <Formik
        initialValues={initialValues}
        validationSchema={
            Yup.object().shape({
                firstName: Yup.string().required('First Name is required'),
                lastName: Yup.string().required('Last Name is required'),
                username: Yup.string().required('Username is required'),
                email: Yup.string().email('Email is invalid').required('Email is required'),
            })
        }

        onSubmit={async (fields) => {

            const { firstName, lastName, email, username } = fields;
            console.log({ firstName });

            await updateUser({
                variables: {
                    user: {
                        firstName, lastName, email, username
                    }
                }
            })
                .then((result) => {
                    const isUpdated = result.data.updateUser;
                    (isUpdated) ? handleUpdate() : addToast('Failed to update.', { appearance: 'error', autoDismiss: true })
                }).catch((err) => {
                    addToast(err.message, { appearance: 'error', autoDismiss: true })
                });


        }}

        render={({ errors, status, touched }) => {

            return <Row>
            <Col span={8}></Col>
                <Col span={8}>
                    <Form layout="vertical">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='username'>Username</label>
                            <Field name='username' disabled type='text' className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                            <ErrorMessage name='username' component='div' className='invalid-feedback' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className='form-group'>
                            <button type='submit' className='btn btn-primary mr-2'>Update</button>
                            <button type='reset' className='btn btn-secondary mr-2'>Reset</button>
                        </div>


                        {/*errors.api &&
                    <Message attached='bottom' warning>
                        <Icon name='help' />
                                    Failed to update account details?&nbsp;
                                </Message>
                **/}
                    </Form>
                </Col>
                <Col span={8}></Col>
            </Row>
        }}
    />
}

export default UpdateUser;