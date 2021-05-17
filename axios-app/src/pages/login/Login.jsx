import React, { useState } from 'react';
import  { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import axios from 'axios';
import {login} from "../../services/account"
import { useHistory } from 'react-router';

const Login= () =>{
    const history = useHistory();

    const [loginData, setLoginData]= useState({
        username:'',
        password:'',
        rememberMe:false
    })

    const [errorMessage,setErrorMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(loginData);
     login(loginData)
     .then(function(response){
         console.log(response);
         console.log(response?.data['id_token']);
         localStorage.setItem('jwt_token',response?.data['id_token'])
         history.push('/')
     })
     .catch(function(error){
         console.log(error?.response?.data);
         if(error?.response?.data?.detail === 'Bad credentials'){
                setErrorMessage("Bad credentials")
         }else {
            setErrorMessage("Error")
         }
     })
    }

    return <div>

<Container>
    <Row  className="justify-content-md-center" style={{marginTop:"200px"}}>
        <Col xs={4}>
        <Form>
  <Form.Group controlId="formBasicUsername">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" placeholder="username" value={loginData?.username}
                onChange={(e)=>setLoginData(prevState=>{
                    return {
                        ...prevState,
                        username: e.target.value
                    }
                })}
    />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={loginData?.password}
    
    onChange={(e)=>setLoginData(prevState=>{
        return {
            ...prevState,
            password: e.target.value
        }
    })}/>
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" value={loginData?.rememberMe}
    onChange={(e)=>setLoginData(prevState=>{
        return {
            ...prevState,
            rememberMe: e.target.checked
        }
    })}
    />
  </Form.Group>
  <span>{errorMessage}</span>
  <Button variant="primary" type="submit" onClick={onSubmit}>
    Log in
  </Button>
</Form>
        </Col>
    </Row>

</Container>
 
    </div>
} 


export default Login;