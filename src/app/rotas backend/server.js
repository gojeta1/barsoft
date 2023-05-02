const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('./users.json');
const cors = require('cors');
  
const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
  }));


function generateToken(user) {
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 });
    return token;
  }

function verifyPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !verifyPassword(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    return res.json({ token });
  })

// Rota protegida que só pode ser acessada com um token de autenticação válido
app.get('/protected', (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Missing authorization header' });
    }
    try {
      const decoded = jwt.verify(token, secret);
      const user = users.find(u => u.id === decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      return res.json({ message: 'Hello, ' + user.username + '!' });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  });