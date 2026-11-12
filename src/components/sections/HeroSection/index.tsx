import * as React from 'react';
import type * as types from 'types';
import Image from 'next/image';

import { Markdown } from '../../atoms/Markdown';

import Button from '@mui/material/Button';
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import MuiStack from '@mui/material/Stack';
import MuiTypography from '@mui/material/Typography';
import { handleScrollToSection } from 'src/utils/scroll';

export type Props = types.HeroSection & types.StackbitFieldPath;

export const HeroSection: React.FC<Props> = (props) => {
  const {
    title,
    subtitle,
    text,
    image,
    actions = [],
    'data-sb-field-path': fieldPath
  } = props;
  const hasTextContent = !!title || !!subtitle || !!text || actions.length > 0;

  return (
    <MuiBox sx={{ py: { xs: 6, md: 10 } }} data-sb-field-path={fieldPath}>
      <MuiGrid container spacing={6} alignItems="center">
        {hasTextContent && (
          <MuiGrid item xs={12} md={image?.url ? 6 : 12}>
            {title && (
              <MuiTypography
                component="h1"
                variant="h1"
                color="text.primary"
                data-sb-field-path=".title"
                sx={{
                  fontSize: { xs: '2.75rem', md: '3.5rem' },
                  maxWidth: 640
                }}
              >
                {title}
              </MuiTypography>
            )}
            {subtitle && (
              <MuiTypography
                component="p"
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  ...(!!title && { mt: 2.5 }),
                  maxWidth: 520
                }}
                data-sb-field-path=".subtitle"
              >
                {subtitle}
              </MuiTypography>
            )}
            {text && (
              <MuiTypography
                component="div"
                color="text.secondary"
                maxWidth="md"
              >
                <Markdown text={text} data-sb-field-path=".text" />
              </MuiTypography>
            )}
            {actions.length > 0 && (
              <MuiStack
                sx={{
                  ...(!!(title || subtitle || text) && { mt: 4 }),
                  gap: 1.5
                }}
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                flexWrap="wrap"
                data-sb-field-path=".actions"
              >
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    {...action}
                    size="medium"
                    sx={{
                      height: 40,
                      minHeight: 40,
                      px: 2,
                      fontSize: 14,
                      fontWeight: 600,
                      borderRadius: '8px',
                      boxShadow: 'none'
                    }}
                    onClick={handleScrollToSection(action.url)}
                    data-sb-field-path={`.${index}`}
                  >
                    {action.label}
                  </Button>
                ))}
              </MuiStack>
            )}
          </MuiGrid>
        )}

        <MuiGrid item xs={12} md={hasTextContent ? 6 : 12}>
          {image?.url && (
            <Image
              src={image?.url}
              alt={image?.altText as string}
              width={584}
              height={360}
              sizes={
                '(max-width: 899px) 100vw, (max-width: 1200px) 50vw, 584px'
              }
              priority
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 12,
                maxWidth: '100%'
              }}
            />
          )}
        </MuiGrid>
      </MuiGrid>
    </MuiBox>
  );
};
