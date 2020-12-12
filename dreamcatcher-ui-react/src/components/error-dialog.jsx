import React from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from "@material-ui/core";

export default function ErrorDialog(props) {
    return (
        <Dialog open={props.dialog} onClose={()=>props.setDialog(!props.dialog)}>
            <DialogTitle>
                <Typography variant="h4" style={{color: "red"}}>
                    Error
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography variant="body1">
                        {props.value}
                    </Typography>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}