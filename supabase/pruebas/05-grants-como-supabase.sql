-- Supabase concede estos permisos automáticamente a anon/authenticated
-- ("Automatically expose new tables"). Los replicamos para que la prueba
-- refleje el comportamiento real.
grant select, insert, update, delete on all tables in schema public to authenticated;
grant select, insert on all tables in schema public to anon;
