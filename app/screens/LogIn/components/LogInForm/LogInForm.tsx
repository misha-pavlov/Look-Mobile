import React, { useState } from 'react';
import { View } from 'react-native';
import { useFormik } from 'formik';
import { Input } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import PurpleButton from '../../../../components/PurpleButton/PurpleButton';
import { messages } from '../../../../config/messages';
import { InputBlock, s } from '../../../SignUp/components/SignUpForm/SignUpForm.styles';
import { colors } from '../../../../config/colors';

const LogInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      console.log(values);
    },
  });

  const { handleChange, handleBlur, values } = formik;

  return (
    <View>
      <InputBlock>
        <Input
          placeholder="Email"
          leftIcon={<Entypo name="email" size={24} color={colors.gray1} />}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          style={s.input}
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholderTextColor={colors.white}
        />
      </InputBlock>
      <InputBlock>
        <Input
          placeholder="Password"
          leftIcon={<Ionicons name="lock-closed" size={24} color={colors.gray1} />}
          rightIcon={
            showPassword ? (
              <MaterialIcons
                name="visibility-off"
                size={24}
                color={colors.gray1}
                onPress={() => setShowPassword(!showPassword)}
              />
            ) : (
              <MaterialIcons
                name="visibility"
                size={24}
                color={colors.gray1}
                onPress={() => setShowPassword(!showPassword)}
              />
            )
          }
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          style={s.input}
          secureTextEntry={!showPassword}
          placeholderTextColor={colors.white}
        />
      </InputBlock>

      <PurpleButton text={messages.signUp} onPress={formik.handleSubmit} />
    </View>
  );
};

export default LogInForm;
