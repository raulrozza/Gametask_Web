import React from 'react';
import PropTypes from 'prop-types';

// Loaders
import SkeletonLoader from "tiny-skeleton-loader-react";

// Styles
import './styles.css';

const Ranking = ({ ranking }) => {
    return (
        <div className="info-box ranking">
            <ul>
                <li className="list-title"><div className="points">Pontuação</div><div className="name">Jogador</div></li>
                {ranking.length > 0 ?
                    ranking.map(item => (
                        <li><div className="points">1000</div><div className="name">{item}</div></li>
                    ))
                :   (
                    <>
                        <li><div className="points"><SkeletonLoader /></div><div className="name"><SkeletonLoader /></div></li>
                        <li><div className="points"><SkeletonLoader /></div><div className="name"><SkeletonLoader /></div></li>
                        <li><div className="points"><SkeletonLoader /></div><div className="name"><SkeletonLoader /></div></li>
                        <li><div className="points"><SkeletonLoader /></div><div className="name"><SkeletonLoader /></div></li>
                        <li><div className="points"><SkeletonLoader /></div><div className="name"><SkeletonLoader /></div></li>
                    </>
                )}
            </ul>
        </div>
    );
}

Ranking.propTypes = {
    ranking: PropTypes.array.isRequired,
}

export default Ranking;