
create table "user"(
   id SERIAL PRIMARY KEY,
   name varchar(50) NOT NULL,
   username varchar(100) NOT NULL,
   hashpassword varchar(100) NOT NULL,
   photourl varchar(100) null
);

create unique index ix_user_username on "user"(username);
