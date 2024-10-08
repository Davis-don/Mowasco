import axios from "axios";
import { useFormik } from "formik";
import "./water_reading.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Webcam from "react-webcam";
import { Camera } from "react-camera-pro";
import { createWorker } from "tesseract.js";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const Water_reading = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState();
  const [customer, setCustomer] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const [camCaprture, setCamCapture] = useState(null);
  const [worker, setWorker] = useState();

  useEffect(() => {
    const initializeWorker = async () => {
      const worker = await createWorker();
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      setWorker(worker);
    };
    initializeWorker();
    return () => {
      if (worker) {
        worker.terminate();
      }
    };
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(false);
        const getData = await axios
          .get(`http://localhost:4000/customers/${id}`, {
            withCredentials: true,
          })
          .catch((error) => console.log(error));
        if (getData.status == 200) {
          setCustomer(getData.data.data);
          toast.success("Customer found successfully.", {
            position: "bottom-center",
          });
        } else {
          toast.success("Something went wrong.");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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
          }
        )
        .catch((error) => {
          console.log("error", error);
          setError(error.message);
        });
      if (postRecordings.status == 200) {
        navigate(`/customer/meter/${meterID}`);
      } else {
        setError("Something went wrong!");
      }
    } catch (error) {
      setError("Server error! Please try again later");
      toast.error(
        "Please ensure that the current reading is greater than the previous reading.",
        {
          position: "bottom-center",
        }
      );
      console.log("err", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      currentReading: "",
    },
    onSubmit: handleSubmit,
  });

  const webcamRef = useRef(null);
  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCamCapture(imageSrc);
    await convertImageToText(imageSrc);
  }, [webcamRef]);

  const handleImageCapture = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target.result;
        await convertImageToText(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImageToText = async (imageSrc) => {
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      const { data } = await worker.recognize(imageUrl);

      const filterText = filteredText(data.text);

      if (filterText) {
        setResult(data.text);

        console.log("Filtered output", filterText);
      } else {
        console.log("No valid text was found.");
      }
    } catch (error) {
      console.log("1.", error);
    }
  };

  // filter OCR text
  const filteredText = async (text) => {
    const minLength = 3;
    const filteredLines = text.split("\n").filter((line) => {
      return line.length >= minLength && /^[a-zA-Z0-9\s.,;:-]+$/.test(line);
    });

    return filteredLines.join("\n");
  };

  return (
    <div>
      <div className="overall-gen-water-bill-container container-fluid">
        <div className="gen-water-bill-form-div">
          <h1>Please enter the current meter readings.</h1>
          {loading ? (
            "Loading ...."
          ) : (
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
                <button type="submit">
                  {loading ? "Generating ..." : "Generate bill"}
                </button>
              </div>

              {error && <p className="error">{error}</p>}
            </form>
          )}

          <Webcam
            className="camera"
            audio={false}
            height="auto"
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Capture photo</button>

          <input
            type="file"
            capture="camera"
            accept="image/*"
            onChange={handleImageCapture}
          />
          <img src={camCaprture} />
          {/* <div className="camera">
            <Camera
              ref={camera}
              aspectRatio="cover"
              facingMode="environment"
              // numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
              // videoSourceDeviceId={activeDeviceId}
              errorMessages={{
                noCameraAccessible:
                  "No camera device accessible. Please connect your camera or try a different browser.",
                permissionDenied:
                  "Permission denied. Please refresh and give camera permission.",
                switchCamera:
                  "It is not possible to switch camera to different one because there is only one video device accessible.",
                canvas: "Canvas is not supported.",
              }}
              className="camera-1"
            />
            <button
              onClick={() => {
                takePhoto();
              }}
            >
              Take photo
            </button>
            <div>
              <img src={camImage} alt="Taken photo" />
            </div>
          </div> */}

          <p>{result}</p>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Water_reading;
