import React, { useEffect, useState } from "react";
import "./newCustomer.css";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";
import { MdDateRange } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaOrcid } from "react-icons/fa";
import { GiPipes } from "react-icons/gi";
import { GrStatusGood } from "react-icons/gr";
import { formatDate, useDate } from "../../../CustomHooks/useDate";
import { useFetch } from "../../../CustomHooks/useFetch";
import Footer from "../../Components/Footer";
const ViewCustomer = () => {
  const { cust_id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {formatDate} = useDate()
  const { data, loading1, error1 } = useFetch(
    `${process.env.REACT_APP_VITE_API_URL_BASE}/customers/${cust_id}`
  );

  console.log('data', data)
  const [customer, setCustomer] = useState();


  const moreAboutCustomer = async () => {
    try {
      setError(false)
      setLoading(true)

      const customerData = await axios
        .get(`${process.env.REACT_APP_VITE_API_URL_BASE}/customers/${cust_id}`, {
          withCredentials:true
        })
        .catch((error) =>{
          setError('Something went wrong!!')
        });
      if (customerData.status == 200) {
        setCustomer(customerData.data.data);
      } else {
        toast.warn("Something went wrong", { position: "bottom-center" });
      }
    } catch (error) {
      setError('Server error.')
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
   // moreAboutCustomer();
  }, []);
  return (
    <>
      <div className="cust-details">
        <div className="cust-top">
          <span>
            <Link className="link" to={"/manage-customers"}>
              Customers
            </Link>
            <MdNavigateNext /> View Customer{" "}
          </span>
        </div>
        <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
          Customer Details
        </h2>

        {loading1 ? (
          "Loading details..."
        ) : (
          <>
            <div className="abt-meters">
              <div className="abt-1">
                <FaUser className="icons" />
                <span>
                  {data?.custFirstName} {data?.custLastName}
                </span>
              </div>
              <div className="abt-1">
                <FaTachometerAlt className="icons" />
                <span>{data?.meters.meterNumber}</span>
              </div>
              <div className="abt-1">
                <FaLocationDot className="icons" />
                <span>{data?.meters?.zones.zoneName}</span>
              </div>
              <div className="abt-1">
                <MdDateRange className="icons" />
                <span>{formatDate(data?.createdAt)}</span>
              </div>
            </div>

            <div className="abt-meters">
              <div className="abt-1">
                <FaPhoneAlt className="icons" />
                <span>+254({data?.custPhoneNumber})</span>
              </div>
              <div className="abt-1">
                <FaOrcid className="icons" />
                <span>{data?.custID}</span>
              </div>
              <div className="abt-1">
                <GiPipes className="icons" />
                <span>{data?.custConnectionType}</span>
              </div>
              <div className="abt-1">
                <GrStatusGood className="icons" />
                <span>{data?.custStatus}</span>
              </div>
            </div>
          </>
        )}
      </div>
    <Footer/>
    </>
  );
};

export default ViewCustomer;
