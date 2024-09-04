import React from 'react'
import './Usergenerator.css'
// import waterImage from '../images/yoann-boyer-i14h2xyPr18-unsplash.jpg'
import oceanimg from '../../../images/jack-b-o1radglopDA-unsplash.jpg'

// import oceanimg from '../images/jack-b-o1radglopDA-unsplash.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
function Usergenarator() {
  return (
    <div className='overall-user-generator'>
         {/* <img className='water-background' src={waterImage} alt='water in lake'/> */}
         <div className="form-div-container-user-gen">
        <p style={{ textAlign: 'center' }}>Please enter the customer's zone and meter details below</p>
          <form className='user-gen-form'>
            <div>
            
    <select  className="form-select form-control" id="sel1" name="zone">
      <option>Zone</option>
      <option>Mugunda</option>
      <option>Gatarakwa</option>
      <option>Kiawara</option>
    </select>
    </div>
    <div>
              <input className="form-control" placeholder="Meter number"/>
              </div>
            <div style={{ width: 'max-content', margin: 'auto' }}>
              <button className='btn btn-primary actual-generate-customer-btn'>Generate Customer</button>
            </div>
          </form>
        
      </div>






         <div className='overall-usergen-container-form'>
    <div className='form-user-gen-left'>
    <p style={{ textAlign: 'center' }}>Please enter the customer's zone and meter details below</p>
          <form className='user-gen-form'>
            <div>
            
    <select  className="form-select form-control" id="sel1" name="zone">
      <option>Zone</option>
      <option>Mugunda</option>
      <option>Gatarakwa</option>
      <option>Kiawara</option>
    </select>
    </div>
    <div>
              <input className="form-control" placeholder="Meter number"/>
              </div>
            <div style={{ width: 'max-content', margin: 'auto' }}>
              <button className='btn btn-primary actual-generate-customer-btn'>Generate Customer</button>
            </div>
          </form>
    </div>
    <div className='image-right-user-gen'>
     <img className='ocean-background' src={oceanimg} alt='water in lake'/>
    </div>
         </div>
        </div>
  )
}

export default Usergenarator