import { getAllCategories, getCategoryDetails, getProjectsByCategory } from "../models/categories.js";

const showCategoriesPage = async (req, res) => {
        
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
  
};


const showCategoryDetailsPage = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const categoryDetails = await getCategoryDetails(categoryId);
        const projects = await getProjectsByCategory(categoryId);
        const title = categoryDetails.name;
        res.render('category', { title, categoryDetails, projects });
    } catch (error) {
        next(error);
    }
};

export { showCategoriesPage, showCategoryDetailsPage, getProjectsByCategory};