-- Seed Analytics Data
-- This script populates the database with realistic dummy data for testing analytics

-- Clear existing data (optional - remove in production)
-- TRUNCATE TABLE user_interactions, audio_generations, video_generations, image_generations, chat_sessions, users, daily_analytics RESTART IDENTITY CASCADE;

-- Insert dummy users
INSERT INTO users (external_id, email, created_at, last_active_at, total_generations) VALUES
('user_001', 'alice@example.com', NOW() - INTERVAL '180 days', NOW() - INTERVAL '1 day', 45),
('user_002', 'bob@example.com', NOW() - INTERVAL '150 days', NOW() - INTERVAL '2 days', 32),
('user_003', 'charlie@example.com', NOW() - INTERVAL '120 days', NOW() - INTERVAL '1 hour', 67),
('user_004', 'diana@example.com', NOW() - INTERVAL '90 days', NOW() - INTERVAL '3 days', 23),
('user_005', 'eve@example.com', NOW() - INTERVAL '60 days', NOW() - INTERVAL '5 hours', 89),
('user_006', 'frank@example.com', NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 minutes', 156),
('user_007', 'grace@example.com', NOW() - INTERVAL '15 days', NOW() - INTERVAL '2 hours', 78),
('user_008', 'henry@example.com', NOW() - INTERVAL '7 days', NOW() - INTERVAL '1 day', 34);

-- Insert chat sessions across the last 6 months
INSERT INTO chat_sessions (user_id, started_at, ended_at, duration_ms, num_messages, num_images_generated, num_videos_generated, num_audio_generated, total_generations, session_type) VALUES
-- January sessions
('user_001', NOW() - INTERVAL '180 days', NOW() - INTERVAL '180 days' + INTERVAL '15 minutes', 900000, 12, 3, 1, 0, 4, 'chat'),
('user_002', NOW() - INTERVAL '175 days', NOW() - INTERVAL '175 days' + INTERVAL '8 minutes', 480000, 6, 2, 0, 1, 3, 'chat'),
('user_003', NOW() - INTERVAL '170 days', NOW() - INTERVAL '170 days' + INTERVAL '22 minutes', 1320000, 18, 5, 2, 1, 8, 'chat'),

-- February sessions
('user_001', NOW() - INTERVAL '150 days', NOW() - INTERVAL '150 days' + INTERVAL '12 minutes', 720000, 10, 4, 1, 0, 5, 'chat'),
('user_002', NOW() - INTERVAL '145 days', NOW() - INTERVAL '145 days' + INTERVAL '18 minutes', 1080000, 15, 6, 2, 2, 10, 'voice'),
('user_004', NOW() - INTERVAL '140 days', NOW() - INTERVAL '140 days' + INTERVAL '6 minutes', 360000, 4, 1, 0, 0, 1, 'chat'),

-- March sessions
('user_003', NOW() - INTERVAL '120 days', NOW() - INTERVAL '120 days' + INTERVAL '25 minutes', 1500000, 20, 7, 2, 1, 10, 'chat'),
('user_005', NOW() - INTERVAL '115 days', NOW() - INTERVAL '115 days' + INTERVAL '14 minutes', 840000, 11, 3, 1, 2, 6, 'voice'),

-- April sessions
('user_006', NOW() - INTERVAL '90 days', NOW() - INTERVAL '90 days' + INTERVAL '30 minutes', 1800000, 25, 8, 3, 2, 13, 'chat'),
('user_007', NOW() - INTERVAL '85 days', NOW() - INTERVAL '85 days' + INTERVAL '16 minutes', 960000, 13, 4, 1, 1, 6, 'chat'),

-- May sessions
('user_005', NOW() - INTERVAL '60 days', NOW() - INTERVAL '60 days' + INTERVAL '20 minutes', 1200000, 16, 5, 2, 3, 10, 'voice'),
('user_008', NOW() - INTERVAL '55 days', NOW() - INTERVAL '55 days' + INTERVAL '10 minutes', 600000, 8, 2, 1, 0, 3, 'chat'),

-- June sessions (recent)
('user_006', NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days' + INTERVAL '35 minutes', 2100000, 28, 10, 4, 3, 17, 'chat'),
('user_007', NOW() - INTERVAL '25 days', NOW() - INTERVAL '25 days' + INTERVAL '18 minutes', 1080000, 14, 5, 2, 2, 9, 'voice'),
('user_008', NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days' + INTERVAL '12 minutes', 720000, 9, 3, 1, 1, 5, 'chat'),
('user_003', NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days' + INTERVAL '28 minutes', 1680000, 22, 8, 3, 2, 13, 'chat'),
('user_001', NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days' + INTERVAL '15 minutes', 900000, 12, 4, 1, 1, 6, 'voice'),
('user_002', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days' + INTERVAL '22 minutes', 1320000, 17, 6, 2, 2, 10, 'chat');

-- Insert image generations
INSERT INTO image_generations (user_id, session_id, prompt, image_url, created_at, model, provider, status, duration_ms, file_size_bytes, width, height) VALUES
-- January images
('user_001', 1, 'A futuristic cityscape at sunset', 'https://blob.vercel-storage.com/img1.jpg', NOW() - INTERVAL '180 days', 'gpt-4-vision', 'openai', 'completed', 2300, 1024000, 1024, 1024),
('user_001', 1, 'Abstract art with vibrant colors', 'https://blob.vercel-storage.com/img2.jpg', NOW() - INTERVAL '180 days', 'gpt-4-vision', 'openai', 'completed', 1800, 896000, 1024, 1024),
('user_002', 2, 'Mountain landscape photography', 'https://blob.vercel-storage.com/img3.jpg', NOW() - INTERVAL '175 days', 'replicate-sdxl', 'replicate', 'completed', 4200, 1536000, 1024, 1024),

-- February images
('user_001', 4, 'Portrait of a wise old wizard', 'https://blob.vercel-storage.com/img4.jpg', NOW() - INTERVAL '150 days', 'fal-flux', 'fal', 'completed', 3100, 1200000, 1024, 1024),
('user_002', 5, 'Cyberpunk street scene', 'https://blob.vercel-storage.com/img5.jpg', NOW() - INTERVAL '145 days', 'gpt-4-vision', 'openai', 'completed', 2100, 980000, 1024, 1024),
('user_002', 5, 'Steampunk mechanical device', 'https://blob.vercel-storage.com/img6.jpg', NOW() - INTERVAL '145 days', 'replicate-sdxl', 'replicate', 'completed', 3800, 1400000, 1024, 1024),

-- March images
('user_003', 7, 'Underwater coral reef scene', 'https://blob.vercel-storage.com/img7.jpg', NOW() - INTERVAL '120 days', 'gpt-4-vision', 'openai', 'completed', 2500, 1100000, 1024, 1024),
('user_005', 8, 'Space exploration artwork', 'https://blob.vercel-storage.com/img8.jpg', NOW() - INTERVAL '115 days', 'fal-flux', 'fal', 'completed', 2900, 1300000, 1024, 1024),

-- April images
('user_006', 9, 'Medieval castle on a hill', 'https://blob.vercel-storage.com/img9.jpg', NOW() - INTERVAL '90 days', 'gpt-4-vision', 'openai', 'completed', 2200, 1050000, 1024, 1024),
('user_007', 10, 'Modern architecture design', 'https://blob.vercel-storage.com/img10.jpg', NOW() - INTERVAL '85 days', 'replicate-sdxl', 'replicate', 'completed', 4100, 1450000, 1024, 1024),

-- May images
('user_005', 11, 'Fantasy forest with magical creatures', 'https://blob.vercel-storage.com/img11.jpg', NOW() - INTERVAL '60 days', 'fal-flux', 'fal', 'completed', 3200, 1250000, 1024, 1024),
('user_008', 12, 'Vintage car in desert', 'https://blob.vercel-storage.com/img12.jpg', NOW() - INTERVAL '55 days', 'gpt-4-vision', 'openai', 'completed', 1900, 920000, 1024, 1024),

-- June images (recent)
('user_006', 13, 'Tropical beach paradise', 'https://blob.vercel-storage.com/img13.jpg', NOW() - INTERVAL '30 days', 'gpt-4-vision', 'openai', 'completed', 2400, 1080000, 1024, 1024),
('user_007', 14, 'Urban street art mural', 'https://blob.vercel-storage.com/img14.jpg', NOW() - INTERVAL '25 days', 'fal-flux', 'fal', 'completed', 2800, 1200000, 1024, 1024),
('user_008', 15, 'Minimalist interior design', 'https://blob.vercel-storage.com/img15.jpg', NOW() - INTERVAL '20 days', 'replicate-sdxl', 'replicate', 'completed', 3900, 1350000, 1024, 1024);

-- Insert video generations
INSERT INTO video_generations (user_id, session_id, prompt, video_url, created_at, model, provider, status, duration_ms, video_duration_seconds, file_size_bytes, width, height, fps) VALUES
('user_001', 1, 'Time-lapse of city traffic', 'https://blob.vercel-storage.com/vid1.mp4', NOW() - INTERVAL '180 days', 'replicate-video', 'replicate', 'completed', 45000, 5.0, 15000000, 1280, 720, 30),
('user_003', 7, 'Ocean waves crashing on rocks', 'https://blob.vercel-storage.com/vid2.mp4', NOW() - INTERVAL '120 days', 'fal-video', 'fal', 'completed', 38000, 4.5, 12000000, 1280, 720, 24),
('user_006', 9, 'Dancing flames in fireplace', 'https://blob.vercel-storage.com/vid3.mp4', NOW() - INTERVAL '90 days', 'replicate-video', 'replicate', 'completed', 42000, 6.0, 18000000, 1280, 720, 30),
('user_005', 11, 'Flowing water in mountain stream', 'https://blob.vercel-storage.com/vid4.mp4', NOW() - INTERVAL '60 days', 'fal-video', 'fal', 'completed', 35000, 4.0, 11000000, 1280, 720, 24),
('user_006', 13, 'Clouds moving across sky', 'https://blob.vercel-storage.com/vid5.mp4', NOW() - INTERVAL '30 days', 'replicate-video', 'replicate', 'completed', 40000, 5.5, 16000000, 1280, 720, 30);

-- Insert audio generations
INSERT INTO audio_generations (user_id, session_id, prompt, audio_url, created_at, model, provider, status, duration_ms, audio_duration_seconds, file_size_bytes, voice) VALUES
('user_002', 5, 'Narration for a documentary', 'https://blob.vercel-storage.com/aud1.mp3', NOW() - INTERVAL '145 days', 'openai-tts', 'openai', 'completed', 3000, 30.0, 480000, 'alloy'),
('user_003', 7, 'Podcast introduction', 'https://blob.vercel-storage.com/aud2.mp3', NOW() - INTERVAL '120 days', 'openai-tts', 'openai', 'completed', 2500, 25.0, 400000, 'nova'),
('user_005', 8, 'Meditation guide voice', 'https://blob.vercel-storage.com/aud3.mp3', NOW() - INTERVAL '115 days', 'openai-tts', 'openai', 'completed', 4500, 45.0, 720000, 'shimmer'),
('user_005', 11, 'Story narration for children', 'https://blob.vercel-storage.com/aud4.mp3', NOW() - INTERVAL '60 days', 'openai-tts', 'openai', 'completed', 3800, 38.0, 608000, 'echo'),
('user_007', 14, 'Voice-over for presentation', 'https://blob.vercel-storage.com/aud5.mp3', NOW() - INTERVAL '25 days', 'openai-tts', 'openai', 'completed', 2800, 28.0, 448000, 'fable');

-- Insert user interactions
INSERT INTO user_interactions (user_id, session_id, type, content, created_at, interaction_duration_ms) VALUES
('user_001', 1, 'message', 'Hello, I need help creating an image', NOW() - INTERVAL '180 days', 1000),
('user_001', 1, 'image_generation', 'Generated: A futuristic cityscape at sunset', NOW() - INTERVAL '180 days', 2300),
('user_002', 2, 'message', 'Can you create a mountain landscape?', NOW() - INTERVAL '175 days', 800),
('user_002', 2, 'image_generation', 'Generated: Mountain landscape photography', NOW() - INTERVAL '175 days', 4200),
('user_003', 7, 'video_generation', 'Generated: Ocean waves crashing on rocks', NOW() - INTERVAL '120 days', 38000),
('user_005', 8, 'audio_generation', 'Generated: Meditation guide voice', NOW() - INTERVAL '115 days', 4500),
('user_006', 13, 'message', 'I want to create a tropical scene', NOW() - INTERVAL '30 days', 1200),
('user_006', 13, 'image_generation', 'Generated: Tropical beach paradise', NOW() - INTERVAL '30 days', 2400);

-- Insert daily analytics summary (last 30 days)
INSERT INTO daily_analytics (date, total_users, total_sessions, total_images, total_videos, total_audio, total_generations, avg_session_duration_ms, top_models) VALUES
(CURRENT_DATE - INTERVAL '30 days', 8, 18, 186, 80, 45, 311, 1200000, '{"gpt-4-vision": 45, "replicate": 32, "fal": 23}'),
(CURRENT_DATE - INTERVAL '29 days', 7, 16, 195, 75, 42, 312, 1150000, '{"gpt-4-vision": 48, "replicate": 30, "fal": 22}'),
(CURRENT_DATE - INTERVAL '28 days', 9, 20, 203, 82, 48, 333, 1300000, '{"gpt-4-vision": 52, "replicate": 35, "fal": 25}'),
(CURRENT_DATE - INTERVAL '27 days', 6, 14, 178, 68, 38, 284, 1100000, '{"gpt-4-vision": 42, "replicate": 28, "fal": 20}'),
(CURRENT_DATE - INTERVAL '26 days', 8, 19, 210, 88, 52, 350, 1250000, '{"gpt-4-vision": 55, "replicate": 38, "fal": 27}'),
(CURRENT_DATE - INTERVAL '25 days', 10, 22, 225, 95, 58, 378, 1400000, '{"gpt-4-vision": 60, "replicate": 42, "fal": 30}'),
(CURRENT_DATE - INTERVAL '24 days', 7, 15, 189, 72, 41, 302, 1080000, '{"gpt-4-vision": 46, "replicate": 31, "fal": 23}'),
(CURRENT_DATE - INTERVAL '23 days', 9, 21, 218, 92, 55, 365, 1320000, '{"gpt-4-vision": 58, "replicate": 40, "fal": 28}'),
(CURRENT_DATE - INTERVAL '22 days', 8, 18, 201, 85, 49, 335, 1200000, '{"gpt-4-vision": 53, "replicate": 36, "fal": 26}'),
(CURRENT_DATE - INTERVAL '21 days', 11, 25, 240, 102, 62, 404, 1500000, '{"gpt-4-vision": 65, "replicate": 45, "fal": 32}'); 