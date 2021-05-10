drop function if exists FriendList;

create or replace function FriendList(session session.session%TYPE)
returns JSONB
as $$
declare
_userid user.id%TYPE;
_session alias for session;
_js JSONB;

begin

select s.id  into _userid from "session" s
   where s.session=_session;
if _userid is null then
   _js:='{"errors": {"error": "unauthenticated"} }';
   return _js;
end if;

select json_agg(q) into _js from (
   select u.username as friend
      from "user" u inner join friend f on u.id=f.friendId
      where f.userId=_userId
      order by u.username
) q;

select jsetjson('{}', 'friendList', coalesce(_js, '[]')) into _js;

return _js;

end
$$
language plpgsql;
-----------------------------------------

