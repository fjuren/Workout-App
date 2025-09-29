import React, { createContext, ReactNode, useContext, useReducer } from 'react';

const appReducer = (state: any, action: any): any => {
  switch (action.type) {
    // use to start of any request to reset global state
    case 'START_REQUEST':
      return { ...state, loading: true, error: null };

    // gets state of the accepted workout from /app/workout/quick-workout.index
    case 'GET_QUICKWORKOUT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        quickWorkout: action.payload.quickWorkout,
      };

    case 'GET_QUICKWORKOUT_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        quickWorkout: null,
      };

    // sets a quick workout as complete
    case 'COMPLETE_QUICK_WORKOUT':
      return {
        ...state,
        quickWorkout: action.payload.quickWorkout,
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

export const WorkoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialState: any = {
    loading: false,
    error: null,
    quickWorkout: null,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  // create the selected quick workout data object
  const getQuickWorkout = (generatedWorkout: any) => {
    dispatch({ type: 'START_REQUEST' });
    // console.log(generatedWorkout);

    try {
      dispatch({
        type: 'GET_QUICKWORKOUT_SUCCESS',
        payload: {
          quickWorkout: generatedWorkout,
        },
      });
    } catch (err) {
      console.log('getQuickWorkout error: ', err);
      dispatch({
        type: 'GET_QUICKWORKOUT_ERROR',
        payload: { error: 'Error retrieving quick workout context' },
      });
      throw new Error();
    }
    dispatch({ type: 'END_REQUEST' });
  };

  // sets workout as complete
  const completeQuickWorkout = () => {
    dispatch({ type: 'START_REQUEST' });

    try {
      dispatch({
        type: 'COMPLETE_QUICK_WORKOUT',
        payload: {
          quickWorkout: {
            ...state.quickWorkout,
            complete: true,
          },
        },
      });
    } catch (err) {
      console.log('completeQuickWorkout error: ', err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      dispatch({ type: 'ERROR', payload: { error: errorMessage } });
    }
    dispatch({ type: 'END_REQUEST' });
  };

  const value = {
    // global state
    loading: state.loading,
    error: state.error,
    quickWorkout: state.quickWorkout,

    // global actions
    getQuickWorkout,
    completeQuickWorkout,
  };
  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
};

// add type safety to context
export const WorkoutContext = createContext<any | undefined>(undefined);

// create a custom useContext hook to handle type safety
export const useWorkoutContext = (): any => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error(
      'useWorkoutContext must be used witihn Weather Context Provider'
    );
  }
  return context;
};
