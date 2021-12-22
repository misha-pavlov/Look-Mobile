import React, { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { AddDescriptionBlock, PurpleInput } from './AddDescription.styles';
import { messages } from '../../../../config/messages';
import AddButtonText from '../../../../components/AddButtonText/AddButtonText';
import { SET_DESCRIPTION } from './gql/AddDescription.mutations';

const AddDescription = ({ value, userId, onPress }: { value: string; userId: string; onPress: VoidFunction }) => {
  const [text, setText] = useState(value);
  const [mutate] = useMutation(SET_DESCRIPTION, {
    onError: error => console.log('SET_DESCRIPTION = ', error),
  });

  const onSubmit = useCallback(async () => {
    await mutate({
      variables: {
        userId,
        newDesc: text,
      },
    });
    onPress();
  }, [onPress, text]);

  return (
    <AddDescriptionBlock>
      <PurpleInput multiline value={text} onChangeText={e => setText(e)} />
      <AddButtonText text={messages.addDesc} onPress={onSubmit} />
    </AddDescriptionBlock>
  );
};

export default AddDescription;
