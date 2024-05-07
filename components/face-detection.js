"use client";

import React, { useEffect, useRef, useState, useContext } from "react";
import Webcam from "react-webcam";
import * as faceDetection from "face-api.js";
import { renderPredictions } from "@/utils/render-predictions";
import { Client, Message } from 'paho-mqtt';
import axios from "axios";
import mqtt from "mqtt";
let detectInterval;

import { UserContext } from "@/helpers/context";

let topic;

const FacialExpressionDetection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [client, setClient] = useState(null);

  const contextUser = useContext(UserContext);


  const webcamRef = useRef(null);
  const canvasRef = useRef(null);


  const [user, setUser]= useState()

  const getDetails= async ()=> {
    const res= await axios.get('/api/users/me')
    console.log(res.data.data.username)

    return res.data.data.username
  }

  useEffect(() => {
    const mqttConnect = () => {
      var options = {
        username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
        password: process.env.NEXT_PUBLIC_MQTT_PASSWORD
      }

      console.log('username: ', process.env.NEXT_PUBLIC_MQTT_USERNAME)
      console.log('pass: ', process.env.NEXT_PUBLIC_MQTT_PASSWORD)
      const client = mqtt.connect('wss://fc57981881384bd383e7bd8b3ee78a9e.s1.eu.hivemq.cloud:8884/mqtt',options);
      setClient(client);
    };

    mqttConnect();
  }, []);

  useEffect(() => {
    if (client) {
    client.on('connect', function () {
      console.log('Publisher connected'); 

      detectInterval = setInterval(() => {
        runFacialExpressionDetection();
      }, 500);
    });
  }
  }, [client]);


  
  async function loadModels() {
    setIsLoading(true); 
    await faceDetection.nets.tinyFaceDetector.loadFromUri('/models');
    await faceDetection.nets.faceExpressionNet.loadFromUri('/models');
    setIsLoading(false); 

  }

  async function runFacialExpressionDetection() {
    if (
      canvasRef.current &&
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      canvasRef.current.width = webcamRef.current.video.videoWidth;
      canvasRef.current.height = webcamRef.current.video.videoHeight;

      // find detected faces
      const detections = await faceDetection.detectAllFaces(webcamRef.current.video, new faceDetection.TinyFaceDetectorOptions()).withFaceExpressions();
      // console.log(detections);

      // publish detected expressions
      detections.forEach((detection) => {
        const expression = detection.expressions.asSortedArray()[0].expression;
        const topic = `${contextUser}-iot-group-2`;
        console.log('Publishing to :', `${contextUser}-iot-group-2`);
        if(client){
          client.publish(topic, expression);
          console.log('Published:', expression)
        }
        
      });

      // render predictions
      const context = canvasRef.current.getContext("2d");
      renderPredictions(detections, context);
    }
  }

  const showmyVideo = () => {
    if (
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      const myVideoWidth = webcamRef.current.video.videoWidth;
      const myVideoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = myVideoWidth;
      webcamRef.current.video.height = myVideoHeight;
    }
  };

  useEffect(() => {
    loadModels();
    showmyVideo();
  }, []);

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="gradient-text">Loading AI Model...</div>
      ) : (
        <div className="relative flex justify-center items-center gradient p-1.5 rounded-md">
          {/* webcam */}
          <Webcam
            ref={webcamRef}
            className="rounded-md w-full lg:h-[720px]"
            muted
          />
          {/* canvas */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 z-99999 w-full lg:h-[720px]"
          />
        </div>
      )}
    </div>
  );
};

export default FacialExpressionDetection;