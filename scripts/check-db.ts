import { prisma } from '../lib/db';
import { reviewsData } from '../lib/reviews-data';

async function main() {
  const tours = await prisma.tourPackage.findMany();
  console.log('Total tours:', tours.length);
  for (const t of tours) {
    const hasMarrakech = 
      (t.title && t.title.includes('Marrakech')) ||
      (t.description && t.description.includes('Marrakech')) ||
      (t.cardDescription && t.cardDescription.includes('Marrakech')) ||
      (t.fullDescription && t.fullDescription.includes('Marrakech'));
    if (hasMarrakech) {
      console.log('Tour with Marrakech:', t.id, t.title);
    }
  }

  const bio = await prisma.guideBio.findFirst();
  console.log('Bio signoff:', bio?.signoff);

  const reviews = reviewsData;
  console.log('Total reviews:', reviews.length);
  for (const r of reviews) {
    if (r.text.includes('Marrakech')) {
      console.log('Review with Marrakech:', r.id, r.name);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
