import { PrismaClient } from "@prisma/client";
import { faq } from "../lib/initialSiteData.js";

const prisma = new PrismaClient();

async function main() {
 await prisma.faqItem.deleteMany();

 for (let i = 0; i < faq.length; i++) {
  const item = faq[i];
  await prisma.faqItem.create({
   data: {
    question: item.question,
    answer: item.answer,
    category: item.category,
    sortOrder: i,
   },
  });
 }

 console.log(`${faq.length} SSS sorusu kategorilerle eklendi.`);
}

main()
 .catch((error) => {
  console.error(error);
  process.exit(1);
 })
 .finally(async () => {
  await prisma.$disconnect();
 });
