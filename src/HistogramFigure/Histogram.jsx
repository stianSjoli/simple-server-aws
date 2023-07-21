import React from "react";

const padding = 100;
const height = 500;
const width = 700;

const VerticalAxis = ({ scale }) => {

    const ticks = scale.ticks()
        .map(value => ({ value, yOffset: scale(value) }));

    return <g className="y-axis" transform={`translate(40,0)`}>
        <path d="M 57 100 V 400" stroke="black" />
        {ticks.map(({ value, yOffset }) => {
            return <g
                key={value}
                transform={`translate(51,` + yOffset + `)`}
            >
                <line
                    x2="6"
                    stroke="black"
                />
                <text
                    key={value}
                >
                    {value}
                </text>
            </g>
        })}</g>
};

const HorizontalAxis = ({ scale }) => {

    const ticks = scale.ticks()
        .map(value => ({ value, xOffset: scale(value) }));

    return <g className="x-axis" transform={`translate(0,` + 300 + `)`}>
        <path d="M 100 100 H 600" stroke="black" />
        {ticks.map(({ value, xOffset }) => {
            return <g
                key={value}
                transform={`translate(` + xOffset + `,` + `${padding})`}
            >
                <line
                    y2="6"
                    stroke="currentColor"
                />
                <text
                    key={value}
                    y="6"
                    dy=".9em">
                    {value}
                </text>
            </g>
        })}</g>
};

const Histogram = ({ data }) => {

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.total)])
        .nice()
        .range([padding, width - padding])

    const histogram = d3.histogram()
        .value(d => d.total)
        .domain([0, d3.max(data, d => d.total) + 50])
        .thresholds(xScale.ticks(80))

    const bins = histogram(data)

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length) + 2])
        .range([height - padding, padding])
        .nice()

    return <div><svg height={height} width={width}>
        <VerticalAxis scale={yScale} />
        <HorizontalAxis scale={xScale} />
        {bins.map((bin, i) => <rect className="bin" key={i} x={xScale(bin.x0)} y={yScale(bin.length)}
            width={Math.max(0, xScale(bin.x1) - xScale(bin.x0))}
            height={yScale(0) - yScale(bin.length)} />
        )}
    </svg>
        <p className="figure-legend"><b>Histogram of React contributions</b>. The histogram shows a count of contributors, with a bin-size of 20, based on their total number of commits (x-axis) on the React repository the previous year.</p>
    </div>
};

export default Histogram;