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
INSERT INTO screens (name) values ('user-dashboard-ui');
INSERT INTO screens (name) values ('user-dashboard');
INSERT INTO screens (name) values ('foreclosure-ui');
INSERT INTO screens (name) values ('foreclosure');
INSERT INTO screens (name) values ('admin-upload-data/new-upload-ui')
INSERT INTO screens (name) values ('admin-upload-data/new-upload')

--INSERT INTO SCREEN_URL TABLE
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/Admin/admin-dashboard','frontend',' UI Admin Dashboard ',1);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/admin-dashboard','backend',' API Admin Dashboard ',2);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/Admin/upload-data','frontend',' UI Admin Upload Data ',3);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/upload-data','backend',' API Admin Upload Data ',4);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/Admin/upload-data/new-upload','frontend',' UI Admin Upload Data /new upload file ',5);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('upload-data/new-upload','backend',' API Admin Upload Data /new upload file ',6);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/dashboard','frontend',' UI user Dashboard ',7);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/dashboard','backend',' API user Dashboard ',8);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/foreclosure','frontend',' UI user Upload Data ',9);
INSERT INTO screen_url (url,url_type,url_description,screen_id) values ('/foreclosure','backend',' API user Upload Data ',10);

--INSERT INTO ROLE_SCREEN TABLE
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,1);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,2); 
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,3);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,4);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,5);
INSERT INTO role_screen (role_id,screen_id) VALUES ( 2 ,6);
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

