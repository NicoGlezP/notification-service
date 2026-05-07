import { startConsumer } from "./consumers/sqs.consumer";
import dotenv from "dotenv";

dotenv.config();

console.log('Notification Service iniciado');

startConsumer();
