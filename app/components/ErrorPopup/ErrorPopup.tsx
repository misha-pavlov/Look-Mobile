import React from 'react';
import { TErrorPopup } from './ErrorPopup.types';
import { ErrorBlock, ErrorContainer, ErrorText } from './ErrorPopup.styles';

const ErrorPopup: React.FC<TErrorPopup> = ({ text }) => {
  return (
    <ErrorContainer>
      <ErrorBlock>
        <ErrorText>{text}</ErrorText>
      </ErrorBlock>
    </ErrorContainer>
  );
};

export default ErrorPopup;
