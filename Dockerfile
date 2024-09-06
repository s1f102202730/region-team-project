FROM node:18-alpine

# 必要なビルドツールとgitをインストール
RUN apk add --no-cache g++ make py3-pip git

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonを先にコピー
COPY package*.json ./

# npmのバージョンをアップグレードし、依存関係をインストール
RUN npm install -g npm@9.7.2 node-gyp
RUN npm install --legacy-peer-deps

# 残りのアプリケーションコードをコピー
COPY ./ /app/

# 明示的にopenaiモジュールを再インストール
RUN npm install openai

# アプリケーションの起動
CMD ["npm", "run", "dev"]
