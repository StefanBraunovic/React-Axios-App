import {QueryClient,useMutation,useQuery} from 'react-query';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
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
    
    const queryClient = new QueryClient()

    const{id}= useParams();
    const history = useHistory();
    const [formData,setformData] = useState({initialData});

    const { data: response } = useQuery(['people', id], () => {
        return id !== 'new' && getPerson(id);
      });

      const { register,reset, handleSubmit,formState:{errors} } = useForm(

        { defaultValues: response?.data}
    );

    const onSubmit = (e,data) => {
       
        if(id !== 'add'){
            mutationEdit.mutate(formData)
        }else{
            delete formData.id;
            mutationAdd.mutate(formData)
        }
    }

    useEffect(() => {
        if (!response) return;
        reset(response.data);
      }, [response, reset]);

     const mutationEdit = useMutation(
        (data) => editPerson(data)
        , {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('people');
            history.push("/people");
            Swal.fire(
                'Good job!',
                'You edit person!',
                'success'
              )
        },
    });

      const mutationAdd = useMutation(
        (data) => addPeople(data)
        , {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('people');
            history.push("/people"); 
             Swal.fire(
                'Good job!',
                'You added person!',
                'success'
              )
        },
    });
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
        <Form onSubmit={handleSubmit(onSubmit)}>
  <Form.Group >
    <Form.Label>Ime</Form.Label>
    <Form.Control type="text" placeholder="Unesite svoje ime"
     {...register("firstName",{
        required:"Polje je obavezno"
    })}
    value={formData?.firstName}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        firstName: e.target.value
                    }
                })}
    />
    <span style={{color:"red"}}>{errors?.firstName?.message}</span>
    </Form.Group>
    <Form.Group >
    <Form.Label>Prezime</Form.Label>
    <Form.Control type="text" placeholder="Unesite svoje prezime"
     {...register("lastName",{
        required:"Polje je obavezno"
    })}
    value={formData?.lastName}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        lastName: e.target.value
                    }
                })}
    />
    <span style={{color:"red"}}>{errors?.lastName?.message}</span>
    </Form.Group>
    <Form.Group >
    <Form.Label>Datum rođenja</Form.Label>
    <Form.Control type="date" placeholder="Unesite Datum rođenja " 
     {...register("dateOfBirth",{
        required:"Polje je obavezno"
    })}
    value={formData?.dateOfBirth}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        dateOfBirth: e.target.value
                    }
                })}
    />
    <span style={{color:"red"}}>{errors?.dateOfBirth?.message}</span>
    </Form.Group>
    <Form.Group >
    <Form.Label>Broj godina</Form.Label>
    <Form.Control type="number" placeholder=" Unesite svoje godine"
     {...register("age",{
        required:"Polje je obavezno"
    })}
    value={formData?.age}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        age: e.target.value
                    }
                })}
    />
    <span style={{color:"red"}}>{errors?.age?.message}</span>
    </Form.Group>
  
            <div className="form-group" >
                <label htmlFor="dateOfBirth">Pol</label>
                            <select className="form-control shadow-sm" id="gender" aria-describedby="gender"
                                   placeholder="Enter gender"
                                   value={formData?.gender}
                                   {...register("gender",{
                                    required:true
                                })}
                                   onChange={(e) => setformData(prevState => {
                                       return{...prevState,'gender':e.target.value}
                                   })}
                            >
                                <option>MALE</option>
                                <option>FEMALE</option>
                                <option>OTHER</option>
                            </select>
                        </div>
                        <span style={{color:"red"}}>{errors?.gender?.message}</span>

    <Form.Group >
    <Form.Label>Zanimanje</Form.Label>
    <Form.Control type="text" placeholder="Unesite zanimanje" 
     {...register("occupation",{
        required:"Polje je obavezno"
    })}
    value={formData?.occupation}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        occupation: e.target.value
                    }
                })}
    />
    <span style={{color:"red"}}>{errors?.occupation?.message}</span>
    </Form.Group>
   <Button variant="primary" type="submit">
       Sačuvaj
  </Button>
</Form>
        </Col>
    </Row>

</Container>
    </div>
}

export default PersonEdit