import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Custom components
import AchievementForm from '../../components/AchievementForm';
import PageWrapper from '../../components/PageWrapper';
import Loading from '../../components/Loading';

// Services
import api from '../../services/api';
import getToken from '../../services/getToken';

import './styles.css';

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [selectedAchievement, setSelectedAchievement] = useState(null);
    const [loading, setLoading] = useState(true);
    // Edit panel
    const [showPanel, setShowPanel] = useState(false);
    // History
    const history = useHistory();

    const editAchievement = (id) => {
        const achievement = achievements.find(achievement => achievement._id === id);

        if(showPanel && achievement !== selectedAchievement){
            setSelectedAchievement(achievement);
            return;
        }
        setSelectedAchievement(achievement);
        setShowPanel(!showPanel);
    }

    const createAchievement = () => {
        setSelectedAchievement(null);
        setShowPanel(true);
    }

    useEffect(() => {
        (async () => {
            try{
                const userInfo = getToken();
                if(!userInfo)
                  history.push('/');
        
                const {data} = await api.get('/achievements', {
                  headers: {
                    Authorization: 'Bearer '+userInfo.token,
                  }
                });
        
                setAchievements(data);
                setLoading(false);
            }
            catch(error){
                const { response: { data } } = error;
                console.error(error);
        
                if(data.error === "TokenExpiredError: jwt expired"){
                  localStorage.removeItem('loggedUser');
                  history.push('/')
                }
            }
        })();
    },[history])

    return (
        <PageWrapper title="Conquistas">
            {!loading ? (
                <>
                    <div className="row">
                        <div className={`achievement-container ${showPanel ? "reduced" : ""}`}>
                            {achievements.map(achievement => (
                                <div key={achievement._id} className="achievement">
                                    <img className="achievement-image" src={achievement.image_url} alt={`achievement-${achievement._id}-img`} />
                                    <div className="achievement-name">
                                        {achievement.name}
                                        {achievement.title ? <span className="title"> [{achievement.title.name}]</span> : ""}
                                    </div>
                                    <div className="achievement-description">
                                        {achievement.description}
                                    </div>
                                    <button className="delete-button" title="Excluir conquista">
                                        <FontAwesomeIcon icon="times" />
                                    </button>
                                    <button className="edit-button" title="Editar conquista" onClick={() => editAchievement(achievement._id)}>
                                        <FontAwesomeIcon icon="edit" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className={`achievement-editor ${showPanel ? "shown" : ""}`}>
                            <AchievementForm achievement={selectedAchievement} />
                        </div>
                    </div>
                    <footer>
                        <button onClick={createAchievement}>Nova Conquista</button>
                    </footer>
                </>
            ):(
                <div className="achievement-loader">
                    <Loading />
                </div>
            )}
        </PageWrapper>
    );
}

export default Achievements;