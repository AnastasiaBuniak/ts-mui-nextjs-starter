import * as React from 'react';
import type * as types from 'types';
import { useAuth } from '../../context/AuthContext';
import { UserHeader } from './UserHeader';
import { Header as HeaderComponent } from './Header';

export type Props = types.Header & types.StackbitObjectId;

export const Header: React.FC<Props> = (props) => {
  const { user } = useAuth();

  if (user) {
    return <UserHeader user={user} {...props} />;
  }
  return <HeaderComponent {...props} />;
};
