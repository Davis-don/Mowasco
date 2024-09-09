import React, { useEffect, useState } from 'react'
import './Receiptgen.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
function Receiptgen() {
   const { id } =  useParams()
   const [ receiptData, setReceiptData] = useState();
   const [waterReadings, setWaterReadings] = useState()

   const handleSubmit = async() => {

   }

   const getWaterReadings = async (meterID) => {
      try {
         const getData = await axios.get(`http://localhost:4000/customer/reading/${meterID}`).catch(error => console.log(error))

         if(getData.status == 200){
            console.log(getData.data.data)
               setWaterReadings(getData.data.data)
         } else{
            toast.warning('Something went wrong. Please try again later!!')
         }
         
      } catch (error) {
         console.log(error)
      }
   }


   const getReceipt = async() => {
      try {
      const getReceiptData = await axios.get(`http://localhost:4000/customer/receipt/${id}`).catch(error => console.log(error))
      
      if (getReceiptData.status == 200){
         const receiptData = getReceiptData.data.data
         const meterID = receiptData.meters.meter_id;
         setReceiptData(receiptData)
         getWaterReadings(meterID)
         
         
      } else{
         toast.warn("Something went wrong.")
      }

      } catch (error) {
         console.log(error)
      }
   }

      useEffect(() => {
    const loadDetails = () => {
      if (receiptData) {
        formik.setValues({
         receiptNumber:receiptData.receiptNumber,
         custNumber:receiptData.customer.cust_id,
         fName:receiptData.customer.custFirstName,
         lName:receiptData.customer.custLastName,
         meterNumber:receiptData.meters.meterNumber,
         phoneNumber:receiptData.customer.custPhoneNumber,
         zoneArea:receiptData.customer.zone.zoneName,
         currentWaterReadings:waterReadings.currentReading,
         prevWaterReadings:waterReadings.prevReading,
         consumption:receiptData.billing.consumption,
         amountDue:receiptData.billing.amountDue,
         receiptDate:receiptData.createdAt
        });
      }
    };
    getReceipt()
    loadDetails();
  }, []);


   const  formik = useFormik({
      initialValues:{
         receiptNumber:'',
         custNumber:'',
         fName:'',
         lName:'',
         meterNumber:'',
         phoneNumber:'',
         zoneArea:'',
         currentWaterReadings:'',
         prevWaterReadings:'',
         consumption:'',
         amountDue:'',
         receiptDate:''
      }, onSubmit:handleSubmit
   })
  return (
    <div className='overall-receipt-gen-container'>
        <div className='gen-water-receipt-form-div'>
      <h1>Customer receipt</h1>

            <form onSubmit={formik.handleSubmit}>
            <h6>Customer current water bill</h6>
             <div className='generate-receipt-overall-form-div'>
            <div>
               <label for=''>Receipt number:</label>
               <input  type='number' value={formik.values.receiptNumber} placeholder='Receipt number'className='form-control m-2'/>
               <label for=''>Customer number::</label>
               <input  type='text' value={formik.values.custNumber} placeholder='Customer Number'className='form-control m-2'/>
               <label for=''>Meter number:</label>
               <input  type='text' value={formik.values.meterNumber} placeholder='Meter number'className='form-control m-2'/>
               <label for=''>Zone Area:</label>
               <input  type='text'value={formik.values.zoneArea} placeholder='Zone area'className='form-control m-2'/>
               <label for=''>Customer first Name:</label>
               <input  type='text' value={formik.values.fName} placeholder='First Name' className='form-control m-2'/>
               <label for=''>Customer last name</label>
               <input  type='text' value={formik.values.lName} placeholder='Last name'className='form-control m-2'/>
               <label for=''>Customer phone number:</label>
               <input  type='text' value={formik.values.phoneNumber} placeholder='Phone number'className='form-control m-2'/>
               <label for=''>Current water readings.</label>
               <input  type='text' value={formik.values.currentWaterReadings} placeholder='Current water readings.'className='form-control m-2'/>
               <label for=''>Previous water reading.:</label>
               <input  type='text' value={formik.values.prevWaterReadings} placeholder='Previous water readings.'className='form-control m-2'/>
               <label for=''>Consumption:</label>
               <input  type='text' value={formik.values.consumption} placeholder='Consumption.'className='form-control m-2'/>
               <label for=''>Total bill:</label>
               <input  type='text' value={formik.values.amountDue} placeholder='Total Bill'className='form-control m-2'/>
               <label for=''>Receipting date:</label>
               <input  type='text' value={formik.values.receiptDate} placeholder='Total Bill'className='form-control m-2'/>

                </div>
            
             </div>
             <div style={{ width: 'max-content', margin: 'auto',padding:'20px' }}>
              <button className='btn btn-primary  '>Generate receipt</button>
            </div>
             </form>
        </div>
        <ToastContainer/>
        </div>
  )
}

export default Receiptgen