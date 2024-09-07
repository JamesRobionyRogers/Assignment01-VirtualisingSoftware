-- Create accounts table
CREATE TABLE IF NOT EXISTS accounts (
    id uuid PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    bio TEXT,
    profile_picture_url TEXT,
    phone VARCHAR(20),
    email VARCHAR(128),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Foreign key constraint
    CONSTRAINT fk_auth_user
        FOREIGN KEY (id)
        REFERENCES auth.users (id)
        ON DELETE CASCADE
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experience (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES accounts(id) ON DELETE CASCADE,
    job_title VARCHAR(100),
    company_name VARCHAR(100),
    is_current_job BOOL NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES accounts(id) ON DELETE CASCADE,
    skill_name VARCHAR(100),
    proficiency_level VARCHAR(50),  -- e.g., Beginner, Intermediate, Expert
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES accounts(id) ON DELETE CASCADE,
    institution_name VARCHAR(100),
    degree VARCHAR(100),
    field_of_study VARCHAR(100),
    start_date DATE,
    end_date DATE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES accounts(id) ON DELETE CASCADE,
    application_url VARCHAR(250),
    job_title VARCHAR(100),
    company_name VARCHAR(100),
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    description TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



DO $$
BEGIN
    -- Check if any of the tables have data
    IF NOT EXISTS (SELECT 1 FROM auth.users)
       AND NOT EXISTS (SELECT 1 FROM accounts)
       AND NOT EXISTS (SELECT 1 FROM experience)
       AND NOT EXISTS (SELECT 1 FROM skills)
       AND NOT EXISTS (SELECT 1 FROM education)
       AND NOT EXISTS (SELECT 1 FROM job_applications) THEN

        -- Insert the first user into auth.users if no user exists with the given ID
        INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at, encrypted_password)
        VALUES 
            ('450e5a17-33f1-448a-9532-cbc66e5e7653'::uuid, 
            'john.doe@example.com', 
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP, 
            CURRENT_TIMESTAMP,
            '$2a$10$ph5bpEar/roAYI6SfSogy.VtUHVMbJ.uYjZh6QmRJkDLNh8BzKDJG'),
            ('560e5a17-44f2-448a-9532-cdc66e6e7654'::uuid, 
            'jane.smith@example.com', 
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP, 
            CURRENT_TIMESTAMP,
            '$2a$10$ph5bpEar/roAYI6SfSogy.VtUHVMbJ.uYjZh6QmRJkDLNh8BzKDJG');

        -- Insert the first user into accounts if no account exists with the given ID
        INSERT INTO accounts (id, first_name, last_name, bio, profile_picture_url, phone, email)
        VALUES 
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 
            'John', 
            'Doe', 
            'Experienced software developer with a passion for AI', 
            'https://example.com/johndoe.jpg', 
            '123-456-7890', 
            'john.doe@example.com'),
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 
            'Jane', 
            'Smith', 
            'Digital marketing expert with extensive experience in brand management', 
            'https://example.com/janesmith.jpg', 
            '098-765-4321', 
            'jane.smith@example.com');

        -- Insert experience records for the first user
        INSERT INTO experience (user_id, job_title, company_name, is_current_job, start_date, end_date, description)
        VALUES
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'Senior Developer', 'Tech Corp', true, '2020-01-01', NULL, 'Leading a team of developers on various projects'),
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'Junior Developer', 'Startup Inc', false, '2018-06-01', '2019-12-31', 'Worked on frontend development using React'),
            -- Experience for the second user
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 'Marketing Manager', 'BrandX', true, '2019-05-01', NULL, 'Managing marketing campaigns and brand strategies'),
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 'Marketing Assistant', 'AdAgency', false, '2017-02-01', '2019-04-30', 'Assisted in creating and implementing marketing strategies');

        -- Insert skills for the first user
        INSERT INTO skills (user_id, skill_name, proficiency_level)
        VALUES
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'JavaScript', 'Expert'),
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'Python', 'Intermediate'),
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'SQL', 'Expert'),
            -- Skills for the second user
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 'SEO', 'Expert'),
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 'Content Strategy', 'Intermediate'),
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 'Google Analytics', 'Expert');

        -- Insert education records for the first user
        INSERT INTO education (user_id, institution_name, degree, field_of_study, start_date, end_date, description)
        VALUES
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'Tech University', 'Bachelor of Science', 'Computer Science', '2014-09-01', '2018-05-31', 'Focused on software engineering and AI'),
            -- Education for the second user
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 'Business School', 'Master of Business Administration', 'Marketing', '2015-09-01', '2017-05-31', 'Specialized in digital marketing and brand management');

        -- Insert job applications for the first user
        INSERT INTO job_applications (user_id, application_url, job_title, company_name, application_date, status, description, notes)
        VALUES
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'https://example.com/job1', 'Lead Developer', 'Innovative Tech', '2024-09-01', 'Applied', 'Senior role leading a team of 10 developers', 'Waiting for initial response'),
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'https://example.com/job2', 'Digital Marketing Director', 'Global Brand', '2024-08-15', 'Interview Scheduled', 'Overseeing all digital marketing efforts', 'Interview scheduled for next week'),
            -- Job applications for the second user
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 'https://example.com/job3', 'Senior Marketing Strategist', 'AdWorld', '2024-09-10', 'Applied', 'Lead the marketing strategy and execution', 'Awaiting feedback'),
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 'https://example.com/job4', 'Content Director', 'MediaHouse', '2024-07-20', 'Offer Extended', 'Direct content creation and strategy', 'Reviewing offer details');
    END IF;
END $$;