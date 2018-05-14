/* @flow */
import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

type Props = {
  children?: React.Node
};

export default ({ children }:Props): React.Node => {
  return (
    <MuiThemeProvider>
      <div>
        <AppBar title="React Dashboard" />
        {children}
      </div>
    </MuiThemeProvider>
  );
};
