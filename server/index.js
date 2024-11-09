const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors')
// Инициализация приложения Express
const app = express();
app.use(express.json());
app.use(cors())

mongoose
  .connect('mongodb+srv://admin:wwwwww@cluster0.weppimj.mongodb.net/esf?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('DB connection successful'))
  .catch((err) => console.log('DB connection error:', err));


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  basket : {type :Array , require : true , default : [] }
});

const User = mongoose.model('User', userSchema);

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  items: [{ 
      name: String,
      price: Number,
      quantity: Number,
      photo: String
  }],
  purchaseDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);


app.post('/basket/:email' , async(req , res )=>{
    try {
        const {product } = req.body
        const {email } = req.params
        const user = await User.findOne({ email });

        if (!user) {
            return  res.status(400).json({ message: 'Пользователь не найден' });
        }
        user.basket.push(product)
        await user.save()
        res.status(200).json({ message: 'Товар добавлен в корзину', basket: user.basket });
    } catch (err) {
        res.send(err)
    }
})

app.get('/basket/:email' , async(req , res )=>{
    try {
        const {email } = req.params
        const user = await User.findOne({ email });

        if (!user) {
            return  res.status(400).json({ message: 'Пользователь не найден' });
        }
 
        res.status(200).json({  basket: user.basket });
    } catch (err) {
        res.status(500).json({message : err})
    }
})

app.delete('/basket/:email/:code', async (req, res) => {
  const { email, code } = req.params;
  const user = await User.findOne({ email });

  user.basket = user.basket.filter(item => item.code.toString() !== code);
  await user.save();
  res.status(200).json({ message: 'Item deleted', basket: user.basket });
});


app.post('/orders', async (req, res) => {
  const { userEmail, items } = req.body;

  const order = new Order({
      userEmail,
      items
  });

  await order.save();

  const user = await User.findOne({ email: userEmail });
  user.basket = [];
  await user.save();

  res.status(201).json({ message: 'Order placed successfully' });
});
app.post('/register', async (req, res) => {
  try {
    const { email, name, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      name,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Вход пользователя
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user: { email: user.email, name: user.name, phone: user.phone } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
