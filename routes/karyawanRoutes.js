const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const karyawanList = await prisma.karyawan.findMany({
      where: {
        deleted_at: null 
      },
      include: {
        users: { 
          include: {
            role: true,
            cabang: true
          }
        }
      }
    });

    res.json(karyawanList);
  } catch (error) {
    console.error('Error fetching karyawan:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const karyawan = await prisma.karyawan.findUnique({
      where: {
        id: parseInt(id),
        deleted_at: null 
      },
      include: {
        users: { 
          include: {
            role: true,
            cabang: true
          }
        }
      }
    });

    if (!karyawan) {
      return res.status(404).json({ error: 'Karyawan not found' });
    }

    res.json(karyawan);
  } catch (error) {
    console.error('Error fetching karyawan:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.post('/', async (req, res) => {
  const { email, password, name, phone, photo, roleId, cabangId } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newKaryawan = await prisma.karyawan.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        photo,
        created_at: new Date(),
        created_by: 1
      }
    });

    const newUser = await prisma.user.create({
      data: {
        role: { connect: { id: roleId } },
        cabang: { connect: { id: cabangId } },
        karyawan: { connect: { id: newKaryawan.id } }, 
        is_karyawan: true,
        created_at: new Date(),
        created_by: 1
      }
    });

    res.status(201).json(newKaryawan);
  } catch (error) {
    console.error('Error creating karyawan:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, password, name, phone, photo, roleId, cabangId } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedKaryawan = await prisma.karyawan.update({
      where: { id: parseInt(id) },
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        photo
      }
    });

    const user = await prisma.user.findFirst({
      where: { karyawanId: parseInt(id) }
    });

    if (user) {

      const updatedUser = await prisma.user.update({
        where: { id: user.id }, 
        data: {
          role: { connect: { id: roleId } },
          cabang: { connect: { id: cabangId } }
        }
      });
    }

    res.json(updatedKaryawan);
  } catch (error) {
    console.error('Error updating karyawan:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {

    const deletedKaryawan = await prisma.karyawan.update({
      where: { id: parseInt(id) },
      data: {
        deleted_at: new Date(),
        deleted_by: 1
      }
    });

    const user = await prisma.user.findFirst({
      where: { karyawanId: parseInt(id) }
    });

    const deletedUser = await prisma.user.update({
      where: { id: user.id },  
      data: {
        deleted_at: new Date(),
        deleted_by: 1
      }
    });

    res.json({ message: 'Karyawan deleted successfully', deletedKaryawan });
  } catch (error) {
    console.error('Error deleting karyawan:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;
