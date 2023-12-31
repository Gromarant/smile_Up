const queries = {
  getListByName: `
  SELECT l.name, l.list_id,  p.product_id, p.title, p.price, p.description, p.category, p.image
  FROM lists as l
      INNER JOIN lists_products as lp
          ON lp.list_id = l.list_id
      INNER JOIN products as p
          ON p.product_id = lp.product_id
      WHERE l.name ILIKE $1;`,
  getAllLists: ` 
  SELECT lists.name, lists.list_id
  FROM lists
  ORDER BY lists.list_id DESC;`,
  createList: `
  INSERT INTO Lists (name) 
  VALUES ($1)`,
  updateListName: `
  UPDATE lists
    SET name=$1
    WHERE name ilike $2;`,
  deleteListProducts:
  `DELETE FROM lists_products
      WHERE list_id = (SELECT list_id FROM lists WHERE name ilike $1);`,
  insertNewProducts:`
  INSERT INTO lists_products (list_id, product_id)
    VALUES ((SELECT list_id FROM lists WHERE name ILIKE $1), (SELECT product_id FROM products WHERE title ILIKE $2))`,
  updateListOld: `
  UPDATE lists
    SET name=$1
    WHERE name ilike $2;
  DELETE FROM lists_products
      WHERE list_id = (SELECT list_id FROM lists WHERE name ilike $3);
  INSERT INTO lists_products (list_id, product_id)
  VALUES ((SELECT list_id FROM lists WHERE name ilike $4),
         (SELECT product_id FROM products WHERE title ilike $5));`,
  deleteList: `
  DELETE FROM public.lists
	WHERE name ILIKE $1`
};

module.exports = queries;