require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.send(text);
    } catch (error) {
        res.status(500).send("Error generating text");
    }
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
