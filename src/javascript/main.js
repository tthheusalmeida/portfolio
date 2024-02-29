function scrollToSection(sectionId) {
  var section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}