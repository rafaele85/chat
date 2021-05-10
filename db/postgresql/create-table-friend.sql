create table friend(
  id SERIAL NOT NULL PRIMARY KEY,
  userid BIGINT NOT NULL,
  friendid BIGINT NOT NULL,
  foreign key(userid) references "user"(id) on DELETE CASCADE,
  foreign key(friendid) references "user"(id) on DELETE CASCADE
);

create unique index ix_friend_userid_friendid on friend(userid, friendid);
