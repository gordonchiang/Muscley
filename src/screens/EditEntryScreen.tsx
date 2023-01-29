import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import type { EditEntryScreenProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { saveDataForSelectedDate } from '../redux/selectedDateSlice';
import { getFromLocalStorage, saveToLocalStorage } from '../api/localStorage';
import { ExerciseItem } from './types';

export type Entry = {
  date: string;
  key: string;
  title?: string;
}

export const EditEntryScreen = (props: EditEntryScreenProps) => {
  const { navigation, route: { params: { dateString, entry } } } = props;

  const [ entryTitle, selectEntryTitle ] = useState(entry?.title ?? '');
  const [ exerciseItems, selectExerciseItems ] = useState<ExerciseItem[]>([]);
  const items: Entry[] = useAppSelector(({ selectedDate }) => selectedDate.data as Entry[]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getDataForEntry = async () => {
      const data = entry?.key && await getFromLocalStorage(entry.key);
      if (data) selectExerciseItems(data as ExerciseItem[]);
    };

    getDataForEntry();
  }, [ entry ]);

  const handleAddExercise = (newExerciseItem: ExerciseItem) => {
    selectExerciseItems([ ...exerciseItems, newExerciseItem ]);
  };

  return (
    <View>
      <Text>Edit Entry Screen</Text>
      <Text>{ dateString }</Text>
      <TextInput
        onChangeText={ selectEntryTitle }
        style={ { borderWidth: 1 } }
        value={ entryTitle }
      />
      {
        exerciseItems.length > 0 && exerciseItems.map((item: ExerciseItem, index: number) => {
          return (
            <Button
              key={ index }
              title={ item.title || 'Untitled' }
              onPress={ () => navigation.navigate('EditDate', { dateString, handleAddExercise, exerciseItem: item }) }
            />
          );
        })
      }
      <Button
        title='Add Exercise'
        onPress={ () => navigation.navigate('EditDate', { dateString, handleAddExercise }) }
      />
      <Button
        title={ `${entry ? 'Edit' : 'Add'} Entry` }
        onPress={ async () => {
          const newEntry: Entry = {
            date: dateString,
            key: 'test',
            // key: `${dateString}_entry${entryNumber}_data`,
            title: entryTitle,
          };

          const data = [ ...(items || []), newEntry ];

          try {
            await dispatch(saveDataForSelectedDate({ date: dateString, data }));
            await saveToLocalStorage('test', exerciseItems);
          } catch(e) {
            // eslint-disable-next-line no-console
            console.log('Error in EditEntryScreen', e);
          }

          navigation.goBack();
        } }
      />
      <Button
        title='Go Back'
        onPress={ () => navigation.goBack() }
      />
    </View>
  );
};
