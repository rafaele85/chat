#select * from UserLogin('john', '054e3b308708370ea029dc2ebd1646c498d59d7203c9e1a44cf0484df98e581a');

drop function if exists UserLogin;

create or replace function UserLogin(username "user".username%TYPE, hashpassword "user".hashpassword%TYPE)
returns JSONB
as $$
declare
_username alias for username;
_hashpassword alias for hashPassword;
_id user.id%TYPE;
_session session.session%TYPE;
_js JSONB;
begin

select u.id  into _id from "user" u
   where u.username=_username and u.hashpassword=_hashpassword;
if _id is null then
   _js:='{"errors": {"error": "login_failed"} }';
   return _js;
end if;

_session:=uuid_generate_v4();
delete from session where id=_id;
insert into session(id, session)
select _id, _session;

select jsetstr('{}', 'session', _session) into _js;

return _js;

end
$$
language plpgsql;
-----------------------------------------

