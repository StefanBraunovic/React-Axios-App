import React from 'react';
import { useHistory,Link } from 'react-router-dom';
import {registerAccount} from '../../services/account'
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import  { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = () => {
    const history = useHistory();

const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const mutation = useMutation((data) => registerAccount(data), {
    onSuccess: () => {
        Swal.fire(
            'Good job!',
            'We have sent you and email with a  conformation link to your adress, check your inbox',
            'success'
          )
      history.push('/login');
    },
    onError: (error) => {
      if (error.response.data.errorKey === 'userexists') {
        setError(
          'login',
          {
            type: 'manual',
            message: 'Username already exists  ',
          },
          { shouldFocus: true }
        );
      }
      if (error.response.data.errorKey === 'emailexists') {
        setError(
          'email',
          {
            type: 'manual',
            message: 'Email already exists',
          },
          { shouldFocus: true }
        );
      }
    },
  });

  const onSubmitHandler = (data) => {
    mutation.mutate(data);
  };

  return (
    <Container>
<Row  className="justify-content-md-center" style={{marginTop:"50px"}}>
   <Col xs={4}>
    <Form
      className="w-75 d-flex flex-column m-auto"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <h2 className="text-center mb-4">Registration Page</h2>
      <Form.Group className="mb-4" controlId="formLogin">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="username"
          {...register('login', {
            required: 'This field is required',
          })}
        />
        <small style={{color:"red"}} className="invalid-field">{errors.login?.message}</small>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          {...register('firstName', {
            required: 'This field is required',
          })}
          placeholder="first name"
        />
        <small style={{color:"red"}} className="invalid-field">{errors.firstName?.message}</small>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          {...register('lastName', {
            required: 'This field is required',
          })}
          placeholder="last name"
        />
        <small style={{color:"red"}} className="invalid-field">{errors.lastName?.message}</small>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          {...register('email', {
            required: 'This field is required',
          })}
          placeholder="email address"
        />
        <small style={{color:"red"}} className="invalid-field">{errors.email?.message}</small>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="password"
          {...register('password', {
            required: 'This field is required',
          })}
        />
        <small style={{color:"red"}} className="invalid-field">{errors.password?.message}</small>
      </Form.Group>

      <Button variant="outline-primary" type="submit">
       Sign up
      </Button>
      <small style={{color:"red"}} className="m-auto mt-2">
      Already have an account? Sign in<Link to="/login"> here</Link>
      </small>
    </Form>
    </Col>
 </Row>
  </Container>
  );
}

export default Register