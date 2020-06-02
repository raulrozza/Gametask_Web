import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Custom components
import PageWrapper from '../../components/PageWrapper';
import Loading from '../../components/Loading';

// Services
import api from '../../services/api';
import getToken from '../../services/getToken';

import './styles.css';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  // Edit panel
  const [showPanel, setShowPanel] = useState(false);
  // History
  const history = useHistory();

  const createActivity = () => {
    setShowPanel(true);
  }

  const editActivity = () => {
    setShowPanel(!showPanel);
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

  return (
    <PageWrapper title="Atividades">
      {!loading ? (
        <>
        <div className="row">
          <div className={`${showPanel ? "reduced" : ""}`}>
            <div className={`activity-container`}>
              {activities.map(activity => (
                <div key={activity._id} className="activity">
                  <div className="activity-name">
                    {activity.name}
                  </div>
                  <div className="activity-description">
                    {activity.description}
                  </div>
                  <button className="delete-button" title="Excluir conquista" onClick={() => {}}>
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
              Editar
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
