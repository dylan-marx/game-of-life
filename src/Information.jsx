function Information({liveCells, generation}) {

    return (
        <div className="information-container">
            <h2>Information</h2>
            <label>Live Cells: {liveCells}</label> <br/>
            <label>Generation: {generation}</label> <br />

            <h2>How does it work</h2>
            <ol>
                <li>Click cells to activate them.</li>
                <li>Press "Start" to begin the simulation.</li>
                <li>Watch the cells evolve.</li>
            </ol>
        </div>
    )
}

export default Information;