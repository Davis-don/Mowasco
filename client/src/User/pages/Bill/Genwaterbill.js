import React, { useEffect, useState } from "react";
import "./Genwaterbill.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Genwaterbill() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [waterReadings, setWaterReadings] = useState();
  const [meter, setMeter] = useState();
  const [bill, setBill] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setError(false);
        setLoading(true);

        const getData = await axios
          .get(`http://localhost:4000/meters/${id}`, {
            withCredentials: true,
          })
          .catch((error) => {
            setError(error.message);
            console.log(error);
          });
        if (getData.status == 200) {
          setMeter(getData.data.data);
        } else {
          toast.success("Something went wrong.");
        }
      } catch (error) {
        setError("Server error. Please try again later");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, []);

  // // fetch the meter readings.
  const fetchMeterReadings = async () => {
    try {
      setLoading(true);
      setError(false);
      //  const meterID = (customer.meters.meter_id)
      const getReadings = await axios
        .get(`http://localhost:4000/customer/reading/${id}`, {
          withCredentials: true,
        })
        .catch((error) => {
          setError(error.message);
          console.log("water reading", error);
        });

      if (getReadings.status == 200) {
        setWaterReadings(getReadings.data.data);
      } else {
        toast.success("Something went wrong.");
      }
    } catch (error) {
      setError("Server error. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadDetails = () => {
      if (meter) {
        formik.setValues({
          meterNumber: meter.meterNumber,
          custNumber: meter.customer.custNumber,
          zone: meter.zones.zoneName,
          fName: meter.customer.custFirstName,
          lName: meter.customer.custLastName,
          IDNumber: meter.customer.custID,
          phoneNumber: meter.customer.custPhoneNumber,
          prevWaterReading: waterReadings?.prevReading,
          consumption: waterReadings?.consumption,
          currentWaterReadings: waterReadings?.currentReading,
        });
      }
    };
    // meter ? loadDetails():setLoading(true)
    loadDetails();
    fetchMeterReadings();
  }, [meter]);

  const createReceipt = async (billID, custID, meterID, amountPaid) => {
    try {
      setLoading(true);
      setError(false);
      const receipt = await axios
        .post(
          `http://localhost:4000/customer/receipt/generate`,
          {
            amount_paid: amountPaid,
            bill_id: billID,
            cust_id: custID,
            meter_id: meterID,
          },
          {
            withCredentials: true,
          },
        )
        .catch((error) => {
          setError(error.message);
          console.log(error)
        });

      if (receipt.status == 200) {
        const receiptData = receipt.data.data;
        const receiptID = receiptData.receipt_id;
        navigate(`/customer/meter/receipt/${receiptID}`);
      } else {
        toast.warn("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
      setError("Server error. Please try again later");
    } finally {
      setLoading(false);
    }
  };
  const getBillDetails = async (id) => {
    try {
      setLoading(true);
      setError(false);
      const billDetails = await axios
        .get(`http://localhost:4000/customer/bill/${id}`, {
          withCredentials: true,
        })
        .catch((error) => {
          setError(error.message);
        });

      if (billDetails.status == 200) {
        const billData = billDetails.data.data;
        const billID = billData.bill_id;
        const custID = billData.customer.cust_id;
        const meterID = billData.customer.meters.meter_id;
        const amountPaid = billData.amountDue;
        createReceipt(billID, custID, meterID, amountPaid);
      } else {
        toast.warn("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
      setError("Server error. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError(false);
      const createBill = await axios
        .post(
          `http://localhost:4000/customer/bill/create`,
          {
            cust_id: meter.customer.cust_id,
            meter_id: meter.meter_id,
            consumption: values.consumption,
          },
          {
            withCredentials: true,
          },
        )
        .catch((error) => {
          setError(error.message);
          console.log(error)
        });

      if (createBill.status == 200) {
        const bill = createBill.data.data;
        getBillDetails(bill.bill_id);
      } else {
        alert("something went wrong.");
      }
    } catch (error) {
      console.log(error);
      setError("Server error. Please try again later");
    } finally {
      setLoading(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      meterNumber: "",
      // customerNumber:'',
      zone: "",
      fName: "",
      lName: "",
      custNumber: "",
      IDNumber: "",
      phoneNumber: "",
      currentWaterReadings: "",
      prevWaterReading: "",
      consumption: "",
    },
    onSubmit: handleSubmit,
  });
  return (
    <div className="overall-gen-water-bill-container container-fluid">
      {loading ? (
        "Loading ... "
      ) : (
        <div className="gen-water-bill-form-div cust-readings">
          <h4>
            Customer <span> details</span>
          </h4>
          <form className="container-fluid" onSubmit={formik.handleSubmit}>
            <div className="overall-customer-details-container">
              <div className="customer-top">
                <div className="input">
                  <label>Meter No.</label>
                  <input
                    type="text"
                    value={formik.values.meterNumber}
                    placeholder="customer-number"
                    className="form-control m-2"
                    disabled
                  />
                </div>
                <div className="input">
                  <label>Customer No.</label>
                  <input
                    type="number"
                    value={formik.values.custNumber}
                    placeholder="Zone Area"
                    className="form-control  m-2"
                    disabled
                  />
                </div>
                <div className="input">
                  <label>Zone Area</label>
                  <input
                    type="number"
                    value={formik.values.zone}
                    placeholder="Zone Area"
                    className="form-control  m-2"
                    disabled
                  />
                </div>
              </div>
              <div className="customer-top">
                <div className="input">
                  <label>First Name.</label>
                  <input
                    type="text"
                    value={formik.values.fName}
                    placeholder="First Name"
                    className="form-control  m-2"
                    disabled
                  />
                </div>
                <div className="input">
                  <label>Last Name.</label>
                  <input
                    type="text"
                    value={formik.values.lName}
                    placeholder="Last Name"
                    className="form-control  m-2"
                    disabled
                  />
                </div>
                <div className="input">
                  <label>ID No.</label>
                  <input
                    type="number"
                    value={formik.values.IDNumber}
                    placeholder="ID Number"
                    className="form-control  m-2"
                    disabled
                  />
                </div>
                <div className="inputs">
                  <label>Phone number</label>
                  <input
                    type="number"
                    value={formik.values.phoneNumber}
                    placeholder="Phone Number"
                    className="form-control  m-2"
                    disabled
                  />
                </div>
              </div>

              <div className="water-readings">
                <h4>
                  Meter <span>readings</span>
                </h4>
                <div>
                  <label>Current water reading</label>
                  <input
                    type="number"
                    value={formik.values?.currentWaterReadings}
                    name="currentWaterReadings"
                    placeholder="0"
                    disabled
                    onChange={formik.handleChange}
                    className="form-control  m-2"
                  />
                </div>
                <div>
                  <label>Previous Water reading</label>
                  <input
                    type="number"
                    disabled
                    value={formik.values?.prevWaterReading}
                    name="prevWaterReading"
                    placeholder="0"
                    onChange={formik.handleChange}
                    className="form-control  m-2"
                  />
                </div>
                <div>
                  <label>Consumption</label>
                  <input
                    type="number"
                    value={formik.values?.consumption}
                    name="consumption"
                    disabled
                    placeholder="0"
                    onChange={formik.handleChange}
                    className="form-control  m-2"
                  />
                </div>
              </div>
              <div
                style={{
                  width: "max-content",
                  margin: "auto",
                  padding: "20px",
                }}
              >
                <button className="btn btn-primary  ">Generate Bill</button>
              </div>
              {error && <p className="error">{error}</p>}
            </div>
          </form>
          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default Genwaterbill;
