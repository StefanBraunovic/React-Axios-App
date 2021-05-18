import React, { useEffect, useState } from 'react'
// import NavbarTop from '../../components/navbar/Navbar'
import TableData from '../../components/table/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router';
import { deleteBook, getAllBooks } from '../../services/books';

const headers=[
    'id',
    'Naziv',
    'Pisac',
    'Izdavač',
    'Datum izdavanja',
    'Žanr',
    'Izmjeni',
    'Obriši'
]


const Books = () =>{
const history= useHistory();
const [rows,setRows] = useState([]);
const [isModalOpen,setIsModalOpen] = useState(false)
const [modalData,setModalData] = useState();
const [refresh,setRefresh] = useState(0)

const onDelete = () =>{
    if(modalData?.id){
        deleteBook(modalData?.id)
        .then(()=>{
            setIsModalOpen(false);
            setRefresh((prevState)=>prevState +1)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

useEffect(() =>{
    getAllBooks()
    .then((r)=>{

        const data = r?.data.map(item=>{
            return {
                id:item.id,
                name: item.isbn,
                writerName:item.writerName,
                publisherName:item.publisherName,
                publishedDate:item.publishedDate,
                genre:item.genre,
                edit:<button onClick={()=>history.push(`books/${item.id}`)}>Izmjeni</button>,
                delete:<button onClick={()=>{
                    setModalData(item);
                    setIsModalOpen(true)
                }}>Izbrisi</button>
            }
        })
    
    setRows(data)
    })
    .catch((err)=>{
    console.log(err);
    })
},[refresh])

    return <div>
            <Modal show={isModalOpen} onHide={()=>setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Brisanje knjige</Modal.Title>
        </Modal.Header>
        <Modal.Body>Da li ste sigurni da zelite izbrisati {modalData?.writerName}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setIsModalOpen(false)}>
            Odustani
          </Button>
          <Button variant="primary" onClick={()=>onDelete()}>
            Izbrisi
          </Button>
        </Modal.Footer>
      </Modal>
   <TableData
   headers={headers}
   rows={rows}
   />
   <button onClick={()=>history.push('/books/add')}>Dodaj</button>

    </div>
}



export default Books