function Input({ setRows, setCols, setSpeed }) {
    return (
        <div className="input-form">
            <h2>Inputs for grid</h2>
            <label>Rows:</label>
            <input type="number" id="num-rows" defaultValue={20}></input>
            <label>Columns:</label>
            <input type="number" id="num-columns" defaultValue={20}></input>
            <label>Speed:</label>
            <button onClick={() => {
                let rows = Number(document.getElementById("num-rows").value);
                let cols = Number(document.getElementById("num-columns").value);

                setCols(cols);
                setRows(rows);
            }}>Apply Changes</button>
            <div className="radio-container" style={{marginBottom:"8px"}}>
                
                <label htmlFor="100-speed">
                    <input type="radio" id="100-speed" name="speed" value="100"
                    onChange={(e) => setSpeed(Number(e.target.value))}/>
                    100ms
                </label>

                <label htmlFor="250-speed">
                    <input type="radio" id="250-speed" name="speed" value="250" checked
                    onChange={(e) => setSpeed(Number(e.target.value))}/>
                    250ms
                </label>
                
                <label htmlFor="500-speed">
                    <input type="radio" id="500-speed" name="speed" value="500"
                    onChange={(e) => setSpeed(Number(e.target.value))}/>
                    500ms
                </label>

                
                <label htmlFor="1000-speed">
                    <input type="radio" id="1000-speed" name="speed" value="1000"
                    onChange={(e) => setSpeed(Number(e.target.value))} />
                    1000ms
                </label>
            </div>
            
        </div>
    )
}

export default Input;