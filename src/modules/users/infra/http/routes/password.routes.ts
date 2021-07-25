import { Router } from 'express';
import PasswordController from '../controllers/PasswordController';

const passwordRouter = Router();
const authenticationsController = new PasswordController();

passwordRouter.post('/forgot', authenticationsController.create);
passwordRouter.post('/reset', authenticationsController.update);

export default passwordRouter;
