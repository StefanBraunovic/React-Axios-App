import {QueryClient,useMutation} from 'react-query';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

import {addMovie, editMovie, getMovie} from '../../services/movies';
import React,{useState,useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import  { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const initialData={
    id:0,
    name: '',
    directorName:'',
    writerName:'',
    duration:0,
    ration:0,
}

const MovieEdit = () =>{
    
    const queryClient = new QueryClient()

    const { register, handleSubmit,formState:{errors} } = useForm();

    const{id}= useParams();
    const history = useHistory();
    const [formData,setformData] = useState({initialData});

    const mutationEdit = useMutation(
        (data) => editMovie(data)
        , {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('movies');
            history.push("/movies");
            Swal.fire(
                'Good job!',
                'You edit movie!',
                'success'
              )
        },
    });

      const mutationAdd = useMutation(
        (data) => addMovie(data)
        , {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('movies');
            history.push("/movies"); 
             Swal.fire(
                'Good job!',
                'You added movie!',
                'success'
              )
        },
    });

    const onSubmit = (data,e) => {
        e.preventDefault()
        if(id !== 'add'){
            mutationEdit.mutate(formData)
        }else{
            delete formData.id;
            mutationAdd.mutate(formData)
        }
    }

    useEffect(()=>{

        if(id !== 'add'){
            getMovie(id)
            .then(r=>{
                setformData(r?.data)
            })
        }

    },[id])

    return <div>
        <Container>
    <Row  className="justify-content-md-center" style={{marginTop:"50px"}}>
        <Col xs={4}>
        <Form onSubmit={handleSubmit(onSubmit)}>
  <Form.Group controlId="Naziv">
    <Form.Label>Naziv</Form.Label>
    <Form.Control type="text"
    {...register("name",{
        required:"Polje je obavezno"
    })}
    placeholder="Unesite naziv filma" 
    value={formData?.name}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        name: e.target.value
                    }
                })}
    />
    <span style={{color:"red"}}>{errors?.name?.message}</span>
    </Form.Group>
    <Form.Group >
    <Form.Label>Režiser</Form.Label>
    <Form.Control type="text"

    placeholder="Unesite naziv reŽisera"
    {...register("directorName",{
        required:"Polje je obavezno"
    })}
     value={formData?.directorName}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        directorName: e.target.value
                    }
                })}
    />
      <span style={{color:"red"}}>{errors?.directorName?.message}</span>
    </Form.Group>
    <Form.Group >
    <Form.Label>Scenarista</Form.Label>
    <Form.Control type="text" 
    
    placeholder="Unesite naziv scenariste" 
    {...register("writerName",{
        required:"Polje je obavezno"
    })}
    value={formData?.writerName}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        writerName: e.target.value
                    }
                })}
    />
      <span style={{color:"red"}}>{errors?.writerName?.message}</span>
    </Form.Group>
    <Form.Group >
    <Form.Label>Trajanje</Form.Label>
    <Form.Control type="number" 
    placeholder=" Unesite trajanje"
    {...register("duration",{
        required:"Polje je obavezno"
    })}
     value={formData?.duration}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        duration: e.target.value
                    }
                })}
    />
      <span style={{color:"red"}}>{errors?.duration?.message}</span>
    </Form.Group>
    <Form.Group >
    <Form.Label>Ocjena</Form.Label>
    <Form.Control type="number" 
    placeholder="Unesite ocjena" 
    {...register("rating",{
        required:"Polje je obavezno"
    })}
    value={formData?.rating}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        rating: e.target.value
                    }
                })}
    />
      <span style={{color:"red"}}>{errors?.rating?.message}</span>
    </Form.Group>
    
    

  {/* <span>{errorMessage}</span>  */}
   <Button variant="primary" type="submit">
       Sačuvaj
  </Button>
</Form>
        </Col>
    </Row>

</Container>
    </div>
}

export default MovieEdit