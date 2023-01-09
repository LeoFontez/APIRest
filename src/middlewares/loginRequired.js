import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  // checando se a chave authorization existe
  const { authorization } = req.headers;

  // se nao tiver nada no authorization
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login necessário.'],
    });
  }

  const [, token] = authorization.split(' ');

  // checando se token é valido
  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
