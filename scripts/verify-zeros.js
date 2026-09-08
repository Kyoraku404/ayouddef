// Verify dashboard shows ZERO for everything
async function verifyZeros() {
  const BASE = 'http://localhost:3000';
  
  // Login
  const loginRes = await fetch(`${BASE}/api/ocn/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'ocnadmin', password: 'Mohamed@1234' })
  });
  const loginData = await loginRes.json();
  console.log('Login:', loginData.success ? 'OK' : 'FAILED');
  
  const cookie = loginRes.headers.get('set-cookie')?.split(';')[0];
  if (!cookie) { console.log('No cookie'); return; }

  // Overview
  const overviewRes = await fetch(`${BASE}/api/ocn/overview`, { headers: { 'Cookie': cookie } });
  const overview = await overviewRes.json();
  console.log('\n=== OVERVIEW METRICS (should ALL be 0) ===');
  console.log(JSON.stringify(overview.metrics, null, 2));

  // Bookings
  const bookingsRes = await fetch(`${BASE}/api/ocn/bookings`, { headers: { 'Cookie': cookie } });
  const bookings = await bookingsRes.json();
  console.log('\n=== BOOKINGS (should be empty) ===');
  console.log('Count:', bookings.bookings?.length ?? 0);

  // Revenue
  const revenueRes = await fetch(`${BASE}/api/ocn/revenue`, { headers: { 'Cookie': cookie } });
  const revenue = await revenueRes.json();
  console.log('\n=== REVENUE (should be empty) ===');
  console.log('Count:', revenue.revenue?.length ?? 0);
  console.log('Summary:', JSON.stringify(revenue.summary, null, 2));

  // Analytics
  const analyticsRes = await fetch(`${BASE}/api/ocn/analytics`, { headers: { 'Cookie': cookie } });
  const analytics = await analyticsRes.json();
  console.log('\n=== ANALYTICS (should ALL be 0) ===');
  console.log('Pageviews:', analytics.totalPageviews);
  console.log('WhatsApp Clicks:', analytics.whatsappClicks);
  console.log('Phone Clicks:', analytics.phoneClicks);

  // Settlements
  const settRes = await fetch(`${BASE}/api/ocn/settlements`, { headers: { 'Cookie': cookie } });
  const sett = await settRes.json();
  console.log('\n=== SETTLEMENTS (should be empty) ===');
  console.log('Count:', sett.settlements?.length ?? 0);

  // Audit Logs
  const auditRes = await fetch(`${BASE}/api/ocn/audit-logs?limit=100`, { headers: { 'Cookie': cookie } });
  const audit = await auditRes.json();
  console.log('\n=== AUDIT LOGS (should be empty) ===');
  console.log('Count:', Array.isArray(audit) ? audit.length : audit.logs?.length ?? 0);
}

verifyZeros();
