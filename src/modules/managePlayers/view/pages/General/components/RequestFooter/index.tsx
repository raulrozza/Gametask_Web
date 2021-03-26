import React from 'react';

// Icons
import { FaCheck, FaTrashAlt } from 'react-icons/fa';

// Styles
import {
  ConfirmButton,
  Container,
  DateText,
  DeleteButton,
  DetailsButton,
} from './styles';

interface RequestFooterProps {
  date: Date;
  showDetails(): void;
  handleAccept(): void;
  handleDecline(): void;
}

const RequestFooter: React.FC<RequestFooterProps> = ({
  date,
  showDetails,
  handleAccept,
  handleDecline,
}) => (
  <Container>
    <DateText>{date.toLocaleDateString()}</DateText>

    <div>
      <DetailsButton
        type="button"
        title="Detalhes da Requisição"
        onClick={showDetails}
      >
        Ver Mais
      </DetailsButton>

      <ConfirmButton
        type="button"
        title="Aceitar Requisição"
        onClick={handleAccept}
      >
        <FaCheck />
      </ConfirmButton>

      <DeleteButton
        type="button"
        title="Remover Requisição"
        onClick={handleDecline}
      >
        <FaTrashAlt />
      </DeleteButton>
    </div>
  </Container>
);

export default RequestFooter;
