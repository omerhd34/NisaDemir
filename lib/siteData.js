import { prisma } from "./prisma";

export async function getSocial() {
 const row = await prisma.social.findUnique({ where: { id: 1 } });
 if (!row) {
  return {
   email: "",
   instagram: { username: "", url: "" },
  };
 }

 return {
  email: row.email,
  instagram: {
   username: row.instagramUsername,
   url: row.instagramUrl,
  },
 };
}

export async function getHome() {
 const quotes = await prisma.homeQuote.findMany({ orderBy: { sortOrder: "asc" } });
 return {
  texts: quotes.map((q) => q.text),
  titles: quotes.map((q) => q.title),
  books: quotes.map((q) => q.book),
  images: quotes.map((q) => q.image),
  quotes,
 };
}

export async function getAbout() {
 const row = await prisma.about.findUnique({ where: { id: 1 } });
 if (!row) {
  return { text1: "", text2: "", text3: "" };
 }
 return { text1: row.text1, text2: row.text2, text3: row.text3 };
}

export async function getWork() {
 const [settings, workAreas] = await Promise.all([
  prisma.workSettings.findUnique({ where: { id: 1 } }),
  prisma.workArea.findMany({ orderBy: { sortOrder: "asc" } }),
 ]);

 return {
  subtitle: settings?.subtitle || "",
  workAreas: workAreas.map((area) => ({
   title: area.title,
   description: area.description,
   icon: area.icon,
  })),
 };
}

function mapArticle(row) {
 return {
  id: row.id,
  title: row.title,
  slug: row.slug,
  image: row.image,
  excerpt: row.excerpt,
  content: row.content,
  writer: row.writer || undefined,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
 };
}

export async function getArticles() {
 const rows = await prisma.article.findMany({ orderBy: { sortOrder: "asc" } });
 return rows.map(mapArticle);
}

export async function getArticleBySlug(slug) {
 const row = await prisma.article.findUnique({ where: { slug } });
 return row ? mapArticle(row) : null;
}

export async function getArticleSlugs() {
 const rows = await prisma.article.findMany({
  select: { slug: true },
  orderBy: { sortOrder: "asc" },
 });
 return rows.map((row) => row.slug);
}

export async function getContact() {
 const row = await prisma.contact.findUnique({ where: { id: 1 } });
 if (!row) {
  return { workingHours: [] };
 }

 try {
  return { workingHours: JSON.parse(row.workingHours) };
 } catch {
  return { workingHours: [] };
 }
}

export async function getSiteContent() {
 const [social, home, about, work, articles, contact] = await Promise.all([
  getSocial(),
  getHome(),
  getAbout(),
  getWork(),
  getArticles(),
  getContact(),
 ]);

 return { social, home, about, work, articles, contact };
}
