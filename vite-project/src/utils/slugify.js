import slugify from "slugify";

// slugify: для генерации slug по названию
export const generateSlug = (title) =>
  slugify(title, { lower: true, strict: true });

// slugToTitle: для преобразования slug обратно в читаемый заголовок
export const slugToTitle = (slug) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
