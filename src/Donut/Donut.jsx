const Donut = ({ data }) => {
    const colors = ["#E57438", "#f8de7e", "teal", "#569dd2", "#bb1b18", "#FFBF00", "#495F75", "#E6CDAE", "#daa520", "#e4d96f"];

    const outerRadius = 100 * 0.5;
    const innerRadius = outerRadius - (outerRadius * 0.2);

    const pie = d3.pie()
        .padAngle(0.01)
        .sort((x, y) => d3.ascending(x.total, y.total))
        .value(d => d.total);

    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .cornerRadius(1.5)

    return <div className="card-donut"><svg viewBox="0 0 100 100">
        {pie(data).map((arcData, i) => <g key={i} transform={"translate(" + 50 + ", " + 50 + ")"}>
            <path fill={colors[i]} d={arc(arcData)} stroke="black" stroke-width="0.3"></path>
        </g>
        )}
        {data.map((value, i) => <g key={i} className="legend" transform={"translate(" + 40 + "," + 17 + ")"}>
            <rect x={0} y={i * 7} width={3} height={5} fill={colors[i]} stroke="black" stroke-width="0.3" />
            <text font-size="8" textAnchor="start" x={4} y={i * 7 + 3}>{value.author.login}</text>
        </g>)}
    </svg>
        <div className="fig-text">
            <figcaption><b>Donut chart of top 10 contributors to React repository</b>. Total commits for each contributor is reflected in arch length, while colour reflect contributor.</figcaption>
        </div>
    </div>
}

export default Donut;