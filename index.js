// index.js

const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, User } = require('./models'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());


app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

sequelize.sync() 
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(`Failed to sync models: ${err.message}`);
    process.exit(1);
  });
