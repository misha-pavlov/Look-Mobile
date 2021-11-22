type TValidation = {
  name: string;
  password: string;
  email: string;
};

export const validation = (values: TValidation) => {
  let errors = { name: '', email: '', password: '' };
  if (values.name.length <= 5) {
    errors.name = 'To short!';
  }
  if (values.password.length <= 8) {
    errors.password = 'To short!';
  }
  if (!values.email) {
    errors.email = 'Required!';
  } else if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
      values.email,
    )
  ) {
    errors.email = 'Invalid email format!';
  }
  return errors;
};
