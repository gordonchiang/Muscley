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
  const { navigation, route: { params: { date, existingEntry: { entry, index } = {}, exerciseItem } } } = props;

  const [ entryTitle, selectEntryTitle ] = useState(entry?.title ?? '');
  const [ exerciseItems, selectExerciseItems ] = useState<ExerciseItem[]>([]);
  const existingEntriesOnSameDate: Entry[] | null = useAppSelector(({ selectedDate }) => selectedDate.data as Entry[] | null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getDataForEntry = async () => {
      const data = entry?.key && await getFromLocalStorage(entry.key);
      if (data) selectExerciseItems(data as ExerciseItem[]);
    };

    getDataForEntry();
  }, [ entry ]);

  useEffect(() => {
    if (exerciseItem) selectExerciseItems(exerciseItems => [ ...exerciseItems, exerciseItem ]);
  }, [ exerciseItem ]);

  return (
    <View>
      <Text>Edit Entry Screen</Text>
      <Text>{ date }</Text>
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
              onPress={ () => navigation.navigate('EditDate', { date, exerciseItem: item }) }
            />
          );
        })
      }
      <Button
        title='Add Exercise'
        onPress={ () => navigation.navigate('EditDate', { date }) }
      />
      <Button
        title={ `${entry ? 'Edit' : 'Add'} Entry` }
        onPress={ async () => {
          const data = [ ...existingEntriesOnSameDate || [] ];

          const newEntry: Entry = {
            date,
            key: `${date}_entry${index ?? data.length}_data`,
            title: entryTitle,
          };

          index !== undefined ? data[index] = newEntry : data.push(newEntry);

          try {
            await dispatch(saveDataForSelectedDate({ date, data }));
            await saveToLocalStorage(newEntry.key, exerciseItems);
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
