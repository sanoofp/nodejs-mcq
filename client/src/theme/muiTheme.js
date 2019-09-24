import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

let muiTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: grey["50"]
    }
  },
  typography: {
    fontFamily: "Raleway",
    fontWeightMedium: 700
  }
})

muiTheme = responsiveFontSizes(muiTheme);

export default muiTheme;