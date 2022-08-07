import productsRouter from '@modules/products/infra/http/routes/products.routes';
import mediaRouter from '@modules/users/infra/http/routes/media.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/media', mediaRouter);
routes.use('/products', productsRouter);
routes.use('/profile', profileRouter);

export default routes;
