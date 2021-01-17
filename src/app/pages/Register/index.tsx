import React from 'react';

import { ControlGroup } from '@blueprintjs/core/lib/esm/components/forms/controlGroup';
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup';
import { Classes, Intent } from '@blueprintjs/core';
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { NavBarNames } from '../routes';
import NavBar from '../../components/NavBar';

import s from './Register.module.scss';

import { IRegister } from './interfaces/IRegister';
import { fetchRegister } from '../../features/register/@slice';
import { IRegisterRequest } from '../../utils/request/IRegisterRequest';
import CTFToaster from '../../components/CTFToaster/CTFToaster';

const Register: React.FC = () => {
  const dispatch = useDispatch();

  const [values, setValues] = React.useState<IRegister>({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    email: '',
  });

  const handleChange = (prop: keyof IRegister) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const validationPasswords = (values: IRegister) => {
    let hasError = false;
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      hasError = true;
    }
    return hasError;
  };

  const sendRegisterForm = () => {
    if (validationPasswords(values)) {
      CTFToaster.show({ message: 'Пароли не совпадают', intent: Intent.DANGER, icon: 'warning-sign' });
    } else {
      const data: IRegisterRequest = {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        password: values.password,
        email: values.email,
      };
      dispatch(fetchRegister(data));
    }
  };

  return (
    <div>
      <NavBar name={NavBarNames.REGISTER} />
      <div className={s.center}>
        <ControlGroup className={classNames(s.width)} vertical>
          <InputGroup className={Classes.LARGE} placeholder="Enter firstname" onChange={handleChange('firstName')} />
          <InputGroup className={Classes.LARGE} placeholder="Enter lastname" onChange={handleChange('lastName')} />
          <InputGroup className={Classes.LARGE} placeholder="Enter email" onChange={handleChange('email')} />
          <InputGroup className={Classes.LARGE} placeholder="Enter username" onChange={handleChange('username')} />
          <InputGroup className={Classes.LARGE} placeholder="Enter password" onChange={handleChange('password')} />
          <InputGroup
            className={Classes.LARGE}
            placeholder="Confirm password"
            onChange={handleChange('confirmPassword')}
          />
          <Button
            className={classNames(Classes.LARGE, s.text)}
            text="Sign Up"
            onClick={() => {
              sendRegisterForm();
            }}
          />
        </ControlGroup>
      </div>
    </div>
  );
};

export default Register;
