drop function if exists UserLogin;

create or replace function UserLogin(username "user".username%TYPE, hashpassword "user".hashPassword%TYPE)
returns JSONB

as $$
declare
_username alias for username;
_hashpassword alias for hashPassword;
_name user.name%TYPE;
_id user.id%TYPE;
_js JSONB;
session session.session%TYPE;
begin


select u.id  into _id from "user" u
   where u.username=_username and u.hashpassword=_hashpassword;
if _id is null then
   _js:='{"errors": {"error": "error_login_failed"} }';
   return _js;
end if;

session := uuid_generate_v4();

delete from session where id=_id;
insert into session(id, session)
select _id, session;

return _js;

end
$$
language plpgsql;
-----------------------------------------
