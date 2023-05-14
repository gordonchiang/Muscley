import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { example as program, loadSchedule, reviewProgress, addWeightToProgramLifts } from '../api/program';
import { DigitInput } from '../components/DigitInput';
import { ReviewProgressScreenProps } from '../navigation/types';
import { getAllKeysFromLocalStorage, getFromLocalStorage } from '../api/localStorage';
import { Entry } from './AddOrEditEntryScreen';
import { ExerciseItem } from '../components/ExerciseInput';

export const ReviewProgress = (props: ReviewProgressScreenProps) => {
  const { navigation } = props;

  const [ maxes, setMaxes ] = useState<Record<string, string>>({});
  const [ trainingMaxes, setTrainingMaxes ]  = useState<Record<string, number>>({});
  const [ exercises, setExercises ]  = useState<ExerciseItem[][]>([]);

  useEffect(() => {
    const getAllKeys = async () => {
      const keys = await getAllKeysFromLocalStorage();
      const keys2 = keys.filter(key => key.includes('selectedDate')).reverse().slice(0, program.routine.length);
      const exerciseItems: ExerciseItem[][] = [];

      for (const key of keys2) {
        const entries = await getFromLocalStorage(key) as Entry[];
        for (const entry of entries) {
          if (entry.program?.name === program.name) {
            const exerciseItem = await getFromLocalStorage(entry.key) as ExerciseItem[];
            exerciseItems.push(exerciseItem);
          }
        }
      }

      setExercises(exerciseItems);
    };
  
    getAllKeys();
  }, [ exercises ]);

  const liftsToReviewProgress = reviewProgress(program, exercises);

  const handleDigitInput = (liftName: string, max: string) => {
    setMaxes({ ...maxes, [liftName]: max });
    setTrainingMaxes({ ...trainingMaxes, [liftName]: Number(max) * 0.9 });
  };

  return (
    <View>
      {
        liftsToReviewProgress.map(({ lift, recommendedIncrease }) => {
          return (
            <View key={ lift } style={ { flexDirection: 'row' } }>
              <Text>{ lift }</Text>
              <DigitInput
                handleDigitInput={ max => handleDigitInput(lift, max) }
                initialValue={ recommendedIncrease.toString() }
              />
            </View>
          );
        })
      }
      <Button
        title='Submit'
        onPress={ () => {
          // TODO: need to load schedule using new training maxes

          // const updatedProgram = addWeightToProgramLifts(program, trainingMaxes);
          // loadSchedule(updatedProgram, new Date());
          navigation.navigate('CalendarStack', { screen: 'Calendar' });
        } }
      />
    </View>
  );
};
