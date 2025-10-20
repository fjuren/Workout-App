import { WorkoutExercise } from '@/types/workouts';
import * as React from 'react';
import { List } from 'react-native-paper';

const MyWorkoutListAccordion = ({ workoutExercises }: { workoutExercises: WorkoutExercise[] }) => {
  const [expandedStates, setExpandedStates] = React.useState<boolean[]>(
    workoutExercises.map(() => true)
  );

  const toggleAccordion = (index: number) => {
    setExpandedStates((prev) =>
      prev.map((expanded, i) => (i === index ? !expanded : expanded))
    );
  };

  return (
    <List.Section>
      {workoutExercises.map((exercise: WorkoutExercise, index: number) => (
        <List.Accordion
          title={exercise.exercise_library_id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          key={exercise.id}
          expanded={expandedStates[index]}
          onPress={() => toggleAccordion(index)}
        >
          <List.Item 
            title={`${exercise.prescription_json.sets.length} sets × ${exercise.prescription_json.sets[0].reps} reps`} 
          />
          <List.Item 
            title={`Rest: ${exercise.prescription_json.sets[0].rest_sec}s`} 
          />
          <List.Item 
            title={`Load: ${exercise.prescription_json.sets[0].load_pct_1rm}% 1RM`} 
          />
          <List.Item 
            title={`RIR: ${exercise.prescription_json.sets[0].rir}`} 
          />
        </List.Accordion>
      ))}
    </List.Section>
  );
};

export default MyWorkoutListAccordion;
