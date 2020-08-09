import React from 'react';
import {default as Ball} from '@material-ui/icons/FiberManualRecord';
import { green,red,blue,grey } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button' 
import InputBase from '@material-ui/core/InputBase';




function baryCoords(colorsStr,config){
  const keys=Object.keys(colorsStr)
  const colors={}
   keys.forEach((key)=>{
    colors[key]=parseInt(colorsStr[key])
  })
  const numBalls=keys.map((color)=>colors[color]).reduce((a,b)=>a+b,0)
  const redTop=config.redTop
  const redLeft=config.redLeft
  const blueTop=config.blueTop
  const blueLeft=config.blueLeft
  const greenTop=config.greenTop
  const greenLeft=config.greenLeft
  const baryCoords={'red':{'top':redTop,'left':redLeft,'wt':colors['red']/numBalls},
            'blue':{'top':blueTop,'left':blueLeft,'wt':colors['blue']/numBalls},
            'green':{'top':greenTop,'left':greenLeft,'wt':colors['green']/numBalls}}

  const baryX=keys.map((color)=>baryCoords[color]['left']*baryCoords[color]['wt'])
                .reduce((a,b)=>a+b,0)
  const baryY=keys.map((color)=>baryCoords[color]['top']*baryCoords[color]['wt'])
                .reduce((a,b)=>a+b,0)
  return({baryX:baryX, baryY:baryY})
}

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
  
  const config={redTop:0,redLeft:0,blueTop:0,blueLeft:175,greenTop:175,greenLeft:90}

  const baryX=baryCoords(props.baryColors,config).baryX
  const baryY=baryCoords(props.baryColors,config).baryY
  

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
  		
  		<Ball style={{top:config.redTop, left:config.redLeft, color: red[500],position:'absolute'}}/>
  		<Ball style={{top:config.blueTop, left:config.blueLeft, color: blue[500], position:'absolute'}}/>
  		<Ball style={{top:config.greenTop, left:config.greenLeft, color:green[500], position:'absolute'}}/>
  		<Ball style={{top:baryY,left:baryX, position:'absolute'}} />

      {props.history.map((hist)=>{
        const colors=hist.colors
        const barys=baryCoords(colors,config)
        const baryX=barys.baryX
        const baryY=barys.baryY
        return <Ball style={{top:baryY, left:baryX, size:10, color: grey[500],position:'absolute'}}/>
      })}

  	</Box>
    <Button variant='contained' color='primary' onClick={props.onSave}>
      Save
    </Button>
  	</div>
  	)
    
}