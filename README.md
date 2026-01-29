IoT Sensor Ingestion Service

A Node.js backend service for ingesting IoT sensor data via HTTP API and MQTT.

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- MQTT.js

Features

- **HTTP API**: RESTful endpoints for ingesting and retrieving sensor data.
- **MQTT Integration**: Real-time data ingestion via MQTT subscription (Bonus Task).
- **Database**: MongoDB Atlas for persistent storage.




## Setup Instructions

1.  **Clone the repository** 
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Configuration**:
    - Create `.env` file.
    - It should have the below content
    ```
    PORT=5000
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.exmaple.mongodb.net/iot-db
    MQTT_BROKER_URL=mqtt://test.mosquitto.org
    ```
    - Update `MONGODB_URI` with your actual MongoDB Atlas connection string.

    

## Running the Server

- **Development Mode** (with auto-restart requires nodemon to be installed global or use node):
  ```bash
  node server.js
  ```
- **Production Mode**:
  ```bash
  npm start
  ```
  

## API Documentation

### 1. Ingest Sensor Data

- **URL**: `POST /api/sensor/ingest`
- **Body**:
    ```json
    {
      "deviceId": "sensor-001",
      "temperature": 25.5,
      "timestamp": 1700000000000
    }
    ```
    *(Timestamp is optional, defaults to now)*
- **Response**: `201 Created`

**cURL Example**:
```bash
curl -X POST http://localhost:5000/api/sensor/ingest `
  -H "Content-Type: application/json" `
  -d '{"deviceId": "sensor-001", "temperature": 25.5}'
```
**Postman Example**
<img width="1390" height="884" alt="image" src="https://github.com/user-attachments/assets/d07619fc-a4a2-4cc5-a4b4-9eb1aa52c77c" />

### 2. Get Latest Data

- **URL**: `GET /api/sensor/:deviceId/latest`
- **Response**: `200 OK`

**cURL Example**:
```bash
curl http://localhost:5000/api/sensor/sensor-001/latest
```
**Postman Example**
<img width="1402" height="569" alt="image" src="https://github.com/user-attachments/assets/b3efc12a-f439-440f-b685-ffefeba1385a" />

## MQTT Usage

The service automatically subscribes to `iot/sensor/+/temperature`.

**To test ingestion via MQTT:**
Publish a message to `iot/sensor/sensor-001/temperature`.
**Payload**:
```json
{
  "temperature": 30.2
}
```

The service will automatically capture this and save it to MongoDB with `deviceId` as "sensor-001".
