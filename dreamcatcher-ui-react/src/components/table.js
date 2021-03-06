import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { firebaseDateToJSDate } from "../misc/utilities";
import { useAuthState } from '../context/context';

function createData(id, companyName, position, date, url, status) {
  return { id, companyName, position, date, url, status };
}

function transformData(data){
  var rows = [];
  if(data==null || data == [])
    return rows;
  for(var i = 0; i<data.applications.length;i++){
    const dateObj = {_seconds: data.applications[i].date._seconds, _nanoseconds:data.applications[i].date._nanoseconds};
    const options = {year: "numeric", month: "long", day: "2-digit", hour: "2-digit", minute: "2-digit"};
    const datetime = firebaseDateToJSDate(dateObj, options);
    rows.push(createData(data.applications[i].id,data.applications[i].position.company_name,data.applications[i].position.position_name,datetime,data.applications[i].position.link,data.applications[i].status));
  }
  return rows;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'companyName', numeric: false, disablePadding: true, label: 'Company' },
  { id: 'position', numeric: false, disablePadding: false, label: 'Position' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'url', numeric: false, disablePadding: false, label: 'URL' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];
function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          headCell.id == 'status'?(<TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={'7'}
            style= {{fontWeight:'bold'}}
          >{headCell.label}</TableCell>):
          (<TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={'7'}
            style= {{fontWeight:'bold'}}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick= {createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>)
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div" style= {{fontWeight:'bold'}}>
          {props.tableTitle}
        </Typography>
      )}
    </Toolbar>
  );
};


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const numRows = parseInt(props.numRows);
  const title = props.title;
  const data = props.data;
  const userDetails = useAuthState();
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(numRows);
  const [tableTitle] = React.useState(title);
  const[status,setStatus] = React.useState({});
  var rows = transformData(data);
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = async (event, row) => {
    let newObj = {...status};
    newObj[row.id] = event.target.value;
    var r;
    for(r of rows){
      if(r.id == row.id){
        if(props.onChangeStatus != undefined)
          props.onChangeStatus(r.status,event.target.value);
        r.status = event.target.value;  
      }
    }
    setStatus(newObj);
    const response = await fetch('/applications/update', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token: userDetails.token,
        id: row.id,
        status:event.target.value
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar tableTitle ={tableTitle}/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row" padding="7">
                        {row.companyName}
                      </TableCell>
                      <TableCell align="left">{row.position}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left"><a href={row.url}>{row.url}</a></TableCell>
                      <TableCell align="left">
                        <FormControl className={classes.formControl}>
                          <Select
                            value={status[row.id] == null?row.status:status[row.id]}
                            onChange={(event) => handleChange(event, row)}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'Without label' }}
                          >
                            <MenuItem value={"Applied"}>
                              Applied
                            </MenuItem>
                            <MenuItem value={"Coding Test"}>Coding Test</MenuItem>
                            <MenuItem value={"Interview"}>Interview</MenuItem>
                            <MenuItem value={"Reject"}>Reject</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
