import React, { createContext, ReactNode, useContext, useReducer } from 'react';

interface StepOneData {
  planStartDate: Date | null;
  durationWeekOptions: string | null;
  trainingDays: string[];
  specialNotes: string | null;
}

interface StepTwoData {
  sessionFocus: string | null;
  sessionType: string | null;
  skillLevel: string | null;
  intensityLevels: string | null;
  durationOptions: string | null;
  enduranceSport: string | null;
}

interface StepThreeData {
  weeklySchedule: WorkoutDay[];
}

interface MultiStepWorkoutState {
  loading: boolean;
  error: string | null;
  stepOneData: StepOneData;
  stepTwoData: StepTwoData;
  stepThreeData: StepThreeData;
}

interface MultiStepWorkoutContextType {
  state: MultiStepWorkoutState;
  updateStepOne: (data: StepOneData) => void;
  updateStepTwo: (data: StepTwoData) => void;
  updateStepThree: (data: StepThreeData) => void;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
}

export interface WorkoutDay {
  date: string;
  focus: string;
  exercises: Exercise[];
  description: string;
}

const appReducer = (
  state: MultiStepWorkoutState,
  action: any
): MultiStepWorkoutState => {
  switch (action.type) {
    // use to start of any request to reset global state
    case 'START_REQUEST':
      return { ...state, loading: true, error: null };

    // gets state of the accepted workout from /app/workout/workout-plan step1
    case 'GET_STEP1_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        stepOneData: action.payload.stepOneData,
      };

    // gets state of the accepted workout from /app/workout/workout-plan step2
    case 'GET_STEP2_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        stepTwoData: action.payload.stepTwoData,
      };

    // gets state of the accepted workout from /app/workout/workout-plan step3
    case 'GET_STEP3_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        stepThreeData: action.payload.stepThreeData,
      };

    case 'GET_MULTISTEP_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // use to end any request to reset global state
    case 'END_REQUEST':
      return { ...state, loading: false, error: null };

    case 'ERROR':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const MultiStepWorkoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialState: MultiStepWorkoutState = {
    loading: false,
    error: null,
    stepOneData: {
      planStartDate: null,
      durationWeekOptions: null,
      trainingDays: [],
      specialNotes: null,
    },
    stepTwoData: {
      sessionFocus: null,
      sessionType: null,
      skillLevel: null,
      intensityLevels: null,
      durationOptions: null,
      enduranceSport: null,
    },
    stepThreeData: {
      weeklySchedule: [],
    },
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  // create the step 1 workout data object
  const updateStepOne = (stepOneData: StepOneData) => {
    dispatch({ type: 'START_REQUEST' });
    // console.log(generatedWorkout);

    try {
      dispatch({
        type: 'GET_STEP1_SUCCESS',
        payload: {
          stepOneData: stepOneData,
        },
      });
    } catch (err) {
      console.log('updateStepOne error: ', err);
      dispatch({
        type: 'GET_MULTISTEP_ERROR',
        payload: { error: 'Error retrieving step 1 workout context' },
      });
      throw new Error();
    }
    dispatch({ type: 'END_REQUEST' });
  };

  // create the step 2 workout data object
  const updateStepTwo = (stepTwoData: StepTwoData) => {
    dispatch({ type: 'START_REQUEST' });

    try {
      dispatch({
        type: 'GET_STEP2_SUCCESS',
        payload: {
          stepTwoData: stepTwoData,
        },
      });
    } catch (err) {
      console.log('updateStepTwo error: ', err);
      dispatch({
        type: 'GET_MULTISTEP_ERROR',
        payload: { error: 'Error retrieving step 2 workout context' },
      });
      throw new Error();
    }
    dispatch({ type: 'END_REQUEST' });
  };

  // create the step 3 workout data object
  const updateStepThree = (stepThreeData: { weeklySchedule: WorkoutDay[] }) => {
    dispatch({ type: 'START_REQUEST' });

    try {
      dispatch({
        type: 'GET_STEP3_SUCCESS',
        payload: {
          stepThreeData: stepThreeData,
        },
      });
    } catch (err) {
      console.log('updateStepThree error: ', err);
      dispatch({
        type: 'GET_MULTISTEP_ERROR',
        payload: { error: 'Error retrieving step 3 workout context' },
      });
      throw new Error();
    }
    dispatch({ type: 'END_REQUEST' });
  };

  const value: MultiStepWorkoutContextType = {
    state: {
      loading: state.loading,
      error: state.error,
      stepOneData: state.stepOneData,
      stepTwoData: state.stepTwoData,
      stepThreeData: state.stepThreeData,
    },
    updateStepOne,
    updateStepTwo,
    updateStepThree,
  };
  return (
    <MultiWorkoutContext.Provider value={value}>
      {children}
    </MultiWorkoutContext.Provider>
  );
};

// add type safety to context
export const MultiWorkoutContext = createContext<
  MultiStepWorkoutContextType | undefined
>(undefined);

// create a custom useContext hook to handle type safety
export const useMultiStepWorkoutContext = (): MultiStepWorkoutContextType => {
  const context = useContext(MultiWorkoutContext);
  if (!context) {
    throw new Error(
      'useWorkoutContext must be used witihn Workout Context Provider'
    );
  }
  return context;
};
