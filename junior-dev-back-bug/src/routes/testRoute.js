import { Router } from 'express';
import Main from '../controllers/Test';

const routes = Router();

routes.get('/testZahid', Main);

export default routes;
