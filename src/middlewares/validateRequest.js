import { ZodError } from 'zod';

export const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.issues.map((err) => err.message);
      return res
        .status(500)
        .json({ error: 'invalid request', details: errorMessage });
    }
    res.status(500).json({ error: 'internal server error' });
  }
};
