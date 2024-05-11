const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const router = express.Router();



router.post('/login', async (req, res) => {
    const { email, phone, password } = req.body;
  
    try {

        const orConditions = [];
        if (email) {
            orConditions.push({ email });
        }
        if (phone) {
            orConditions.push({ phone });
        }
        
        if (orConditions.length === 0) {
            return res.status(400).json({ error: 'Email or phone is required' });
        }

        const karyawan = await prisma.karyawan.findFirst({
            where: {
            OR: orConditions
            }
        });
      
      if (!karyawan || !bcrypt.compareSync(password, karyawan.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const user = await prisma.user.findFirst({
        where: { karyawanId: karyawan.id }
      });
  
      if (!user || !user.id) {
        return res.status(401).json({ error: 'User not found or invalid' });
      }
  
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  




module.exports = router;
