/* @flow */
import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, FlatButton } from 'material-ui';
import { logout } from '../utils/auth';

type Props = {
  children?: React.Node
};

export default ({ children }:Props): React.Node => {
  return (
    <MuiThemeProvider>
      <div>
        <AppBar 
          title="React Dashboard" 
          iconElementLeft={<div></div>} 
          iconElementRight={<FlatButton label="Logout" />}
          onRightIconButtonClick={() => logout()} />
        {children}
      </div>
    </MuiThemeProvider>
  );
};
