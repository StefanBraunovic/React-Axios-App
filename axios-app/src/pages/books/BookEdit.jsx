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
    const history = useHistory();
    const [formData,setformData] = useState({initialData});

    const onSubmit = (e) =>{
        e.preventDefault()
        if(id !== 'add'){
        editBook(formData)
        .then((r)=>{
            console.log(r);
                history.push("/books")
})
.catch((r)=>{
    console.log(r?.response?.data);
})}
else{
    delete formData.id;
    addBook(formData)
    .then((r)=>{
        history.push("/books")
    })
    .catch ((err)=>{
        console.log(err);
    })


        }}

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
        <Form>
  <Form.Group controlId="Naziv">
    <Form.Label>Naziv</Form.Label>
    <Form.Control type="text" placeholder="Unesite naziv knjige" value={formData?.isbn}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        isbn: e.target.value
                    }
                })}
    />
    </Form.Group>
    <Form.Group >
    <Form.Label>Pisac</Form.Label>
    <Form.Control type="text" placeholder="Unesite naziv pisca" value={formData?.writerName}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        writerName: e.target.value
                    }
                })}
    />
    </Form.Group>
    <Form.Group >
    <Form.Label>Izdavač</Form.Label>
    <Form.Control type="text" placeholder="Unesite naziv izdvavača" value={formData?.publisherName}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        publisherName: e.target.value
                    }
                })}
    />
    </Form.Group>
    <Form.Group >
    <Form.Label>Godina izdavanja</Form.Label>
    <Form.Control type="text" placeholder=" Unesite datum" value={formData?.publishedDate}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        publishedDate: e.target.value
                    }
                })}
    />
    </Form.Group>
    <Form.Group >
    <Form.Label>Zanr</Form.Label>
    <Form.Control type="text" placeholder="Žanr" value={formData?.genre}
                onChange={(e)=>setformData(prevState=>{
                    return {
                        ...prevState,
                        genre: e.target.value
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

export default BookEdit