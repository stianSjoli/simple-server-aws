import React, { useState, useEffect } from 'react';
import DonutChart from './DonutChart.jsx';

const DonutFigure = () => {
    const [contributorData, setContributorData] = useState([]);
    useEffect(() => {
        fetch("https://api.github.com/repos/facebook/react/stats/contributors")
            .then(res => res.json())
            .then(res => res.sort((a, b) => b.total - a.total).slice(0, 10))
            .then(res => setContributorData(res))
    }, [])
    return contributorData.length === 0 ? <div className="card" /> : <div className="card"><figure>
        <DonutChart data={contributorData} />
        <figcaption><b>Donut chart of top 10 contributors to React repository</b>. Total commits for each contributor is reflected in arch length, while colour reflect contributor.</figcaption>
    </figure></div>
}

export default DonutFigure;