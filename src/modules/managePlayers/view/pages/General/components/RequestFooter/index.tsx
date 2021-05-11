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
  Information,
} from './styles';

interface RequestFooterProps {
  information?: string;
  date?: Date;
  showDetails?: () => void;
  handleAccept(): void;
  handleDecline(): void;
  className?: string;
}

const RequestFooter: React.FC<RequestFooterProps> = ({
  information,
  date,
  showDetails,
  handleAccept,
  handleDecline,
  className,
}) => (
  <Container className={className}>
    {information && <Information>{information}</Information>}

    {date && <DateText>{date.toLocaleDateString()}</DateText>}

    <div>
      {showDetails && (
        <DetailsButton
          type="button"
          title="Detalhes da Requisição"
          onClick={showDetails}
        >
          Ver Mais
        </DetailsButton>
      )}

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
