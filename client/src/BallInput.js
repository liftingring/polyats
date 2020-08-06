import React from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import {default as Ball} from '@material-ui/icons/FiberManualRecord';
import { green,red,blue } from '@material-ui/core/colors';
import InputBase from '@material-ui/core/InputBase';


const useStyles = makeStyles(theme => ({
  appBar: {
    bottom: 0,
    top: 'auto',
  },
  inputContainer: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    marginLeft: theme.spacing(1),
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  icon: {
    width: theme.spacing(2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

 
  inputRoot: {
    color: 'inherit',
    width: '50%'
  },
  ballInput:{
  	width:'50%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    // transition: theme.transitions.create('width'),
    width: '50%',
    // [theme.breakpoints.up('sm')]: {
    //   width: 120,
    //   '&:focus': {
    //     width: 200,
    //   },
    // },
  },
}));

export default function BallInput(props){

	const classes = useStyles();
	const stringToColor = {"green": green[500],"red":red[500],"blue":blue[500]}
	const color=props.color
	const number=props.number
	return(
		<div>
			<div>
				<Ball style={{color: stringToColor[color]}} /> 
				<InputBase
					value={number>0? number:""}
					onChange={props.handleContent}
					placeholder={"0"}
					classes={{
                		root: classes.inputRoot,
                		input: classes.inputInput,
              			}}
              		inputProps={{ 'aria-label': 'content' }}
              		type='number'
              		min='0'

				/>
			</div>
		</div>
		)

}