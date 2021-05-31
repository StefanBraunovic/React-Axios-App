import React from 'react';
import Table from 'react-bootstrap/Table'
import uuid from 'react-uuid'
import PropTypes from 'prop-types'


const TableData = ({
                 headers =[],rows =[]
                }) =>{

    return <Table striped bordered hover variant="dark">
    <thead>
      <tr>
          {
              headers?.length &&
              headers.map(item=><th key={uuid()}>{item}</th>)
          }
      </tr>
    </thead>
    <tbody>
      
          {
              rows?.length &&
              rows.map(item=>{
                  return <tr key={uuid()}>
                    {Object.values(item).map(data=> <td key={uuid()} >{data}</td>)}
                  </tr>
              })
          }
    </tbody>
  </Table>
}

export default TableData;



TableData.propTypes={
  headers:PropTypes.array.isRequired,
  rows:PropTypes.array.isRequired
}


