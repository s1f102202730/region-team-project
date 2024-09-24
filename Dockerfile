FROM node:18-alpine

# 必要なビルドツールとgitをインストール
RUN apk add --no-cache g++ make py3-pip git

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonを先にコピー
COPY package*.json ./

# npmのバージョンをアップグレードし、依存関係をインストール
RUN npm install -g npm@9.7.2

# @next-auth/prisma-adapterと@prisma/clientをインストール
RUN npm install @next-auth/prisma-adapter@^1.0.7 @prisma/client@^5.19.1

# 依存関係のインストール（--legacy-peer-depsは必要に応じて）
RUN npm install --legacy-peer-deps

# 残りのアプリケーションコードをコピー
COPY ./ /app/

# アプリケーションの起動
CMD ["npm", "run", "dev"]
