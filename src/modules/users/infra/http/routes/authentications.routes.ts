import { Router } from 'express';
import AuthenticationsController from '../controllers/AuthenticationsController';

const authenticationsRouter = Router();
const authenticationsController = new AuthenticationsController();

authenticationsRouter.post('/', authenticationsController.create);

export default authenticationsRouter;
