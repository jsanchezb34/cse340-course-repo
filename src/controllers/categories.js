import { getAllCategories, 
         getCategoryDetails, 
         getProjectsByCategory,
         getCategoriesByProject,
         updateCategoryAssignments,
         createCategory,
         updateCategory } from "../models/categories.js";

import{ 
         getProjectDetails } from "../models/projects.js";

import { body, validationResult } from 'express-validator';



const showCategoriesPage = async (req, res) => {
        
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
  
};

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters')
];

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

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProject(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

//  categories form

const showNewCategoryForm = async (req, res, next) => {
    try {
        const title = 'Add New Category';
        res.render('new-category', { title });
    } catch (error) {
        next(error);
    }
};

const processNewCategoryForm = async (req, res, next) => {
    try {
        const results = validationResult(req);
        if (!results.isEmpty()) {
            results.array().forEach(error => req.flash('error', error.msg));
            return res.redirect('/new-category');
        }
        const { name } = req.body;
        const categoryId = await createCategory(name);
        req.flash('success', 'Category created successfully!');
        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        next(error);
    }
};

const showEditCategoryForm = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const categoryDetails = await getCategoryDetails(categoryId);
        const title = 'Edit Category';
        res.render('edit-category', { title, categoryDetails });
    } catch (error) {
        next(error);
    }
};

const processEditCategoryForm = async (req, res, next) => {
    try {
        const results = validationResult(req);
        if (!results.isEmpty()) {
            results.array().forEach(error => req.flash('error', error.msg));
            return res.redirect('/edit-category/' + req.params.id);
        }
        const categoryId = req.params.id;
        const { name } = req.body;
        await updateCategory(categoryId, name);
        req.flash('success', 'Category updated successfully!');
        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        next(error);
    }
};
export { showCategoriesPage, 
         showCategoryDetailsPage, 
         showAssignCategoriesForm,
         processAssignCategoriesForm,
         categoryValidation,
         showNewCategoryForm,
         processNewCategoryForm,
         showEditCategoryForm,
         processEditCategoryForm
        };