import {QueryClient,useMutation,useQuery} from 'react-query';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'


import React,{useState,useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import  { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {addBook, editBook, getBook} from '../../services/books';

const initialData={
    id:0,
    isbn: '',
    writerName:'',
    publisherName:'',
    publishedDate:'',
    genre:''
}

const BookEdit = () =>{
    const{id}= useParams();
    const queryClient = new QueryClient()
    
    const history = useHistory();
    const [formData,setformData] = useState({initialData});
    
    const { data: response } = useQuery(['books', id], () => {
        return id !== 'new' && getBook(id);
    });
    const { register,reset, handleSubmit,formState:{errors} } = useForm(
        { defaultValues: response?.data}
    );

      useEffect(() => {
        if (!response) return;
        reset(response.data);
      }, [response, reset]);


    
  

     const mutationEdit = useMutation(
        (data) => editBook(data)
        , {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('books');
            history.push("/books");
            Swal.fire(
                'Good job!',
                'You edit book!',
                'success'
              )
        },
    });

      const mutationAdd = useMutation(
        (data) => addBook(data)
        , {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('books');
            history.push("/books"); 
             Swal.fire(
                'Good job!',
                'You added book!',
                'success'
              )
        },
    });
      const onSubmit = (data) => {
        // e.preventDefault()
        if(id !== 'add'){
            mutationEdit.mutate(formData)
        }else{
            delete formData.id;
            mutationAdd.mutate(formData)
        }
    }
    

    useEffect(()=>{

        if(id !== 'add'){
            getBook(id)
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
    <Form.Label>Naziv</Form.Label>
    <Form.Control type="text" placeholder="Unesite naziv knjige" 
                 {...register("isbn",{
                    required:"Polje je obavezno"
                })}
                value={formData?.isbn}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        isbn: e.target.value
                    }
                })}
    />
    <span style={{color:"red"}}>{errors?.isbn?.message}</span>
    </Form.Group>
    <Form.Group >
    <Form.Label>Pisac</Form.Label>
    <Form.Control type="text" placeholder="Unesite naziv pisca"
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
    <Form.Label>Izdavač</Form.Label>
    <Form.Control type="text" placeholder="Unesite naziv izdvavača" 
                  {...register("publisherName",{
                    required:"Polje je obavezno"
                })}
                value={formData?.publisherName}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        publisherName: e.target.value
                    }
                })}
    />
    <span style={{color:"red"}}>{errors?.publisherName?.message}</span>
    </Form.Group>
    <Form.Group >
    <Form.Label>Godina izdavanja</Form.Label>
    <Form.Control type="date" placeholder=" Unesite datum"
                {...register("publishedDate",{
                    required:"Polje je obavezno"
                })}
                value={formData?.publishedDate}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        publishedDate: e.target.value
                    }
                })}
    />
     <span style={{color:"red"}}>{errors?.publishedDate?.message}</span>
    </Form.Group>
    <Form.Group >
    <Form.Label>Zanr</Form.Label>
    <Form.Control type="text" placeholder="Žanr"
                {...register("genre",{
                    required:"Polje je obavezno"
                })}
                value={formData?.genre}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        genre: e.target.value
                    }
                })}
    />
     <span style={{color:"red"}}>{errors?.genre?.message}</span>
    </Form.Group>
    
    

  {/* <span>{errorMessage}</span>  */}
   <Button variant="primary" type="submit" >
       Sačuvaj
  </Button>
</Form>
        </Col>
    </Row>

</Container>
    </div>
}

export default BookEdit