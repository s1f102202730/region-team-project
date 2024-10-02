DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL NOT NULL,                    -- ID
    username TEXT NOT NULL UNIQUE,         -- ユーザー名（ユニーク制約付き）
    password TEXT NOT NULL,                -- パスワード
    role TEXT NOT NULL,                    -- ロール（例: 管理者、ユーザーなど）
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- 作成日時（デフォルト値付き）
    PRIMARY KEY (id)
);
