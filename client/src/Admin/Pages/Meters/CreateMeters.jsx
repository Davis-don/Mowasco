import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import "./createmeters.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IoFilterSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineHistory } from "react-icons/ai";

const CreateMeters = () => {
  const navigate = useNavigate();
  const { cust_id } = useParams();

  const [serverMessage, setServerMessage] = useState("");
  const [displayServerComponent, setServerComponent] = useState(false);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [meters, setMeters] = useState([]);
  const [zone, setZone] = useState();

  const validation = Yup.object({
    meterNumber: Yup.number().required("Please provide a meter number"),
    zone: Yup.string().required("Please provide a zone"),
  });

  const getMeters = async () => {
    try {
      const getMeters = await axios
        .get(`http://localhost:4000/meters/all`, {
          withCredentials: true,
        })
        .catch((error) => console.log(error));

      if (getMeters) {
        setMeters(getMeters.data.data);
        console.log(getMeters.data.data);
      } else {
        toast.warn("Something went wrong..");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete meters.
  const deleteMeter = async (id) => {
    try {
      const remove = await axios
        .delete(`http://localhost:4000/meters/${id}`, {
          withCredentials: true,
        })
        .catch((error) => console.log(error));
      if (remove) {
        alert("Meter deleted");
      } else {
        alert("Something happened.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewHistory = async (id) => {
    try {
      navigate(`/${id}/meter-history`);
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      meterNumber: "",
      zone: "",
    },
    validationSchema: validation,
  });

  useEffect(() => {
    getMeters();
  }, []);
  return (
    <div>
      <div className="cust-top">
        <span>Meters</span>
      </div>
      <h4 style={{ textAlign: "center", marginTop: "1rem" }}>
        Registered Meters
      </h4>
      <div className="search-filter">
        <div className="search">
          <input
            className="search-input"
            type="text"
            name="fName"
            value={""}
            placeholder="Search customer.."
            onChange={""}
            required
          />
          <button>Search</button>
        </div>
        <div className="search-filter-left">
          <div className="filter">
            <IoFilterSharp className="filter-icon" />
            <span>Filter</span>
          </div>
        </div>
      </div>
      <table>
        <tr>
          <th>Meter no.</th>
          <th>Zone</th>
          <th>Meter Status</th>
          <th>Installation Date</th>
          <th>Repair Date</th>
          <th>History</th>
        </tr>
        {meters.length > 0 ? (
          meters.map((meter, key) => (
            <tr key={key}>
              <td>{meter.meterNumber}</td>
              <td>{meter.zones.zoneName}</td>
              <td>{meter.customer.custStatus}</td>
              <td>{meter.createdAt}</td>
              <td>{meter.createdAt}</td>
              {/* <td>
                {
                  <MdDeleteForever
                    onClick={() => deleteMeter(meter.meter_id)}
                  />
                }
              </td> */}
              <td>
                {
                  <AiOutlineHistory
                    onClick={() => viewHistory(meter.meter_id)}
                  />
                }
              </td>
            </tr>
          ))
        ) : (
          <p>Loading data ...</p>
        )}
      </table>
    </div>
  );
};

export default CreateMeters;
