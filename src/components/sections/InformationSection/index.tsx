import React from 'react';
import type * as types from 'types';
import Box from '@mui/material/Box';
import { INFORMATION_SECTION_ID } from 'src/utils/constants';
import { InformationBlock } from './InformationBlock';

export type Props = {
  type: 'InformationSection';
  title: string;
  description: string;
  keyPoints: string[];
} & types.StackbitFieldPath;

export const InformationSection: React.FC<Props> = ({
  title,
  description,
  keyPoints
}) => {
  return (
    <Box id={INFORMATION_SECTION_ID}>
      <InformationBlock
        title={title}
        description={description}
        keyPoints={keyPoints}
      />
    </Box>
  );
};
