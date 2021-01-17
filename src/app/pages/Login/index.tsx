import React from 'react';

import { Classes } from '@blueprintjs/core';
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons';
import { ControlGroup } from '@blueprintjs/core/lib/esm/components/forms/controlGroup';
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup';

import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';
import { NavBarNames } from '../routes';

import s from './Login.module.scss';
import { ILogin } from './interfaces/ILogin';
import { fetchLogin, selectors } from '../../features/login/@slice';
import auth from '../../utils/auth';
import { ILoginRequest } from '../../utils/request/ILoginRequest';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectors.tokenSelector);

  const [values, setValues] = React.useState<ILogin>({
    username: '',
    password: '',
    showPassword: false,
  });

  React.useEffect(() => {
    if (token) {
      auth.login(token);
    }
  }, [token]);

  const handleChange = (prop: keyof ILogin) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const sendLoginForm = () => {
    const data: ILoginRequest = {
      username: values.username,
      password: values.password,
    };
    dispatch(fetchLogin(data));
  };

  return (
    <div>
      <NavBar name={NavBarNames.LOGIN} />
      <div className={s.center}>
        <ControlGroup className={classNames(s.width)} vertical>
          <InputGroup className={Classes.LARGE} placeholder="Username" onChange={handleChange('username')} />
          <InputGroup className={Classes.LARGE} placeholder="Password" onChange={handleChange('password')} />
          <Button
            className={classNames(Classes.LARGE, s.text)}
            text="Sign In"
            type="submit"
            onClick={() => {
              sendLoginForm();
            }}
          />
        </ControlGroup>
      </div>
      <Link className={classNames(s.center, s.link)} to="#">
        Forgot your password?
      </Link>
    </div>
  );
};

export default Login;
