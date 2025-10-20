// import express from 'express';
// import { supabase } from '../../config/supabase';
// import { authenticate, AuthRequest } from '../../middleware/auth';
// import { DatabaseError } from '../../types/errors';

// const router = express.Router();

// // post ai plan
// router.post('/', authenticate, async (req: AuthRequest, res, next) => {
//   try {
//     const { model, input_summary, plan_json, status, source_prompt, seed, errors,  } = req.body;

//     const { data, error } = await supabase
//       .from('ai_plans')
//       .insert([{
//         user_id: req.user.id, 
//           model,
//           input_summary,
//           plan_json,
//           status,
//           source_prompt,
//           seed,
//         //   version,
//           errors,
//       }
//     // id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//     // user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//     // model TEXT NOT NULL,
//     // input_summary JSONB DEFAULT '{}',
//     // plan_json JSONB DEFAULT '{}',
//     // status plan_status DEFAULT 'draft',
//     // source_prompt TEXT,
//     // seed INTEGER,
//     // version INTEGER DEFAULT 1,
//     // errors JSONB DEFAULT '{}',
//     // created_at TIMESTAMPTZ DEFAULT NOW(),
//     // updated_at TIMESTAMPTZ DEFAULT NOW()
//       ])
//       .select()
//       .single()

//     if (error) {
//       return next(new DatabaseError(
//         'Failed to save AI plan to db',
//         error,
//       ));
//     }

//     res.status(201).json(data);
//   } catch (error: any) {
//     next(error)
//   }
// });

// export default router;