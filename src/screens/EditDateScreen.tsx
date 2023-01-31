import { useEffect, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { ExerciseSetsInput }from '../components/ExerciseSetsInput';
import type { Set } from '../components/SetInput';
import type { ExerciseItem } from './types';

interface EditDateScreenProps {
  date: string;
  exerciseItem?: ExerciseItem;
  handleExerciseInput: (arg0?: ExerciseItem, index?: number) => void;
  index: number;
}

export const EditDateScreen = (props: EditDateScreenProps) => {
  const {
    date,
    exerciseItem: { data, title } = { data: null, title: '' },
    handleExerciseInput,
    index,
  } = props;

  const [ sets, changeSets ] = useState<Set[]>([ {} ]);

  useEffect(() => {
    const newSets: Set[] = data as Set[] ?? [ {} ];
    changeSets(newSets);
  }, [ data ]);

  const handleSetsInput = ({ weight, reps }: Set, i: number) => {
    const updatedSets = sets.map((set, j) => {
      return i !== j
        ? set
        : {
          ...set,
          ...(weight && { weight }),
          ...(reps && { reps }),
        };
    });

    const newExerciseItem: ExerciseItem = {
      date,
      title,
      data: updatedSets,
    };
    
    handleExerciseInput(newExerciseItem, index);
  };

  const handleExerciseNameInput = (newExerciseName: string) => {
    const newExerciseItem: ExerciseItem = {
      date,
      title: newExerciseName,
      data: sets,
    };
    
    handleExerciseInput(newExerciseItem, index);
  };

  return (
    <View>
      <TextInput
        onChangeText={ handleExerciseNameInput }
        style={ { borderWidth: 1 } }
        value={ title }
      />
      <ExerciseSetsInput
        sets={ sets }
        handleSetsInput={ handleSetsInput }
      />
      <Button
        title='Add Another Set'
        onPress={ () => {
          const newExerciseItem: ExerciseItem = {
            date,
            title,
            data: sets.concat({}),
          };

          handleExerciseInput(newExerciseItem, index);
        } }
      />
    </View>
  );
};
