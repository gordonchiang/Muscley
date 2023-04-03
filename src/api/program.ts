import { ExerciseItem } from '../components/ExerciseInput';
import { addSelectedDatePrefix } from '../redux/selectedDateSlice';
import { Entry } from '../screens/AddOrEditEntryScreen';
import { dateObjectToString } from '../utilities/date';
import { getFromLocalStorage, saveToLocalStorage } from './localStorage';
import { Set } from '../components/SetInput';

type ProgramSet = {
  weight?: string;
  repetitions?: number;
}

export type Program = {
  name: string;
  lifts: {
    name: string;
    sets: ProgramSet[];
  }[];
  routine: any;
};

export const example: Program = {
  name: 'Example Program',
  lifts: [
    {
      name: 'Bench Press',
      sets: [
        { repetitions: 8 },
        { repetitions: 6 },
        { repetitions: 4 },
        { repetitions: 4 },
        { repetitions: 4 },
        { repetitions: 5 },
        { repetitions: 6 },
        { repetitions: 7 },
        { repetitions: 8 },
      ],
    },
    {
      name: 'Overhead Press',
      sets: [
        { repetitions: 6 },
        { repetitions: 5 },
        { repetitions: 3 },
        { repetitions: 5 },
        { repetitions: 7 },
        { repetitions: 4 },
        { repetitions: 6 },
        { repetitions: 8 },
      ],
    },
    {
      name: 'Squat',
      sets: [
        { repetitions: 5 },
        { repetitions: 3 },
        { repetitions: 1 },
        { repetitions: 3 },
        { repetitions: 3 },
        { repetitions: 3 },
        { repetitions: 5 },
        { repetitions: 5 },
        { repetitions: 5 },
      ],
    },
    {
      name: 'Sumo Deadlift',
      sets: [
        { repetitions: 5 },
        { repetitions: 5 },
        { repetitions: 8 },
      ],
    },
    {
      name: 'Overhead Press',
      sets: [
        { repetitions: 5 },
        { repetitions: 3 },
        { repetitions: 1 },
        { repetitions: 3 },
        { repetitions: 3 },
        { repetitions: 3 },
        { repetitions: 5 },
        { repetitions: 5 },
        { repetitions: 5 },
      ],
    },
    {
      name: 'Incline Bench Press',
      sets: [
        { repetitions: 5 },
        { repetitions: 5 },
        { repetitions: 3 },
        { repetitions: 5 },
        { repetitions: 7 },
        { repetitions: 4 },
        { repetitions: 6 },
        { repetitions: 8 },
      ],
    },
    {
      name: 'Deadlift',
      sets: [
        { repetitions: 5 },
        { repetitions: 3 },
        { repetitions: 1 },
        { repetitions: 3 },
        { repetitions: 3 },
        { repetitions: 3 },
        { repetitions: 5 },
        { repetitions: 5 },
        { repetitions: 5 },
      ],
    },
    {
      name: 'Front Squat',
      sets: [
        { repetitions: 5 },
        { repetitions: 5 },
        { repetitions: 3 },
        { repetitions: 5 },
        { repetitions: 7 },
        { repetitions: 4 },
        { repetitions: 6 },
        { repetitions: 8 },
      ],
    },
    {
      name: 'Bench Press',
      sets: [
        { repetitions: 5 },
        { repetitions: 3 },
        { repetitions: 1 },
        { repetitions: 3 },
        { repetitions: 3 },
        { repetitions: 3 },
        { repetitions: 5 },
        { repetitions: 5 },
        { repetitions: 5 },
      ],
    },
    {
      name: 'Close Grip Bench Press',
      sets: [
        { repetitions: 5 },
        { repetitions: 5 },
        { repetitions: 3 },
        { repetitions: 5 },
        { repetitions: 7 },
        { repetitions: 4 },
        { repetitions: 6 },
        { repetitions: 8 },
      ],
    },
  ],
  routine: [
    { lifts: [ 0, 1 ] },
    { lifts: [ 2, 3 ] },
    { rest: true },
  ],
};

export function loadTrainingProgram(program: Program): void {
  loadTrainingDays(program, new Date());
}

function loadTrainingDays(program: Program, startDate: Date): void {
  const days = program.routine.map((day: any) => {
    return day.lifts
      ? mapLiftIndicesToLifts(day.lifts, program.lifts)
      : [];
  });

  days.forEach((day: any, index: number) => {
    const date: Date = new Date();
    date.setDate(startDate.getDate() + index);
    copyEntryToDate(program.name, dateObjectToString(date), day);
  });
}

function mapLiftIndicesToLifts(liftIndices: number[], lifts: any[]) {
  return liftIndices.map((index: number) => lifts[index]);
}

const replaceWithTargets = ({ weight, repetitions }: Set): Set => { return { targetWeight: weight?.toString(), targetRepetitions: repetitions?.toString() }; };

const copyEntryToDate = async (title: string, newDate: string, exerciseItems: ExerciseItem[]): Promise<void> => {
  const existingEntriesOnSameDate = (await getFromLocalStorage(addSelectedDatePrefix(newDate)) ?? []) as Entry[];

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
    // date === newDate
    //   ? await dispatch(saveDataForSelectedDate({ date: newDate, entries: existingEntriesOnSameDate }))
    await saveToLocalStorage(addSelectedDatePrefix(newDate), existingEntriesOnSameDate);
    
    await saveToLocalStorage(newEntry.key, plannedExerciseItems);
  } catch(e) {
    // eslint-disable-next-line no-console
    console.log('Error in AddOrEditEntryScreen', e);
  }
};
