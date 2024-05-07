"use client"

import React, { useEffect, useState } from 'react';
import { Client, Message } from 'paho-mqtt';


const Parent = () => {
  const [expression, setExpression] = useState('');
  const [expressionCounts, setExpressionCounts] = useState({});


  useEffect(() => {
    const client = new Client("broker.hivemq.com", 8000,  'parentClient');

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({ onSuccess: onConnect });

    function onConnect() {
      console.log('Parent connected');
      client.subscribe('parvesh-saini-topic');
    }

    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log('onConnectionLost:', responseObject.errorMessage);
      }
    }

    function onMessageArrived(message) {
      console.log('onMessageArrived:', message.payloadString);
      setExpression(message.payloadString);

      // Update the count of the current expression
      setExpressionCounts(prevCounts => ({
        ...prevCounts,
        // mp[angry]+1
        [message.payloadString]: (prevCounts[message.payloadString] || 0) + 1
      }));
    }

    return () => {
      client.disconnect();
    };
  }, []);


  const totalCount = Object.values(expressionCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  py-2">
      <h1 className="text-4xl font-bold mb-4">Parent Page</h1>
      <p className="text-xl mb-2">Child's expression: <span className="font-semibold">{expression}</span></p>
      <h2 className="text-2xl font-bold mb-2">Expression Statistics:</h2>
      <div className="flex flex-col items-start">
        {Object.entries(expressionCounts).map(([expression, count]) => (
          <p key={expression} className="text-lg">{expression}: <span className="font-semibold">{((count / totalCount) * 100).toFixed(2)}%</span></p>
        ))}
      </div>
      <button onClick={getUserDetails}>Get User Details</button>
    </div>
  );
};

export default Parent;
