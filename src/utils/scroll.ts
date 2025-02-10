export const handleScrollToSection = (id: string) => (e) => {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};
