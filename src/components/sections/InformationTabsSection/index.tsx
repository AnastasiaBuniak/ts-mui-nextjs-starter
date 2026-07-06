import React, { useEffect, useState } from 'react';
import type * as types from 'types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import {
  INFORMATION_SECTION_ID,
  INFORMATION_SECTION_TAB_EVENT
} from 'src/utils/constants';
import { InformationBlock } from '../InformationSection/InformationBlock';

export type InformationItem = {
  title: string;
  description?: string;
  keyPoints: string[];
};

export type InformationTab = {
  label: string;
  items: InformationItem[];
};

export type Props = {
  type: 'InformationTabsSection';
  tabs: InformationTab[];
} & types.StackbitFieldPath;

export const InformationTabsSection: React.FC<Props> = ({
  tabs,
  'data-sb-field-path': fieldPath
}) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleTabChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ tabIndex: number }>;
      if (typeof customEvent.detail?.tabIndex === 'number') {
        setActiveTab(customEvent.detail.tabIndex);
      }
    };

    window.addEventListener(
      INFORMATION_SECTION_TAB_EVENT,
      handleTabChange as EventListener
    );
    return () => {
      window.removeEventListener(
        INFORMATION_SECTION_TAB_EVENT,
        handleTabChange as EventListener
      );
    };
  }, []);

  return (
    <Box id={INFORMATION_SECTION_ID} data-sb-field-path={fieldPath}>
      <Container maxWidth="lg" disableGutters={true}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            mb: 2,
            display: 'flex',
            justifyContent: 'center'
          }}
          data-sb-field-path=".tabs"
        >
          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value)}
            centered
            aria-label="Information tabs"
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                data-sb-field-path={`.${index}.label`}
              />
            ))}
          </Tabs>
        </Box>

        {tabs.map((tab, tabIndex) => (
          <Box
            key={tabIndex}
            role="tabpanel"
            hidden={activeTab !== tabIndex}
            data-sb-field-path={`.${tabIndex}.items`}
          >
            {activeTab === tabIndex &&
              tab.items.map((item, itemIndex) => (
                <InformationBlock
                  key={itemIndex}
                  {...item}
                  fieldPath={`.${itemIndex}`}
                />
              ))}
          </Box>
        ))}
      </Container>
    </Box>
  );
};
