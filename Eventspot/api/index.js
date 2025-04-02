import dotenv from 'dotenv';
import path from 'path';

// Get the current file's directory
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Log the environment variables to verify they're loaded
console.log('Environment variables:', process.env);

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    family: 4,
    retryWrites: true,
    w: "majority",
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    maxPoolSize: 50,
    heartbeatFrequencyMS: 10000,
    minHeartbeatFrequencyMS: 1000
};

mongoose
    .connect(process.env.MONGO || 'mongodb://localhost:27017/eventspot', mongoOptions)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        console.error('Connection string:', process.env.MONGO);
        console.error('MongoDB version:', mongoose.version);
        process.exit(1);
    });