import { Dialog as RNEDialog } from '@rneui/themed';

interface DialogProps {
  isVisible: boolean;
  toggleVisibility: (arg0: boolean) => void;
  children: React.ReactNode;
}

export const Dialog = (props: DialogProps) => {
  const { isVisible, toggleVisibility, children } = props;

  return (
    <RNEDialog
      isVisible={ isVisible }
      onBackdropPress={ () => toggleVisibility(!isVisible) }
    >
      { children }
    </RNEDialog>
  );
};
