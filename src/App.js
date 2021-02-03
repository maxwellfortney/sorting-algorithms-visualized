import React from 'react';
import './App.css';
import BarsVisualizer from './Components/BarsVisualizer/BarsVisualizer';
import SettingsSelectors from './Components/SettingsSelector/SettingsSelectors';
import {getBubbleSortAnimations, getHeapSortAnimations, getMergeSortAnimations, getQuickSortAnimations} from "./Algorithms/algorithms";
import * as Tone from 'tone'

const generateTheme = () => {
  const presetThemes = [
    {
      // Pinkish/Red
      backgroundColor: "#ff5990",
      navBackgroundColor: "#e53972",
      navBackgroundBoxDark: "#ce3367",
      navBackgroundBoxLight: "#f53d7a",
      navBackgroundBoxShadowDark: "#c33061",
      navBackgroundBoxShadowLight: "#ff4283",
      navBackgroundHoverColor: "#a4234e",
      navTextColor: "#FFFFFF",
      mainBarColor: "#ba1e4e",
      comparisonBarColor: "#ff709c"
    },
    {
      // Blue
      backgroundColor: "#5069ff",
      navBackgroundColor: "#344eed",
      navBackgroundBoxDark: "#2f46d5",
      navBackgroundBoxLight: "#3853fe",
      navBackgroundBoxShadowDark: "#2c42c9",
      navBackgroundBoxShadowLight: "#3c5aff",
      navBackgroundHoverColor: "#162db6",
      navTextColor: "#FFFFFF",
      mainBarColor: "#2037bc",
      comparisonBarColor: "#8d9dff"
    },
    {
      // Dark/Army Green
      backgroundColor: "#60844D",
      navBackgroundColor: "#446c2f",
      navBackgroundBoxDark: "#3d612a",
      navBackgroundBoxLight: "#497432",
      navBackgroundBoxShadowDark: "#3a5c28",
      navBackgroundBoxShadowLight: "#4e7c36",
      navBackgroundHoverColor: "#2f4f1d",
      navTextColor: "#FFFFFF",
      mainBarColor: "#3b6525",
      comparisonBarColor: "#81b168"
    }
  ]
  const randomThemeindex = getRandomInt(0,presetThemes.length);
  const theme = presetThemes[randomThemeindex];
  console.log(theme);
  return theme;
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const generateBarsArray = (arraySize) => {
  let ret = [];
  for(let i=0; i < arraySize; i++) {
    ret.push(getRandomInt(5, 1000));
  }

  return ret;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const arraySize = getRandomInt(2, 300);
    
    this.state = {
      theme: generateTheme(),
      sortConfig: {
        type: "quick",
        arraySize,
        sortSpeed : (15 - ((arraySize / 300) * 15)) 
      },
      barsArray : generateBarsArray(arraySize),
      isSorting: false,
      isMuted: true
    }
  }

  componentDidMount() {
    console.log(this.state)
  }

  updateSortConfig(sortConfig, newArray = false) {
    console.log(newArray)
    console.log(sortConfig)
    console.log(this.state.sortConfig)

    if(sortConfig.arraySize === this.state.sortConfig.arraySize) {
      this.setState({sortConfig});
    }
    if(newArray) {
      console.log("ERHEHRHERHH")
      this.setState({sortConfig, barsArray: generateBarsArray(sortConfig.arraySize)});
    }
  }

  calcMergeAnimationSpeed() {
    if( 50 >= this.state.barsArray.length && this.state.barsArray.length > 0) {
      return 12;
    } else if(100 >= this.state.barsArray.length && this.state.barsArray.length > 50) {
      return 10;
    } else if(300 >= this.state.barsArray.length && this.state.barsArray.length > 100) {
      return 6;
    }    
  }

  async mergeSort() {
    const synth = new Tone.Synth().toDestination();
    const x = this.state.barsArray;
    console.log(this.state)

    const animations = getMergeSortAnimations(x);
    console.log(this.state)
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {      
      const arrayBars = document.getElementsByClassName('aBar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? this.state.theme.comparisonBarColor : this.state.theme.mainBarColor;
        setTimeout(() => {
          if(!this.state.isSorting) return;       
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          if(i === animations.length -1) {
            this.setState({isSorting: false});
          }          
        }, i * this.state.sortConfig.sortSpeed);
      } else {
        setTimeout(() => {
          if(!this.state.isSorting) return;
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx]?.style;
          console.log(newHeight)
          if(!this.state.isMuted) {
            try {
              synth.triggerAttackRelease(newHeight, .1)
            } catch(e) {
              // Nothing
            }
          }
          barOneStyle.height = `${(newHeight / 1000)*100}%`;          
          if(i === animations.length -1) {
            this.setState({isSorting: false});
          }          
        }, i * this.state.sortConfig.sortSpeed);
      }
    }    
  }

  async heapSort() {
    const synth = new Tone.Synth().toDestination();
    const x = this.state.barsArray;
    console.log(this.state);

    const animations = getHeapSortAnimations(x);
    console.log(this.state);
    console.log(animations);    

    for(let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('aBar');

      if(animations[i].type === "compare" || animations[i].type === "compare-remove") {
        const [barOneIdx, barTwoIdx] = animations[i].indexValues;
        const barOneStyle = arrayBars[barOneIdx]?.style;
        const barTwoStyle = arrayBars[barTwoIdx]?.style;
        let color;
        if(animations[i].type === "compare") {
          color = this.state.theme.comparisonBarColor;
        }
        if(animations[i].type === "compare-remove") {
          color = this.state.theme.mainBarColor;

        }

        setTimeout(() => {
          if(!this.state.isSorting) return;
          if(barOneStyle) {
            barOneStyle.backgroundColor = color;
          }
          if(barTwoStyle) {
            barTwoStyle.backgroundColor = color;
          }
          if(i === animations.length -1) {
            this.setState({isSorting: false});
          }
        }, i * this.state.sortConfig.sortSpeed);
      } else  {
        setTimeout(() => {
          if(!this.state.isSorting) return;
          const [barOneIdx, barTwoIdx] = animations[i].indexValues;
          const [barOneHeight, barTwoHeight] = animations[i].values;                  

          // console.log(newHeight)
          if(!this.state.isMuted) {
            try {
              synth.triggerAttackRelease(barOneHeight, .1)
              synth.triggerAttackRelease(barTwoHeight, .1)
            } catch(e) {
              // Nothing
            }
          }

          if(barOneHeight && barTwoHeight) {
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.height = `${(barTwoHeight / 1000)*100}%`;
            barTwoStyle.height = `${(barOneHeight / 1000)*100}%`;
          }
          
          if(i === animations.length -1) {
            this.setState({isSorting: false});
          }      
        }, i * this.state.sortConfig.sortSpeed);
      }
    }
  }

  async bubbleSort() {
    const synth = new Tone.Synth().toDestination();
    const x = this.state.barsArray;
    console.log(this.state);

    const animations = getBubbleSortAnimations(x);
    console.log(this.state);
    console.log(animations);    

    for(let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('aBar');

      if(animations[i].type === "compare" || animations[i].type === "compare-remove") {
        const [barOneIdx, barTwoIdx] = animations[i].indexValues;
        const barOneStyle = arrayBars[barOneIdx]?.style;
        const barTwoStyle = arrayBars[barTwoIdx]?.style;
        let color;
        if(animations[i].type === "compare") {
          color = this.state.theme.comparisonBarColor;
        }
        if(animations[i].type === "compare-remove") {
          color = this.state.theme.mainBarColor;

        }

        setTimeout(() => {
          if(!this.state.isSorting) return;
          if(barOneStyle) {
            barOneStyle.backgroundColor = color;
          }
          if(barTwoStyle) {
            barTwoStyle.backgroundColor = color;
          }
          if(i === animations.length -1) {
            this.setState({isSorting: false});
          }
        }, i * this.state.sortConfig.sortSpeed);
      } else  {
        setTimeout(() => {
          if(!this.state.isSorting) return;
          const [barOneIdx, barTwoIdx] = animations[i].indexValues;
          const [barOneHeight, barTwoHeight] = animations[i].values;                  

          // console.log(newHeight)
          if(!this.state.isMuted) {
            try {
              synth.triggerAttackRelease(barOneHeight, .1)
              synth.triggerAttackRelease(barTwoHeight, .1)
            } catch(e) {
              // Nothing
            }
          }

          if(barOneHeight && barTwoHeight) {
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.height = `${(barTwoHeight / 1000)*100}%`;
            barTwoStyle.height = `${(barOneHeight / 1000)*100}%`;
          }
          
          if(i === animations.length -1) {
            this.setState({isSorting: false});
          }          
        }, i * this.state.sortConfig.sortSpeed);
      }
    }
  }

  async quickSort() {
    const synth = new Tone.Synth().toDestination();
    const x = this.state.barsArray;
    console.log(this.state);

    const animations = getQuickSortAnimations(x);
    console.log(this.state);
    console.log(animations);    

    for(let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('aBar');

      if(animations[i].type === "compare" || animations[i].type === "compare-remove") {
        const [barOneIdx, barTwoIdx] = animations[i].indexValues;
        const barOneStyle = arrayBars[barOneIdx]?.style;
        const barTwoStyle = arrayBars[barTwoIdx]?.style;
        let color;
        if(animations[i].type === "compare") {
          color = this.state.theme.comparisonBarColor;
        }
        if(animations[i].type === "compare-remove") {
          color = this.state.theme.mainBarColor;
        }

        setTimeout(() => {
          if(!this.state.isSorting) return;
          if(barOneStyle) {
            if(animations[i].values[0] !== "pivot") {
              barOneStyle.backgroundColor = color;
            }
          }
          if(barTwoStyle) {
            if(animations[i].values[1] !== "pivot") {
              barTwoStyle.backgroundColor = color;
            }
          }
          if(i === animations.length -1) {
            this.setState({isSorting: false});
          }
        }, i * this.state.sortConfig.sortSpeed);
      } else if(animations[i].type === "set-pivot" || animations[i].type === "remove-pivot") {
        const barStyle = arrayBars[animations[i].index]?.style;

        let color;
        if(animations[i].type === "set-pivot") {
          color = this.state.theme.navTextColor;
        }
        if(animations[i].type === "remove-pivot") {
          color = this.state.theme.mainBarColor;
        }

        setTimeout(() => {
          if(!this.state.isSorting) return;
          if(barStyle) {
            barStyle.backgroundColor = color;
          }
          if(i === animations.length -1) {
            this.setState({isSorting: false});
          }
        }, i * this.state.sortConfig.sortSpeed);
      }else {
        setTimeout(() => {
          if(!this.state.isSorting) return;
          const [barOneIdx, barTwoIdx] = animations[i].indexValues;
          const [barOneHeight, barTwoHeight] = animations[i].values;                  

          // console.log(newHeight)
          if(!this.state.isMuted) {
            try {
              synth.triggerAttackRelease(barOneHeight, .1)
              synth.triggerAttackRelease(barTwoHeight, .1)
            } catch(e) {
              // Nothing
            }
          }

          if(barOneHeight && barTwoHeight) {
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.height = `${(barTwoHeight / 1000)*100}%`;
            barTwoStyle.height = `${(barOneHeight / 1000)*100}%`;
          }
          
          if(i === animations.length -1) {
            this.setState({isSorting: false});
          }
        }, i * this.state.sortConfig.sortSpeed);
      }
    }
  }

  async startSort() {
    await Tone.start();
    this.setState({isSorting: true});
    console.log(this.state)
    if(this.state.sortConfig.type === "quick") {
      await this.quickSort();
    } else if(this.state.sortConfig.type === "merge") {
      await this.mergeSort()
    } else if(this.state.sortConfig.type === "heap") {
      await this.heapSort()
    } else if(this.state.sortConfig.type === "bubble") {
      await this.bubbleSort()
    }
    // this.setState({isSorting: false});
    // this.setState({barsArray: await this.mergeSort(this.state.barsArray)});
  }

  toggleMute(isMuted) {
    console.log(this.state)
    this.setState({isMuted})
  }

  render() {
    const {theme, barsArray} = this.state;
    return (
      <div id="App" style={{backgroundColor: theme.backgroundColor}}>
        {this.state.isMuted ? (
          <svg className="muteButton" onClick={() => this.toggleMute(false)} viewBox="0 0 75 75" fill={theme.navTextColor} height="18px" style={{position: "absolute", top: "7px", right: "35px"}}>
            <polygon stroke={theme.navTextColor} stroke-width="5" stroke-linejoin="round" points="39.389,13.769 22.235,28.606 6,28.606 6,47.698 21.989,47.698 39.389,62.75 "/>
            <path fill="none" stroke={theme.navTextColor} stroke-width="5" stroke-linecap="round" d="M55.081,20.537
              c3.695,4.986,5.885,11.157,5.885,17.84c0,6.62-2.151,12.737-5.788,17.698 M61.71,62.61c5.267-6.666,8.418-15.08,8.418-24.232
              c0-9.217-3.192-17.682-8.52-24.368 M48.128,49.029c1.929-3.096,3.062-6.738,3.062-10.652c0-3.978-1.164-7.674-3.146-10.8"
            />
          </svg>
        ) : (
          <svg className="muteButton" onClick={() => this.toggleMute(true)} viewBox="0 0 75 75" fill={theme.navTextColor} height="18px" style={{position: "absolute", top: "7px", right: "35px"}}>
            <polygon
              id="polygon1"
              points="39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769"
              style={{stroke: theme.navTextColor, strokeWidth: 5, strokeLinejoin: "round", fill: theme.navTextColor}}
            />
            <path
              id="path3003"
              d="M 48.651772,50.269646 69.395223,25.971024"
              style={{fill: "none",stroke: theme.navTextColor, strokeWidth: 5, strokeLinecap: "round"}}
            />
            <path
              id="path3003-1"
              d="M 69.395223,50.269646 48.651772,25.971024"
              style={{fill: "none",stroke: theme.navTextColor, strokeWidth: 5, strokeLinecap: "round"}}
            />
          </svg>
        )}
        <svg id="shuffleThemeButton" onClick={() => this.setState({theme: generateTheme()})} viewBox="0 0 512 512" height="15px" fill={theme.navTextColor} style={{position: "absolute", top: "9px", right: "10px"}}>
          <path d="M506.24,371.7l-96-80c-4.768-4-11.424-4.8-17.024-2.208c-5.632,2.656-9.216,8.288-9.216,14.496v48h-26.784
            c-22.208,0-42.496-11.264-54.272-30.08l-103.616-165.76c-23.52-37.664-64.096-60.16-108.544-60.16H0v64h90.784
            c22.208,0,42.496,11.264,54.272,30.08l103.616,165.76c23.552,37.664,64.128,60.16,108.544,60.16H384v48
            c0,6.208,3.584,11.84,9.216,14.496c2.144,0.992,4.48,1.504,6.784,1.504c3.68,0,7.328-1.248,10.24-3.712l96-80
            c3.68-3.04,5.76-7.552,5.76-12.288C512,379.252,509.92,374.74,506.24,371.7z"
          />
          <path d="M506.24,115.7l-96-80c-4.768-3.968-11.424-4.8-17.024-2.176C387.584,36.116,384,41.78,384,47.988v48h-26.784
            c-44.448,0-85.024,22.496-108.544,60.16l-5.792,9.28l37.728,60.384l22.336-35.744c11.776-18.816,32.064-30.08,54.272-30.08H384v48
            c0,6.208,3.584,11.872,9.216,14.496c2.144,0.992,4.48,1.504,6.784,1.504c3.68,0,7.328-1.28,10.24-3.712l96-80
            c3.68-3.04,5.76-7.552,5.76-12.288C512,123.252,509.92,118.74,506.24,115.7z"
          />
          <path d="M167.392,286.164l-22.304,35.744c-11.776,18.816-32.096,30.08-54.304,30.08H0v64h90.784
            c44.416,0,84.992-22.496,108.544-60.16l5.792-9.28L167.392,286.164z"
          />
        </svg>
        <a href="https://github.com/maxwellfortney" target="_blank">
          <p id="myGithubLink" style={{color: theme.navTextColor, position: "absolute", top: "-3px", left: "10px", fontSize: "13px", fontWeight: "600"}}>Built by: Maxwell Fortney</p>   
        </a>        
        <SettingsSelectors theme={theme} sortConfig={this.state.sortConfig} barsArray={this.state.barsArray} isSorting={this.state.isSorting} updateIsSorting={(x) => this.setState({isSorting: x})} updateSortConfig={(sortConfig, newArray) => this.updateSortConfig(sortConfig, newArray)} startSort={() => this.startSort()}/>
        {/* <BarsVisualizer theme={theme} sortConfig={this.state.sortConfig} barsArray={this.state.barsArray}/> */}
        <div id="BarsVisualizer">
        {barsArray && barsArray.length > 0 ? (
          <>
          {barsArray.map((bar, i) => {
            return (
              <div className="aBar" key={i} style={{height: `${(bar / 1000)*100}%`, flexGrow: "1", backgroundColor: theme.mainBarColor}}>
              </div>
            )
          })}
          </>
        ) : null}
      </div>
      </div>
    );
  }
  
}

export default App;
