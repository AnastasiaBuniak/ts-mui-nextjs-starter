import {
  INFORMATION_SECTION_ID,
  INFORMATION_SECTION_TAB_EVENT,
  INFORMATION_TAB_KEYS,
  type InformationTabKey
} from './constants';

export const parseSectionUrl = (url: string) => {
  const colonIndex = url.indexOf(':');
  if (colonIndex === -1) {
    return { sectionId: url, tabKey: undefined };
  }
  return {
    sectionId: url.slice(0, colonIndex),
    tabKey: url.slice(colonIndex + 1) as InformationTabKey
  };
};

export const activateInformationTab = (tabKey: InformationTabKey) => {
  if (!(tabKey in INFORMATION_TAB_KEYS)) return;

  window.dispatchEvent(
    new CustomEvent(INFORMATION_SECTION_TAB_EVENT, {
      detail: { tabIndex: INFORMATION_TAB_KEYS[tabKey] }
    })
  );
};

export const handleScrollToSection =
  (url: string) => (e: React.MouseEvent<HTMLElement>) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const { sectionId, tabKey } = parseSectionUrl(url);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }

    if (tabKey && sectionId === INFORMATION_SECTION_ID) {
      activateInformationTab(tabKey);
    }
  };
