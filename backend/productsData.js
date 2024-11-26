require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const products = [
  { label: '#Honorary', productName: 'Dewdrop', varietal: 'Albariño', price: 75.00 },
  { label: 'Villa Maria', productName: 'Reserve Chardonnay 2021', varietal: 'Chardonnay', price: 175.00 },
  { label: 'Villa Maria', productName: 'EarthGarden Chardonnay 2022', varietal: 'Chardonnay', price: 75.00 },
  { label: 'Esk Valley', productName: 'Artisanal Grenache 2021', varietal: 'Grenache', price: 105.00 },
  { label: 'Esk Valley', productName: 'Heipipi The Terraces 2020', varietal: 'Malbec Merlot Cabernet Franc Syrah', price: 245.00 },
  { label: '#Honorary', productName: '20th Anniversary Wine', varietal: 'Marlborough Sauvignon Blanc', price: 85.00 },
  { label: '#Honorary', productName: 'A Punt Each Way', varietal: 'Merlot Cabernet', price: 85.00 },
  { label: 'Esk Valley', productName: 'Estate Merlot Cabernet Sauvignon Malbec 2022', varietal: 'Merlot Cabernet Sauvignon Malbec', price: 85.00 },
  { label: 'Esk Valley', productName: 'River Gravel Merlot Malbec Cabernet Sauvignon 2019', varietal: 'Merlot Malbec Cabernet Sauvignon', price: 120.00 },
  { label: 'Villa Maria', productName: 'Cellar Selection Pinot Gris 2023', varietal: 'Pinot Gris', price: 80.00 },
  { label: '#Honorary', productName: 'Rangimārie', varietal: 'Pinot Gris', price: 75.00 },
  { label: 'Villa Maria', productName: 'Private Bin Pinot Gris 2023', varietal: 'Pinot Gris', price: 70.00 },
  { label: '#Honorary', productName: 'JK.14 | Limited Edition', varietal: 'Pinot Noir', price: 120.00 },
  { label: 'Villa Maria', productName: 'Single Vineyard Taylors Pass Pinot Noir 2018', varietal: 'Pinot Noir', price: 110.00 },
  { label: 'Villa Maria', productName: 'Reserve Pinot Noir 2022', varietal: 'Pinot Noir', price: 110.00 },
  { label: 'Villa Maria', productName: 'Library Release Reserve Pinot Noir 2017', varietal: 'Pinot Noir', price: 105.00 },
  { label: '#Honorary', productName: 'Serendipity', varietal: 'Pinot Noir', price: 85.00 },
  { label: '#Honorary', productName: 'Block N52', varietal: 'Platinum Barrel Aged Sauvignon Blanc', price: 85.00 },
  { label: '#Honorary', productName: 'The Renegade', varietal: 'Platinum Chardonnay', price: 95.00 },
  { label: '#Honorary', productName: 'Le Quinze', varietal: 'Platinum Chardonnay', price: 95.00 },
  { label: '#Honorary', productName: 'Tōhi', varietal: 'Platinum Chardonnay', price: 95.00 },
  { label: '#Honorary', productName: 'The Crater', varietal: 'Platinum Chardonnay', price: 95.00 },
  { label: '#Honorary', productName: 'Beautiful Darkness', varietal: 'Platinum Pinot Noir', price: 95.00 },
  { label: '#Honorary', productName: 'MadeMosel', varietal: 'Riesling', price: 75.00 },
  { label: 'Villa Maria', productName: 'Private Bin Riesling 2023', varietal: 'Riesling', price: 70.00 },
  { label: '#Honorary', productName: 'Flower Study', varietal: 'Rosè', price: 75.00 },
  { label: 'Villa Maria', productName: 'Private Bin Rosè 2023', varietal: 'Rosè', price: 70.00 },
  { label: '#Honorary', productName: 'Marlborough 20th Anniversary Wine', varietal: 'Sauvignon Blanc', price: 85.00 },
  { label: 'Villa Maria', productName: 'Private Bin Sauvignon Blanc 2023', varietal: 'Sauvignon Blanc', price: 70.00 },
  { label: 'Villa Maria', productName: 'Blush Sauvignon 2022', varietal: 'Sauvignon Blanc', price: 70.00 },
  { label: 'Mixed', productName: 'Holiday Host Pack', varietal: 'Esk Valley Rosé 2023\nLeftfield Albariño 2023\nVilla Maria Private Bin Pinot Gris 2023\nEsk Valley Gamay Noir 2022\nVilla Maria Cellar Selection Pinot Noir 2022\nVilla Maria Reserve Chardonnay 2021', price: 100.00 },
  { label: 'Mixed', productName: 'Holiday Festive Pack', varietal: 'Blush Sauvignon 2022\nPrivate Bin Rose 2023\nCellar Selection Pinot Gris 2023\nCellar Selection Chardonnay 2023\nEarthGarden Sauvignon Blanc 2023\nReserve Pinot Noir 2017', price: 84.50 },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Product list updated successfully!');
    process.exit();
  } catch (error) {
    console.error('Error updating product list:', error);
    process.exit(1);
  }
};

importData();
