
create table session (
   id SERIAL PRIMARY KEY,
   session varchar(100) not null,
   foreign key(id) references "user"(id) on delete cascade
);

create unique index ix_session_session on "session"(session);
