drop role if exists chatuser;

CREATE ROLE chatuser LOGIN PASSWORD 'xxx';
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO chatuser;