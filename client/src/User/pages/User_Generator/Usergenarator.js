import React, { useEffect, useState } from "react";
import "./Usergenerator.css";
import oceanimg from "../../../images/jack-b-o1radglopDA-unsplash.jpg";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import store from "../../../store/dataStore";
function Usergenarator() {
  const userName = store((state) => state.user);
  const [zone, setZone] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getZones = async () => {
    try {
      if (!userName) {
        return;
      }
      setLoading(true);
      const zones = await axios
        .get("http://localhost:4000/zones/all", {
          withCredentials: true,
        })
        .catch((error) => {
          if (error.status == 500) {
            setError(error.response.data.message);
          }
        });
      if (zones) {
        setZone(zones.data.data);
      } else {
        toast.warn("Zones were not found.");
      }
      setError(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (!userName) {
        return;
      }

      setError(false);
      setLoading(true);
      const queryUser = await axios
        .post(
          `http://localhost:4000/api/customers/search-customer`,
          {
            meterNumber: values.meterNumber,
            zones: values.zones,
          },
          {
            withCredentials: true,
          },
        )
        .catch((error) => {
          console.log(error);
          if (error.status == 500) {
            setError(error.response.data.message);
            toast.error(
              "Invalid inputs. The Meter number not is associated with that zone.",
              { position: "bottom-center" },
            );
          }
        });
      const custID = queryUser.data.data.customer.cust_id;

      if (queryUser.status == 200) {
        navigate(`/customer/current-reading/${custID}`);
      } else {
        toast.warn("Something went wrong.", {position:'bottom-center'});
      }
    } catch (error) {
      setError(error);
      return <div>{error.message}</div>;
    } finally {
      setLoading(false);
      setError(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      zones: "",
      meterNumber: "",
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    getZones();
  }, []);
  return (
    <div className="overall-user-generator ">
      {loading && <p>{"loading..."}</p>}
      {/* <img className='water-background' src={waterImage} alt='water in lake'/> */}
      <div className="form-div-container-user-gen">
        <p style={{ textAlign: "center" }}>
          Please enter the customer's zone and meter details below
        </p>
        <form className="user-gen-form update_customer" onSubmit={formik.handleSubmit}>
          < div className="inputs">
            <select
              className="form-select form-control"
              name="zones"
              value={formik.values.zones}
              onChange={formik.handleChange}
              id="sel1"
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
          </div>
          <div className="inputs">
            <input
              className="form-control"
              name="meterNumber"
              type="number"
              value={formik.values.meterNumber}
              onChange={formik.handleChange}
              placeholder="Meter Number"
            />
          </div>
          <div style={{ width: "max-content", margin: "auto" }}>
            <button>{loading ? "Generating ..." : "Generate Customer"}</button>
          </div>
        </form>
      </div>

      <div className="overall-usergen-container-form">
        <div className="form-user-gen-left">
          <p style={{ textAlign: "center" }}>
            Please enter the customer's zone and meter details below
          </p>
          <form className="user-gen-form" onSubmit={formik.handleSubmit}>
            <div>
              <select
                className="form-select form-control"
                name="zones"
                value={formik.values.zones}
                onChange={formik.handleChange}
                id="sel1"
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
              {error && <p className="error">{error}</p>}
            </div>
            <div>
              <input
                className="form-control"
                name="meterNumber"
                type="number"
                value={formik.values.meterNumber}
                onChange={formik.handleChange}
                placeholder="Meter Number"
              />
            </div>
            {error && <p className="error">{error}</p>}

            <div style={{ width: "max-content", margin: "auto" }}>
              <button>
                {loading ? "Generating ..." : "Generate Customer"}
              </button>
            </div>
            <ToastContainer />
          </form>

          {/* <form className='user-gen-form'>
             <div>
              <select className="form-select form-control"  name='zones' value={formik.values.zones} onChange={formik.handleChange} id="sel1">
               
                     <option  >Zones</option>
                {
                  zone && zone.length > 0 ? (
                    zone.map((zone, key) => (

                      <option value={zone.zone_id}>{zone.zoneName}</option>
                    ))
                  ) : (
                  <p>Loading zones...</p>
                  )
                }
              </select>
            </div>
            <div>
              <input className="form-control" name='meterNumber' type='number' value={formik.values.meterNumber} onChange={formik.handleChange} placeholder='Meter Number'/>
            </div>
               <div style={{ width: 'max-content', margin: 'auto' }}>
               <button>{loading ? 'Generating ...':'Generate Customer'}</button>
            </div>
          </form> */}
        </div>
        <div className="image-right-user-gen">
          <img
            className="ocean-background"
            src={oceanimg}
            alt="water in lake"
          />
        </div>
      </div>
    </div>
  );
}

export default Usergenarator;
