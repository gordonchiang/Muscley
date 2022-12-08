/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react';
import { Button, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { CalendarStackParamList } from '../navigation/types';

interface AgendaListItemProps {
  item: any;
}

const isEmpty = (obj: any) => [ Object, Array ].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

const AgendaListItem = (props: AgendaListItemProps) => {
  const { item } = props;
  const navigation = useNavigation<StackNavigationProp<CalendarStackParamList>>();

  if (isEmpty(item)) {
    return (
      <View>
        <Text>Empty day</Text>
        <Button
          title='Edit Day'
          onPress={ () => {
            navigation.navigate('Modal');
          } }
        />
      </View>
    );
  }

  return (
    <View>
      <Text>Placeholder for not empty item</Text>
      <Text>{ item.title }</Text>
    </View>
  );
};

export default memo(AgendaListItem);
