import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

const EMAIL = process.env.OFFICIAL_EMAIL;



const isPrime = (n) => {
  if (n <= 1) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
};

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);



app.get("/health", (req, res) => {
  return res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});



app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;


    if (!body || typeof body !== "object") {
      return res.status(400).json({
        is_success: false,
        error: "Invalid JSON body"
      });
    }

    const keys = Object.keys(body);
    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        error: "Exactly one key is required"
      });
    }

    const key = keys[0];
    const value = body[key];
    let result;

    if (key === "fibonacci") {
      if (!Number.isInteger(value) || value < 0) {
        return res.status(400).json({
          is_success: false,
          error: "Fibonacci input must be a non-negative integer"
        });
      }

      const fib = [];
      let a = 0, b = 1;
      for (let i = 0; i < value; i++) {
        fib.push(a);
        [a, b] = [b, a + b];
      }
      result = fib;
    }

    else if (key === "prime") {
      if (!Array.isArray(value)) {
        return res.status(400).json({
          is_success: false,
          error: "Prime input must be an array"
        });
      }

      result = value.filter(
        (n) => Number.isInteger(n) && isPrime(n)
      );
    }

   
    else if (key === "lcm") {
      if (!Array.isArray(value) || value.length === 0) {
        return res.status(400).json({
          is_success: false,
          error: "LCM input must be a non-empty array"
        });
      }

      result = value.reduce((acc, n) => lcm(acc, n));
    }

    else if (key === "hcf") {
      if (!Array.isArray(value) || value.length === 0) {
        return res.status(400).json({
          is_success: false,
          error: "HCF input must be a non-empty array"
        });
      }

      result = value.reduce((acc, n) => gcd(acc, n));
    }

    else if (key === "AI") {
      if (typeof value !== "string" || value.trim() === "") {
        return res.status(400).json({
          is_success: false,
          error: "AI input must be a string"
        });
      }

      try {
        const geminiRes = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [{ text: value }]
              }
            ]
          }
        );

       
        result =
          geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text
          || "No response from AI";

      } catch (aiErr) {
        console.error("Gemini error:", aiErr.response?.data || aiErr.message);
        result = "AI service unavailable";
      }
    }


    else {
      return res.status(400).json({
        is_success: false,
        error: "Invalid key"
      });
    }

  
    return res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data: result
    });

  } catch (err) {
    console.error("Server error:", err.message);
    return res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

