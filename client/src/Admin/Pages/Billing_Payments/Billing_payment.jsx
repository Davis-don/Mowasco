import React, { useState } from 'react';
import "./billing_payment.css";
import { MdNavigateNext } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";


const Billing_payment = () => {
    const navigate = useNavigate()


    const viewCustomerBill = async() => {
        try {
            navigate("/customer-bill");
        } catch (error) {
            console.log(error)
        }
    }
   
     const [error, setError] = useState(false);
     const [loading, setLoading] = useState(false);
     const [fName, setFName] = useState("");
     const [lName, setLName] = useState("");
     const [IDNumber, setIDNumber] = useState();
     const [phoneNumber, setPhoneNumber] = useState();
     const [connectionType, setConnectionType] = useState("");
     const validation = Yup.object({
       meterNumber: Yup.number().required("Please provide a meter number"),
       zone: Yup.number().required("Please provide a zone"),
       fName: Yup.string().required("Please provide customer first name."),
       lName: Yup.string().required("Please provide customers last name"),
       IDNumber: Yup.number().required(
         "Please provide national indentification number."
       ),
       phoneNumber: Yup.number().required("Provide customers phone number."),
       connectionType: Yup.string().required("Provide the connection type."),
     });

     const handleSubmit = async() => {
        try {
            
        } catch (error) {
            console.log(error)
        }
     }

     const formik = useFormik({
       initialValues: {
         fName: "",
         lastName: "",
         IDNumber: "",
         phoneNumber: "",
         connectionType: "",
       },
       onSubmit: handleSubmit,
       validationSchema: validation,
     });
    return (
      <div className="customer-bills">
        <div className="cust-top">
          <h4>Bills</h4>
          <div className="search">
            <input
              className="search-input"
              type="text"
              name="fName"
              value={fName}
              placeholder="Search customer.."
              onChange={(e) => setFName(e.target.value)}
              required
            />
            <button>Search</button>
          </div>
        </div>

        <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
          Customers Bills
        </h2>

        <div className="select">
          <select name="customer" id="customer">
            <option value="zones">Zones</option>
            <option value="paid">Paid bills</option>
            <option value="unPaid">Unpaid bills</option>
            <option value="arrears">Arrears</option>
          </select>
        </div>

        <table>
          <tr>
            <th>Customer Number</th>
            <th>First name</th>
            <th>Last Name</th>
            <th>Meter No</th>
            <th>Arrears</th>
            <th>Water bill</th>
            <th>Reconnection</th>
            <th>Other charges</th>
            <th>Status</th>
            <th>View</th>
          </tr>
          <tr>
            <td>1001</td>
            <td>Wilfred</td>
            <td>Kiama</td>
            <td>1001</td>
            <td>nil</td>
            <td>0</td>
            <td>Connected</td>
            <td>0</td>
            <td>Paid</td>
            <td>{<FaEye onClick={viewCustomerBill} />}</td>
          </tr>
        </table>
      </div>
    );
}


export default Billing_payment;