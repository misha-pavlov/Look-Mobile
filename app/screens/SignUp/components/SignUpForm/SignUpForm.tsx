import React, { useState } from 'react';
import { View } from 'react-native';
import { useFormik } from 'formik';
import { Input } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import PurpleButton from '../../../../components/PurpleButton/PurpleButton';
import { messages } from '../../../../config/messages';
import { ErrorText, InputBlock, s } from './SignUpForm.styles';
import { colors } from '../../../../config/colors';
import { validation } from '../../../../common/validation';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: values => validation(values),
    onSubmit: values => {
      console.log(values);
    },
  });

  const { handleChange, handleBlur, values, errors, touched } = formik;

  return (
    <View>
      <InputBlock>
        <Input
          placeholder="Name"
          leftIcon={<FontAwesome name="user-secret" size={24} color={colors.gray1} />}
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
          style={s.input}
          placeholderTextColor={colors.white}
        />
        {errors.name && touched.name ? <ErrorText>{errors.name}</ErrorText> : null}
      </InputBlock>
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
        {errors.email && touched.email ? <ErrorText>{errors.email}</ErrorText> : null}
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
        {errors.password && touched.password ? <ErrorText>{errors.password}</ErrorText> : null}
      </InputBlock>

      <PurpleButton text={messages.signUp} onPress={formik.handleSubmit} />
    </View>
  );
};

export default SignUpForm;
