import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";
import "./newCustomer.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import Footer from "../../Components/Footer";
const UpdateCustomer = () => {
  const { cust_id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValues] = useState();
  const [isActive, setIsActive] = useState(false)
  const [customer, setCustomer] = useState({
    meterNumber: "",
    zone: "",
    custNumber: "",
    fName: "",
    lName: "",
    IDNumber: "",
    phoneNumber: "",
    connectionType: "",
    status: "",
  });

  const getCustomerDetails = async () => {
    try {
      const customerData = await axios
        .get(
          `${process.env.REACT_APP_VITE_API_URL_BASE}/customers/${cust_id}`,
          {
            withCredentials: true,
          }
        )
        .catch((error) => console.log(error));
      if (customerData.status == 200) {
        const customerInformation = customerData.data.data;
        setCustomer({
          ...customerInformation,
          fName: customerInformation.custFirstName,
          lName: customerInformation.custLastName,
          IDNumber: customerInformation.custID,
          custNumber: customerInformation.custNumber,
          status: customerInformation.custStatus,
          phoneNumber: customerInformation.custPhoneNumber,
          connectionType: customerInformation.custConnectionType,
          meterNumber: customerInformation.meters.meterNumber,
          zone: customerInformation.meters.zones.zoneName,
        });
      } else {
        toast.warn("Something went wrong", { position: "bottom-center" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const updateCustomer = await axios
        .patch(
          `${process.env.REACT_APP_VITE_API_URL_BASE}/customers/update/${cust_id}`,
          {
            custFirstName: customer.fName,
        custLastName: customer.lName,
        custID: parseInt(customer.IDNumber),
        custPhoneNumber: parseInt(customer.phoneNumber),
        custConnectionType: customer.connectionType,
        // 'custStatus'
          },
          {
            withCredentials: true,
          }
        )
        .catch((error) => console.log(error));

        if (updateCustomer.status == 200) {
          toast.success('Customer details updated successfully', {position: 'bottom-center'})
        } else{
          toast.warn('Something went wrong!!')
        }
    } catch (error) {
      console.log(error)
    }

  };


  // useEffect(() => {
  //   const loadDetails = () => {
  //     if (customer) {
  //       formik.setValues({
  //         fName: customer.custFirstName,
  //         lName: customer.custLastName,
  //         IDNumber: customer.custID,
  //         phoneNumber: customer.custPhoneNumber,
  //         connectionType: customer.custConnectionType,
  //       });
  //     }
  //   };
  //   loadDetails();
  // }, [customer]);

  useEffect(() => {
    getCustomerDetails();
  }, []);
  return (
    <div>
      <div className="cust-top">
        <span>
          <Link className="link" to={"/manage-customers"}>
            Customers
          </Link>{" "}
          <MdNavigateNext /> Update Details{" "}
        </span>
      </div>
      <h4 style={{ textAlign: "center", marginTop: "1rem" }}>
        Update Customer Details.
      </h4>
      <div className="forms">
        <form action="" className="update_customer" onSubmit={handleSubmit}>
          <div className="inputs">
            <label>Meter Number:</label>
            <input
              className="form-control"
              type="number"
              name="fName"
              value={customer.meterNumber}
              placeholder="Meter Number"
              required
              disabled
            />
          </div>

          <div className="inputs">
            <label>Customer Number:</label>
            <input
              className="form-control"
              type="number"
              name="fName"
              value={customer.custNumber}
              placeholder="Customer Number"
              required
              disabled
            />
          </div>

          <div className="inputs">
            <label>Zones:</label>
            <input
              className="form-control"
              type="text"
              name="zone"
              value={customer.zone}
              placeholder="First name"
              required
              disabled
            />
          </div>
          <div className="inputs">
            <label>First Name:</label>
            <input
              className="form-control"
              type="text"
              name="fName"
              value={customer.fName}
              onChange={(e) =>
                setCustomer({ ...customer, fName: e.target.value })
              }
              placeholder="First name"
              required
            />
          </div>
          <div className="inputs">
            <label>Last Name:</label>
            <input
              type="text"
              name="lName"
              className="form-control"
              value={customer.lName}
              placeholder="Last name"
              onChange={(e) =>
                setCustomer({ ...customer, lName: e.target.value })
              }
              required
            />
          </div>

          <div className="inputs">
            <label>ID Name:</label>
            <input
              type="number"
              name="IDNumber"
              className="form-control"
              value={customer.IDNumber}
              placeholder="ID number"
              onChange={(e) =>
                setCustomer({ ...customer, IDNumber: e.target.value })
              }
              required
            />
          </div>
          <div className="inputs">
            <label>Phone number:</label>

            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone number"
              className="form-control"
              value={customer.phoneNumber}
              onChange={(e) =>
                setCustomer({ ...customer, phoneNumber: e.target.value })
              }
              required
            />
          </div>

          <div className="inputs">
            <label>Connection type:</label>
            <input
              type="text"
              name="connectionType"
              placeholder="Connection type"
              value={customer.connectionType}
              className="form-control"
              onChange={(e) =>
                setCustomer({ ...customer, connectionType: e.target.value })
              }
              required
            />
          </div>
          {customer.status === "ACTIVE" ? (
            <>
              <div className=" cust-status">
                <label>Status</label>
                <span className="status">Active</span>
              </div>
            </>
          ) : (
            <>
              <div className=" cust-status">
                <label>Status</label>
                <span className="inactive">Disconnected</span>
              </div>
            </>
          )}

          <div className="adduser-button">
            <button  type="submit">
              {loading ? "Updating details..." : "Update"}
            </button>
          </div>
          <ToastContainer />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateCustomer;
