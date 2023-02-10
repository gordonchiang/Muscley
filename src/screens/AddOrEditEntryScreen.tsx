import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import type { AddOrEditEntryScreenProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { saveDataForSelectedDate } from '../redux/selectedDateSlice';
import { getFromLocalStorage, saveToLocalStorage } from '../api/localStorage';
import { ExerciseInput, ExerciseItem } from '../components/ExerciseInput';
import { Accordion } from '../components/Accordion';
import { Dialog } from '../components/Dialog';

export type Entry = {
  date: string;
  key: string;
  title: string;
}

export const AddOrEditEntryScreen = (props: AddOrEditEntryScreenProps) => {
  const { navigation, route: { params: { date, existingEntry: { entry, index } = {} } } } = props;

  const [ entryTitle, setEntryTitle ] = useState<string>(entry?.title ?? '');
  const [ exerciseItems, setExerciseItems ] = useState<(ExerciseItem | null)[]>([]);
  const [ optionsDialogVisible, setOptionsDialogVisible ] = useState<boolean>(false);
  const existingEntriesOnSameDate: Entry[] | null = useAppSelector(({ selectedDate }) => selectedDate.entries as Entry[] | null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getDataForEntry = async () => {
      const data = entry?.key && await getFromLocalStorage(entry.key);
      if (data) setExerciseItems(data as ExerciseItem[]);
    };

    getDataForEntry();
  }, [ entry ]);

  const handleExerciseInput = (exerciseItem: ExerciseItem | null, index?: number) => {
    if (!exerciseItem || index === undefined) {
      setExerciseItems(exerciseItems.concat(exerciseItem));
      return;
    }

    const updatedExerciseItems = [ ...exerciseItems ];
    updatedExerciseItems[index] = exerciseItem;
    setExerciseItems(updatedExerciseItems);
  };

  return (
    <View>
      <Button
        title='Options'
        onPress={ () => setOptionsDialogVisible(!optionsDialogVisible) }
      />
      <Dialog
        isVisible={ optionsDialogVisible }
        toggleVisibility={ (visibility: boolean) => setOptionsDialogVisible(visibility) }
      >
        <View>
          <Button
            title='Copy Entry To Date'
            onPress={ () => null }
          />
          <Button
            title='Close Options'
            onPress={ () => setOptionsDialogVisible(!optionsDialogVisible) }
          />
        </View>
      </Dialog>
      <Text>{ date }</Text>
      <TextInput
        onChangeText={ setEntryTitle }
        style={ { borderWidth: 1 } }
        value={ entryTitle }
        placeholder='Entry Name'
      />
      {
        exerciseItems.length > 0 && exerciseItems.map((exerciseItem: ExerciseItem | null, index: number) => {
          return (
            <Accordion
              key={ index }
              label={ exerciseItem?.title ?? '' }
              expandedByDefault={ !exerciseItem }
              item={    
                <ExerciseInput
                  exerciseItem={ exerciseItem ?? undefined }
                  handleExerciseInput={ (exerciseItem: ExerciseItem) => handleExerciseInput(exerciseItem, index) }
                />
              }
            />
          );
        })
      }
      <Button
        title='Add Exercise'
        onPress={ () => handleExerciseInput(null) }
      />
      <Button
        title={ `${entry ? 'Edit' : 'Add'} Entry` }
        onPress={ async () => {
          const data = [ ...existingEntriesOnSameDate ?? [] ];

          const newEntry: Entry = {
            date,
            key: `${date}_entry${index ?? data.length}_data`,
            title: entryTitle,
          };

          index !== undefined ? data[index] = newEntry : data.push(newEntry);

          try {
            await dispatch(saveDataForSelectedDate({ date, entries: data }));
            await saveToLocalStorage(newEntry.key, exerciseItems);
          } catch(e) {
            // eslint-disable-next-line no-console
            console.log('Error in AddOrEditEntryScreen', e);
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
