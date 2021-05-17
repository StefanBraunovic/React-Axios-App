import React from 'react';
import Table from 'react-bootstrap/Table'


const TableData = ({
                 headers =[],rows =[]
                }) =>{

    return <Table striped bordered hover variant="dark">
    <thead>
      <tr>
          {
              headers?.length &&
              headers.map(item=><th key={item}>{item}</th>)
          }
      </tr>
    </thead>
    <tbody>
      
          {
              rows?.length &&
              rows.map(item=>{
                  return <tr>
                    {Object.values(item).map(data=> <td>{data}</td>)}
                  </tr>
              })
          }
    </tbody>
  </Table>
}

export default TableData;