# ベースイメージとしてNode.js 18を使用
FROM node:18

# 必要なビルドツールとgitをインストール
RUN apt-get update && apt-get install -y \
    g++ \
    make \
    python3-pip \
    git \
    libssl-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリを設定
WORKDIR /app

# PATH 環境変数を設定してローカルにインストールされたコマンドを使えるようにする
ENV PATH="/app/node_modules/.bin:$PATH"

# package.jsonとpackage-lock.jsonを先にコピー
COPY package*.json ./

# npmのバージョンをアップグレードし、依存関係をインストール
RUN npm install -g npm@9.7.2
RUN npm install --legacy-peer-deps

# 残りのアプリケーションコードをコピー
COPY . .

# Prismaの設定を適用
RUN npx prisma generate

# アプリケーションのポートを公開
EXPOSE 3000
EXPOSE 5555

# 開発モードでアプリケーションを起動
CMD ["npm", "run", "dev"]
