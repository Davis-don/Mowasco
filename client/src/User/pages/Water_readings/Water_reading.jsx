import axios from "axios";
import { useFormik } from "formik";
import "./water_reading.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const Water_reading = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState();
  const [customer, setCustomer] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const getData = await axios
          .get(`http://localhost:4000/customers/${id}`, {
            withCredentials: true,
          })
          .catch((error) => console.log(error));
        if (getData.status == 200) {
          toast.success("Customer found successfully.", {
            position: "bottom-center",
          });
          setCustomer(getData.data.data);
        } else {
          toast.success("Something went wrong.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetails();
  }, []);
  const handleSubmit = async (values) => {
    try {
      const meterID = customer.meters.meter_id;
      const postRecordings = await axios
        .post(
          `http://localhost:4000/customer/reading/create`,
          {
            meter_id: meterID,
            currentReading: values.currentReading,
          },
          {
            withCredentials: true,
          },
        )
        .catch((error) => console.log(error));
      if (postRecordings.status == 200) {
        navigate(`/customer/meter/${meterID}`);
      } else {
        alert("something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      currentReading: "",
    },
    onSubmit: handleSubmit,
  });
  return (
    <div>
      <div className="overall-gen-water-bill-container container-fluid">
        <div className="gen-water-bill-form-div">
          <h1>Please enter the current meter readings.</h1>
          <form className="user-gen-form" onSubmit={formik.handleSubmit}>
            <div className="input">
              <label htmlFor="currentReading">Current Reading:</label>
              <input
                className="form-control water-reading"
                name="currentReading"
                type="number"
                value={formik.values.currentReading}
                onChange={formik.handleChange}
                placeholder="Current reading"
              />
            </div>

            <div
              style={{
                width: "max-content",
                margin: "auto",
                marginTop: ".5rem",
              }}
            >
              <button>{loading ? "Generating ..." : "Generate bill"}</button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Water_reading;
