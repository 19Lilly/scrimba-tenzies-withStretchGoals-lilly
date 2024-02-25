import React from "react"

function FirstDie(){
    return (
        <div className="first-face">
            <span className="pip"></span>
        </div>
    )
}

function SecondDie (){
    return (
        <div className="second-face">
            <span className="pip"></span>
            <span className="pip"></span>
        </div>
    )
}

 function ThirdDie(){
    return(
        <div className="third-face">
            <span className="pip"></span>
            <span className="pip"></span>
            <span className="pip"></span>
        </div>
    )
}

 function FourthDie(){
    return (
        <div className="fourth-face">
            <div className="column">
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
            <div className="column">
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
        </div>
    )
}

function FifthDie(){
    return(
        <div className="fifth-face">
            <div className="column">
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
            <div className="column">
                <span className="pip"></span>
            </div>
            <div className="column">
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
        </div>
    )
}

function SixthDie(){
    return(
        <div className="sixth-face">
            <div className="column">
                <span className="pip"></span>
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
            <div className="column">
                <span className="pip"></span>
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
        </div>
    )
}


module.exports = {FirstDie, SecondDie, ThirdDie, FourthDie, FifthDie, SixthDie}