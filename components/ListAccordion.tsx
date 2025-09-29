import Exercise from '@/types/quickWorkout';
import * as React from 'react';
import { List } from 'react-native-paper';

const MyWorkoutListAccordion = ({ exercises }: { exercises: Exercise[] }) => {
  const [expandedStates, setExpandedStates] = React.useState<boolean[]>(
    exercises.map(() => true)
  );

  const toggleAccordion = (index: number) => {
    setExpandedStates((prev) =>
      prev.map((expanded, i) => (i === index ? !expanded : expanded))
    );
  };

  return (
    <List.Section>
      {exercises.map((exercise: Exercise, index: number) => (
        <List.Accordion
          title={exercise.name}
          key={index}
          expanded={expandedStates[index]}
          onPress={() => toggleAccordion(index)}
        >
          <List.Item title={`${exercise.sets} sets × ${exercise.reps} reps`} />
          <List.Item title={`Rest: ${exercise.restTime}`} />
        </List.Accordion>
      ))}
    </List.Section>
  );
};

export default MyWorkoutListAccordion;
