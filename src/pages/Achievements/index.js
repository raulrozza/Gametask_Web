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

// Utils
import { addItemToArray, updateItemInArray } from '../../utils/arrayMethods';

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

        if(showPanel && (!selectedAchievement || achievement._id !== selectedAchievement._id)){
            setSelectedAchievement({ ...achievement, image: achievement.image_url });
            return;
        }
        setSelectedAchievement({ ...achievement, image: achievement.image_url });
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
                if(error.response){
                    const { data } = error.response;
                    console.error(data);
        
                    if(data.error === "TokenExpiredError: jwt expired"){
                        localStorage.removeItem('loggedUser');
                        history.push('/')
                    }
                }
                console.error(error);
            }
        })();
    },[history])

    const onSubmit = async ({ achievement, type }) => {
        switch(type){
            case 'create':
                setAchievements(addItemToArray(achievements, achievement));
                setShowPanel(false);
                break;
            case 'update':
                try{
                    const userInfo = getToken();

                    const { data } = await api.get(`/achievement/${achievement}`, {
                        headers: {
                          Authorization: 'Bearer '+userInfo.token,
                        }
                    });

                    const index  = achievements.findIndex(item => item._id === achievement);
                    setAchievements(updateItemInArray(achievements, data, index));
                    setShowPanel(false);
                }
                catch(error){
                    console.error(error);
                }
                break;
            default:
        }
    }

    return (
        <PageWrapper title="Conquistas">
            {!loading ? (
                <>
                    <div className="row">
                        <div className={`${showPanel ? "reduced" : ""}`}>
                            <div className={`achievement-container`}>
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
                        </div>
                        <div className={`achievement-editor ${showPanel ? "shown" : ""}`}>
                            <AchievementForm achievement={selectedAchievement} submitCallback={onSubmit} />
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