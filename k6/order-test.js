import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 20,
  duration: '30s',
};

export default function () {
  const payload = JSON.stringify({
    customer: 'kim',
    items: [{ sku: 'SKU-1001', qty: 1 }],
  });

  const res = http.post(
    'http://192.168.56.200/api/orders',
    payload,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  check(res, {
    'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
  });

  sleep(1);
}
