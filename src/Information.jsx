function Information({liveCells, generation}) {

    return (
        <div className="information-container">
            <h2>Information</h2>
            <label>Live Cells: {liveCells}</label> <br/>
            <label>Generation: {generation}</label> <br />
        </div>
    )
}

export default Information;