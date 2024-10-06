import { useState } from "react";

function Input({ setRows, setCols, setSpeed }) {
    const [speed, setLocalSpeed] = useState(250);

    return (
        <div className="input-form">
            <h2>Inputs</h2>
            <label>Rows:</label>
            <input type="number" id="num-rows" defaultValue={20} onChange={(e) => {setRows(e.target.value)}} min="1" max="200"></input>
            <label>Columns:</label>
            <input type="number" id="num-columns" defaultValue={20} onChange={(e) => {setCols(e.target.value)}} min="1" max="50"></input>
            
            <label>Speed:</label>
            <div className="radio-container" style={{marginBottom:"8px"}}>
            <label htmlFor="100-speed">
                    <input type="radio" id="25-speed" name="speed" value="25" checked={speed === 25}
                        onChange={(e) => {
                            setSpeed(Number(e.target.value));
                            setLocalSpeed(Number(e.target.value));
                        }}
                    />
                    Very Fast
                </label>
                <label htmlFor="100-speed">
                    <input type="radio" id="100-speed" name="speed" value="100" checked={speed === 100}
                        onChange={(e) => {
                            setSpeed(Number(e.target.value));
                            setLocalSpeed(Number(e.target.value));
                        }}
                    />
                    Fast
                </label>

                <label htmlFor="250-speed">
                    <input type="radio" id="250-speed" name="speed" value="250" checked={speed === 250}
                    onChange={(e) => {
                        setSpeed(Number(e.target.value));
                        setLocalSpeed(Number(e.target.value));
                        }}
                    />
                    Medium
                </label>
                
                <label htmlFor="500-speed">
                    <input type="radio" id="500-speed" name="speed" value="500" checked={speed === 500}
                    onChange={(e) => {
                        setSpeed(Number(e.target.value));
                        setLocalSpeed(Number(e.target.value));
                        }}
                    />
                    Slow
                </label>

                
                <label htmlFor="1000-speed">
                    <input type="radio" id="1000-speed" name="speed" value="1000" checked={speed === 1000}
                    onChange={(e) => {
                        setSpeed(Number(e.target.value));
                        setLocalSpeed(Number(e.target.value));
                        }} 
                    />
                    Very Slow
                </label>
            </div>
            
        </div>
    )
}

export default Input;