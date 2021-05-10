
drop function if exists UserSignup;

create or replace function UserSignup(
  username "user".username%TYPE,
  hashpassword "user".hashpassword%TYPE,
  hashconfirmpassword "user".hashpassword%TYPE,
  photourl "user".photourl%TYPE
)
returns JSONB
as $$
declare
_username alias for username;
_hashpassword alias for hashpassword;
_hashconfirmpassword alias for hashconfirmpassword;
_photourl alias for photourl;
_id user.id%TYPE;
_session session.session%TYPE;
_js JSONB;
begin

if _username is null or length(username)<4 then
   _js:='{"errors": {"username": "invalid_username"} }';
   return _js;
end if;


if _hashpassword is null or length(_hashpassword)<8 then
   _js:='{"errors": {"password": "invalid_password"} }';
   return _js;
end if;

if _hashconfirmpassword is null or _hashconfirmpassword!=_hashpassword then
   _js:='{"errors": {"confirmPassword": "passwords_mismatch"} }';
   return _js;
end if;

if exists ( select 1 from "user" u where u.username=_username ) then
  _js:='{"errors": {"username": "duplicate_username"} }';
  return _js;
end if;

insert into "user"(username, hashpassword, photourl)
select _username, _hashpassword, _photourl
returning id into _id;


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

