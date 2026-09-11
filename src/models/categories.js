import db from './db.js'

const getAllCategories = async () => {
  const query = `
    SELECT 
      c.category_id,
      c.name
    FROM public.category c
    ORDER BY c.category_id;
  `;

  const result = await db.query(query);
  return result.rows;
};

export { getAllCategories };