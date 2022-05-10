import React from 'react';

import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { routes } from 'routes/routes';

import { Form, LoginTextField } from './styled';

export function LoginForm() {
  const navigate = useNavigate();

  const LoginSearchSchema: any = Yup.object().shape({
    login: Yup.string().required('This field is required'),
  });

  const formik = useFormik({
    initialValues: { login: '' },
    validateOnBlur: false,

    validationSchema: LoginSearchSchema,
    onSubmit: () => {
      navigate(`${routes.results}/${formik.values.login}`);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} data-testid="login-form">
      <LoginTextField
        name="login"
        label="Login"
        error={!!formik.errors.login}
        helperText={formik.errors.login}
        onBlur={formik.handleBlur}
        onFocus={() => formik.setFieldError('login', '')}
        value={formik.values.login}
        onChange={formik.handleChange}
      />
      <Button variant="contained" type="submit" fullWidth>
        Search
      </Button>
    </Form>
  );
}
