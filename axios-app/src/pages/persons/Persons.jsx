import React, { useEffect, useState } from 'react'
// import NavbarTop from '../../components/navbar/Navbar'
import TableData from '../../components/table/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router';
import { deletePerson, getAllPeople} from '../../services/persons';

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


const Persons = () =>{
const history= useHistory();
const [rows,setRows] = useState([]);
const [isModalOpen,setIsModalOpen] = useState(false)
const [modalData,setModalData] = useState();
const [refresh,setRefresh] = useState(0)

const onDelete = () =>{
    if(modalData?.id){
        deletePerson(modalData?.id)
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
    getAllPeople()
    .then((r)=>{

        const data = r?.data.map(item=>{
            return {
                id:item.id,
                firstName: item.firstName,
                lastName:item.lastName,
                dateOfBirth:item.dateOfBirth,
                age:item.age,
                // gender:item.gender,
                occupation:item.occupation,
                edit:<button onClick={()=>history.push(`people/${item.id}`)}>Izmjeni</button>,
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
          <Modal.Title>Brisanje osobe</Modal.Title>
        </Modal.Header>
        <Modal.Body>Da li ste sigurni da zelite izbrisati {modalData?.firstName}</Modal.Body>
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
   <button onClick={()=>history.push('/people/add')}>Dodaj</button>

    </div>
}



export default Persons