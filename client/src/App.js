import React from 'react';

import './App.css';
import PolyaUrn from './PolyaUrn';
import BallInput from './BallInput';
import Box from '@material-ui/core/Box';
import {randomColor} from './MonteCarloUtils'
import Typography from '@material-ui/core/Typography'


import config from './config';
import io from 'socket.io-client';


class App extends React.Component {
  constructor(props){
    super(props)
    this.addBall=this.addBall.bind(this);
    this.addBalls=this.addBalls.bind(this);
    this.handleInputs=this.handleInputs.bind(this);
    this.saveColors=this.saveColors.bind(this);
    this.setEpochs=this.setEpochs.bind(this);
    this.state={colors:{'red':1,'blue':1,'green':1},colorsRegularized:{},epochs:1,history:[]}
  }

  componentDidMount(){

    const PORT=config[process.env.NODE_ENV].endpoint
    this.socket = io(PORT);

    this.socket.on('init', (colorStates)=>{
    this.setState({history:colorStates})
    })
  }

  addBall() {
    const colors=this.state.colors
    const color = randomColor(colors)
    console.log(color)
    
    colors[color]+=1
    this.setState({colors:colors})
  }

  addBalls(){
    const epochs=this.state.epochs
    var i=0
    while(i<epochs){
      this.addBall()
      i=i+1
    }
  }

  saveColors(event){
    this.socket.emit('colors',this.state.colors)
    this.setState({colors:{'red':1,'blue':1,'green':1},history:[...this.state.history,{colors:this.state.colors,createdAt:"Now"}]})


  }

  handleInputs(event,color){
    const colors=this.state.colors
    const val=event.target.value
    if (parseInt(val)>=0) {
      colors[color]=parseInt(event.target.value)
      
    }
    else{
      colors[color]=0
    }
    this.setState({colors:colors})

  }

  setEpochs(event){
    const val=event.target.value
    let epochs;
    if (parseInt(val)>=0) {
      epochs=parseInt(val)
    }
    else{
      epochs=0
    }
    this.setState({epochs:epochs})
  }



  render(){
    console.log(this.state)
    const maxBalls=100
    const minResolution=0.33
    const colorsRegularized={}
    const colorsList=Object.keys(this.state.colors)
    const totalBalls=colorsList.map(color=>this.state.colors[color]).reduce((a,b)=>a+b,0)
    colorsList.forEach((color)=>{
      const balls=this.state.colors[color]
      const ballsRegularized=totalBalls>100? 
      ((balls*maxBalls/totalBalls < minResolution)? 0:Math.ceil(balls*maxBalls/totalBalls))
      :balls
      colorsRegularized[color]=ballsRegularized
    })
    

    while(Object.values(colorsRegularized).reduce((a,b)=>a+b,0)>maxBalls){
      const remainders=Object.values(colorsRegularized)
      .filter(x=>(x>1))
      .map(x=>x-Math.floor(x))
      const smallestRem=Math.min(...remainders)
      const index=remainders.indexOf(smallestRem)
      colorsRegularized[Object.keys(colorsRegularized)[index]]-=1


    }
    
    
    return(
      <div align='center'>
      <Typography align='center' variant="h3" component ="h2" gutterBottom>
        {"Polya Urn Demo"}
      </Typography>
      <Typography align='center' variant='h7'>
        {"Release 2020/08/09 --- Disclaimer: tooltip can be fuzzy in Chrome"}
      </Typography>
      <PolyaUrn 
        baryColors={this.state.colors}
        colors={colorsRegularized} 
        onClick={this.addBalls}
        epochs={this.state.epochs}
        setEpochs={(event)=>this.setEpochs(event)}
        numBalls={totalBalls}
        maxBalls={maxBalls}
        history={this.state.history}
        onSave={(event)=> this.saveColors(event)}
      />
      <Box  style={{margin:30}} width='20rem' border={1}>
      <Typography>
        {"Current State"}
      </Typography>
      {colorsList.map((color,index)=>
        {
          return(
          <BallInput color={color} 
          number={this.state.colors[color]}
          handleContent={(event)=> this.handleInputs(event,color)}
          key={index}
          />
          )
        })}
      </Box>





      </div>
      )
  }
}

export default App;
