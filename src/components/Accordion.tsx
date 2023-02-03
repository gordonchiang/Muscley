import { ReactElement, useState } from 'react';
import { ListItem } from '@rneui/themed';

interface AccordionProps {
  label: string;
  item: ReactElement | ReactElement[];
}

export const Accordion = (props: AccordionProps) => {
  const { label, item } = props;

  const [ expanded, setExpanded ] = useState<boolean>(true);

  return (
    <ListItem.Accordion
      content={
        <>
          <ListItem.Content>
            <ListItem.Title>{ label }</ListItem.Title>
          </ListItem.Content>
        </>
      }
      isExpanded={ expanded }
      onPress={ () => setExpanded(!expanded) }
    >
      {
        item
      }
    </ListItem.Accordion>
  );
};
