import React from "react"
import {FirstDie, SecondDie, ThirdDie, FourthDie, FifthDie, SixthDie} from "./DiceFaces"


export default function Die(props) {
    let diceFace = ""
    switch(props.value){
        case 1: 
            diceFace = <FirstDie />
            break;
        case 2:
            diceFace = <SecondDie />
            break;
        case 3: 
            diceFace = <ThirdDie /> 
            break;
        case 4: 
            diceFace = <FourthDie />
            break;
        case 5: 
            diceFace = <FifthDie />
            break;
        case 6: 
            diceFace = <SixthDie />
            break;
    }
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            {diceFace}
            
        </div>
    )
}