<<<<<<< HEAD
// Get elements
const scrollDownButton = document.getElementById('scrollDown');
const aboutUsSection = document.getElementById('aboutUs');
const contactFormSection = document.getElementById('contactForm');
const exploreButton = document.getElementById('explorebtn');
// Scroll down to About Us section when the button is clicked
scrollDownButton.addEventListener('click', () => {
  // Smooth scroll to the About Us section
  aboutUsSection.scrollIntoView({ behavior: 'smooth' });

  // Show the About Us section
  aboutUsSection.classList.add('show-section');
});
exploreButton.addEventListener('click', () => {
  window.location.href = 'main.html';
});
// Show Contact Form section once About Us section is visible
window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight > aboutUsSection.offsetTop + aboutUsSection.offsetHeight) {
    contactFormSection.classList.add('show-section');
  }
});

=======
// Get elements
const scrollDownButton = document.getElementById('scrollDown');
const aboutUsSection = document.getElementById('aboutUs');
const contactFormSection = document.getElementById('contactForm');
const exploreButton = document.getElementById('explorebtn');
// Scroll down to About Us section when the button is clicked
scrollDownButton.addEventListener('click', () => {
  // Smooth scroll to the About Us section
  aboutUsSection.scrollIntoView({ behavior: 'smooth' });

  // Show the About Us section
  aboutUsSection.classList.add('show-section');
});
exploreButton.addEventListener('click', () => {
  window.location.href = 'main.html';
});
// Show Contact Form section once About Us section is visible
window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight > aboutUsSection.offsetTop + aboutUsSection.offsetHeight) {
    contactFormSection.classList.add('show-section');
  }
});

>>>>>>> bc5dce2a25dcdc4180f6598eb56dadecfdad7be3
