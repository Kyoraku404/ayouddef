import { createReservationRecord, prisma } from '../lib/db';
import { reservationSchema } from '../lib/validation';

async function test() {
  console.log('Testing schema validation on valid payload...');
  const validPayload = {
    fullName: 'Test Agent',
    email: 'test@example.com',
    phone: '+212661000000',
    date: '2026-10-15',
    people: 2,
    tour: 'Marrakesh Medina, Souks & Heritage Experience',
    message: 'Testing reservation creation'
  };
  const parsed = reservationSchema.safeParse(validPayload);
  console.log('Validation success:', parsed.success);

  console.log('\nTesting schema validation on invalid payload (empty date)...');
  const invalidPayload = {
    fullName: 'Test Agent',
    email: 'test@example.com',
    phone: '+212661000000',
    date: '',
    people: 2,
    tour: 'Marrakesh Medina, Souks & Heritage Experience',
    message: ''
  };
  const invalidParsed = reservationSchema.safeParse(invalidPayload);
  console.log('Invalid validation success (should be false):', invalidParsed.success);
  if (!invalidParsed.success) {
    console.log('Issues:', invalidParsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`));
  }

  console.log('\nTesting creating reservation in DB...');
  if (parsed.success) {
    const r = await createReservationRecord({
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      date: new Date(parsed.data.date),
      people: parsed.data.people,
      tour: parsed.data.tour,
      message: parsed.data.message || null,
    });
    console.log('Successfully created test reservation in DB! ID:', r.id);
  }
}

test()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
