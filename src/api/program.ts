import { ExerciseItem } from '../components/ExerciseInput';
import { addSelectedDatePrefix } from '../store/selectedDateSlice';
import { Entry } from '../screens/AddOrEditEntryScreen';
import { dateObjectToString } from '../util/date';
import { getFromLocalStorage, saveToLocalStorage } from './localStorage';
import { Set } from '../components/SetInput';

type ProgramSet = {
  weight?: number;
  weightMultiplier?: number;
  repetitions?: number;
}

type ProgramLift = {
  name: string;
  sets: ProgramSet[];
};

type Routine = {
  lifts: number[];
}[];

export type Program = {
  name: string;
  lifts: ProgramLift[];
  routine: Routine;
  onboarding: {
    mode: string;
    lifts: number[];
  };
};

export const example: Program = {
  name: 'Example Program',
  lifts: [
    {
      name: 'Bench Press',
      sets: [
        { repetitions: 8, weightMultiplier: 0.65 },
        { repetitions: 6, weightMultiplier: 0.75 },
        { repetitions: 4, weightMultiplier: 0.85 },
        { repetitions: 4, weightMultiplier: 0.85 },
        { repetitions: 4, weightMultiplier: 0.85 },
        { repetitions: 5, weightMultiplier: 0.8 },
        { repetitions: 6, weightMultiplier: 0.75 },
        { repetitions: 7, weightMultiplier: 0.7 },
        { repetitions: 8, weightMultiplier: 0.65 },
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
    { lifts: [] },
  ],
  onboarding: {
    mode: 'oneRepititionMax',
    lifts: [ 0, 1, 2, 6 ],
  },
};

export function addWeightToProgramLifts(program: Program, trainingMaxes: Record<string, number>): Program {
  const updatedProgram: Program = { ...program }; // should deep clone
  
  updatedProgram.lifts.forEach((lift: ProgramLift) => {
    lift.sets.forEach((set: ProgramSet) => {
      if (Object.keys(trainingMaxes).includes(lift.name) && set.weightMultiplier) {
        set.weight = trainingMaxes[lift.name] * set.weightMultiplier;
      } 
    });
  });

  return updatedProgram;
}

export function loadSchedule(program: Program, startDate: Date): void {
  program.routine.forEach(({ lifts }: { lifts: number[] }, index: number): void => {
    const programmedLiftsForDate: ProgramLift[] = mapLiftIndicesToLifts(lifts, program.lifts);
    const date: Date = new Date();
    date.setDate(startDate.getDate() + index);
    copyEntryToDate(program.name, dateObjectToString(date), programmedLiftsForDate);
  });
}

function mapLiftIndicesToLifts(liftIndices: number[], lifts: ProgramLift[]): ProgramLift[] {
  return liftIndices.map((index: number) => lifts[index]);
}

const replaceWithTargets = ({ weight, repetitions }: ProgramSet): Set => { return { targetWeight: weight?.toString(), targetRepetitions: repetitions?.toString() }; };

const copyEntryToDate = async (title: string, newDate: string, programLifts: ProgramLift[]): Promise<void> => {
  const existingEntriesOnSameDate = (await getFromLocalStorage(addSelectedDatePrefix(newDate)) ?? []) as Entry[];

  const newEntry: Entry = {
    date: newDate,
    key: `${newDate}_entry${existingEntriesOnSameDate.length}_data`,
    title,
  };

  existingEntriesOnSameDate.push(newEntry);

  const plannedExerciseItems: (ExerciseItem | null)[] = programLifts.map((programLift: ProgramLift) => {
    if (!programLift) return null;

    const { sets, name: title } = programLift;

    const plannedSets: Set[] = sets?.map((set: ProgramSet): Set => replaceWithTargets(set)) ?? [];

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

export function onboardProgram(program: Program) {
  const { onboarding: { mode, lifts: liftIndices }, lifts } = program;

  if (mode === 'oneRepititionMax') {
    const mappedLiftNames = liftIndices.map((liftIndex: number) => lifts[liftIndex].name);
    return mappedLiftNames;
  }

  return [];
}