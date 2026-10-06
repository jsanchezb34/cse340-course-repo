import db from './db.js';


const getVolunteerProjectsByUserId = async (userId) => {
    const query = `
        SELECT p.project_id, p.title, p.location, p.date, o.name AS organization_name
        FROM project_volunteer pv
        JOIN project p ON pv.project_id = p.project_id
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE pv.user_id = $1
        ORDER BY p.date
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
};

const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO project_volunteer (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
    `;
    await db.query(query, [userId, projectId]);
};

const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM project_volunteer
        WHERE user_id = $1 AND project_id = $2
    `;
    await db.query(query, [userId, projectId]);
};

const isUserVolunteering = async (userId, projectId) => {
    const query = `
        SELECT 1
        FROM project_volunteer
        WHERE user_id = $1 AND project_id = $2
    `;
    const result = await db.query(query, [userId, projectId]);
    return result.rows.length > 0;
};



export { addVolunteer, 
         removeVolunteer, 
         isUserVolunteering, 
         getVolunteerProjectsByUserId
        };