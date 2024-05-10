const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client'); 

const prisma = new PrismaClient(); 
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(bodyParser.json());



app.get('/role', async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
