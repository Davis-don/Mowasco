import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const RegisterMeters = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [zone, setZone] = useState();
  const { cust_id } = useParams();

  const getZones = async () => {
    try {
      setLoading(true);
      const zones = await axios
        .get(`${process.env.REACT_APP_VITE_API_URL_BASE}/zones/all`, {
          withCredentials: true,
        })
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
        .post(
          `${process.env.REACT_APP_VITE_API_URL_BASE}/meters/create`,
          {
            meterNumber: values.meterNumber,
            zone: values.zone,
            cust_id: cust_id,
          },
          {
            withCredentials: true,
          }
        )
        .catch((error) => {
          toast.error("Server error", { position: "bottom-center" });
          setError(error);
        });
      if (createMeter.status == 200) {
        navigate(`/manage-customers`);
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
      <div className="forms">
        <form
          action=""
          className="update_customer"
          onSubmit={formik.handleSubmit}
        >
          <div className="inputs">
            <label htmlFor="zone">Select zone:</label>
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
            <label htmlFor="meterNumber">Assign Meter No.:</label>

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
            <button >
              {loading ? "Assigning meter...." : "Assign meter"}
            </button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default RegisterMeters;
