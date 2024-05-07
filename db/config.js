import mongoose from 'mongoose';

export async function connect() {
    try {
        console.log('mongo uri: ', process.env.MONGO_URI)
        mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error: ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong while DB connection!');
        console.log(error);
        
    }


}