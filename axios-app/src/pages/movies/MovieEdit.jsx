import React,{useState,useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import  { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {addMovie, editMovie, getMovie} from '../../services/movies';

const initialData={
    id:0,
    name: '',
    directorName:'',
    writerName:'',
    duration:0,
    ration:0,
}

const MovieEdit = () =>{
    const{id}= useParams();
    const history = useHistory();
    const [formData,setformData] = useState({initialData});

    const onSubmit = (e) =>{
        e.preventDefault()
        if(id !== 'add'){
        editMovie(formData)
        .then((r)=>{
                history.push("/movies")
})
.catch((r)=>{
    console.log(r?.response?.data);
})}
else{
    delete formData.id;
    addMovie(formData)
    .then((r)=>{
        history.push("/movies")
    })
    .catch ((err)=>{
        console.log(err);
    })


        }}

    useEffect(()=>{

        if(id !== 'add'){
            getMovie(id)
            .then(r=>{
                setformData(r?.data)
            })
        }

    },[id])

    return <div>
        Movie{id}
        <Container>
    <Row  className="justify-content-md-center" style={{marginTop:"50px"}}>
        <Col xs={4}>
        <Form>
  <Form.Group controlId="Naziv">
    <Form.Label>Naziv</Form.Label>
    <Form.Control type="text" placeholder="Unesite naziv filma" value={formData?.name}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        name: e.target.value
                    }
                })}
    />
    </Form.Group>
    <Form.Group >
    <Form.Label>Režiser</Form.Label>
    <Form.Control type="text" placeholder="Unesite naziv reŽisera" value={formData?.directorName}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        directorName: e.target.value
                    }
                })}
    />
    </Form.Group>
    <Form.Group >
    <Form.Label>Scenarista</Form.Label>
    <Form.Control type="text" placeholder="Unesite naziv scenariste" value={formData?.writerName}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        writerName: e.target.value
                    }
                })}
    />
    </Form.Group>
    <Form.Group >
    <Form.Label>Trajanje</Form.Label>
    <Form.Control type="number" placeholder=" Unesite trajanje" value={formData?.duration}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        duration: e.target.value
                    }
                })}
    />
    </Form.Group>
    <Form.Group >
    <Form.Label>Ocjena</Form.Label>
    <Form.Control type="number" placeholder="Unesite ocjena" value={formData?.rating}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        rating: e.target.value
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

export default MovieEdit