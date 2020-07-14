import React, { useState, useEffect } from 'react';

// Components
import Loading from '../Loading';
import Modal from '../Modal';

// Icons
import { FaCheck, FaTrashAlt } from 'react-icons/fa';

// Services
import api from '../../services/api';

// Utils
import { removeItemFromArray } from '../../utils/arrayMethods';

// Assets
import userPlaceholder from '../../assets/img/users/placeholder.png';

import './styles.css';

const Players = () => {
  // States
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      try{
        const response = await api.get('activityRegisters');

        setRequests(response.data);
        setLoading(false);
      } catch(error){
        console.error(error);
      }
    })();
  }, []);

  const handleDeleteRegister = id => {
    if(window.confirm("Deseja realmente excluir esta requisição?")){
      try {
        api.delete(`/activityRegister/${id}`);

        setRequests(
          removeItemFromArray(
            requests,
            requests.findIndex(request => request._id === id)
          )
        );
      } catch(error) {
        console.error(error);
      }
    }
  }

  const handleShowDetails = request => {
    setSelectedRequest(request);
    setShowModal(true);
  }

  return (
    <div className="requests-container">
      {
      loading
      ? <Loading />
      : (
        <>
          <ul className="request-list">
            {requests.map(({ requester: user, activity, ...request }) => (
              <li className="request" key={request._id}>
                <section className="main">
                  <img
                    src={user.image
                      ? user.profile_img
                      : userPlaceholder
                    }
                    alt={user.name}
                  />

                  <div>
                    <span className="title">
                      <strong>{user.firstname}</strong>
                      {` | `}
                      <strong>{activity.name} ({activity.experience} XP)</strong>
                    </span>

                    <span className="info">{request.information}</span>
                  </div>
                </section>
                <footer>
                  <span>{(new Date(request.requestDate)).toLocaleDateString()}</span>
                  <div>
                    <button
                      className="details"
                      type="button"
                      title="Detalhes da Requisição"
                      onClick={() => handleShowDetails({
                        ...request,
                        requester: user,
                        activity
                      })}
                    >
                      Ver Mais
                    </button>
                    <button className="confirm" type="button" title="Aceitar Requisição"><FaCheck /></button>
                    <button
                      className="delete"
                      type="button"
                      title="Remover Requisição"
                      onClick={() => handleDeleteRegister(request._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </footer>
              </li>
            ))}
          </ul>
          {showModal && (
            <Modal closeModal={() => setShowModal(false)} title="Atividade">
              {JSON.stringify(selectedRequest)}
            </Modal>
          )}
        </>
      )}
    </div>
  )
}

export default Players;
