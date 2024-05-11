const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/authenticateToken');

const prisma = new PrismaClient();
const router = express.Router();


router.get('/', authenticateToken, async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      where: {
        deleted_at: null 
      }
    });
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const role = await prisma.role.findUnique({
      where: { id: parseInt(id), deleted_at: null  }
    });
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    console.error('Error fetching role:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/', authenticateToken, async (req, res) => {
  const { name } = req.body;
  try {
    const newRole = await prisma.role.create({
      data: { name }
    });
    res.status(201).json(newRole);
  } catch (error) {
    console.error('Error creating role:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedRole = await prisma.role.update({
      where: { id: parseInt(id) },
      data: { name }
    });
    res.json(updatedRole);
  } catch (error) {
    console.error('Error updating role:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRole = await prisma.role.update({
      where: { id: parseInt(id) },
      data: {
        deleted_at: new Date(), 
        deleted_by: 1           
      }
    });
    res.json({ message: 'Role deleted successfully', deletedRole });
  } catch (error) {
    console.error('Error deleting role:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
