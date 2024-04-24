import { getDatabase, onValue, ref, update } from "firebase/database";
import React, { useEffect, useReducer, useRef } from "react";
import StatusBar from "./StatusBar";
import AlertHighTemp from "./AlertHighTemp";
import Toggle from "../toggle/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// eslint-disable-next-line no-unused-vars
import { database } from "./config-database";
import {
  faTriangleExclamation,
  faFire,
  faDroplet,
  faLightbulb,
  faVolumeHigh,
  faCircleRadiation,
} from "@fortawesome/free-solid-svg-icons";

const initialState = {
  temperature: null,
  humidity: null,
  gasLevel: null,
  alarmLight: true,
  alarmBuzzer: true,
  detectFire: true,
  lightState: true,
  buzzerState: true,
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
      const lightRef = ref(getDatabase());
      update(lightRef, {
        lightState: !state.lightState,
      });
      return { ...state, lightState: action.payload };
    }
    case "TURN_OFF_BUZZER": {
      const buzzerRef = ref(getDatabase());
      update(buzzerRef, {
        buzzerState: !state.buzzerState,
      });
      return { ...state, buzzerState: action.payload };
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
        // const data = snapshot.val();
        ditpatch({
          type: "READ_TEMP",
          payload: data.temperature,
        });
        ditpatch({
          type: "READ_HUMI",
          payload: data.humidity,
        });
        ditpatch({
          type: "READ_GAS",
          payload: data.gasLevel,
        });
        ditpatch({
          type: "READ_LIGHT",
          payload: data.alarmLight,
        });
        ditpatch({
          type: "READ_BUZZER",
          payload: data.alarmBuzzer,
        });
        ditpatch({
          type: "READ_FIRE",
          payload: data.detectFire,
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
      payload: !state.lightState,
    });
  };
  const handleTurnOffBuzzer = () => {
    ditpatch({
      type: "TURN_OFF_BUZZER",
      payload: !state.buzzerState,
    });
    console.log(state.alarmBuzzer);
  };

  return (
    <div>
      <div className="grid place-items-center h-screen w-screen">
        <div className="text-[3rem] font-div text-white">ALERT FIRE SYSTEM</div>
        <div className="p-5 w-auto h-auto bg-white/70 rounded-lg shadow-lg grid grid-cols-2 gap-x-10 gap-y-0">
          <div className="relative">
            <span className="absolute text-[43px] font-light top-[109px] left-[89px]">
              {state.temperature}℃
            </span>
            <StatusBar value={state.temperature} maxValue={100}></StatusBar>
          </div>
          <div className="relative">
            <span className="absolute text-[44px] font-light top-[109px] left-[88px]">
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
            <span className=" text-[40px] absolute font-light top-[111px] left-[68px]">
              {`${state.gasLevel}ppm`}
            </span>
            <StatusBar
              className="absolute"
              value={state.gasLevel}
              maxValue={1023}
            ></StatusBar>
          </div>
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-yellow-300 text-[50px]"
                icon={faLightbulb}
              />
              <div onClick={handleTurnOffLight}>
                <Toggle className="hidden"></Toggle>
              </div>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-blue-400 text-[30px]"
                icon={faVolumeHigh}
              />
              <div onClick={handleTurnOffBuzzer}>
                <Toggle></Toggle>
              </div>
            </div>
          </div>
        </div>
      </div>
      {state.temperature >= 40.0 && (
        <AlertHighTemp
          message={"Nhiệt độ tăng cao"}
          icon={faTriangleExclamation}
          colors={"bg-red-600"}
        ></AlertHighTemp>
      )}
      {state.detectFire === false && (
        <AlertHighTemp
          message={"Phát hiện có lửa"}
          icon={faFire}
          colors={"bg-red-600"}
        ></AlertHighTemp>
      )}
      {state.gasLevel > 400 && (
        <AlertHighTemp
          message={"Phát hiện khí gas"}
          icon={faCircleRadiation}
          colors={"bg-purple-600"}
        ></AlertHighTemp>
      )}
    </div>
  );
};

export default AlertFireSystem;
