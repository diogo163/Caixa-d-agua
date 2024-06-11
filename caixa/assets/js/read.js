// read.js
const express = require('express');
const { InfluxDB } = require('@influxdata/influxdb-client');

const app = express();
const port = 3009;

/** Environment variables **/
const url = 'https://us-east-1-1.aws.cloud2.influxdata.com';
const token = "-rJuGZANh2WiMVrAAlkevYdNx2KCf5uVz7PCIYwRtNTSbAy5OZ6yXwDy7tPyKDYQw9lCz1Tdc9qAkRdULIZViQ==";
const org = "SmartCampus";
const bucket = "smartcampus";

const influxDB = new InfluxDB({ url, token });
const queryApi = influxDB.getQueryApi(org);

const fluxQuery = `
  from(bucket:"smartcampus")
  |> range(start: 0)
  |> filter(fn: (r) => r._measurement == "WaterTankLavel")
  |> filter(fn: (r) => r.nodeName == "WaterTankLavel_1")
  |> filter(fn: (r) => r._field == "data_distance")
  |> last()
`;

const getDataDistance = async () => {
  let dataDistance = null;
  for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
    const o = tableMeta.toObject(values);
    dataDistance = o._value;
    console.log(`${o._measurement}: ${o._field}=${o._value}`);
  }
  return dataDistance;
}

app.get('/data-distance', async (req, res) => {
  try {
    const dataDistance = await getDataDistance();
    res.json({ dataDistance });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

getDataDistance();