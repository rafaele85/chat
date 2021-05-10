drop function if exists userLogout;

create or replace function userLogout(session session.session%TYPE)
returns JSONB
as $$
declare
_session alias for session;
_js JSONB;
begin

delete from session where session.session=_session;

return '{}';

end
$$
language plpgsql;
------



