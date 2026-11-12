import * as React from 'react';
import type * as types from 'types';
import { Link } from '../../atoms/Link';
import { Markdown } from '../../atoms/Markdown';

import MuiBox from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';

type Props = types.Footer & types.StackbitObjectId;

export const Footer: React.FC<Props> = (props) => {
  const { navLinks = [], copyrightText, 'data-sb-object-id': objectId } = props;
  const fieldPath = objectId ? `${objectId}:footer` : null;
  return (
    <MuiBox
      component="footer"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        mt: 8,
        py: 4,
        borderTop: 1,
        borderColor: 'divider'
      }}
      data-sb-field-path={fieldPath}
    >
      {navLinks.length > 0 && (
        <MuiBox
          component="nav"
          sx={{ display: 'flex', flexGrow: 1, flexWrap: 'wrap', gap: 3 }}
          data-sb-field-path=".navLinks"
        >
          {navLinks.map((link, index) => (
            <Link
              key={index}
              {...link}
              color="inherit"
              underline="hover"
              sx={{ color: 'text.secondary' }}
              data-sb-field-path={`.${index}`}
            />
          ))}
        </MuiBox>
      )}
      {copyrightText && (
        <MuiTypography component="div" color="text.secondary">
          <Markdown text={copyrightText} data-sb-field-path=".copyrightText" />
        </MuiTypography>
      )}
    </MuiBox>
  );
};
