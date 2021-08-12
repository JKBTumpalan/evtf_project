import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react";

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

const WebcamComponent = () => {
  const [image, setImage] = useState("");
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc: any = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, []);

  return (
    <div className="webcam-container">
      <div className="webcam-img">
        {image == "" ? (
          <Webcam
            audio={false}
            height={200}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={220}
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={image} />
        )}
      </div>
      <div>
        {image != "" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setImage("");
            }}
            className="webcam-btn"
          >
            Retake Image
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="webcam-btn"
          >
            Capture
          </button>
        )}
      </div>
    </div>
  );
};

export default WebcamComponent;
