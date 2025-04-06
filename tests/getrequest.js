import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  vus: 1, // Number of virtual users
  duration: '5s', // Test duration
};

export default function () {
  const url = 'http://localhost:3000/api/health'; // Replace with your target URL
  const response = http.get(url);

  // Check if the response status is 200
  check(response, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1); // Pause for 1 second between iterations
}

export function handleSummary(data) {
    return {
      "result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }