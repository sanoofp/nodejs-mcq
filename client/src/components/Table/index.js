import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  tableWrapper: {
    width: "100%",
    maxHeight: 460,
    overflow: "auto"
  },
}));

function createData(question, answer, userPick, weightage, tag) {
  return { question, answer, userPick, weightage, tag };
}

function ReportTable(props) {
  const classes = useStyles();
  const rows = [];

  props.questionsArr.map(item => {
    const { question, answer, weightage, tags } = item;
    const userPick = item["userPick"] ? item["userPick"] : answer
    return rows.push(createData(question, answer, userPick, weightage, tags[0]));
  })

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="center">Correct Answer</TableCell>
              <TableCell align="center">Your Answer</TableCell>
              <TableCell align="center">Weightage points</TableCell>
              <TableCell align="center">Tags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} style={{
                backgroundColor: row.answer === row.userPick ? green["50"] : red["50"]
              }}>
                <TableCell component="th" scope="row">
                  {row.question}
                </TableCell>
                <TableCell align="center">{row.answer}</TableCell>
                <TableCell align="center">{row.userPick}</TableCell>
                <TableCell align="center">{row.weightage}</TableCell>
                <TableCell align="center">{row.tag}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}

export default (ReportTable);