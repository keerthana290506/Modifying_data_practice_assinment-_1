const express=require('express')

const { resolve } = require('path');

const mongoose = require('mongoose');
const router = express.Router();
const menuItem = require('./static/Schema');
require('dotenv').config({path:'./static/.env'})
const connectDB = require('./static/db');
console.log('MongoDB URL:', process.env.db_url);  // Debugging line


const app = express()
const port = 3011;


const url=process.env.db_url;
app.use(express.json());



app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.post('/menu', async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  try {
    const newMenuItem = new menuItem({ name, description, price });
    await newMenuItem.save();
    res.status(201).json({
      message: 'Menu item created successfully',
      menuItem: newMenuItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating menu item' });
  }




});

app.get('/menu', async (req, res) => {
  try {
    const menuItems = await menuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching menu items' });
  }
});


app.listen(port, async() => {
await connectDB(url);
  console.log(`Example app listening at http://localhost:${port}`);
});
