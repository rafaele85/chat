create table session (
   id BIGINT NOT NULL PRIMARY KEY,
   session varchar(100) NOT NULL,
   foreign key(id) references "user"(id) ON DELETE CASCADE
);

create unique index ix_session_session on session(session);