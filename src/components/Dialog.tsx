import { Dialog as RNEDialog } from '@rneui/themed';

interface DialogProps {
  children: React.ReactNode;
  isVisible: boolean;
  toggleVisibility: (arg0: boolean) => void;
}

export const Dialog = (props: DialogProps) => {
  const { children, isVisible, toggleVisibility } = props;

  return (
    <RNEDialog
      isVisible={ isVisible }
      onBackdropPress={ () => toggleVisibility(!isVisible) }
    >
      { children }
    </RNEDialog>
  );
};
