const express = require('express');
const bodyParser = require('body-parser');
const roleRoutes = require('./routes/roleRoutes');
const cabangRoutes = require('./routes/cabangRoutes');
const karyawanRoutes = require('./routes/karyawanRoutes');
const userAuthRoutes = require('./routes/userAuthRoutes');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use('/roles', roleRoutes);
app.use('/cabang', cabangRoutes);
app.use('/karyawan', karyawanRoutes);
app.use('/auth', userAuthRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});
