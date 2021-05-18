import React,{useState,useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import  { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {addPeople, editPerson, getPerson} from '../../services/persons';

const initialData={
    id:0,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    age: '',
    gender: [],
    occupation: ''
}

const PersonEdit = () =>{
    const{id}= useParams();
    const history = useHistory();
    const [formData,setformData] = useState({initialData});

    const onSubmit = (e) =>{
        e.preventDefault()
        if(id !== 'add'){
        editPerson(formData)
        .then((r)=>{
            console.log(r);
                history.push("/people")
})
.catch((r)=>{
    console.log(r?.response?.data);
})}
else{
    delete formData.id;
    addPeople(formData)
    .then((r)=>{
        history.push("/people")
    })
    .catch ((err)=>{
        console.log(err);
    })


        }}

    useEffect(()=>{

        if(id !== 'add'){
            getPerson(id)
            .then(r=>{
                setformData(r?.data)
            })
        }

    },[id])

    return <div>
        <Container>
    <Row  className="justify-content-md-center" style={{marginTop:"50px"}}>
        <Col xs={4}>
        <Form>
  <Form.Group >
    <Form.Label>Ime</Form.Label>
    <Form.Control type="text" placeholder="Unesite svoje ime" value={formData?.firstName}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        firstName: e.target.value
                    }
                })}
    />
    </Form.Group>
    <Form.Group >
    <Form.Label>Prezime</Form.Label>
    <Form.Control type="text" placeholder="Unesite svoje prezime" value={formData?.lastName}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        lastName: e.target.value
                    }
                })}
    />
    </Form.Group>
    <Form.Group >
    <Form.Label>Datum rođenja</Form.Label>
    <Form.Control type="date" placeholder="Unesite Datum rođenja " value={formData?.dateOfBirth}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        dateOfBirth: e.target.value
                    }
                })}
    />
    </Form.Group>
    <Form.Group >
    <Form.Label>Broj godina</Form.Label>
    <Form.Control type="number" placeholder=" Unesite svoje godine" value={formData?.age}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        age: e.target.value
                    }
                })}
    />
    </Form.Group>
  
            <div className="form-group" >
                <label htmlFor="dateOfBirth">Pol</label>
                            <select className="form-control shadow-sm" id="gender" aria-describedby="gender"
                                   placeholder="Enter gender"
                                   value={formData?.gender}
                                   onChange={(e) => setformData(prevState => {
                                       return{...prevState,'gender':e.target.value}
                                   })}
                            >
                                <option>-select gander-</option>
                                <option>MALE</option>
                                <option>FEMALE</option>
                                <option>OTHER</option>
                            </select>
                        </div>

    <Form.Group >
    <Form.Label>Zanimanje</Form.Label>
    <Form.Control type="text" placeholder="Unesite svoja" value={formData?.occupation}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        occupation: e.target.value
                    }
                })}
    />
    </Form.Group>
    
    

  {/* <span>{errorMessage}</span>  */}
   <Button variant="primary" type="submit" onClick={onSubmit}>
       Sačuvaj
  </Button>
</Form>
        </Col>
    </Row>

</Container>
    </div>
}

export default PersonEdit