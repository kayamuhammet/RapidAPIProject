import React from 'react';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="text-red-500 text-sm text-center p-4">
      {message || 'Bir hata oluştu'}
    </div>
  );
};

export default ErrorMessage;