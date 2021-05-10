create table "user" (
   id SERIAL NOT NULL PRIMARY KEY,
   username varchar(20) NOT NULL,
   hashpassword varchar(100) NOT NULL,
   photourl varchar(100) NULL
);

create unique index ix_user_username on "user"(username);