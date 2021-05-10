drop function if exists FriendAdd;

create or replace function FriendAdd(session session.session%TYPE, friend "user".username%TYPE)
returns JSONB
as $$
declare
_friend alias for friend;
_session alias for session;
_userid user.id%TYPE;
_friendid user.id%TYPE;
_friendshipid friend.id%TYPE;
_js JSONB;
begin

select s.id  into _userid from "session" s
   where s.session=_session;
if _userid is null then
   _js:='{"errors": {"error": "unauthenticated"} }';
   return _js;
end if;

select u.id  into _friendid from "user" u
   where u.username=_friend;
if _friendid is null then
   _js:='{"errors": {"friend": "unknown_user"} }';
   return _js;
end if;

if _friendid=_userid then
   _js:='{"errors": {"friend": "same_user"} }';
end if;

if exists (
    select 1 from friend f where (f.userid=_userid and f.friendid=_friendid or
                                  f.userid=_friendid and f.friendid=_userid
                                  )
    ) then
   _js:='{"errors": {"friend": "already_friend"} }';
   return _js;
end if;

insert into friend(userid, friendid)
select _userid, _friendid;

insert into friend(userid, friendid)
select _friendid, _userid
returning id into _friendshipid;


select jsetint('{}', 'id', _friendshipid) into _js;

return _js;

end
$$
language plpgsql;
-----------------------------------------

