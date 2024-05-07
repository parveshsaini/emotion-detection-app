import mqtt from "mqtt"

const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', ()=> {
    console.log('publisher connected')
    setInterval(() => {
        client.publish('parveshsaini', 'Hello mqtt')
    }, 3000)
})