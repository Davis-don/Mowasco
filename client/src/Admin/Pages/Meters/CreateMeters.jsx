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
  const navigate = useNavigate()
  const {cust_id} = useParams()

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

  const getZones = async () => {
    try {
      setLoading(true);
      const zones = await axios
        .get("http://localhost:4000/zones/all")
        .catch((error) => console.log(error));
      if (zones) {
        setZone(zones.data.data);
      } else {
        toast.warn("Zones were not found.");
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (values) => {
    try {
      setError(false);
      setLoading(true);

      const createMeter = await axios
        .post(`http://localhost:4000/meters/create`, {
          meterNumber: values.meterNumber,
          zone: values.zone,
          cust_id: cust_id
        })
        .catch((error) => {
          console.log(error);
          toast.error("Server error", { position: "bottom-center" });
          setError(error);
        });
      if (createMeter.status == 200) {
        toast.success("Meter recorded successfully.");
      } else {
        toast.warning("Something went wrong. Please try again later!");
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getMeters = async () => {
    try {
      const getMeters = await axios
        .get(`http://localhost:4000/meters/all`)
        .catch((error) => console.log(error));

      if (getMeters) {
        setMeters(getMeters.data.data);
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
        .delete(`http://localhost:4000/meters/${id}`)
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

  const viewHistory = async() => {
    try {
      navigate("/meter-history");
    } catch (error) {
      console.log(error)
    }
  }
  const formik = useFormik({
    initialValues: {
      meterNumber: "",
      zone: "",
    },
    onSubmit: handleSubmit,
    validationSchema: validation,
  });

  useEffect(() => {
    getMeters();
    getZones();
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
          <th>Edit</th>
          <th>Delete</th>
          <th>History</th>
        </tr>
        {meters.length > 0 ? (
          meters.map((meter, key) => (
            <tr key={key}>
              <td>{meter.meterNumber}</td>
              <td>{meter.zone}</td>
              <td>Active</td>
              <td>12th June, 2007</td>
              <td>20th December, 2024</td>
              <td>{<MdEdit />}</td>
              <td>
                {
                  <MdDeleteForever
                    onClick={() => deleteMeter(meter.meter_id)}
                  />
                }
              </td>
              <td>{<AiOutlineHistory onClick={viewHistory} />}</td>
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
