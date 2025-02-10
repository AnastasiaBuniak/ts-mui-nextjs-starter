export const handleScrollToSection =
  (id: string) => (e: React.MouseEvent<HTMLElement>) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
