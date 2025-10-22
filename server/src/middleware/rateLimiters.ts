import rateLimit from 'express-rate-limit';

// note: returns HTTP 429 if too many requests are hit. Recall to use TooManyRequestsError from /types/errors.
// consider rateLimit docs for further refinement: https://express-rate-limit.mintlify.app/reference/error-codes
// added limiter to protect OpenAI API route
export const openAiRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // setting to 15mins
  max: 5, // 5 (every 15 minutes)_
  message: 'Too many workout requests, please try again later.',
});
