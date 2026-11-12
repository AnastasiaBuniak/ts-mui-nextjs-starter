import * as React from 'react';
import Head from 'next/head';
import type * as types from 'types';
import { buildFaqPageJsonLd } from 'src/utils/seo';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type FAQItem = {
  question: string;
  answer: string;
};

export type Props = {
  type: 'AnswersList';
  title: string;
  description: string;
  items: FAQItem[];
} & types.StackbitFieldPath;

export const AnswersList: React.FC<Props> = ({ title, description, items }) => {
  const faqJsonLd = buildFaqPageJsonLd(items);

  return (
    <>
      {faqJsonLd && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        </Head>
      )}
      <Box
        component="main"
        sx={{ maxWidth: 800, mx: 'auto', px: 1, py: { xs: 5, md: 8 } }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 2 }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {description}
          </Typography>
        )}
        {items.map((item, idx) => (
          <Box key={idx} sx={{ mb: 4 }}>
            <Accordion
              disableGutters
              elevation={0}
              sx={{
                border: 1,
                borderColor: 'divider',
                borderRadius: 2,
                overflow: 'hidden',
                '&:before': { display: 'none' }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  px: 2,
                  minHeight: 64,
                  '&.Mui-expanded': { minHeight: 64 }
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      fontWeight: 700,
                      fontSize: 14,
                      mr: 2
                    }}
                  >
                    {idx + 1}
                  </Box>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default AnswersList;
