import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const VerifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("This Is The Header That Came",authHeader);
  if (!authHeader || !authHeader.startsWith('bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default VerifyToken;
