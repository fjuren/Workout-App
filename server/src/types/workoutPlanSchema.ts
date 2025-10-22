export const workoutPlanSchema = {
  type: 'object',
  properties: {
    // id: { type: 'string' },
    model: { type: 'string' },
    input_summary: {
      type: 'object',
      properties: {
        goal: { type: 'string' },
        experience_level: { type: 'string' },
        available_time: { type: 'string' },
        equipment: {
          type: 'array',
          items: { type: 'string' },
        },
        focus: { type: 'string' },
        type: { type: 'string' },
        skill: { type: 'string' },
        intensity: { type: 'string' },
        duration: { type: 'string' },
        notes: { type: 'string' },
      },
      additionalProperties: false,
      required: [
        'goal',
        'experience_level',
        'available_time',
        'equipment',
        'focus',
        'type',
        'skill',
        'intensity',
        'duration',
        'notes',
      ],
    },
    plan_json: {
      type: 'object',
      properties: {
        plan_type: { type: 'string', enum: ['quick', 'multi_day'] },
        duration_days: { type: 'integer' },
        weeks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              week_start: { type: 'string' },
              sessions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    date: { type: 'string' },
                    type: { type: 'string' },
                    title: { type: 'string' },
                    focus: { type: 'string' },
                    total_time: { type: 'string' },
                    warmup: {
                      type: 'object',
                      properties: {
                        duration_minutes: { type: 'integer' },
                        exercises: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              name: { type: 'string' },
                              duration_sec: { type: ['integer', 'null'] },
                              reps: { type: ['integer', 'null'] },
                              notes: { type: ['string', 'null'] },
                            },
                            additionalProperties: false,
                            required: ['name', 'duration_sec', 'reps', 'notes'],
                          },
                        },
                      },
                      additionalProperties: false,
                      required: ['duration_minutes', 'exercises'],
                    },
                    blocks: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          exercise_library_id: { type: 'string' },
                          name: { type: 'string' },
                          sets: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                reps: { type: 'integer' },
                                load_pct_1rm: { type: ['number', 'null'] },
                                rir: { type: ['integer', 'null'] },
                                rest_sec: { type: 'integer' },
                              },
                              additionalProperties: false,
                              required: [
                                'reps',
                                'load_pct_1rm',
                                'rir',
                                'rest_sec',
                              ],
                            },
                          },
                        },
                        additionalProperties: false,
                        required: ['exercise_library_id', 'name', 'sets'],
                      },
                    },
                  },
                  additionalProperties: false,
                  required: [
                    'date',
                    'type',
                    'title',
                    'focus',
                    'total_time',
                    'warmup',
                    'blocks',
                  ],
                },
              },
            },
            additionalProperties: false,
            required: ['week_start', 'sessions'],
          },
        },
      },
      additionalProperties: false,
      required: ['plan_type', 'duration_days', 'weeks'],
    },
    status: { type: 'string', enum: ['final', 'draft'] },
    source_prompt: { type: 'string' },
    version: { type: 'integer' },
  },
  additionalProperties: false,
  required: [
    // 'id',
    'model',
    'input_summary',
    'plan_json',
    'status',
    'source_prompt',
    'version',
  ],
};
