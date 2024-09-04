import React from 'react'
import './Receiptgen.css'
function Receiptgen() {
  return (
    <div className='overall-receipt-gen-container'>
        <div className='gen-water-receipt-form-div'>
            <form>
            <h6>Customer current water bill</h6>
             <div className='generate-receipt-overall-form-div'>
                <div>
                <input  type='number'placeholder='Meter-number'className='form-control m-2'/>
             <input  type='text'placeholder='previous meter readings'className='form-control m-2'/>
             <input  type='text'placeholder='previous water bill'className='form-control m-2'/>
             <input  type='text'placeholder='other arrears'className='form-control m-2'/>
             <input  type='text'placeholder='Total Bill'className='form-control m-2'/>
                </div>
                <div>
                <input  type='text'placeholder='customer names'className='form-control m-2'/>
             <input  type='text'placeholder='current water readings 'className='form-control m-2'/>
             <input  type='text'placeholder='status/paid or not  paid = balance'className='form-control m-2'/>
                </div>
            
             </div>
             <div style={{ width: 'max-content', margin: 'auto',padding:'20px' }}>
              <button className='btn btn-primary  '>Generate receipt</button>
            </div>
             </form>
        </div>
        </div>
  )
}

export default Receiptgen