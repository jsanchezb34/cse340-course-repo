import { getAllCategories } from "../models/categories";

const ShowCategoriesPage = async (req, res) => {
        
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
  
};

export {ShowCategoriesPage} ;