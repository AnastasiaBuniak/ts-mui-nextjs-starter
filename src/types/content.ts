export type Document = Config | Page;
export type DocumentTypeNames = 'Config' | 'Page';

export type Section = CardsSection | HeroSection;

/** Document types */
export type Config = {
  __id: string;
  __url: null;
  type: 'Config';
  favicon?: string;
  header?: Header;
  footer?: Footer;
  consentCopy: string;
};

export type Page = {
  __id: string;
  __url: string;
  type: 'Page';
  title: string;
  sections?: Section[];
  body?: string;
};

/** Nested types */
export type Button = {
  type: 'Button';
  label: string;
  url: string;
  href: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'inherit' | 'primary' | 'secondary';
};

export type Card = {
  type: 'Card';
  title?: string;
  text?: string;
  image?: Image;
  actions?: Button[];
};

export type CardsSection = {
  type: 'CardsSection';
  title?: string;
  subtitle?: string;
  items?: Card[];
};

export type CalculationSection = {
  type: 'CalculationSection';
  title?: string;
  enterTitle?: string;
  exitTitle?: string;
  addButtonText?: string;
};

export type Footer = {
  type: 'Footer';
  copyrightText?: string;
  navLinks?: Link[];
};

export type Header = {
  type: 'Header';
  title?: string;
  navLinks?: Link[];
};

export type HeroSection = {
  type: 'HeroSection';
  title?: string;
  subtitle?: string;
  text?: string;
  actions?: Button[];
  image?: Image;
};

export type Image = {
  type: 'Image';
  url?: string;
  mobileUrl?: string;
  altText?: string;
};

export type Link = {
  type: 'Link';
  label: string;
  url: string;
  underline?: 'always' | 'hover' | 'none';
  color?: 'inherit' | 'primary' | 'secondary';
  isAnchor?: boolean;
};
