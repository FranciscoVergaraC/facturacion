require('dotenv').config() // cargamos variables de entorno
const fetch = require('node-fetch').default
const async = require('async')
const baseEndPoint = 'https://metrics.mdstrm.com';

const getStorage = async(apiKey) => {
    const requestEndPoint = '/outbound/v1/metric/api';
    const urlToFetch = `${baseEndPoint}${requestEndPoint}`;
    const payload = {
        "name":"storage_total",
        "dimension":[],
        "filter":[{"name":"date","op":[">=","<="],"value":["2023-03-01T03:00:00Z","2023-04-01T02:59:59Z"]}],
        "calendar":{"type":"all"},
        "day":{"type":[false,false,false,false,false,false,false]},
        "time":"0",
        "trunc":["DAY","-03:00"]
    }
    const payloadString = JSON.stringify(payload);
    try {
        const response = await fetch(urlToFetch, {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'X-Api-Token': apiKey,
                'Content-Type': 'application/json'
            },
            body: payloadString
        });
        if (response.ok){
            const jsonResponse = await response.json();
            const storage = jsonResponse.data;
            return storage;
        }
    } catch (error){
        console.log(error)
    }
}

console.log(getStorage(process.env.API_TOKEN));