import React from 'react';
import {default as Ball} from '@material-ui/icons/FiberManualRecord';
import { green,red,blue } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button' 
import InputBase from '@material-ui/core/InputBase';






export default function PolyaUrn(props) {
  
  const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  style: { maxWidth: '15rem', height: '18rem' },
  borderColor: 'text.primary',
};

  const ballProps ={
  position:'absolute',
  bottom:0

  }
  const stringToColor = {"green": green[500],"red":red[500],"blue":blue[500],"blank":'white'}
  const numBalls=props.numBalls
  const blankBalls=Math.max(props.maxBalls-numBalls,0)
  
  
 
  
 
  return (
  	<div>
  	<Box bottom={0} borderBottom={1} borderLeft={1} borderRight={1} 
  	 {...defaultProps}>
  		{[...['blank'],...Object.keys(props.colors)].map((color,index)=> {
  			const numBalls= color==="blank"? blankBalls:(Math.max(parseInt(props.colors[color]),0) || 0)
  			
  			return (
  				[...Array(numBalls)].map((e,i)=>
  					<Ball {...ballProps} key ={color+i} style={{color: stringToColor[color]}} /> )
  				
  				)

  		})}
  
  	</Box>
  		<Button variant='contained' color='primary' onClick={props.onClick}>
  			Add Balls >>
  		</Button>
  		<InputBase
  			placeholder="Enter a number of balls"
  			value={props.epochs>0? props.epochs:""}
  			onChange={props.setEpochs}
  		/>
  	</div>
  	)
    
}