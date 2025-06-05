-- Image Generations Table
CREATE TABLE IF NOT EXISTS image_generations (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(64),
  session_id INTEGER REFERENCES chat_sessions(id),
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  model VARCHAR(64), -- 'gpt-4-vision', 'replicate', 'fal'
  provider VARCHAR(32), -- 'openai', 'replicate', 'fal'
  status VARCHAR(32), -- 'pending', 'completed', 'failed'
  duration_ms INTEGER,
  file_size_bytes INTEGER,
  width INTEGER,
  height INTEGER,
  meta JSONB
);

-- Video Generations Table
CREATE TABLE IF NOT EXISTS video_generations (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(64),
  session_id INTEGER REFERENCES chat_sessions(id),
  prompt TEXT NOT NULL,
  video_url TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  model VARCHAR(64), -- 'replicate-video', 'fal-video'
  provider VARCHAR(32), -- 'replicate', 'fal'
  status VARCHAR(32), -- 'pending', 'completed', 'failed'
  duration_ms INTEGER, -- generation time
  video_duration_seconds FLOAT, -- actual video length
  file_size_bytes INTEGER,
  width INTEGER,
  height INTEGER,
  fps INTEGER,
  meta JSONB
);

-- Audio Generations Table
CREATE TABLE IF NOT EXISTS audio_generations (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(64),
  session_id INTEGER REFERENCES chat_sessions(id),
  prompt TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  model VARCHAR(64), -- 'openai-tts', 'replicate-audio', 'fal-audio'
  provider VARCHAR(32), -- 'openai', 'replicate', 'fal'
  status VARCHAR(32), -- 'pending', 'completed', 'failed'
  duration_ms INTEGER, -- generation time
  audio_duration_seconds FLOAT, -- actual audio length
  file_size_bytes INTEGER,
  voice VARCHAR(32), -- for TTS models
  meta JSONB
);

-- Chat Sessions Table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(64),
  started_at TIMESTAMP NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMP,
  duration_ms INTEGER,
  num_messages INTEGER DEFAULT 0,
  num_images_generated INTEGER DEFAULT 0,
  num_videos_generated INTEGER DEFAULT 0,
  num_audio_generated INTEGER DEFAULT 0,
  total_generations INTEGER DEFAULT 0,
  session_type VARCHAR(32) DEFAULT 'chat', -- 'chat', 'voice', 'api'
  meta JSONB
);

-- User Interactions Table
CREATE TABLE IF NOT EXISTS user_interactions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(64),
  session_id INTEGER REFERENCES chat_sessions(id),
  type VARCHAR(32) NOT NULL, -- 'message', 'image_generation', 'video_generation', 'audio_generation', 'error'
  content TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  interaction_duration_ms INTEGER,
  meta JSONB
);

-- Daily Analytics Summary Table (for performance)
CREATE TABLE IF NOT EXISTS daily_analytics (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  total_users INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  total_images INTEGER DEFAULT 0,
  total_videos INTEGER DEFAULT 0,
  total_audio INTEGER DEFAULT 0,
  total_generations INTEGER DEFAULT 0,
  avg_session_duration_ms INTEGER DEFAULT 0,
  top_models JSONB, -- {"gpt-4-vision": 45, "replicate": 32}
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Optional: Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  external_id VARCHAR(64) UNIQUE,
  email VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  last_active_at TIMESTAMP,
  total_generations INTEGER DEFAULT 0,
  preferred_models JSONB
);

-- Indexes for analytics performance
CREATE INDEX IF NOT EXISTS idx_image_generations_user_id ON image_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_image_generations_created_at ON image_generations(created_at);
CREATE INDEX IF NOT EXISTS idx_image_generations_model ON image_generations(model);
CREATE INDEX IF NOT EXISTS idx_image_generations_provider ON image_generations(provider);
CREATE INDEX IF NOT EXISTS idx_image_generations_status ON image_generations(status);

CREATE INDEX IF NOT EXISTS idx_video_generations_user_id ON video_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_video_generations_created_at ON video_generations(created_at);
CREATE INDEX IF NOT EXISTS idx_video_generations_model ON video_generations(model);
CREATE INDEX IF NOT EXISTS idx_video_generations_provider ON video_generations(provider);

CREATE INDEX IF NOT EXISTS idx_audio_generations_user_id ON audio_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_audio_generations_created_at ON audio_generations(created_at);
CREATE INDEX IF NOT EXISTS idx_audio_generations_model ON audio_generations(model);
CREATE INDEX IF NOT EXISTS idx_audio_generations_provider ON audio_generations(provider);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_started_at ON chat_sessions(started_at);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_session_type ON chat_sessions(session_type);

CREATE INDEX IF NOT EXISTS idx_user_interactions_user_id ON user_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_session_id ON user_interactions(session_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_type ON user_interactions(type);
CREATE INDEX IF NOT EXISTS idx_user_interactions_created_at ON user_interactions(created_at);

CREATE INDEX IF NOT EXISTS idx_daily_analytics_date ON daily_analytics(date); 