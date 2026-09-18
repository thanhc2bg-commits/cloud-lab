# Câu 51
FROM node:24-alpine

# Câu 52
WORKDIR /app

# Câu 53
COPY package.json package-lock.json ./

# Câu 54
RUN npm install

# Câu 55
COPY . .

# Câu 56
RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
