const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
 
const app = express();
const port = 4000;
 
app.use(cors());
app.use(bodyParser.json());
 
const users = [];
 
// Endpoint for user login
app.post('/login', (req, res) => {
const { email, password } = req.body;
const user = users.find(u => u.email === email && u.password === password);
 
if (user) {
const token = jwt.sign({ userId: user.id, email: user.email }, 'your_secret_key', { expiresIn: '60' });
 
res.json({ token });
} else {
res.status(401).json({ error: 'Invalid credentials' });
}
});
 
 
app.post('/register', (req, res) => {
const newUser = req.body;
 
// Validate the input (you may want to add more validation)
if (!newUser || !newUser.email || !newUser.password) {
return res.status(400).json({ error: 'Invalid registration data' });
}
 
// Check if the user already exists
const existingUser = users.find(user => user.email === newUser.email);
if (existingUser) {
return res.status(400).json({ error: 'User already exists' });
}
 
// Add the new user to the array
users.push(newUser);
 
res.status(201).json({ message: 'Registration successful', user: newUser });
});
 
// Get all registered users (for demonstration purposes only)
app.get('/users', (req, res) => {
res.json(users);
});
 
 
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});