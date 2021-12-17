import React, { Dispatch, SetStateAction, useState } from 'react';
import uuid from 'react-native-uuid';
import { AddTagBlock, AddTagButton, AddTagInput, AddTagText } from './AddTagForm.styles';
import { messages } from '../../../config/messages';
import { TTags } from '../../../types/customTypes';

type TAddTagForm = {
  tags: TTags;
  setTags: Dispatch<SetStateAction<{ tags: TTags }>>;
};

const AddTagForm: React.FC<TAddTagForm> = ({ setTags, tags }) => {
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = () => {
    const newTag = { _id: uuid.v4(), title: tagInput } as { _id: string; title: string };
    setTags({ tags: [...tags, newTag] });
    setTagInput('');
  };

  return (
    <AddTagBlock>
      <AddTagInput value={tagInput} onChangeText={e => setTagInput(e)} />
      <AddTagButton onPress={handleSubmit}>
        <AddTagText>{messages.addTag}</AddTagText>
      </AddTagButton>
    </AddTagBlock>
  );
};

export default AddTagForm;
