import React, { useState, useEffect } from 'react';
import Donut from '../Donut/Donut.jsx';

const App = () => {
    const [contributorData, setContributorData] = useState([]);
    useEffect(() => {
        fetch("https://api.github.com/repos/facebook/react/stats/contributors")
            .then(res => res.json())
            .then(res => setContributorData(res))
    }, [])

    return <div id="page">
        <h1>Github Statistics</h1>
        {
            contributorData.length === 0 ? <div>
                <div className="card-donut" />
            </div>
                : <div>
                    <figure>
                        <Donut data={contributorData.sort((a, b) => b.total - a.total).slice(0, 10)} />
                    </figure>
                </div>
        }
    </div>
};

export default App;
