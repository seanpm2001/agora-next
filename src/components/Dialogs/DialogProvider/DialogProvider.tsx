import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  FC,
} from "react";
import { dialogs, DialogType } from "./dialogs";
import styles from "./dialog.module.scss";

const DialogContext = createContext<(dialog: DialogType | null) => void>(
  () => {}
);

type Props = {
  children: ReactNode;
};

const Modal: FC<{ open: boolean; onClose: () => void } & Props> = ({
  open,
  children,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className={styles.dialog} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.dialog_content}
      >
        {children}
      </div>
    </div>
  );
};

export const DialogProvider: FC<Props> = ({ children }) => {
  const [currentDialog, setCurrentDialog] = useState<DialogType | null>(null);

  const renderedDialog =
    currentDialog &&
    dialogs[currentDialog.type](currentDialog.params, () =>
      setCurrentDialog(null)
    );

  return (
    <DialogContext.Provider value={setCurrentDialog}>
      <Modal open={!!currentDialog} onClose={() => setCurrentDialog(null)}>
        {renderedDialog}
      </Modal>
      {children}
    </DialogContext.Provider>
  );
};

export const useOpenDialog = () => {
  const openDialog = useContext(DialogContext);
  if (!openDialog) {
    throw new Error("useOpenDialog must be used within a DialogProvider");
  }
  return openDialog;
};

export const useOpenDialogOptional = () => useContext(DialogContext);