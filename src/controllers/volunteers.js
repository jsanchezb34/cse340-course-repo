import { addVolunteer, 
         removeVolunteer } from '../models/volunteers.js';

const processVolunteer = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const userId = req.session.user.user_id;

        await addVolunteer(userId, projectId);

        req.flash('success', 'You are now volunteering for this project!');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        next(error);
    }
};

const processUnvolunteer = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const userId = req.session.user.user_id;

        await removeVolunteer(userId, projectId);

        req.flash('success', 'You are no longer volunteering for this project.');

        if (req.body.redirectTo === 'dashboard') {
            return res.redirect('/dashboard');
        }
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        next(error);
    }
};

export { processVolunteer, 
         processUnvolunteer };