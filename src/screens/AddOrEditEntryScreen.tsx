import { useEffect, useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import type { AddOrEditEntryScreenProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addSelectedDatePrefix, deleteDataForSelectedDate, saveDataForSelectedDate } from '../redux/selectedDateSlice';
import { getFromLocalStorage, saveToLocalStorage } from '../api/localStorage';
import { ExerciseInput, ExerciseItem } from '../components/ExerciseInput';
import { Accordion } from '../components/Accordion';
import { Dialog } from '../components/Dialog';
import { dateObjectToString, dateStringToObject } from '../utilities/date';
import type { Set } from '../components/SetInput';

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
    const getDataForEntry = async (): Promise<void> => {
      const data = entry?.key && await getFromLocalStorage(entry.key);
      if (data) setExerciseItems(data as ExerciseItem[]);
    };

    getDataForEntry();
  }, [ entry ]);

  const handleExerciseInput = (exerciseItem: ExerciseItem | null, index?: number): void => {
    if (!exerciseItem || index === undefined) {
      setExerciseItems(exerciseItems.concat(exerciseItem));
      return;
    }

    const updatedExerciseItems = [ ...exerciseItems ];
    updatedExerciseItems[index] = exerciseItem;
    setExerciseItems(updatedExerciseItems);
  };

  const replaceWithTargets = ({ weight, repetitions }: Set): Set => { return { targetWeight: weight, targetRepetitions: repetitions }; };

  const copyEntryToDate = async (title: string, newDate: string, exerciseItems: (ExerciseItem | null)[]): Promise<void> => {
    const existingEntriesOnSameDate = await getFromLocalStorage(addSelectedDatePrefix(newDate)) as Entry[] | null ?? [];

    const newEntry: Entry = {
      date: newDate,
      key: `${newDate}_entry${existingEntriesOnSameDate.length}_data`,
      title,
    };

    existingEntriesOnSameDate.push(newEntry);

    const plannedExerciseItems = exerciseItems.map((exerciseItem: ExerciseItem | null) => {
      if (!exerciseItem) return null;

      const { sets, title } = exerciseItem;

      const plannedSets: Set[] = sets?.map((set: Set) => replaceWithTargets(set)) ?? [];

      return { sets: plannedSets, title };
    });

    try {
      date === newDate
        ? await dispatch(saveDataForSelectedDate({ date: newDate, entries: existingEntriesOnSameDate }))
        : await saveToLocalStorage(addSelectedDatePrefix(newDate), existingEntriesOnSameDate);
      
      await saveToLocalStorage(newEntry.key, plannedExerciseItems);
    } catch(e) {
      // eslint-disable-next-line no-console
      console.log('Error in AddOrEditEntryScreen', e);
    }
  };

  const onPickDate = async (event: DateTimePickerEvent, date?: Date): Promise<void> => {
    if (event.type === 'dismissed' || !date) return;

    await copyEntryToDate(entryTitle, dateObjectToString(date), exerciseItems);

    Alert.alert('Success!');

    setOptionsDialogVisible(!optionsDialogVisible);
  };

  const onPressDelete = async () => {
    if (!entry || index === undefined) return;
    await dispatch(deleteDataForSelectedDate({ date, entry, index }));
    navigation.goBack();
  };

  const showDatePicker = async () => {
    DateTimePickerAndroid.open({
      value: dateStringToObject(date),
      onChange: onPickDate,
    });
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
            onPress={ showDatePicker }
          />
          <Button
            title='Delete Entry'
            onPress={ () => Alert.alert(
              'Delete',
              'Are you sure you want to delete this entry?',
              [
                {
                  text: 'No',
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: onPressDelete,
                  style: 'destructive',
                },
              ],
              { cancelable: true }
            ) }
            disabled={ !entry }
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
            >
              <ExerciseInput
                exerciseItem={ exerciseItem ?? undefined }
                handleExerciseInput={ (exerciseItem: ExerciseItem) => handleExerciseInput(exerciseItem, index) }
              />
              <Button
                title='Delete Exercise'
                onPress={ () => {
                  const updatedExerciseItems = [ ...exerciseItems ];
                  updatedExerciseItems.splice(index, 1);
                  setExerciseItems(updatedExerciseItems);
                } }
              />
            </Accordion>
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
