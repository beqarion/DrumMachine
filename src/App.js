import React from 'react';
import './App.css';

const bank = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];
class Display  extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  render(){
    return (
      <div id="display">{this.props.displayTxt}</div>
    )
  }
}
class Pad extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      buttonPressed: false
    }
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.removeClass = this.removeClass.bind(this);
  }
  
  componentDidMount() {
    this.setState(this.props.obj);
    document.addEventListener('keydown', this.handleKeyPress);
    document.addEventListener('keyup', this.removeClass);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  playSound(){
    const audioEl = document.getElementById(this.props.obj.keyTrigger);
    audioEl.currentTime = 0;
    audioEl.play();
    this.props.updateText(this.props.obj.id.replace(/-/g," "));
    
    
    const button = document.getElementById(this.props.obj.id);
    button.classList.add("drum-pad-pressed");
    
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.obj.keyCode) {
      this.playSound();
    }
  }
  removeClass(){
    let button = document.getElementById(this.props.obj.id);
    if (button.classList.contains("drum-pad-pressed")){
      button.classList.remove("drum-pad-pressed");
    }
  }
  render(){
    let obj = this.props.obj;
    let ind = this.props.ind;
    let arr = this.props.arr;
    // console.log(obj,ind,arr);
    return (
      <div className="drum-pad" id={obj.id} onMouseDown={this.playSound} onMouseUp={this.removeClass}>
        <audio src={obj.url} className="clip" id={obj.keyTrigger}>
        </audio>
        {obj.keyTrigger}
      </div>
    )
  }
}
class PadBank extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  render(){
    let data = [...this.props.data];
    let padBank = data.map((el, ind, arr)=>{
      return (
        <Pad 
          updateText={this.props.updateText}
          obj = {el}
          ind = {ind}
          arr = {arr}
        />
      )
    })
    return (
      <div className="pad-bank">
        {padBank}
      </div>
      
    )
  }
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: "Press The Keys"
    }
    this.updateText = this.updateText.bind(this);
  }
  updateText(txt){
    this.setState({
      display: txt
    })
  }
  render(){
    return (
      <div id="drum-machine">
        <PadBank data={bank} updateText={this.updateText}/>
        <Display displayTxt={this.state.display}/>
      </div>
    )
  }
}



export default App;
