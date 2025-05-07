import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
// hada houwa le middleware d'authentification inclut une fonction pour restreindre l'accès aux administrateurs
/* import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Middleware pour protéger les routes
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    
    // Vérifier si le token est présent dans les headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Vous n\'êtes pas connecté. Veuillez vous connecter pour accéder à cette ressource.' });
    }
    
    // Vérifier le token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    
    // Vérifier si l'utilisateur existe toujours
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ message: 'L\'utilisateur associé à ce token n\'existe plus.' });
    }
    
    // Ajouter l'utilisateur à la requête
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Non autorisé. Veuillez vous reconnecter.' });
  }
};

// Middleware pour restreindre l'accès à certains rôles
export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Vous n\'avez pas la permission d\'effectuer cette action' 
      });
    }
    next();
  };
}; */