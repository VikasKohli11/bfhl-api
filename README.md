<<<<<<< HEAD
# BFHL API – Chitkara University Qualifier 2026

This project implements the required REST APIs for the Chitkara University Qualifier Task.

## 🚀 Tech Stack
- Node.js
- Express.js
- Axios
- Google Gemini API

---

## 📌 API Endpoints

### 1️⃣ GET /health
Health check endpoint.

**Response**
```json

```

---

### 2️⃣ POST /bfhl
Processes exactly one of the following keys per request:
- `fibonacci`
- `prime`
- `lcm`
- `hcf`
- `AI`

#### Fibonacci
**Request**
```json
{ "fibonacci": 7 }
```

**Response**
```json
{
  "is_success": true,
  "official_email": "your@chitkarauniversity.edu.in",
  "data": [0,1,1,2,3,5,8]
}
```

#### Prime
```json
{ "prime": [2,4,7,9,11] }
```

#### LCM
```json
{ "lcm": [12,18,24] }
```

#### HCF
```json
{ "hcf": [24,36,60] }
```

#### AI
```json
{ "AI": "What is the capital of Maharashtra?" }
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
OFFICIAL_EMAIL=your@chitkarauniversity.edu.in
GEMINI_API_KEY=your_gemini_api_key
```

---

## ▶️ Run Locally

```bash
npm install
npm start
```

Server will run at:
```
http://localhost:3000
```

---

## 🌐 Deployment

This API can be deployed on:
- Render
- Railway
- Vercel



## ✅ Notes
- Only one key is allowed per POST request.
- Proper HTTP status codes are returned.
- Input validation and error handling are implemented.
- External AI integration using Google Gemini.
# bfhl-api
bfhl-api commands 

