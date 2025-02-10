import * as React from 'react';
import type * as types from 'types';
import { Link } from '../../atoms/Link';

import { Button } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MuiBox from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';
import { handleScrollToSection } from 'src/utils/scroll';

export type Props = types.Header & types.StackbitObjectId;

export const Header: React.FC<Props> = (props) => {
    const { title, navLinks = [], 'data-sb-object-id': objectId } = props;
    const fieldPath = objectId ? `${objectId}:header` : null;
    return (
        <MuiAppBar position="static" color="transparent" elevation={0} data-sb-field-path={fieldPath}>
            <MuiToolbar disableGutters={true} sx={{ flexWrap: 'wrap' }}>
                {title && (
                    <MuiBox sx={{ mb: 1, mr: 2, flexGrow: 1 }}>
                        <MuiTypography component="p" variant="h6" color="text.primary" noWrap data-sb-field-path=".title">
                            {title}
                        </MuiTypography>
                    </MuiBox>
                )}
                {navLinks.length > 0 && (
                    <MuiBox component="nav" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }} data-sb-field-path=".navLinks">
                        {navLinks.map(({ isAnchor, ...link }, index) =>
                            isAnchor ? (
                                <Button
                                    key={index}
                                    variant="text"
                                    component="a"
                                    size="large"
                                    onClick={handleScrollToSection(link.url)}
                                    data-sb-field-path={`.${index}`}
                                    sx={{ padding: 0, textTransform: 'none' }}
                                >
                                    {link.label}
                                </Button>
                            ) : (
                                <Link
                                    key={index}
                                    {...link}
                                    sx={{
                                        ...(index !== navLinks.length - 1 && { mr: 2 }),
                                        mb: 1
                                    }}
                                    data-sb-field-path={`.${index}`}
                                />
                            )
                        )}
                    </MuiBox>
                )}
            </MuiToolbar>
        </MuiAppBar>
    );
};
