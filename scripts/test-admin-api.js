// Test OCN Admin login and dashboard data
async function testAdmin() {
  const BASE = 'http://localhost:3000';
  
  // 1. Test login
  console.log('\n=== Test 1: OCN Admin Login ===');
  try {
    const res = await fetch(`${BASE}/api/ocn/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'ocnadmin',
        password: 'Mohamed@1234'
      })
    });
    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    // Get session cookie
    const setCookie = res.headers.get('set-cookie');
    console.log('Cookie set:', !!setCookie);
    
    if (setCookie) {
      const cookie = setCookie.split(';')[0];
      
      // 2. Test overview endpoint with auth
      console.log('\n=== Test 2: OCN Overview (Authenticated) ===');
      const overviewRes = await fetch(`${BASE}/api/ocn/overview`, {
        headers: { 'Cookie': cookie }
      });
      const overviewData = await overviewRes.json();
      console.log('Status:', overviewRes.status);
      console.log('Metrics:', JSON.stringify(overviewData.metrics, null, 2));
      
      // 3. Test bookings endpoint
      console.log('\n=== Test 3: OCN Bookings (Authenticated) ===');
      const bookingsRes = await fetch(`${BASE}/api/ocn/bookings`, {
        headers: { 'Cookie': cookie }
      });
      const bookingsData = await bookingsRes.json();
      console.log('Status:', bookingsRes.status);
      console.log('Total bookings:', Array.isArray(bookingsData) ? bookingsData.length : 'N/A');
      if (Array.isArray(bookingsData) && bookingsData.length > 0) {
        console.log('First booking:', JSON.stringify(bookingsData[0], null, 2));
      }
      
      // 4. Test revenue endpoint
      console.log('\n=== Test 4: OCN Revenue (Authenticated) ===');
      const revenueRes = await fetch(`${BASE}/api/ocn/revenue`, {
        headers: { 'Cookie': cookie }
      });
      const revenueData = await revenueRes.json();
      console.log('Status:', revenueRes.status);
      console.log('Revenue entries:', Array.isArray(revenueData) ? revenueData.length : 'N/A');
      
      // 5. Test analytics endpoint
      console.log('\n=== Test 5: OCN Analytics (Authenticated) ===');
      const analyticsRes = await fetch(`${BASE}/api/ocn/analytics`, {
        headers: { 'Cookie': cookie }
      });
      const analyticsData = await analyticsRes.json();
      console.log('Status:', analyticsRes.status);
      console.log('Analytics:', JSON.stringify(analyticsData, null, 2).substring(0, 500));
      
      // 6. Test settlements endpoint
      console.log('\n=== Test 6: OCN Settlements (Authenticated) ===');
      const settRes = await fetch(`${BASE}/api/ocn/settlements`, {
        headers: { 'Cookie': cookie }
      });
      const settData = await settRes.json();
      console.log('Status:', settRes.status);
      console.log('Settlements:', JSON.stringify(settData, null, 2).substring(0, 500));
      
      // 7. Test audit logs endpoint
      console.log('\n=== Test 7: OCN Audit Logs (Authenticated) ===');
      const auditRes = await fetch(`${BASE}/api/ocn/audit-logs`, {
        headers: { 'Cookie': cookie }
      });
      const auditData = await auditRes.json();
      console.log('Status:', auditRes.status);
      console.log('Audit entries:', Array.isArray(auditData) ? auditData.length : 'N/A');
    }
  } catch (err) {
    console.error('Login Error:', err.message);
  }

  console.log('\n✅ Admin API tests completed');
}

testAdmin();
