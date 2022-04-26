import React from 'react';
import { useParams } from 'react-router-dom';
import ComponentsForm from '../../components/Form/Escalacao';
import UIContainer from '../../components/UI/Container/Container';

const PagesForm = () => {
  const { id } = useParams();
  return (
    <UIContainer>
      <ComponentsForm id={id} />
    </UIContainer>
  );
}

export default PagesForm;