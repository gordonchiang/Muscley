/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react';
import { View, Text } from 'react-native';

interface AgendaListItemProps {
  item: any;
}

const isEmpty = (obj: any) => [ Object, Array ].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

const AgendaListItem = (props: AgendaListItemProps) => {
  const { item } = props;

  if (isEmpty(item)) {
    return (
      <View>
        <Text>Placeholder for empty item</Text>
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
