import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// feel free to use this if you like it
export const BurhanGlobalTheme = createMuiTheme({
    typography: {
        htmlFontSize: 18,
        h6: {
            lineHeight: 1.2
        },
        body1: {
            lineHeight: 1.2,
            paddingTop: 4
        },
        overline: {
            fontSize: '1.1rem'
        },
    }
})