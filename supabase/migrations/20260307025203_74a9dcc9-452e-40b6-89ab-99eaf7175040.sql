
INSERT INTO public.user_roles (user_id, role) VALUES ('047d7b31-de4b-47fe-af72-d0f34ff7bff8', 'admin');

-- Also approve the admin user's access
UPDATE public.user_access SET status = 'approved' WHERE user_id = '047d7b31-de4b-47fe-af72-d0f34ff7bff8';
