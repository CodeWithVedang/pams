-- 1. Insert the specific user first (if not already created via UI)
-- Note: ON CONFLICT is used to safely run this multiple times without erroring
INSERT INTO public.users (id, username, password, name)
VALUES (
    '532c33d2-875e-4451-837f-ccc49ff5aecb', 
    'vedangs', 
    'Test@123', 
    'Vedang S.'
)
ON CONFLICT (username) DO NOTHING;

-- 2. Insert robust realistic habits for this user
INSERT INTO public.habits (id, user_id, name, category, completed, last_completed, streak)
VALUES 
(
    gen_random_uuid(),
    '532c33d2-875e-4451-837f-ccc49ff5aecb',
    'Morning Meditation',
    'Mindfulness',
    ARRAY['2026-03-24', '2026-03-25', '2026-03-27', '2026-03-28'],
    '2026-03-28',
    2
),
(
    gen_random_uuid(),
    '532c33d2-875e-4451-837f-ccc49ff5aecb',
    'Drink 2L Water',
    'Health',
    ARRAY['2026-03-22', '2026-03-23', '2026-03-24', '2026-03-25', '2026-03-26', '2026-03-27', '2026-03-28'],
    '2026-03-28',
    7
),
(
    gen_random_uuid(),
    '532c33d2-875e-4451-837f-ccc49ff5aecb',
    'Evening Yoga',
    'Fitness',
    ARRAY['2026-03-25', '2026-03-27'],
    '2026-03-27',
    1
),
(
    gen_random_uuid(),
    '532c33d2-875e-4451-837f-ccc49ff5aecb',
    'Read 20 Pages',
    'Knowledge',
    ARRAY['2026-03-21', '2026-03-22', '2026-03-23', '2026-03-25', '2026-03-26', '2026-03-28'],
    '2026-03-28',
    1
),
(
    gen_random_uuid(),
    '532c33d2-875e-4451-837f-ccc49ff5aecb',
    'Deep Work Focus',
    'Productivity',
    ARRAY['2026-03-23', '2026-03-24', '2026-03-25', '2026-03-26', '2026-03-27'],
    '2026-03-27',
    5
);
