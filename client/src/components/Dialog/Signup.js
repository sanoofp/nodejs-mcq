import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogContent from '@material-ui/core/DialogContent';
import { handleDialog } from "../../actions/appStateAction";
import { signupWithEmail } from "../../actions/authAction";
import GoogleButton from "../Button/Google";

function SignupDialog(props) {
  const { signupDialogOpen } = props.appState;
  const { handleDialog, signupWithEmail } = props;
  const [inputs, setInputs] = React.useState({
    username: "",
    email: "",
    password: ""
  })

  const handleChange = name => e => {
    setInputs({ ...inputs, [name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    signupWithEmail(inputs)
  }

  return (
    <Dialog
      open={signupDialogOpen}
      onClose={() => handleDialog("signupDialogOpen", false)}
      className="dialog"
    >
      <DialogContent className="dialog">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            value={inputs.username}
            onChange={handleChange('username')}
            margin="dense"
            type="text"
            variant="outlined"
            fullWidth
          />
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
          >
            Create account
          </Button>
        </form>
        <div className="divider"></div>
        <GoogleButton text="Sign up with google" />
      </DialogContent>
    </Dialog>
  )
}

const mapStateToProps = state => ({
  appState: state.appStateReducer
})

export default connect(mapStateToProps, { handleDialog, signupWithEmail })(SignupDialog);