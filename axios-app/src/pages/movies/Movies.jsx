import React, { useEffect, useState } from 'react'
// import NavbarTop from '../../components/navbar/Navbar'
import TableData from '../../components/table/Table'
import { deleteMovie, getAllMovies } from '../../services/movies';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const headers=[
    'id',
    'Naziv',
    'Režiser',
    'Scenarista',
    'Trajanje',
    'Ocjena',
    "Izmijeni",
    "Obrisi",
]


const Movies = () =>{

const [rows,setRows] = useState([]);
const [isModalOpen,setIsModalOpen] = useState(false)
const [modalData,setModalData] = useState();
const [refresh,setRefresh] = useState(0)

const onDelete = () =>{
    if(modalData?.id){
        deleteMovie(modalData?.id)
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
    getAllMovies()
    .then((r)=>{

        const data = r?.data.map(item=>{
            return {
                id:item.id,
                name: item.name,
                directorName:item.directorName,
                writerName:item.writerName,
                duration:item.duration,
                ration:item.rating,
                edit:<button onClick>Izmjeni</button>,
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
          <Modal.Title>Brisanje filma</Modal.Title>
        </Modal.Header>
        <Modal.Body>Da li ste sigurni da zelite izbrisati {modalData?.name}</Modal.Body>
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
   {/* <button onClick>Dodaj</button> */}

    </div>
}



export default Movies