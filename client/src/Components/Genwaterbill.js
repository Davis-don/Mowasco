import React from 'react'
import './Genwaterbill.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Genwaterbill() {
  return (
    <div className='overall-gen-water-bill-container container-fluid'>
        <div className='gen-water-bill-form-div'>
        <form className='container-fluid'>
            <h6>Customer details</h6>
            <div className='overall-customer-details-container'>
                <div>
            <input  type='text'placeholder='customer-number'className='form-control m-2'/>
            <input type='text'placeholder='first name'className='form-control  m-2'/>
            <input type='text'placeholder='any other info'className='form-control  m-2'/>
                </div>
                <div>
                <input type='text'placeholder='Zone'className='form-control  m-2'/>
                <input type='text'placeholder='Last Name'className='form-control  m-2'/>
                </div>
            </div>
            <h6>Water readings</h6>
            <div>
            <input  type='number'placeholder='meter number'className='form-control m-2'/>
            <input type='number'placeholder='current water reading'className='form-control  m-2'/>
            <input type='text'placeholder='current water bill'className='form-control  m-2'/>
                </div>

                <div style={{ width: 'max-content', margin: 'auto',padding:'20px' }}>
              <button className='btn btn-primary  '>Generate Bill</button>
            </div>
        </form>
        </div>
        </div>
  )
}

export default Genwaterbill