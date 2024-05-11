const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/authenticateToken');
const prisma = new PrismaClient();
const router = express.Router();


router.get('/', authenticateToken, async (req, res) => {
  try {
    const cabang = await prisma.cabang.findMany({
        where: {
          deleted_at: null 
        }
      });
    res.json(cabang);
  } catch (error) {
    console.error('Error fetching cabang:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const cabang = await prisma.cabang.findUnique({
      where: { id: parseInt(id), deleted_at: null  }
    });
    if (!cabang) {
      return res.status(404).json({ error: 'cabang not found' });
    }
    res.json(cabang);
  } catch (error) {
    console.error('Error fetching cabang:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/', authenticateToken, async (req, res) => {
  const { name } = req.body;
  try {
    const newCabang = await prisma.cabang.create({
      data: { name }
    });
    res.status(201).json(newCabang);
  } catch (error) {
    console.error('Error creating cabang:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedCabang = await prisma.cabang.update({
      where: { id: parseInt(id) },
      data: { name }
    });
    res.json(updatedCabang);
  } catch (error) {
    console.error('Error updating cabang:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCabang = await prisma.cabang.update({
      where: { id: parseInt(id) },
      data: {
        deleted_at: new Date(), 
        deleted_by: 1           
      }
    });
    res.json({ message: 'Cabang deleted successfully', deletedCabang });
  } catch (error) {
    console.error('Error deleting cabang:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
