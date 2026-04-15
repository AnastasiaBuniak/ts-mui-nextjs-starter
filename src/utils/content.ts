import * as fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import frontmatter from 'front-matter';
import * as types from 'types';
import { i18nConfig } from './i18n';

export const dataDir = 'content/data';
export const pagesDir = 'content/pages';
export const siteConfigFile = dataDir + '/config.json';

const supportedFileTypes = ['md', 'json'];

function contentFilesInPath(dir: string) {
  const globPattern = `${dir}/**/*.{${supportedFileTypes.join(',')}}`;
  return globSync(globPattern);
}

function readContent(file: string): types.Document {
  const rawContent = fs.readFileSync(file, 'utf8');
  let content = null;
  switch (path.extname(file).substring(1)) {
    case 'md':
      const parsedMd = frontmatter<Record<string, any>>(rawContent);
      content = {
        ...parsedMd.attributes,
        body: parsedMd.body
      };
      break;
    case 'json':
      content = JSON.parse(rawContent);
      break;
    default:
      throw Error(`Unhandled file type: ${file}`);
  }

  content.__id = file;
  content.__url = fileToUrl(file);
  return content;
}

function fileToUrl(file: string) {
  if (!file.startsWith(pagesDir)) return null;

  let filePath = file.slice(pagesDir.length + 1);
  const filePathParts = filePath.split('/');
  if (
    i18nConfig.locales.includes(
      filePathParts[0] as (typeof i18nConfig.locales)[number]
    )
  ) {
    filePath = filePathParts.slice(1).join('/');
  }

  let url = '/' + filePath;
  url = url.split('.')[0];
  if (url.endsWith('/index')) {
    url = url.slice(0, -6) || '/';
  }
  return url;
}

function fileLocale(file: string) {
  const relativeFilePath = file.slice(pagesDir.length + 1);
  const [firstDirectory] = relativeFilePath.split('/');
  return i18nConfig.locales.includes(
    firstDirectory as (typeof i18nConfig.locales)[number]
  )
    ? firstDirectory
    : i18nConfig.defaultLocale;
}

function urlToFilePairs(locale: string = i18nConfig.defaultLocale) {
  const pageFiles = contentFilesInPath(pagesDir);
  const localized = pageFiles.filter((file) => fileLocale(file) === locale);
  const defaultLocalePages = pageFiles.filter(
    (file) => fileLocale(file) === i18nConfig.defaultLocale
  );
  const mergedFiles =
    locale === i18nConfig.defaultLocale
      ? defaultLocalePages
      : [...localized, ...defaultLocalePages];

  return mergedFiles.map((file) => [fileToUrl(file), file]);
}

export function urlToContent(
  url: string,
  locale: string = i18nConfig.defaultLocale
) {
  const urlToFile = Object.fromEntries(urlToFilePairs(locale));
  const file = urlToFile[url];
  return readContent(file);
}

export function pagesByType(
  contentType: types.DocumentTypeNames,
  locale: string = i18nConfig.defaultLocale
) {
  let result: Record<string, types.Document> = {};
  for (const [url, file] of urlToFilePairs(locale)) {
    if (file) {
      const content = readContent(file);
      if (url && content.type === contentType) result[url] = content;
    }
  }
  return result;
}

export function siteConfig() {
  return readContent(siteConfigFile) as types.Config;
}
