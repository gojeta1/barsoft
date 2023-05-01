const express = require('express');
const jwt = require('jsonwebtoken');


const app = express();

app.use(cors({
    origin: 'http://localhost:3000/login'
  }));

app.use(bodyParser.json());

const secretKey = 'my-secret-key';

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = require('./users.json');
  const user = users.users.find(u => u.username === username && u.password === password );

  if (!user) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos' });
  }

  const token = jwt.sign({ username }, secretKey);

  return res.status(200).json({ token });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});