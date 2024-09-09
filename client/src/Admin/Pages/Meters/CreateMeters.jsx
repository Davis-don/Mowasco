import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import "./createmeters.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
const CreateMeters = () => {
  const [serverMessage, setServerMessage] = useState("");
  const [displayServerComponent, setServerComponent] = useState(false);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [meters, setMeters] = useState([]);
  const [zone, setZone] = useState()

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

      console.log(values)
      const createMeter = await axios
        .post(`http://localhost:4000/meters/create`, {
          meterNumber: values.meterNumber,
          zone: values.zone,
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
  const deleteMeter = async(id) => {
    try {
        const remove = await axios.delete(`http://localhost:4000/meters/${id}`).catch(error => console.log(error))
        if (remove){
            alert('Meter deleted')
        }else {
            alert('Something happened.')
        }
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
    getZones()
  }, []);
  return (
    <div>
      <div className="overall-add-user-container ">
        <div className="form-encapsulator">
          <h2 style={{ textAlign: "center" }}>Register new meter</h2>
          {displayServerComponent && (
            <div class="alert alert-info">
              <strong>{serverMessage}</strong>
            </div>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div>
              <input
                onChange={formik.handleChange}
                name="meterNumber"
                value={formik.meterNumber}
                type="number"
                placeholder="Meter number"
                className="form-control m-2"
                onBlur={formik.handleBlur}
              />
              {formik.touched.meterNumber && formik.errors.meterNumber && (
                <p>{formik.errors.meterNumber}</p>
              )}
            </div>

            <div>
              <select
                onChange={formik.handleChange}
                name="zone"
                type='text'
                value={formik.zone}
                className="form-control m-2"
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
            <div className="adduser-button">
              <button className="btn btn-outline-primary">
                {loading ? "Submitting...." : "Submit"}
              </button>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
      <div className="meters">
        <h2>Registered meters.</h2>
        <table>
          <tr>
            <th>Meter no.</th>
            <th>Zone</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {meters.length > 0 ? (
            meters.map((meter, key) => (
              <tr key={key}>
                <td>{meter.meterNumber}</td>
                <td>{meter.zone}</td>
                <td>{<MdEdit />}</td>
                <td>
                  {
                    <MdDeleteForever
                      onClick={() => deleteMeter(meter.meter_id)}
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
    </div>
  );
};

export default CreateMeters;
