import mqtt from "mqtt";

const client =  mqtt.connect('wss://fc57981881384bd383e7bd8b3ee78a9e.s1.eu.hivemq.cloud:8884/mqtt');

client.on("connect", () => {
    client.subscribe("papi-expressions");
    console.log("subscriber connected");
  
});

client.on("message", (topic, message) => {
    console.log("received message: ", message.toString());
});

