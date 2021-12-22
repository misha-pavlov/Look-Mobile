import React, { useCallback, useState } from 'react';
import { TUserProfile } from './UserProfile.types';
import { UserProfileContainer } from './UserProfile.styles';
import UserProfileHeader from './components/UserProfileHeader/UserProfileHeader';
import ShowMore from './components/ShowMore/ShowMore';
import AddButtonText from '../../components/AddButtonText/AddButtonText';
import { messages } from '../../config/messages';
import AddDescription from './components/AddDescription/AddDescription';

const UserProfile: React.FC<TUserProfile> = ({ currentUser }) => {
  const [showInput, setShowInput] = useState(false);

  const description = useCallback(() => {
    if (showInput) {
      return (
        <AddDescription
          value={currentUser.description}
          userId={currentUser._id}
          onPress={() => setShowInput(!showInput)}
        />
      );
    } else {
      if (currentUser.description === '') {
        return <AddButtonText text={messages.addDesc} onPress={() => setShowInput(!showInput)} />;
      }

      return <ShowMore value={currentUser.description} onPress={() => setShowInput(!showInput)} />;
    }
  }, [currentUser, showInput]);

  return (
    <UserProfileContainer>
      <UserProfileHeader currentUser={currentUser} />
      {description()}
    </UserProfileContainer>
  );
};

export default UserProfile;
