import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useReducer, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { database } from "./config-database";
import StatusBar from "./StatusBar";
import AlertHighTemp from "./AlertHighTemp";
import {
  faTriangleExclamation,
  faFire,
  faDroplet,
  faLightbulb,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Toggle from "../toggle/Toggle";

const initialState = {
  temperature: null,
  humidity: null,
  gasLevel: null,
  alarmLight: true,
  alarmBuzzer: false,
  detectFire: true,
};

const FireReducer = (state, action) => {
  switch (action.type) {
    case "READ_TEMP": {
      return { ...state, temperature: action.payload };
    }
    case "READ_HUMI": {
      return { ...state, humidity: action.payload };
    }
    case "READ_GAS": {
      return { ...state, gasLevel: action.payload };
    }
    case "READ_LIGHT": {
      return { ...state, alarmLight: action.payload };
    }
    case "READ_BUZZER": {
      return { ...state, alarmBuzzer: action.payload };
    }
    case "READ_FIRE": {
      return { ...state, detectFire: action.payload };
    }
    case "TURN_OFF_LIGHT": {
      return {};
    }
    case "TURN_OFF_BUZZER": {
      return {};
    }
    default:
      break;
  }
};

const AlertFireSystem = () => {
  const [state, ditpatch] = useReducer(FireReducer, initialState);
  const dbRef = useRef(ref(getDatabase()));
  useEffect(() => {
    onValue(dbRef.current, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        const data = snapshot.val();
        ditpatch({
          type: "READ_TEMP",
          payload: data["Nhiet do"],
        });
        ditpatch({
          type: "READ_HUMI",
          payload: data["Do am"],
        });
        ditpatch({
          type: "READ_GAS",
          payload: data["Khi gas"],
        });
        ditpatch({
          type: "READ_LIGHT",
          payload: data["Den canh bao"],
        });
        ditpatch({
          type: "READ_BUZZER",
          payload: data["Coi bao dong"],
        });
        ditpatch({
          type: "READ_FIRE",
          payload: data["phat hien lua"],
        });
        ditpatch({
          type: "READ_FIRE",
          payload: data["phat hien lua"],
        });
      } else {
        console.log("No data available");
      }
      console.log(data);
    });
  }, []);
  const handleTurnOffLight = () => {
    ditpatch({
      type: "TURN_OFF_LIGHT",
      payload: false,
    });
  };
  const handleTurnOffBuzzer = () => {
    ditpatch({
      type: "TURN_OFF_BUZZER",
      payload: false,
    });
  };
  return (
    <div>
      <div className="grid place-items-center h-screen w-screen">
        <div className="p-5 max-w-[500px] w-auto h-auto bg-white rounded-lg shadow-lg grid grid-cols-2 gap-x-10 gap-y-0">
          <div className="relative">
            <span className="absolute text-[21px] font-light top-[65px] left-[44px]">
              {state.temperature}℃
            </span>
            <StatusBar value={state.temperature} maxValue={100}></StatusBar>
          </div>
          <div className="relative">
            <span className="absolute text-[21px] font-light top-[65px] left-[45px]">
              {`${state.humidity}% `}
              <FontAwesomeIcon color="blue" icon={faDroplet} />
            </span>
            <StatusBar
              className="absolute"
              value={state.humidity}
              maxValue={100}
            ></StatusBar>
          </div>
          <div className="relative">
            <span className=" text-[20px] absolute font-light top-[70px] left-[36px]">
              {`${state.gasLevel}ppm`}
            </span>
            <StatusBar
              className="absolute"
              value={state.gasLevel}
              maxValue={1023}
            ></StatusBar>
          </div>
          <div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-yellow-400 text-[50px]"
                icon={faLightbulb}
              />
              <Toggle onClick={handleTurnOffLight}></Toggle>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-blue-400 text-[30px]"
                icon={faVolumeHigh}
              />
              <Toggle onClick={handleTurnOffBuzzer}></Toggle>
            </div>
          </div>
        </div>
      </div>
      {state.temperature >= 40.0 && (
        <AlertHighTemp
          message={"Nhiệt độ tăng cao"}
          icon={faTriangleExclamation}
        ></AlertHighTemp>
      )}
      {state.detectFire === false && (
        <AlertHighTemp
          message={"Phát hiện có lửa"}
          icon={faFire}
        ></AlertHighTemp>
      )}
    </div>
  );
};

export default AlertFireSystem;
