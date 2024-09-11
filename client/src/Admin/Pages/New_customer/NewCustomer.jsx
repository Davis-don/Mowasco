import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { useFormik } from "formik";
import { useNavigate} from "react-router-dom";


const NewCustomer = () => {
    const navigate = useNavigate()
  const [serverMessage, setServerMessage] = useState("");
  const [displayServerComponent, setServerComponent] = useState(false);

  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [IDNumber, setIDNumber] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [connectionType, setConnectionType] = useState('')

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

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



  const handleSubmit = async (e) => {
    // navigate("/newTestFile");
    e.preventDefault()
    
      const data = {fName, lName, IDNumber, phoneNumber, connectionType}
      
        
console.log(typeof(phoneNumber))
      try {
        setLoading(true);
        const postUser = await axios
          .post("http://localhost:4000/customers/create", {
            custFirstName: fName,
            custLastName: lName,
            custID: parseInt(IDNumber),
            custPhoneNumber: parseInt(phoneNumber),
            custConnectionType: connectionType,
          })
          .catch((error) => {
            console.log(error);
            toast.error("Server error!. Please try again later.", {
              position: "top-center",
            });
            setError(error);
            return;
          });

        console.log(postUser);

        if (postUser.status == 200) {
          toast("Sucessfull.", { position: "top-center" });
        } else {
          toast.warn("something went wrong. Try again later.", {
            position: "bottom-center",
          });
        }
      } catch (error) {
        console.log("error", error);
        setError(error);
      } finally {
        setLoading(false);
      }
  };

  //get and map all the users from the database.

  const getCustomers = async () => {
    try {
      setLoading(true);
      setError(false);
      const getUsers = await axios
        .get(`http://localhost:4000/customers/all`)
        .catch((error) => {
          console.log(error);
          toast.error("Server error.", error.message);
          setError(error);
        });

      if (getUsers.status == 200) {
        toast.success("All users have been found successfully.");
      } else {
        toast.warn("Something went wrong. Please try again later.");
      }
      setCustomers(getUsers.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteCustomer = await axios
        .delete(`http://localhost:4000/customers/delete/${id}`)
        .catch((error) => {
          console.log(error);
          toast.warn("Server error");
        });

      if (deleteCustomer) {
        toast.success("Customer deleted successfully.");
      } else {
        toast.warn("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      fName: "",
      lastName: "",
      IDNumber: "",
      phoneNumber: "",
      connectionType: "",
    },
    onSubmit:handleSubmit,
    validationSchema: validation,
  });

  useEffect(() => {
    getCustomers();
  }, []);


  return (
    <>
      <div className="overall-add-user-container">
        <div className="form-encapsulator">
          <h2 style={{ textAlign: "center" }}>Create Account</h2>
          {displayServerComponent && (
            <div class="alert alert-info">
              <strong>{serverMessage}</strong>
            </div>
          )}

          <form action="" onSubmit={handleSubmit}>
            <div className="inputs">
              <input
                className="form-control m-2"
                type="text"
                name="fName"
                value={fName}
                placeholder="First name"
                onChange={(e) => setFName(e.target.value)}
              />
            </div>
            <div className="inputs">
              <input
                type="text"
                name="lName"
                className="form-control m-2"
                value={lName}
                placeholder="Last name"
                onChange={(e) => setLName(e.target.value)}
              />
            </div>

            <div className="inputs">
              <input
                type="number"
                name="IDNumber"
                className="form-control m-2"
                value={IDNumber}
                placeholder="ID number"
                onChange={(e) => setIDNumber(e.target.value)}
              />
            </div>
            <div className="inputs">
              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone number"
                className="form-control m-2"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="inputs">
              <input
                type="text"
                name="connectionType"
                placeholder="Connection type"
                className="form-control m-2"
                value={connectionType}
                onChange={(e) => setConnectionType(e.target.value)}
              />
            </div>
            <div className="adduser-button">
              <button type="button" className="btn btn-outline-primary">
                {loading ? "Submitting...." : "Submit"}
              </button>
            </div>
          </form>

          <ToastContainer />
        </div>
        {/* {error && <p>{error}</p>} */}
      </div>
      <table>
        <tr>
          <th>Meter no.</th>
          <th>Zone</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone number</th>
          <th>ID number</th>
          <th>Connection type</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>

        {customers && customers.length > 0 ? (
          customers.map((customer, key) => (
            <tr key={key}>
              <td>{customer.custMeterNumber}</td>
              <td>{customer.custZone}</td>
              <td>{customer.custFirstName}</td>
              <td>{customer.custLastName}</td>
              <td>{customer.custPhoneNumber}</td>
              <td>{customer.custID}</td>
              <td>{customer.custConnectionType}</td>
              <td>{customer.custStatus}</td>
              <td>{<MdEdit />}</td>
              <td>
                {
                  <MdDeleteForever
                    onClick={() => handleDelete(customer.cust_id)}
                  />
                }
              </td>
            </tr>
          ))
        ) : (
          <p>Loading customers</p>
        )}
      </table>
    </>
  );
};

export default NewCustomer;
