export function slugify(value) {
 return value
  .toLowerCase()
  .replace(/ğ/g, "g")
  .replace(/ü/g, "u")
  .replace(/ş/g, "s")
  .replace(/ı/g, "i")
  .replace(/ö/g, "o")
  .replace(/ç/g, "c")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");
}

export function getFaqCategoryTitle(slug, categories = []) {
 return categories.find((cat) => (cat.slug || cat.id) === slug)?.title ?? "Genel";
}

export function groupFaqByCategory(items, categories = []) {
 const groups = categories
  .map((category) => ({
   id: category.slug || category.id,
   title: category.title,
   items: items.filter((item) => item.category === (category.slug || category.id)),
  }))
  .filter((group) => group.items.length > 0);

 const knownIds = new Set(categories.map((cat) => cat.slug || cat.id));
 const uncategorized = items.filter((item) => !knownIds.has(item.category));

 if (uncategorized.length > 0) {
  groups.push({ id: "genel", title: "Genel", items: uncategorized });
 }

 return groups;
}

export function createUniqueCategorySlug(title, categories) {
 const base = slugify(title) || "kategori";
 let slug = base;
 let counter = 1;

 while (categories.some((cat) => cat.slug === slug)) {
  slug = `${base}-${counter++}`;
 }

 return slug;
}
