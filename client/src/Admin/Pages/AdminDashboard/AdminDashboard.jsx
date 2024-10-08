import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Components/Admin.css";
import Chart from "react-apexcharts";
import { VscAccount } from "react-icons/vsc";
import { FaMoneyBills } from "react-icons/fa6";
import {BsSpeedometer } from "react-icons/bs";
import { useDate } from "../../../../src/CustomHooks/useDate";
import Footer from "../../Components/Footer";
function AdminDashboard() {
  const [zones, setZones] = useState();
  const [customer, setCustomer] = useState();
  const [meters, setMeters] = useState();
  const [totalMonthlyConsumed, setTotalMontlyConsumed] = useState(0);
  const [chartsData, setChartsData] = useState([]);
  const [waterReading, setWaterReadings] = useState([]);
  const [fieldAgents, setFieldAgents] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [totalBills, setTotalBills] = useState()
  const { formatDate } = useDate();
  const [zonePopulation, setZonePopulation] = useState([]);
  const [zoneConsumptionTotals, setZoneConsumptionTotals] = useState([]);
  // 1. Get the number of zones
  const getZones = async () => {
    try {
      setLoading(true);
      setError(false);
      const zones = await axios
        .get(`${process.env.REACT_APP_VITE_API_URL_BASE}/zones/all`, {
          withCredentials: true,
        })
        .catch((error) => [setError("Something went wrong.", error.message)]);

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
      toast.error("Server error", { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  // 2. get customers

  const getCustomer = async () => {
    try {
      setError(false);
      setLoading(true);
      const customers = await axios
        .get(`${process.env.REACT_APP_VITE_API_URL_BASE}/customers/all`, {
          withCredentials: true,
        })
        .catch((error) => {
          setError("Something went wrong!!");
        });
      if (customers.status == 200) {
        setCustomer(customers.data.data);
      } else {
        toast.warn("Something went wrong.");
      }
    } catch (error) {
      setError("Server error! Please try again later!!");
    } finally {
      setLoading(false);
    }
  };

  // 3. Get all the registered meters.
  const getMeters = async () => {
    try {
      setError(false);
      setLoading(true);
      const meters = await axios
        .get(`${process.env.REACT_APP_VITE_API_URL_BASE}/meters/all`, {
          withCredentials: true,
        })
        .catch((error) => {
          toast.warn("Error. Please try again later.", {
            position: "bottom-center",
          });
        });

      if (meters.status == 200) {
        setMeters(meters.data.data);
      } else {
        toast.warn("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error", { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  // 4. Get total water readings.
  const getTotalWaterConsumed = async () => {
    try {
      setError(false);
      setLoading(true);
      const totalConsumed = await axios
        .get(
          `${process.env.REACT_APP_VITE_API_URL_BASE}/customer/reading/all/total-readings`,
          {
            withCredentials: true,
          }
        )
        .catch((error) => {
          setError("Server error!");
        });

      if (totalConsumed.status == 200) {
        setTotalMontlyConsumed(totalConsumed.data.data);
      } else {
        toast.warn("Something went wrong.");
      }
    } catch (error) {
      setError("Server error!");
    } finally {
      setLoading(false);
    }
  };

  const recentWaterReadings = async () => {
    try {
      setError(false);
      setLoading(true);
      const getReadings = await axios
        .get(
          `${process.env.REACT_APP_VITE_API_URL_BASE}/customer/reading/all`,
          {
            withCredentials: true,
          }
        )
        .catch((error) => {
          setError("Server error!");
        });
      if (getReadings.status == 200) {
        setWaterReadings(getReadings.data.data);
      }
    } catch (error) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const agents = async () => {
    try {
      setError(false);
      setLoading(true);
      const getAgents = await axios
        .get(`${process.env.REACT_APP_VITE_API_URL_BASE}/user/agents/all`, {
          withCredentials: true,
        })
        .catch((error) => {
          setError("Server error!");
        });

      if (getAgents.status == 200) {
        setFieldAgents(getAgents.data.data);
      } else {
        toast.warn("Something went wrong");
      }
    } catch (error) {
      setError("Server error!!");
    } finally {
      setLoading(false);
    }
  };

  // get total amount of water consumed per zone.
  const zonalConsumptionTotal = async () => {
    try {
      const total = await axios
        .get(
          `${process.env.REACT_APP_VITE_API_URL_BASE}/customer/reading/zone/total-consumption`,
          {
            withCredentials: true,
          }
        )
        .catch((error) => console.log(error));
      if (total.status === 200) {
        setZoneConsumptionTotals(total.data.data);
      } else {
        toast.warn("Something went wrong", { position: "bottom-center" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get the number of customers based on each zone.
  const customersPerZone = async () => {
    try {
      const customers = await axios
        .get(
          `${process.env.REACT_APP_VITE_API_URL_BASE}/customers/zones/areas`,
          {
            withCredentials: true,
          }
        )
        .catch((error) => {
          console.log(error);
        });
      if (customers.status == 200) {
        setZonePopulation(customers.data.data);
      } else {
        toast.warn("Something went wrong!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // deactivete field agent.
  const activate = async (id) => {
    try {
      const activateAgent = await axios.patch(
        `${process.env.REACT_APP_VITE_API_URL_BASE}/user/agent/update-details/${id}`,{
          status:'ACTIVE'
        }, {
          withCredentials:true
        }
      ).catch(error => console.log(error))

       if (activateAgent.status == 200) {
         toast.success("Agent activated successfully.", {position: 'bottom-center'});
         setFieldAgents(fieldAgents.map((agents) => (agents.agent_id === id ? {...agents, status:'ACTIVE'}: agents)))
       } else {
         toast.warn("Something went wrong.", { position: "bottom-center" });
       }
    } catch (error) {
      console.log(error);
    }
  };

  // deactivate customer.
  const deactivate = async (id) => {
    try {
      const deactivateAgent = await axios.patch(
        `${process.env.REACT_APP_VITE_API_URL_BASE}/user/agent/update-details/${id}`,
        {
          status: "INACTIVE",
        },
        {
          withCredentials: true,
        }
      ).catch(error => console.log(error))

      if (deactivateAgent.status == 200){
        toast.warn('Agent deactivated successfully.', {position: 'bottom-center'})
         setFieldAgents(fieldAgents.map((agents) => (agents.agent_id === id ? {...agents, status:'INACTIVE'}: agents)))
      } else {
        toast.warn('Something went wrong.', {position: 'bottom-center'})
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalBills = async () => {
    try {
      const getTotals = await axios.get(
        `${process.env.REACT_APP_VITE_API_URL_BASE}/customer/bill/total/bills`,{
          withCredentials: true
        }
      ).catch(error => console.log(error))
      
      if (getTotals.status === 200){
        setTotalBills(getTotals.data.data)
        console.log(getTotals.data.data)
      } else{
        toast.warn('Something went wrong!!')
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
    recentWaterReadings();
    agents();
    zonalConsumptionTotal();
    customersPerZone();
    getTotalBills()
  }, []);
  return (
    <>
      <div className="dashboard">
        <div className="card-left card-1">
          <div className="card-title">
            <h4>Montly Consumption</h4>
            <p>
              <span>Total amount</span>:
              {loading ? " Loading ..." : totalMonthlyConsumed} M <sup>3</sup>
            </p>
            <div className="zones-consumption">
              <table>
                <thead>
                  <tr>
                    <th>Zone name:</th>
                    <th>Total Consumption:</th>
                  </tr>
                </thead>
                <tbody>
                  {zoneConsumptionTotals && zoneConsumptionTotals.length > 0 ? (
                    zoneConsumptionTotals.map((zoneTotals, key) => (
                      <tr key={key}>
                        <td>{zoneTotals.zoneName}</td>
                        <td>
                          {zoneTotals.totalConsumption} M <sup>3</sup>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>Loading data...</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card-center card-1">
          <div className="card-title">
            <h4>Customers</h4>
            <p>
              <span>Active Customers: </span>{" "}
              {loading ? " Loading ..." : customer?.length}
            </p>
            <table>
              <thead>
                <tr>
                  <th>Zone:</th>
                  <th>Population:</th>
                </tr>
              </thead>
              <tbody>
                {zonePopulation && zonePopulation.length > 0 ? (
                  zonePopulation.map((zonePop, key) => (
                    <tr>
                      <td>{zonePop.zoneName}</td>
                      <td>{zonePop.customerCount}</td>
                    </tr>
                  ))
                ) : (
                  <p>Loading data...</p>
                )}
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-right card-1">
          <div className="card-title">
            <h4>Zones</h4>
            <p>
              <span>No. of Zones</span>:{" "}
              {loading ? " Loading ..." : zones?.length}
              (Zones)
            </p>
            <table>
              <thead>
                <tr>
                  <th>Zone Name</th>
                </tr>
              </thead>
              <tbody>
                {zones && zones.length > 0 ? (
                  zones.map((zone, key) => (
                    <tr key={key}>
                      <td>{zone.zoneName}</td>
                    </tr>
                  ))
                ) : (
                  <p>Loading zones...</p>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="graphs">
          {loading ? (
            "Loading ..."
          ) : (
            <div className="charts">
              {chartsData && chartsData?.series && (
                <Chart
                  options={chartsData?.options}
                  series={chartsData?.series}
                  type="line"
                  className="chart"
                  width=""
                />
              )}
            </div>
          )}

          <div className="pie"></div>
        </div>
        <div className="moreDetails">
          <div className="below">
            <div className="below-left">
              <h4> Most Recent Water Readings </h4>
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
                    waterReading.slice(0, 10).map((recentReading, key) => (
                      <>
                        <tr key={key}>
                          <td>{recentReading.meter.meterNumber}</td>
                          <td>{recentReading.meter.customer.custNumber}</td>
                          <td>
                            {recentReading.meter.customer.custFirstName}{" "}
                            {recentReading.meter.customer.custLastName}
                          </td>
                          <td>{recentReading.consumption}</td>
                        </tr>
                      </>
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
                    <span>Amount: {totalBills}</span>{" "}
                    <b>
                      <i>Ksh</i>
                    </b>
                  </span>
                </div>
              </div>
              <div className="other-details">
                <VscAccount className="icon" />
                <div className="infor">
                  <h4>Field Agents.</h4>
                  <span>
                    <span>Agents:</span> {fieldAgents.length}
                  </span>
                  <table>
                    <thead>
                      <tr>
                        <th>Zone</th>
                        <th>Agent</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fieldAgents && fieldAgents.length > 0 ? (
                        fieldAgents.map((agent, key) => (
                          <tr key={key}>
                            <td>{agent.employeeID}</td>
                            <td>
                              {agent.first_name} {agent.lastName}
                            </td>
                            {agent.status === "ACTIVE" ? (
                              <td onClick={() => deactivate(agent.agent_id)}>
                                <span className="status">Active</span>
                              </td>
                            ) : (
                              <td onClick={() => activate(agent.agent_id)}>
                                <span className="inactive">Inactive</span>
                              </td>
                            )}
                          </tr>
                        ))
                      ) : (
                        <p>Loading agents...</p>
                      )}
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
        <ToastContainer />
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
          

          

         

     
      </div>  */}
      <Footer />
    </>
  );
}

export default AdminDashboard;
