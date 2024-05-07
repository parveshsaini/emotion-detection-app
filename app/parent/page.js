"use client"

import React, { useContext, useEffect, useState } from 'react';
import mqtt from 'mqtt';
import { UserContext } from '@/helpers/context';

const Parent = () => {
  const [client, setClient] = useState(null);
  const [expression, setExpression] = useState('');
  const [expressionCounts, setExpressionCounts] = useState({});

  const contextUser = useContext(UserContext);

  useEffect(() => {
    
      var options = {
        username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
        password: process.env.NEXT_PUBLIC_MQTT_PASSWORD
      }
      const client = mqtt.connect('wss://fc57981881384bd383e7bd8b3ee78a9e.s1.eu.hivemq.cloud:8884/mqtt',options);
      setClient(client);

      client.on('connect', () => {
        console.log('Parent connected');
        client.subscribe(`${contextUser}-iot-group-2`);
        console.log(` parent subscribed to  ${contextUser}-iot-group-2`);
      });

      client.on('message', function (topic, message) {
        // called each time a message is received
        console.log('Received message:', topic, message.toString());
        setExpression(message.toString());

        // Update the count of the current expression
        setExpressionCounts(prevCounts => ({
          ...prevCounts,
          // mp[angry]+1
          [message.toString()]: (prevCounts[message.toString()] || 0) + 1
        }));
      });

      
    }, [contextUser]);

  // useEffect(() => {
  //   if (client) {
  //     client.on('connect', () => {
  //       console.log('Parent connected');
  //       client.subscribe(`${contextUser}-iot-group-2`);
  //       console.log(` parent subscribed to  ${contextUser}-iot-group-2`);
  //     });

  //     client.on('message', function (topic, message) {
  //       // called each time a message is received
  //       console.log('Received message:', topic, message.toString());
  //       setExpression(message.toString());

  //       // Update the count of the current expression
  //       setExpressionCounts(prevCounts => ({
  //         ...prevCounts,
  //         // mp[angry]+1
  //         [message.toString()]: (prevCounts[message.toString()] || 0) + 1
  //       }));
  //     });

      

  //     return () => {
  //       client.end();
  //     };
  //   }
  // }, [client, contextUser]);


  const totalCount = Object.values(expressionCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome Parent!</h1>
      <p className="text-xl mb-2">Child's current expression: <span className="font-semibold">{expression}</span></p>
      <h2 className="text-2xl font-bold mb-2">Expression Statistics:</h2>
      <div className="flex flex-col items-start">
        {Object.entries(expressionCounts).map(([expression, count]) => (
          <p key={expression} className="text-lg">{expression}: <span className="font-semibold">{((count / totalCount) * 100).toFixed(2)}%</span></p>
        ))}
      </div>
    </div>
  );
};

export default Parent;
