Select * from organization;
select * from project;
Select * from category;
Select * from project_category;

-- ========================================
-- tables creation
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL
);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE project_category (
    project_id INT REFERENCES project(project_id) ON DELETE CASCADE,
    category_id INT REFERENCES category(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- ========================================
-- Insert sample data
-- ========================================

--organizaciones
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- proyectos
INSERT INTO project (
    organization_id,
    title,
    description,
    location,
    project_date
) VALUES
-- BrightFuture Builders (organization_id = 1)
(1, 'Community Housing Initiative', 'Building affordable housing units for low-income families.', 'Santa Cruz, Bolivia', '2026-09-20'),
(1, 'School Renovation Project', 'Renovating classrooms and facilities in rural schools.', 'La Guardia, Bolivia', '2026-10-05'),
(1, 'Youth Training Workshop', 'Providing vocational training for young adults.', 'Cochabamba, Bolivia', '2026-10-15'),
(1, 'Health Clinic Construction', 'Constructing a small health clinic in underserved areas.', 'Montero, Bolivia', '2026-11-01'),
(1, 'Playground Development', 'Creating safe play areas for children.', 'Santa Cruz, Bolivia', '2026-11-20'),

-- GreenHarvest Growers (organization_id = 2)
(2, 'Urban Garden Expansion', 'Expanding community gardens to promote sustainable food.', 'Santa Cruz, Bolivia', '2026-09-25'),
(2, 'Organic Farming Training', 'Workshops on organic farming techniques.', 'Warnes, Bolivia', '2026-10-10'),
(2, 'Tree Planting Campaign', 'Planting trees to combat deforestation.', 'La Guardia, Bolivia', '2026-10-22'),
(2, 'Irrigation System Upgrade', 'Improving irrigation systems for local farmers.', 'Cotoca, Bolivia', '2026-11-05'),
(2, 'Farm-to-School Program', 'Supplying fresh produce to local schools.', 'Santa Cruz, Bolivia', '2026-11-18'),

-- UnityServe Volunteers (organization_id = 3)
(3, 'Food Distribution Drive', 'Providing meals to families in need.', 'Santa Cruz, Bolivia', '2026-09-28'),
(3, 'Volunteer Training Program', 'Training volunteers for community service.', 'La Guardia, Bolivia', '2026-10-12'),
(3, 'Senior Care Initiative', 'Supporting elderly citizens with daily needs.', 'Cochabamba, Bolivia', '2026-10-25'),
(3, 'Disaster Relief Support', 'Organizing aid for communities affected by floods.', 'Beni, Bolivia', '2026-11-08'),
(3, 'Literacy Campaign', 'Promoting literacy among children and adults.', 'Santa Cruz, Bolivia', '2026-11-22');


-- categorias
INSERT INTO category (name) 
VALUES
('Community Infrastructure'),
('Environment and Sustainability'),
('Social and Educational Support');

-- Asocia proyectos a categorias

-- Community Infrastructure (category_id = 1)
INSERT INTO project_category (project_id, category_id) VALUES
(1, 1), -- Community Housing Initiative
(2, 1), -- School Renovation Project
(4, 1), -- Health Clinic Construction
(5, 1), -- Playground Development
(9, 1), -- Irrigation System Upgrade
(6, 2), -- Urban Garden Expansion
(7, 2), -- Organic Farming Training
(8, 2), -- Tree Planting Campaign
(10, 2),
(3, 3), -- Youth Training Workshop
(11, 3), -- Food Distribution Drive
(12, 3), -- Volunteer Training Program
(13, 3), -- Senior Care Initiative
(14, 3), -- Disaster Relief Support
(15, 3); 