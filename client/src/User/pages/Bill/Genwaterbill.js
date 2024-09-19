import React, { useEffect, useState } from 'react'
import './Genwaterbill.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function Genwaterbill() {
  const navigate = useNavigate()
  const {id} = useParams()
  const [waterReadings, setWaterReadings] = useState()
  const [meter, setMeter] = useState()
  const [bill, setBill] = useState()

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const getData = await axios.get(`http://localhost:4000/meters/${id}`).catch(error => console.log(error))    
        if (getData.status == 200){
          toast.success('Meter found successfully.')
          setMeter(getData.data.data)
    
        }else{
          toast.success('Something went wrong.')
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchDetails()
  }, [])


  // // fetch the meter readings. 
  const fetchMeterReadings = async () => {
    try {
    //  const meterID = (customer.meters.meter_id)
      const getReadings = await axios.get(`http://localhost:4000/customer/reading/${id}`).catch(error => console.log('water reading',error))

      if(getReadings.status == 200){
        
        setWaterReadings(getReadings.data.data)
      } else{
        toast.success('Something went wrong.')
      }
    } catch (error) {
      console.log(error)
    }
  }

   useEffect(() => {
    const loadDetails = () => {
      if (meter) {
        formik.setValues({
          meterNumber:meter.meterNumber,
          zone:meter.zones.zoneName,
          fName:meter.customer.custFirstName,
          lName:meter.customer.custFirstName,
          IDNumber:meter.customer.custID,
          phoneNumber:meter.customer.custPhoneNumber,
          prevWaterReading:waterReadings.prevReading,
          consumption:waterReadings.consumption,
          currentWaterReadings: waterReadings.currentReading
        });
      }
    };
    loadDetails();
    fetchMeterReadings()
  }, [meter]);

    const createReceipt = async(billID, custID, meterID, amountPaid) => {
    try {
      const receipt = await axios.post(`http://localhost:4000/customer/receipt/generate`, {
        amount_paid:amountPaid,
        bill_id:billID,
        cust_id:custID,
        meter_id:meterID 
      }).catch(error => console.log(error))

      if(receipt.status == 200){
        const receiptData= receipt.data.data
        const receiptID = receiptData.receipt_id;
        navigate(`/customer/meter/receipt/${receiptID}`)
      } else{
        toast.warn('Something went wrong.')
      }
      
    } catch (error) {
      console.log(error)
    }
  }
 const getBillDetails = async (id) => {
try {
      const billDetails = await axios.get(`http://localhost:4000/customer/bill/${id}`).catch(error => console.log(error))
      if(billDetails.status == 200){
        
        const billData = billDetails.data.data
        const billID = billData.bill_id
        const custID = billData.cust_id
        const meterID = billData.meter_id;
        const amountPaid = billData.amountDue
        createReceipt(billID, custID, meterID, amountPaid)
      } else{
        toast.warn('Something went wrong.')
      }
      
    } catch (error) {
      console.log(error)
    }
 }

  const handleSubmit = async(values) => {
    try {
      const createBill = await axios.post(`http://localhost:4000/customer/bill/create`, {
        cust_id: meter.customer.cust_id,
        meter_id: meter.meter_id,
        consumption:values.consumption,
      }).catch(error => console.log(error))

      if (createBill.status == 200) {
        const bill = (createBill.data.data)
         console.log('bill id', bill.bill_id)
        getBillDetails(bill.bill_id)
       

      } else{
        alert('something went wrong.')
      }


    } catch (error) {
      console.log(error)
    }
    
  }
  const formik= useFormik({
    initialValues: {
      meterNumber:'',
      zone:"",
      fName:'',
      lName:'',
      IDNumber:'',
      phoneNumber:'',
      currentWaterReadings:'',
      prevWaterReading:'',
      consumption:''
    },
    onSubmit: handleSubmit
  })
  return (
    <div className='overall-gen-water-bill-container container-fluid'>
        <div className='gen-water-bill-form-div'>
             <h6>Customer details</h6>
        <form className='container-fluid' onSubmit={formik.handleSubmit}>
        <div  className='overall-customer-details-container'>
                
              <input  type='text' value={formik.values.meterNumber} placeholder='customer-number'className='form-control m-2'/>
              <input type='number' value={formik.values.zone} placeholder='Zone Area'className='form-control  m-2'/>
              <input type='text' value={formik.values.fName} placeholder='First Name'className='form-control  m-2'/>
              <input type='text' value={formik.values.lName} placeholder='Last Name'className='form-control  m-2'/>
              <input type='number' value={formik.values.IDNumber} placeholder='ID Number'className='form-control  m-2'/>
              <input type='number' value={formik.values.phoneNumber} placeholder='Phone Number'className='form-control  m-2'/>
            </div>


            <h6>Water readings</h6>

            <div>
              <label>Current Water readings</label>
            <input type='number'value={formik.values.currentWaterReadings} name='currentWaterReadings' placeholder='0' onChange={formik.handleChange} className='form-control  m-2'/>
            <label>Previous Water readings</label>
            <input type='number' value={formik.values.prevWaterReading} name='prevWaterReading' placeholder='0' onChange={formik.handleChange} className='form-control  m-2'/>
            <label>Total consumed</label>
            <input type='number'value={formik.values.consumption} name='consumption' placeholder='0' onChange={formik.handleChange} className='form-control  m-2'/>
                </div>
                <div style={{ width: 'max-content', margin: 'auto',padding:'20px' }}>
              <button className='btn btn-primary  '>Generate Bill</button>
            </div>
        </form>
        <ToastContainer/>
        </div>
        </div>
  )
}

export default Genwaterbill