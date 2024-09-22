import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Outlet } from "react-router-dom";
import "../../Components/Admin.css";
import Chart from "react-apexcharts";
import { VscAccount } from "react-icons/vsc";
import { FaMoneyBills } from "react-icons/fa6";
import { BsSpeedometer } from "react-icons/bs";

function AdminDashboard() {
  const [zones, setZones] = useState();
  const [customer, setCustomer] = useState();
  const [meters, setMeters] = useState();
  const [totalMonthlyConsumed,setTotalMontlyConsumed] = useState(0)
  const [chartsData, setChartsData] = useState([]);
  const [waterReading, setWaterReadings] = useState([])

  // 1. Get the number of zones
  const getZones = async () => {
    try {
      const zones = await axios
        .get("http://localhost:4000/zones/all")
        .catch((error) => console.log(error));

      if (zones.status == 200) {
        setZones(zones.data.data);
        setChartsData({
          // options: {
          //   chart: {
          //     id: "basic-bar",
          //   },
          //   xaxis: {
          //     categories: chartsData.map(item => item?.zoneName)
          //   },
          // },
          // series: [
          //   {
          //     name: "series-1",
          //     data: [30, 40, 45, 50, 49, 60, 70, 91],
          //   },
          // ],

          options: {
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
              // categories: chartsData.map((item => item?.zoneName)),
            },
          },
          series: [
            {
              name: "series-1",
              data: [30, 40, 45, 50, 49, 60, 70, 91],
            },
          ],
        });
      } else {
        toast.warn("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 2. get customers

  const getCustomer = async () => {
    try {
      const customers = await axios
        .get(`http://localhost:4000/customers/all`)
        .catch((error) => console.log(error));
      if (customers.status == 200) {
        console.log('active customers', customers)
        setCustomer(customers.data.data);
      } else {
        toast.warn("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 3. Get all the registered meters.
  const getMeters = async () => {
    try {
      const meters = await axios
        .get(`http://localhost:4000/meters/all`)
        .catch((error) => {
          toast.warn("Error. Please try again later.");
          console.log(error);
        });

      if (meters.status == 200) {
        setMeters(meters.data.data);
      } else {
        toast.warn("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 4. Get total water readings.
  const getTotalWaterConsumed = async () => {
    try {
      const totalConsumed = await axios
        .get(`http://localhost:4000/customer/reading/all/total-readings`)
        .catch((error) => console.log(error));

      console.log('Total montly consumed', totalConsumed.data);
      if(totalConsumed.status == 200){
        setTotalMontlyConsumed(totalConsumed.data.data)
      } else{
        toast.warn('Something went wrong.')
      }
    } catch (error)  {
      console.log(error);
    }
  };


  const recentWaterReadings = async () => {
    try {
      const getReadings = await axios.get(
        `${process.env.REACT_APP_VITE_API_URL_BASE}/customer/reading/all`
      ).catch(error=> console.log(error));
      if (getReadings.status == 200) {
        setWaterReadings(getReadings.data.data)
      }
    } catch (error) {
      
      console.log(error)
    }
  }
  useEffect(() => {
    getZones();
    getCustomer();
    getMeters();
    getTotalWaterConsumed();
recentWaterReadings()
  }, []);
  return (
    <>
      <div className="dashboard">
        <div className="card-left card-1">
          <div className="card-title">
            <h4>Montly Consumption</h4>
            <p>
              Total amount: {totalMonthlyConsumed} M <sup>3</sup>
            </p>
            <span>1st Jan 2024 - 31st January, 2024</span>
          </div>
        </div>
        <div className="card-center card-1">
          <div className="card-title">
            <h4>Customers</h4>
            <p>
              <span>Active Customers: </span> {customer?.length}
            </p>
            <span>1st Jan 2024 - 31st January, 2024</span>
          </div>
        </div>
        <div className="card-right card-1">
          <div className="card-title">
            <h4>Zones</h4>
            <p>
              No. of Zones: {zones?.length} (Zones)
            </p>
            <span>1st Jan 2024 - 31st January, 2024</span>
          </div>
        </div>

        <div className="graphs">
          <div className="charts">
            {chartsData && chartsData?.series && (
              <Chart
                options={chartsData.options}
                series={chartsData.series}
                type="line"
                className="chart"
                width=""
              />
            )}
          </div>
          <div className="pie"></div>
        </div>
        <div className="moreDetails">
          <div className="below">
            <div className="below-left">
              <table>
                <thead>
                  <tr>
                    <th>Meter no.</th>
                    <th>Customer No.</th>
                    <th>Customer Name</th>
                    <th>
                      Consumption{" "}
                      <span>
                        M <sup>3</sup>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {waterReading && waterReading.length > 0 ? (
                    waterReading.map((recentReading, key) => (
                      <tr key={key}>
                        <td>{recentReading.meter.meterNumber}</td>
                        <td>{recentReading.meter.customer.cust_id}</td>
                        <td>
                          {recentReading.meter.customer.custFirstName}{" "}
                          {recentReading.meter.customer.custLastName}
                        </td>
                        <td>{recentReading.consumption}</td>
                      </tr>
                    ))
                  ) : (
                    <p>Loading recent water readings.</p>
                  )}
                </tbody>
              </table>
            </div>
            <div className="below-right">
              <h3>Other details</h3>
              <div className="other-details">
                <BsSpeedometer className="icon" />
                <div className="infor">
                  <h4>Pending meter readings.</h4>
                  <span>
                    
                    <span>Meters:</span> 12
                  </span>
                  <span>
                    <span>Zones:</span> 2
                  </span>
                </div>
              </div>
              <div className="other-details">
                <FaMoneyBills className="icon" />
                <div className="infor">
                  <h4>Pending/Overdue bills</h4>
                  <span>
                    <span>Amount:</span> 12
                  </span>
                </div>
              </div>
              <div className="other-details">
                <VscAccount className="icon" />
                <div className="infor">
                  <h4>Field Agents.</h4>
                  <span>
                    <span>Agents:</span> 12
                  </span>
                  <table>
                    <thead>
                      <tr>
                        <th>Zone</th>
                        <th>Agent</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Zone 1</td>
                        <td>Wilfred Kiama</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="map">
          <div className="maps">
            <h4>Geographical Zones View</h4>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255346.11121110563!2d36.64821844264732!3d-0.24112909543004604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1828478867322aef%3A0xe6c9bc83d2b8522d!2sKieni%20West!5e0!3m2!1sen!2ske!4v1726915863622!5m2!1sen!2ske"
              // width="600"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      {/* <div className="adminSect">
        <div className="cards">
          <div className="card-title">
            <h4>Montly Consumption</h4>
            <p>
              Total amount: {12} M <sup>4</sup>
            </p>
            <span>1st Jan 2024 - 31st January, 2024</span>
          </div>
          <div className="card-title">
            <h4>Total bills</h4>
            <p>Mount collected: {12} Ksh</p>
            <span>1st Jan 2024 - 31st January, 2024</span>
          </div>
            <div className="card-title">
              <h4>Customers</h4>
              <p>Active customers: {12}</p>
              <span>1st Jan 2024 - 31st January, 2024</span>
            </div>
            <div className="card-title">
              <h4>Zones</h4>
              <p>No of zones: {12}</p>
              <span>1st Jan 2024 - 31st January, 2024</span>
            </div>
        </div>

        <div className="charts">
          

          

         

          <div className="bottom">
            <h1>Mutitu Water Project</h1>
            <span>Developed by WinkyWebers &copy; All rights reserved.</span>
          </div>
        </div>
        <ToastContainer />
      </div>  */}
    </>
  );
}

export default AdminDashboard;
