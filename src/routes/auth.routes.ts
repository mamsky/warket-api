import express from 'express';
import { authCheck, login, register } from '../controllers/users.controllers';
import { userCheck } from '../middlewares/auth.middlewares';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/auth-check', userCheck, authCheck);

export default router;
