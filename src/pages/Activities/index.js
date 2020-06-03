import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Custom components
import ActivityForm from '../../components/Activities/ActivityForm';
import PageWrapper from '../../components/PageWrapper';
import Loading from '../../components/Loading';

// Services
import api from '../../services/api';
import getToken from '../../services/getToken';

// Utils
import { addItemToArray, updateItemInArray, removeItemFromArray } from '../../utils/arrayMethods';

import './styles.css';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  // Edit panel
  const [showPanel, setShowPanel] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  // History
  const history = useHistory();

  const createActivity = () => {
    setSelectedActivity(null);
    setShowPanel(true);
  }

  const editActivity = (id) => {
    const activity = activities.find(activity => activity._id === id);

    if(showPanel && (!selectedActivity || activity._id !== selectedActivity._id)){
      setSelectedActivity(activity);
      return;
    }
    setSelectedActivity(activity);
    setShowPanel(!showPanel);
  }

  const deleteActivity = async (id) => {
    const response = window.confirm("Deseja mesmo excluir esta atividade? Esta ação não pode ser desfeita.");
    if(response){
      setLoading(true);
      try{
        const userInfo = getToken();
        await api.delete(`/activity/${id}`, {
          headers: {
            Authorization: 'Bearer '+userInfo.token,
          }
        });

        const index = activities.findIndex(item => item._id === id);
        setActivities(removeItemFromArray(activities, index));
      }
      catch(error){
        console.error(error);
      }
      
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      try{
        const userInfo = getToken();
        if(!userInfo)
          history.push('/');

        const {data} = await api.get('/activities', {
          headers: {
            Authorization: 'Bearer '+userInfo.token,
          }
        });

        setActivities(data);
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
  }, [history]);
  
  const onSubmit = async ({ activity, type }) => {
    switch(type){
      case 'create':
        setActivities(addItemToArray(activities, activity));
        setShowPanel(false);
      break;
      case 'update':
        try{
          const userInfo = getToken();

          const { data } = await api.get(`/activity/${activity}`, {
            headers: {
              Authorization: 'Bearer '+userInfo.token,
            }
          });

          const index  = activities.findIndex(item => item._id === activity);
          setActivities(updateItemInArray(activities, data, index));
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
    <PageWrapper title="Atividades">
      {!loading ? (
        <>
        <div className="row">
          <div className={`${showPanel ? "reduced" : ""}`}>
            <div className={`activity-container`}>
              {activities.map(activity => (
                <div
                  key={activity._id}
                  className={`activity ${!activity.description && !activity.dmRules ? "center" : ""}`}
                >
                  <div className="activity-xp">
                    {activity.experience} XP
                  </div>
                  <div className="activity-name">
                    {activity.name}
                  </div>
                  {activity.description && (
                    <div className="activity-description">
                      {activity.description}
                    </div>
                  )}
                  {activity.dmRules && (
                    <div className="activity-rules">
                      Regras: <cite>{activity.dmRules}</cite>
                    </div>
                  )}
                  <button className="delete-button" title="Excluir conquista" onClick={() => deleteActivity(activity._id)}>
                    <FontAwesomeIcon icon="times" />
                  </button>
                  <button className="edit-button" title="Editar conquista" onClick={() => editActivity(activity._id)}>
                    <FontAwesomeIcon icon="edit" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className={`editor ${showPanel ? "shown" : ""}`}>
              <ActivityForm activity={selectedActivity} submitCallback={onSubmit} />
          </div>
        </div>
        <footer>
          <button onClick={createActivity}>
            <span>Nova Atividade</span>
            <span className="plus-icon"><FontAwesomeIcon icon="plus" /></span>
          </button>
        </footer>
      </>
      ):(
        <div className="loader">
          <Loading />
        </div>
      )}
    </PageWrapper>
  );
}

export default Activities;
