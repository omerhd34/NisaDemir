import prisma from "./prisma.js";

export async function getHomeData() {
  try {
    const homeData = await prisma.home.findFirst();
    if (!homeData) {
      throw new Error("No home data found");
    }
    return homeData;
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw error;
  }
}

export async function getAboutData() {
  try {
    // Daha güvenli query - hata detaylarını yakala
    const aboutData = await prisma.about.findFirst({
      // Explicit error handling
    });
    if (!aboutData) {
      throw new Error("No about data found in database");
    }
    return aboutData;
  } catch (error) {
    console.error("Error fetching about data:", error);
    // Prisma hatalarını daha detaylı logla
    if (error.code) {
      console.error("Prisma error code:", error.code);
    }
    if (error.meta) {
      console.error("Prisma error meta:", error.meta);
    }
    throw error;
  }
}

export async function getWorkData() {
  try {
    // Daha güvenli query - hata detaylarını yakala
    const workData = await prisma.work.findFirst({
      // Explicit error handling
    });
    if (!workData) {
      throw new Error("No work data found in database");
    }
    return workData;
  } catch (error) {
    console.error("Error fetching work data:", error);
    // Prisma hatalarını daha detaylı logla
    if (error.code) {
      console.error("Prisma error code:", error.code);
    }
    if (error.meta) {
      console.error("Prisma error meta:", error.meta);
    }
    throw error;
  }
}

export async function getArticlesData() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });
    return articles;
  } catch (error) {
    console.error("Error fetching articles data:", error);
    throw error;
  }
}

export async function getArticleBySlug(slug) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
    });
    return article;
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    throw error;
  }
}

export async function getArticleSlugs() {
  try {
    const rows = await prisma.article.findMany({
      select: { slug: true },
      orderBy: { createdAt: "desc" },
    });
    return rows.map((r) => r.slug);
  } catch (error) {
    console.error("Error fetching article slugs:", error);
    throw error;
  }
}

export async function getContactData() {
  try {
    const contactData = await prisma.contact.findFirst();
    if (!contactData) {
      throw new Error("No contact data found");
    }
    return contactData;
  } catch (error) {
    console.error("Error fetching contact data:", error);
    throw error;
  }
}

export async function getFooterData() {
  try {
    const footerData = await prisma.footer.findFirst();
    if (!footerData) {
      throw new Error("No footer data found");
    }
    return footerData;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    throw error;
  }
}
