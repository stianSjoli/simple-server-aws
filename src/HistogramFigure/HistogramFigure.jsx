import { React, useEffect, useState } from "react";
import Histogram from './Histogram.jsx';

const HistogramFigure = () => {
    const [contributorData, setContributorData] = useState([]);
    console.log(contributorData);

    useEffect(() => {
        fetch("https://api.github.com/repos/facebook/react/stats/contributors")
            .then(res => {
                console.log(res.json());
                return res.json();
            })
            .then(res => setContributorData(res))
    }, [])
    return contributorData.length === 0 ? <div className="card"></div> : <div className="card"><Histogram data={contributorData} /></div>
}

export default HistogramFigure;