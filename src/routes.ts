import { Express, Request, Response } from 'express';
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler
} from './controller/product.controller';
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler
} from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import { validateRequest, requiresUser } from './middleware/';
import {
  createProductSchema,
  deleteProductSchema,
  updateProductSchema
} from './schema/product.schema';
import {
  createUserSchema,
  createUserSessionSchema
} from './schema/user.schema';

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  // POST /api/users
  app.post('/api/users', validateRequest(createUserSchema), createUserHandler);

  // Login
  // POST /api/sessions
  app.post(
    '/api/sessions',
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get the user's sessions
  // GET /api/sessions
  app.get('/api/sessions', requiresUser, getUserSessionsHandler);

  // Logout
  // DELETE /api/sessions
  app.delete('/api/sessions', requiresUser, invalidateUserSessionHandler);

  // GET /api/products  /api/products/productId
  // Create a product
  app.post(
    '/api/products',
    [requiresUser, validateRequest(createProductSchema)],
    createProductHandler
  );

  // Update a product
  app.put(
    '/api/products/:productId',
    [requiresUser, validateRequest(updateProductSchema)],
    updateProductHandler
  );

  // Get a product
  app.get('/api/products/:productId', getProductHandler);

  // Delete a product
  app.delete(
    '/api/products/:productId',
    [requiresUser, validateRequest(deleteProductSchema)],
    deleteProductHandler
  );
}
