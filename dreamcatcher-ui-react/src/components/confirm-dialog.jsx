import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmDialog(props) {
  const { title, content, yesFn, noFn } = props;
  const [open, setOpen] = React.useState(false);

  const openAlert = () => {
    setOpen(true);
  };

  const closeAlert = (option) => {
    if (option === 'Yes') {
      yesFn();
    } else {
      noFn();
    }
    setOpen(false);
  };

  return (
    <>
      <div onClick={openAlert}>
        {props.children}
      </div>
      <Dialog
        open={open}
        //   onClose={handleClose}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
        {content &&
          <DialogContent>
            <DialogContentText id="confirm-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
        }
        <DialogActions>
          <Button onClick={() => closeAlert('No')} variant="contained" color="secondary">
            No
            </Button>
          <Button onClick={() => closeAlert('Yes')} variant="contained" color="primary" autoFocus>
            Yes
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}