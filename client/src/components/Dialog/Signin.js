import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogContent from '@material-ui/core/DialogContent';
import { handleDialog } from "../../actions/appStateAction";
import { signinWithEmail } from "../../actions/authAction";
import GoogleButton from "../Button/Google";

function SigninDialog(props) {
  const { signinDialogOpen } = props.appState;
  const { handleDialog, signinWithEmail } = props;
  const [inputs, setInputs] = React.useState({
    email: "",
    password: ""
  })

  const handleChange = name => e => {
    setInputs({ ...inputs, [name]: e.target.value });
  }

  const handleSubmit = () => signinWithEmail(inputs);

  return (
    <Dialog
      open={signinDialogOpen}
      onClose={() => handleDialog("signinDialogOpen", false)}
      aria-labelledby="signin"
      aria-describedby="Signin"
      >
      <DialogContent className="dialog">
        <h1>Signin</h1>
        <div>
          <TextField
            name="email"
            label="Email"
            value={inputs.email}
            onChange={handleChange('email')}
            margin="dense"
            type="email"
            variant="outlined"
            fullWidth
          />
          <TextField
            name="password"
            label="Password"
            value={inputs.password}
            onChange={handleChange('password')}
            margin="dense"
            type="password"
            variant="outlined"
            fullWidth
          />
          <Button 
            variant="contained" 
            color="primary" 
            className="btn" 
            type="submit"
            fullWidth
            onClick={handleSubmit}
          >
            Signin
          </Button>
        </div>
        <div className="divider"></div>
        <GoogleButton text="Sign in with google" />
      </DialogContent>
    </Dialog>
  )
}

const mapStateToProps = state => ({
  appState: state.appStateReducer
})

export default connect(mapStateToProps, { handleDialog, signinWithEmail })(SigninDialog);