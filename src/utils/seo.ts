export function buildPageTitle(pageTitle: string, siteName?: string): string {
  const trimmedTitle = pageTitle.trim();
  const trimmedSiteName = siteName?.trim();

  if (!trimmedSiteName || trimmedTitle.includes(trimmedSiteName)) {
    return trimmedTitle;
  }

  return `${trimmedTitle} | ${trimmedSiteName}`;
}
