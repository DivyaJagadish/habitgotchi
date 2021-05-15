import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function PageAlert(props) {
	console.log("props---", props);

	const [open, setOpen] = React.useState(true);
	const handleClose = () => {
		setOpen(false);
	};

	const handleAcceptClose = () => {
		setOpen(false);
		// console.log(props.trigger);
		props.function(props.coins);
	};
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{props.message}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Maybe Later
					</Button>
					<Button onClick={handleAcceptClose} color="primary" autoFocus>
						{props.buttonMessage}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}