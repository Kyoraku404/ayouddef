// Quick API test script
async function testApis() {
  const BASE = 'http://localhost:3000';
  
  // 1. Test analytics event ingestion
  console.log('\n=== Test 1: Analytics Event Ingestion ===');
  try {
    const res = await fetch(`${BASE}/api/ocn/analytics/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'WHATSAPP_CLICK',
        page: '/',
        metadata: { test: true, timestamp: Date.now() }
      })
    });
    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Analytics Error:', err.message);
  }

  // 2. Test reservation endpoint
  console.log('\n=== Test 2: Reservation API ===');
  try {
    const res = await fetch(`${BASE}/api/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '+212600000000',
        date: '2026-10-01',
        people: 3,
        tour: 'Marrakesh Medina, Souks & Heritage Experience',
        message: 'API test reservation'
      })
    });
    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Reservation Error:', err.message);
  }

  // 3. Check public homepage loads
  console.log('\n=== Test 3: Public Homepage ===');
  try {
    const res = await fetch(BASE);
    console.log('Status:', res.status);
    console.log('Content-Type:', res.headers.get('content-type'));
    const html = await res.text();
    console.log('HTML length:', html.length, 'bytes');
    console.log('Contains Marrakesh:', html.includes('Marrakesh'));
    console.log('Contains Marrakech (should be false):', html.includes('Marrakech'));
  } catch (err) {
    console.error('Homepage Error:', err.message);
  }

  console.log('\n✅ API tests completed');
}

testApis();
