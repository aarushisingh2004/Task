FROM node:18

WORKDIR /app

COPY package*.json ./

# ✅ Set stable npm mirror to avoid 503s
RUN npm config set registry https://registry.npmmirror.com

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
