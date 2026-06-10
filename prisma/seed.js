import { PrismaClient } from "@prisma/client";
import {
 social,
 home,
 about,
 work,
 articles,
 contact,
} from "../lib/initialSiteData.js";

const prisma = new PrismaClient();

async function main() {
 await prisma.article.deleteMany();
 await prisma.homeQuote.deleteMany();
 await prisma.workArea.deleteMany();

 await prisma.social.upsert({
  where: { id: 1 },
  update: {
   email: social.email,
   instagramUsername: social.instagram.username,
   instagramUrl: social.instagram.url,
  },
  create: {
   id: 1,
   email: social.email,
   instagramUsername: social.instagram.username,
   instagramUrl: social.instagram.url,
  },
 });

 await prisma.about.upsert({
  where: { id: 1 },
  update: {
   text1: about.text1,
   text2: about.text2,
   text3: about.text3,
  },
  create: {
   id: 1,
   text1: about.text1,
   text2: about.text2,
   text3: about.text3,
  },
 });

 await prisma.workSettings.upsert({
  where: { id: 1 },
  update: { subtitle: work.subtitle },
  create: { id: 1, subtitle: work.subtitle },
 });

 await prisma.contact.upsert({
  where: { id: 1 },
  update: { workingHours: JSON.stringify(contact.workingHours) },
  create: {
   id: 1,
   workingHours: JSON.stringify(contact.workingHours),
  },
 });

 for (let i = 0; i < home.texts.length; i++) {
  await prisma.homeQuote.create({
   data: {
    text: home.texts[i],
    title: home.titles[i] || "",
    book: home.books[i] || "",
    image: home.images[i] || "",
    sortOrder: i,
   },
  });
 }

 for (let i = 0; i < work.workAreas.length; i++) {
  const area = work.workAreas[i];
  await prisma.workArea.create({
   data: {
    title: area.title,
    description: area.description,
    icon: area.icon,
    sortOrder: i,
   },
  });
 }

 for (let i = 0; i < articles.length; i++) {
  const article = articles[i];
  await prisma.article.create({
   data: {
    title: article.title,
    slug: article.slug,
    image: article.image,
    excerpt: article.excerpt,
    content: article.content,
    writer: article.writer || null,
    sortOrder: i,
   },
  });
 }

 console.log("Veritabanı seed işlemi tamamlandı.");
}

main()
 .catch((error) => {
  console.error(error);
  process.exit(1);
 })
 .finally(async () => {
  await prisma.$disconnect();
 });
