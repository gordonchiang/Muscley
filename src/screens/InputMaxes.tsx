import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { example as program, loadSchedule, onboardProgram, addWeightToProgramLifts } from '../api/program';
import { DigitInput } from '../components/DigitInput';
import { InputMaxesScreenProps } from '../navigation/types';

export const InputMaxes = (props: InputMaxesScreenProps) => {
  const { navigation } = props;
  
  const liftsToOnboard = onboardProgram(program);
  const [ maxes, setMaxes ] = useState<Record<string, string>>({});
  const [ trainingMaxes, setTrainingMaxes ]  = useState<Record<string, number>>({});

  const handleDigitInput = (liftName: string, max: string) => {
    setMaxes({ ...maxes, [liftName]: max });
    setTrainingMaxes({ ...trainingMaxes, [liftName]: Number(max) * 0.9 });
  };

  return (
    <View>
      {
        liftsToOnboard.map((liftName: string) => {
          return (
            <View key={ liftName } style={ { flexDirection: 'row' } }>
              <Text>{ liftName }</Text>
              <DigitInput
                handleDigitInput={ max => handleDigitInput(liftName, max) }
              />
              {
                trainingMaxes[liftName] ? <Text> -- Training Max: { trainingMaxes[liftName] }</Text> : null
              }
            </View>
          );
        })
      }
      <Button
        title='Submit'
        onPress={ () => {
          const updatedProgram = addWeightToProgramLifts(program, trainingMaxes);
          loadSchedule(updatedProgram, new Date());
          navigation.navigate('CalendarStack', { screen: 'Calendar' });
        } }
      />
    </View>
  );
};
