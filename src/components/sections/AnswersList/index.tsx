import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const themeStyle = require('content/data/style.json');

export type FAQItem = {
  question: string;
  answer: string;
};

export type Props = {
  type: 'AnswersList';
  title: string;
  description: string;
  items: FAQItem[];
};

export const AnswersList: React.FC<Props> = ({ title, description, items }) => (
  <Box component="main" sx={{ maxWidth: 800, mx: 'auto', px: 3, py: 5 }}>
    <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
      {title}
    </Typography>
    {description && (
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {description}
      </Typography>
    )}
    {items.map((item, idx) => (
      <Box key={idx} sx={{ mb: 4 }}>
        <Accordion sx={{ borderRadius: '4px', overflow: 'hidden' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
            sx={{
              bgcolor: themeStyle.primaryColor ?? '#1F2B9D',
              color: '#fff',
              '& .MuiTypography-root': { color: '#fff' },
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
                  bgcolor: 'rgba(255,255,255,0.18)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 18,
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
);

export default AnswersList;
