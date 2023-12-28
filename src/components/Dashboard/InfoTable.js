import { useEffect, useState } from 'react';
import axios from 'axios'
import GrowExample from '../Loader/Spinner';
import { Button, Table } from 'react-bootstrap';
import UpdateVehicleInfo from './UpdateVehicleInfo';
import AddVehicleInfo from './AddVehicleInfo';
import RemoveVehicleInfo from './RemoveVehicleInfo';


function InfoTable(props) {

  const [allVehicle, setAllVehicle] = useState([])
  const [loading, setLoading] = useState(true)


useEffect(()=>{
  axios.get(`${process.env.REACT_APP_FIREBASE_CLOUD_FUCNTION_URL}allvehicle`)
    .then(res => {
      const data = res.data;
      setAllVehicle(data)
      setLoading(false)
    }).catch(err => console.log(err))
},[allVehicle])

  return (
    <>

      <Table bordered hover size="sm" variant="light">
        <thead>
          <tr>
            <th>id</th>
            <th>category</th>
            <th>company</th>
            <th>modal</th>
            <th>owner</th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {loading ? <GrowExample /> : allVehicle.map(item => {
            return <>
              <tr>
                <td key={item.id} >{item.id}</td>
                <td>{item.category}</td>
                <td>{item.company}</td>
                <td>{item.modal}</td>
                <td>{item.owner}</td>
                <td className='d-flex justify-content-center'>

                  {/* <Button variant='btn btn-primary mx-2'>Add Vehicle info</Button> */}
                  <AddVehicleInfo allvehicle={allVehicle} setAllVehicle={setAllVehicle}/>
                  <UpdateVehicleInfo id={item.id} category={item.category} company={item.company} modal={item.modal} owner={item.owner} allvehicle={allVehicle} setAllVehicle={setAllVehicle}/>
                  <RemoveVehicleInfo id={item.id} allvehicle={allVehicle} setAllVehicle={setAllVehicle}/>
                 
                </td>
              </tr>
            </>
          })}

        </tbody>


      </Table>
      

      
    </>
  );
}

export default InfoTable;