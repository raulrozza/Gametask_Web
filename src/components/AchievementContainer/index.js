import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Services
import api from '../../services/api';
import getToken from '../../services/getToken';

// Loaders
import SkeletonLoader from "tiny-skeleton-loader-react";

// Styles
import './styles.css';

const AchievementContainer = () => {
    const [achievements, setAchievements] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [minmax, setMinmax] = useState(false);

    useEffect(() => {
        (async () => {
            try{
                const userInfo = getToken();
        
                const {data} = await api.get('/achievements', {
                  headers: {
                    Authorization: 'Bearer '+userInfo.token,
                  }
                });
        
                setAchievements(data);
                setLoadingData(false);
            }
            catch(error){
                console.error(error);
            }
        })();
    },[])

    return (
        <div className="info-box achievement-box">
            <div className={`achievement-container ${minmax ? "maximized" : ""}`}>
                {!loadingData ? achievements.map(
                    achievement => (
                        <div className="achievement" key={`achievement-${achievement._id}`}>
                            <img className="achievement-image" src={achievement.image_url} alt={`achievement-${achievement._id}-img`} />
                            <div className="achievement-name">
                                {achievement.name}
                            </div>
                        </div>
                    )
                ):(
                    [1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                        <div className="achievement" key={`achievement-skeleton-${item}`}>
                            <div className="achievement-image">
                                <SkeletonLoader height={80} circle />
                            </div>
                            <div className="achievement-name">
                                <SkeletonLoader height="100%" />
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="achievement-min-max">
                <Link to="/achievements">Gerenciar Conquistas</Link>
                <FontAwesomeIcon
                    icon={`sort-${minmax ? "up" : "down"}`}
                    onClick={() => setMinmax(!minmax)}
                    title={`${minmax ? "Minimizar" : "Maximizar"} conquistas.`}
                />
            </div>
        </div>
    );
};

export default AchievementContainer;