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
  style: { maxWidth: '15rem', height: '18rem', position:'relative' },
  borderColor: 'text.primary',
};

const baryProps = {
  bgcolor: 'background.paper',
  m: 1,
  style: { maxWidth: 200, height: 200, position:'relative' },
  borderColor: 'text.primary',
};

const redBallProps={
	position:'absolute',
	bottom:'0',
	left:'0'

}
  
  const stringToColor = {"green": green[500],"red":red[500],"blue":blue[500],"blank":'white'}
  const numBalls=props.numBalls
  const blankBalls=Math.max(props.maxBalls-numBalls,0)
  const redTop=0
  const redLeft=0
  const blueTop=0
  const blueLeft=175
  const greenTop=175
  const greenLeft=90
  const baryCoords={'red':{'top':redTop,'left':redLeft,'wt':props.baryColors['red']/numBalls},
  					'blue':{'top':blueTop,'left':blueLeft,'wt':props.baryColors['blue']/numBalls},
  					'green':{'top':greenTop,'left':greenLeft,'wt':props.baryColors['green']/numBalls}}

  const baryX=Object.keys(props.baryColors).map((color)=>baryCoords[color]['left']*baryCoords[color]['wt'])
  						  .reduce((a,b)=>a+b,0)
  const baryY=Object.keys(props.baryColors).map((color)=>baryCoords[color]['top']*baryCoords[color]['wt'])
  						  .reduce((a,b)=>a+b,0)
  

  return (
  	<div >
  	<Box bottom={0} borderBottom={1} borderLeft={1} borderRight={1} 
  	 {...defaultProps}>
  		{[...['blank'],...Object.keys(props.colors)].map((color,index)=> {
  			const numBalls= color==="blank"? blankBalls:(Math.max(parseInt(props.colors[color]),0) || 0)
  			
  			return (
  				[...Array(numBalls)].map((e,i)=>
  					<Ball  key ={color+i} style={{color: stringToColor[color]}} /> )
  				
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


  	<Box border={1} {...baryProps} >
  		
  		<Ball style={{top:redTop, left:redLeft, color: red[500],position:'absolute'}}/>
  		<Ball style={{top:blueTop, left:blueLeft, color: blue[500], position:'absolute'}}/>
  		<Ball style={{top:greenTop, left:greenLeft, color:green[500], position:'absolute'}}/>
  		<Ball style={{top:baryY,left:baryX, position:'absolute'}} />

  	</Box>
  	</div>
  	)
    
}