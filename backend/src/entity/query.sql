-- Insertion in LOV_TYPE table
INSERT INTO lov_type (name)
VALUES ('country');

INSERT INTO lov_type (name)
VALUES ('company_type');    

INSERT INTO lov_type (name)
VALUES ('county');  

INSERT INTO lov_type (name)
VALUES ('file_type');  

-- Insertion into LOV table
INSERT INTO lov (name,type_id)
VALUES ('IND',1); 

INSERT INTO lov (name,type_id)
VALUES ('USA',1); 

INSERT INTO lov (name,type_id)
VALUES ('UK',1); 

INSERT INTO lov (name,type_id)
VALUES ('Food',2); 

INSERT INTO lov (name,type_id)
VALUES ('Tech',2); 

INSERT INTO lov (name,type_id)
VALUES ('Health',2); 

INSERT INTO lov (name,type_id)
VALUES ('Orange',3); 

INSERT INTO lov (name,type_id)
VALUES ('Hillsborough',3); 

INSERT INTO lov (name,type_id)
VALUES ('Foreclosure',4); 

INSERT INTO lov (name,type_id)
VALUES ('LPCourtCases',4); 


-- INSERTION INTO ROLES TABLE
INSERT INTO roles (name) VALUES ('User');
INSERT INTO roles (name) VALUES ('Admin');
INSERT INTO roles (name) VALUES ('Tenant');

--INSERT INTO USER TABLE
INSERT INTO "user" (first_name, last_name, email, password,username, refresh_token, expiry_token, role_id, tenant_id, company_id, country_code, created_date, active)
VALUES ('user1', 'lname', 'u1@example.com', '1234','user1', NULL, NULL, 1, 123, 456, 1, NOW(), true);

INSERT INTO "user" (first_name, last_name, email, password,username, refresh_token, expiry_token, role_id, tenant_id, company_id, country_code, created_date, active)
VALUES ('Admin', 'lname', 'admin@example.com', '1234','admin', NULL, NULL, 1, 123, 456, 2, NOW(), true);

--INSERT INTO SCREENS
INSERT INTO screens (name) values ('admin-dashboard-ui')
INSERT INTO screens (name) values ('admin-dashboard')
INSERT INTO screens (name) values ('admin-upload-data-ui')
INSERT INTO screens (name) values ('admin-upload-data')
INSERT INTO screens (name) values ('admin-upload-data/new-upload-ui')
INSERT INTO screens (name) values ('admin-upload-data/new-upload')

--INSERT INTO SCREEN_URL TABLE
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/Admin/admin-dashboard','frontend',' UI Admin Dashboard ',1);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/admin-dashboard','backend',' API Admin Dashboard ',2);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/Admin/upload-data','frontend',' UI Admin Upload Data ',3);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/upload-data','backend',' API Admin Upload Data ',4);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/Admin/upload-data/new-upload','frontend',' UI Admin Upload Data /new upload file ',5);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('upload-data/new-upload','backend',' API Admin Upload Data /new upload file ',6);

--INSERT INTO ROLE_SCREEN TABLE
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,1);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,2); 
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,3);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,4);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,5);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,6);
