import { Router } from 'express';
import AgentController from '../controllers/AgentController';

const router = Router();

router.post('/register', AgentController.register);
router.post('/login', AgentController.login);


export default router;