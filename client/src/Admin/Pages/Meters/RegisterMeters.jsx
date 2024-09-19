import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const RegisterMeters = () => {
    const navigate = useNavigate()
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [zone, setZone] = useState();
  const {cust_id} = useParams();

  const getZones = async () => {
    try {
      setLoading(true);
      const zones = await axios
        .get("http://localhost:4000/zones/all")
        .catch((error) => console.log(error));
      if (zones) {
        setZone(zones.data.data);
        console.log('zones', zones.data.data)
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
          cust_id: cust_id,
        })
        .catch((error) => {
          console.log(error);
          toast.error("Server error", { position: "bottom-center" });
          setError(error);
        });
        console.log("zones",values.zone);
        console.log("zones", values.meterNumber);


      if (createMeter.status == 200) {
        navigate(`/manage-customers`)
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

  const validation = Yup.object({
    meterNumber: Yup.number().required("Please provide a meter number"),
    zone: Yup.string().required("Please provide a zone"),
  });
  const formik = useFormik({
    initialValues: {
      meterNumber: "",
      zone: "",
    },
    onSubmit: handleSubmit,
    validationSchema: validation,
  });
  useEffect(() => {
    getZones();
  }, []);
  return (
    <div>
      <div className="cust-top">
        <span>
          <Link className="link" to={"/manage-customers"}>
            Customers
          </Link>
          <MdNavigateNext />{" "}
          <span>
            <Link className="link" to={"/add-new-customer"}>
              Register
            </Link>
          </span>{" "}
          <MdNavigateNext /> New Customer
        </span>
      </div>
      <h4 style={{ textAlign: "center", marginTop: "1rem" }}>
        Register a new Customer
      </h4>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="inputs">
          <select
            className="form-select form-control"
            name="zone"
            value={formik.values.zone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option>Zones</option>
            {zone && zone.length > 0 ? (
              zone.map((zone, key) => (
                <option value={zone.zone_id}>{zone.zoneName}</option>
              ))
            ) : (
              <p>Loading zones...</p>
            )}
          </select>
          {formik.touched.zone && formik.errors.zone && (
            <p>{formik.errors.zone}</p>
          )}
        </div>

        <div className="inputs">
          <input
            className="form-control"
            type="number"
            name="meterNumber"
            value={formik.values.meterNumber}
            placeholder="Meter number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.meterNumber && formik.errors.meterNumber && (
            <p>{formik.errors.meterNumber}</p>
          )}
        </div>

        <div className="adduser-button">
          <button className="btn btn-outline-primary">
            {loading ? "Assignign meter...." : "Assign meter"}
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default RegisterMeters;
