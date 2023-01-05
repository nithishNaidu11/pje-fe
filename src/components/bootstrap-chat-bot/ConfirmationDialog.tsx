import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmationDialogProps {
    open: boolean;
    setOpen: (_: boolean) => void;
    onSubmit: VoidFunction;
}

export const ConfirmationDialog = ({
    open,
    setOpen,
    onSubmit
}: ConfirmationDialogProps) => {
    return (
        <Dialog
            disablePortal
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {'Confirm Exit?'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText style={{ whiteSpace: 'pre-line' }}>
                    On exiting, all chat history will be cleared
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={onSubmit} autoFocus>
                    Confirm
                </Button>
                <Button
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}
                    autoFocus
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};
