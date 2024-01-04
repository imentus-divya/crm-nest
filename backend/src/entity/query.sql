-- Insertion in LOV_TYPE table
INSERT INTO
    lov_type (name)
VALUES
    ('country');

INSERT INTO
    lov_type (name)
VALUES
    ('company_type');

INSERT INTO
    lov_type (name)
VALUES
    ('county');

INSERT INTO
    lov_type (name)
VALUES
    ('file_type');

-- Insertion into LOV table
INSERT INTO
    lov (name, type_id)
VALUES
    ('IND', 1);

INSERT INTO
    lov (name, type_id)
VALUES
    ('USA', 1);

INSERT INTO
    lov (name, type_id)
VALUES
    ('UK', 1);

INSERT INTO
    lov (name, type_id)
VALUES
    ('Food', 2);

INSERT INTO
    lov (name, type_id)
VALUES
    ('Tech', 2);

INSERT INTO
    lov (name, type_id)
VALUES
    ('Health', 2);

INSERT INTO
    lov (name, type_id)
VALUES
    ('Orange', 3);

INSERT INTO
    lov (name, type_id)
VALUES
    ('Hillsborough', 3);

INSERT INTO
    lov (name, type_id)
VALUES
    ('Foreclosure', 4);

INSERT INTO
    lov (name, type_id)
VALUES
    ('LPCourtCases', 4);

-- INSERTION INTO ROLES TABLE
INSERT INTO
    roles (name)
VALUES
    ('User');

INSERT INTO
    roles (name)
VALUES
    ('Admin');

INSERT INTO
    roles (name)
VALUES
    ('Tenant');

--INSERT INTO USER TABLE
INSERT INTO
    "user" (
        first_name,
        last_name,
        email,
        password,
        username,
        refresh_token,
        expiry_token,
        role_id,
        tenant_id,
        company_id,
        country_code,
        created_date,
        active
    )
VALUES
    (
        'user1',
        'lname',
        'u1@example.com',
        '1234',
        'user1',
        NULL,
        NULL,
        1,
        123,
        456,
        1,
        NOW (),
        true
    );

INSERT INTO
    "user" (
        first_name,
        last_name,
        email,
        password,
        username,
        refresh_token,
        expiry_token,
        role_id,
        tenant_id,
        company_id,
        country_code,
        created_date,
        active
    )
VALUES
    (
        'Admin',
        'lname',
        'admin@example.com',
        '1234',
        'admin',
        NULL,
        NULL,
        1,
        123,
        456,
        2,
        NOW (),
        true
    );

--INSERT INTO SCREENS
INSERT INTO
    screens (name)
values
    ('admin-dashboard-ui')
INSERT INTO
    screens (name)
values
    ('admin-dashboard')
INSERT INTO
    screens (name)
values
    ('admin-upload-data-ui')
INSERT INTO
    screens (name)
values
    ('admin-upload-data')
INSERT INTO
    screens (name)
values
    ('user-dashboard-ui');

INSERT INTO
    screens (name)
values
    ('user-dashboard');

INSERT INTO
    screens (name)
values
    ('foreclosure-ui');

INSERT INTO
    screens (name)
values
    ('foreclosure');

INSERT INTO
    screens (name)
values
    ('admin-upload-data/new-upload-ui')
INSERT INTO
    screens (name)
values
    ('admin-upload-data/new-upload')
    --INSERT INTO SCREEN_URL TABLE
INSERT INTO
    screen_url (url, url_type, url_description, screen_id)
values
    (
        '/Admin/admin-dashboard',
        'frontend',
        ' UI Admin Dashboard ',
        1
    );

INSERT INTO
    screen_url (url, url_type, url_description, screen_id)
values
    (
        '/admin-dashboard',
        'backend',
        ' API Admin Dashboard ',
        2
    );

INSERT INTO
    screen_url (url, url_type, url_description, screen_id)
values
    (
        '/Admin/upload-data',
        'frontend',
        ' UI Admin Upload Data ',
        3
    );

INSERT INTO
    screen_url (url, url_type, url_description, screen_id)
values
    (
        '/upload-data',
        'backend',
        ' API Admin Upload Data ',
        4
    );

INSERT INTO
    screen_url (url, url_type, url_description, screen_id)
values
    (
        '/Admin/upload-data/new-upload',
        'frontend',
        ' UI Admin Upload Data /new upload file ',
        5
    );

INSERT INTO
    screen_url (url, url_type, url_description, screen_id)
values
    (
        'upload-data/new-upload',
        'backend',
        ' API Admin Upload Data /new upload file ',
        6
    );

INSERT INTO
    screen_url (url, url_type, url_description, screen_id)
values
    (
        '/dashboard',
        'frontend',
        ' UI user Dashboard ',
        7
    );

INSERT INTO
    screen_url (url, url_type, url_description, screen_id)
values
    (
        '/dashboard',
        'backend',
        ' API user Dashboard ',
        8
    );

INSERT INTO
    screen_url (url, url_type, url_description, screen_id)
values
    (
        '/foreclosure',
        'frontend',
        ' UI user Upload Data ',
        9
    );

INSERT INTO
    screen_url (url, url_type, url_description, screen_id)
values
    (
        '/foreclosure',
        'backend',
        ' API user Upload Data ',
        10
    );

--INSERT INTO ROLE_SCREEN TABLE
INSERT INTO
    role_screen (role_id, screen_id)
VALUES
    (2, 1);

INSERT INTO
    role_screen (role_id, screen_id)
VALUES
    (2, 2);

INSERT INTO
    role_screen (role_id, screen_id)
VALUES
    (2, 3);

INSERT INTO
    role_screen (role_id, screen_id)
VALUES
    (2, 4);

INSERT INTO
    role_screen (role_id, screen_id)
VALUES
    (2, 5);

INSERT INTO
    role_screen (role_id, screen_id)
VALUES
    (2, 6);

INSERT INTO
    role_screen (role_id, screen_id)
VALUES
    (1, 7);

INSERT INTO
    role_screen (role_id, screen_id)
VALUES
    (1, 8);

INSERT INTO
    role_screen (role_id, screen_id)
VALUES
    (1, 9);

INSERT INTO
    role_screen (role_id, screen_id)
VALUES
    (1, 10);

--Insert into foreclosure table
INSERT INTO
    foreclosure (
        auction_date,
        case_number,
        address,
        defendants,
        plaintiffs,
        judgement,
        zillow,
        redfin,
        reporting_date,
        status,
        internal_case_id,
        user_comments,
        county_name
    )
VALUES
    (
        '2023-07-31T12:30:00',
        '292022CA007841A001HC',
        '927 CULBREATH GREEN CT
  RUSKIN, FL 33570',
          ARRAY['Cubbage Michael', 'State Of Florida Department Of Revenue', 'UNKNOWN SPOUSE OF MICHAEL CUBBAGE A/K/A MICHAEL CHRISTOPHER CUBBAGE','CLERK OF THE CIRCUIT COURT, HILLSBOROUGH COUNTY, FLORIDA'],
          ARRAY['Loandepot.Com Llc'],
        '300847.4',
        '385600',
        '383699',
        '2023-07-31T12:30:00',
        'open',
        '1375334',
        'q',
        'orange'
    );
INSERT INTO screens (name) values ('admin-dashboard-ui')
INSERT INTO screens (name) values ('admin-dashboard')
INSERT INTO screens (name) values ('admin-upload-data-ui')
INSERT INTO screens (name) values ('admin-upload-data')

-- INSERT INTO screens (name) values ('user-dashboard-ui');
-- INSERT INTO screens (name) values ('user-dashboard');
-- INSERT INTO screens (name) values ('foreclosure-ui');
-- INSERT INTO screens (name) values ('foreclosure');

INSERT INTO screens (name) values ('admin-upload-data/new-upload-ui');
INSERT INTO screens (name) values ('admin-upload-data/new-upload');
INSERT INTO screens (name) values ('admin-manage-user-ui');
INSERT INTO screens (name) values ('admin-manage-user');
INSERT INTO screens (name) values ('admin-manage-user/add-data-ui');
INSERT INTO screens (name) values ('admin-manage-user/add-data');


INSERT INTO screens (name) values ('admin-manage-roles-ui');
INSERT INTO screens (name) values ('admin-manage-roles');
INSERT INTO screens (name) values ('admin-manage-roles/add-role-ui');
INSERT INTO screens (name) values ('admin-manage-roles/add-role');
-- save user
INSERT INTO screens (name) values ('save-user');




--INSERT INTO SCREEN_URL TABLE
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/Admin/admin-dashboard','frontend',' UI Admin Dashboard ',1);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/admin-dashboard','backend',' API Admin Dashboard ',2);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/Admin/upload-data','frontend',' UI Admin Upload Data ',3);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/upload-data','backend',' API Admin Upload Data ',4);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/Admin/upload-data/new-upload','frontend',' UI Admin Upload Data /new upload file ',5);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('upload-data/new-upload','backend',' API Admin Upload Data /new upload file ',6);

-- INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/dashboard','frontend',' UI user Dashboard ',7);
-- INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/dashboard','backend',' API user Dashboard ',8);
-- INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/foreclosure','frontend',' UI user Upload Data ',9);
-- INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/foreclosure','backend',' API user Upload Data ',10);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/Admin/manage-user','frontend',' UI Admin Manage User ',7);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/admin-manage-user','backend',' API Admin Manage User ',8);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/Admin/manage-user/add-user','frontend',' UI Admin Manage User/Add Data ',9);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/add-user','backend',' API Admin Manage User/Add Data ',10);


INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/Admin/manage-roles','frontend',' UI Admin Manage Roles ',11);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/admin-manage-roles','backend',' API Admin Manage Roles ',12);

INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/Admin/manage-roles/create-role','frontend',' UI Admin Manage Role/Create Role ',13);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/create-role','backend',' API Admin Manage Role/Create Role ',14);
-- save user
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/save-user','backend',' API Admin Save New user ',15);




--INSERT INTO ROLE_SCREEN TABLE
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,1);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,2); 
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,3);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,4);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,5);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,6);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,7);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,8);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,9);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,10);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,11);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,12);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,13);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,14);
--save user by admin
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,15);

--user
INSERT INTO role_screen (role_id,screen_id) VALUES ( 1 ,7);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 1 ,8);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 1 ,9);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 1 ,10);






-- CATALOGDB 
--INSERTION INTO CATALOG_LOV_TYPE
insert into catalog_lov_type(name)values('company_type')
insert into catalog_lov_type(name)values('country_code')

--insertion into catalog_lov
INSERT INTO catalog_lov (name,type_id)
VALUES ('IND',2); 

INSERT INTO catalog_lov (name,type_id)
VALUES ('USA',2); 

INSERT INTO catalog_lov (name,type_id)
VALUES ('UK',2); 
INSERT INTO catalog_lov (name,type_id)
VALUES ('Food',1); 

INSERT INTO catalog_lov (name,type_id)
VALUES ('Tech',1); 

INSERT INTO catalog_lov (name,type_id)
VALUES ('Health',1); 

--INSERTION INTO TENANT TABLE
INSERT INTO tenant (name, username, password, active, country_code)
VALUES ('tenant1', 't1', '1234', true, 4);

--insertion into company table

INSERT INTO company (name, active, tenant_id, country_id, company_type_id,connection_string)
VALUES ('Company1', true, 'f81d17d6-7a37-4c28-8b3f-f2be4b7bfd74', 4, 1,'postgres://postgres:123@localhost:5432/crm_db');

