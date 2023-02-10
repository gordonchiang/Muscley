import { useState } from 'react';
import { ListItem } from '@rneui/themed';

interface AccordionProps {
  children: React.ReactNode;
  label: string;
  expandedByDefault?: boolean;
}

export const Accordion = (props: AccordionProps) => {
  const { children, label, expandedByDefault = false } = props;

  const [ expanded, setExpanded ] = useState<boolean>(expandedByDefault);

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
      { children }
    </ListItem.Accordion>
  );
};
