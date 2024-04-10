import express from 'express';

export const genericErrorMiddleware: express.ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json(createErrorResponseBody(error));
};

export function createErrorResponseBody(error: Error) {
  return {
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : null,
  };
}

export function checkDataField(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body.data) {
      res.status(400).json(createErrorResponseBody(Error('Request body should have a data field')));
      return;
    } else if (typeof req.body.data !== 'object') {
      res.status(400).json(createErrorResponseBody(Error('The data property in the request body should be an oject')));
      return;
    }
  }

  next();
}
