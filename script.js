const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);

if (themeToggle && themeIcon) {
  themeToggle.setAttribute('aria-pressed', String(savedTheme === 'dark'));
  themeIcon.textContent = savedTheme === 'dark' ? '☀' : '☾';

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    document.body.setAttribute('data-theme', nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
    themeToggle.setAttribute('aria-pressed', String(nextTheme === 'dark'));
    themeIcon.textContent = nextTheme === 'dark' ? '☀' : '☾';
    document.dispatchEvent(new CustomEvent('portfolio:theme-change', { detail: { theme: nextTheme } }));
  });
}

const apkButtons = document.querySelectorAll('.apk-download');
const apkModal = document.getElementById('apkModal');
const confirmApkDownload = document.getElementById('confirmApkDownload');
const cancelApkDownload = document.getElementById('cancelApkDownload');
const previewButtons = document.querySelectorAll('.preview-flow');
const previewModal = document.getElementById('previewModal');
const previewModalTitle = document.getElementById('previewModalTitle');
const closePreviewModal = document.getElementById('closePreviewModal');
const previewActiveImage = document.getElementById('previewActiveImage');
const previewActiveCount = document.getElementById('previewActiveCount');
const previewActiveTitle = document.getElementById('previewActiveTitle');
const previewActiveDescription = document.getElementById('previewActiveDescription');
const previewPagination = document.getElementById('previewPagination');
const prevPreviewScreen = document.getElementById('prevPreviewScreen');
const nextPreviewScreen = document.getElementById('nextPreviewScreen');

const previewCatalog = {
  careerBridge: {
    title: 'Career Bridge',
    folder: 'assets/images/screens',
    screens: [
      {
        key: 'sign-up',
        title: 'Create Student Account',
        description: 'Signup screen for a new student account with role tabs, full name, email, password, and Sign Up CTA.',
        image: 'sign-up.jpeg',
        darkImage: 'sign-up_dark.jpeg'
      },
      {
        key: 'login',
        title: 'Student Login',
        description: 'Login screen for returning students using email and password with Google and GitHub sign-in options.',
        image: 'login.jpeg',
        darkImage: 'login_dark.jpeg'
      },
      {
        key: 'dashboard',
        title: 'Dashboard',
        description: 'Dashboard summary showing total users, reports, shadow bans, and blacklisted accounts.',
        image: 'admin-dashboard.jpeg',
        darkImage: 'admin-dashboard_dark.jpeg'
      },
      {
        key: 'jobs',
        title: 'Jobs & Internships',
        description: 'Jobs and internship listing board with filters, opportunity cards, and structured recruiter-facing sections.',
        image: 'job-listing.jpeg',
        darkImage: 'job-listing_dark.jpeg'
      },
      {
        key: 'cv-optimizer',
        title: 'AI CV Optimizer',
        description: 'AI CV builder page where the user pastes a job description and generates a tailored CV.',
        image: 'cv-optimizer.jpeg',
        darkImage: 'cv-optimizer_dark.jpeg'
      },
      {
        key: 'chat-screen',
        title: 'Recruiter Connect',
        description: 'Messaging and recruiter communication center for candidate outreach and quick follow-up.',
        image: 'chat-screen.jpeg',
        darkImage: 'chat-screen_dark.jpeg'
      },
      {
        key: 'internships',
        title: 'Internships',
        description: 'Internship marketplace page with search, sorting chips, and a premium opportunity card layout.',
        image: 'internships.jpeg',
        darkImage: 'internships_dark.jpeg'
      },
      {
        key: 'applicants-dashboard',
        title: 'Applicants Dashboard',
        description: 'Applicants dashboard with progress, evidence, and evaluation signals for real recruiter use.',
        image: 'appplicants-dashboard.jpeg',
        darkImage: 'applicants-dashboard_dark.jpeg'
      },
      {
        key: 'applicants-profile',
        title: 'Applicant Profile',
        description: 'Candidate profile summary highlighting readiness, growth score, and skill strengths.',
        image: 'applicants-profile.jpeg',
        darkImage: 'applicants-profile_dark.jpeg'
      },
      {
        key: 'applicants-setting',
        title: 'Applicant Settings',
        description: 'Settings area showing account preferences, privacy controls, and user configuration.',
        image: 'applicants-setting.jpeg',
        darkImage: 'applicants-setting_dark.jpeg'
      },
      {
        key: 'applicants-assessment',
        title: 'Applicant Assessment',
        description: 'Assessment view where the user can review talent readiness and evaluation progress.',
        image: 'applicants-assessment.jpeg',
        darkImage: 'applicants-assessment_dark.jpeg'
      },
      {
        key: 'applicants-technical-evidence',
        title: 'Technical Evidence',
        description: 'Evidence and project proof section presented in a clean, recruiter-friendly evidence card format.',
        image: 'applicants-technical-evidence.jpeg',
        darkImage: 'applicants-technical-evidence_dark.jpeg'
      },
      {
        key: 'applicants-verified_gallery',
        title: 'Verified Gallery',
        description: 'Verified asset gallery that showcases concrete portfolio proofs with a clear evidence header.',
        image: 'applicants-verfied_gallery.jpeg',
        darkImage: 'applicants-verified_gallery_dark.jpeg'
      }
    ]
  },
  factory: {
    title: 'Factory',
    folder: 'assets/images/screens1',
    screens: [
      {
        key: 'login',
        title: 'Login',
        description: 'Login screen for factory users to securely access their mobile workspace and account workflow.',
        image: 'login.jpeg',
        darkImage: 'login_dark.jpeg'
      },
      {
        key: 'dashboard',
        title: 'Dashboard',
        description: 'Main dashboard with a compact operational summary and quick actions for daily management.',
        image: 'dashboard.jpeg',
        darkImage: 'dashboard_dark.jpeg'
      },
      {
        key: 'product',
        title: 'Product',
        description: 'Product detail and item information screen showcasing inventory and product context.',
        image: 'product.jpeg',
        darkImage: 'product_dark.jpeg'
      },
      {
        key: 'product-listing',
        title: 'Product Listing',
        description: 'Product list view for browsing catalog records, availability, and structured management fields.',
        image: 'product-listing.jpeg',
        darkImage: 'product-listing_dark.jpeg'
      },
      {
        key: 'order',
        title: 'Order',
        description: 'Order detail screen designed for direct operational review and completion tracking.',
        image: 'order.jpeg',
        darkImage: 'order_dark.jpeg'
      },
      {
        key: 'order-listing',
        title: 'Order Listing',
        description: 'Order listing screen showing records, status, and quick order visibility for users.',
        image: 'order-listing.jpeg',
        darkImage: 'order-listing_dark.jpeg'
      },
      {
        key: 'attendance',
        title: 'Attendance',
        description: 'Attendance tracking screen for workforce or shift-based presence monitoring.',
        image: 'attendance.jpeg',
        darkImage: 'attendance_dark.jpeg'
      },
      {
        key: 'attendance-listing',
        title: 'Attendance Listing',
        description: 'Attendance table showing daily or recurring presence records in a structured mobile layout.',
        image: 'attendance-listing.jpeg',
        darkImage: 'attendance-listing_dark.jpeg'
      },
      {
        key: 'customer',
        title: 'Customer',
        description: 'Customer detail screen that centralizes account context and business-facing metadata.',
        image: 'customer.jpeg',
        darkImage: 'customer_dark.jpeg'
      },
      {
        key: 'customer-listing',
        title: 'Customer Listing',
        description: 'Customer listing view for quick record lookup and operational information scanning.',
        image: 'customer-listing.jpeg',
        darkImage: 'customer-listing_dark.jpeg'
      },
      {
        key: 'log-expense',
        title: 'Log Expense',
        description: 'Expense logging screen for inputting and reviewing practical operating costs.',
        image: 'log-expense.jpeg',
        darkImage: 'log-expense_dark.jpeg'
      },
      {
        key: 'log-expense-listing',
        title: 'Expense Listing',
        description: 'Expense record listing with managed entries and clear operational activity visibility.',
        image: 'log-expense-listing.jpeg',
        darkImage: 'log-expense-listing_dark.jpeg'
      },
      {
        key: 'report',
        title: 'Report',
        description: 'Factory report screen used to view structured data output and practical business insights.',
        image: 'report.jpeg',
        darkImage: 'report_dark.jpeg'
      }
    ]
  }
};
let pendingApkUrl = '';

if (apkButtons.length && apkModal && confirmApkDownload && cancelApkDownload) {
  apkButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      pendingApkUrl = button.dataset.apk || '';
      apkModal.classList.add('show');
      apkModal.setAttribute('aria-hidden', 'false');
    });
  });

  confirmApkDownload.addEventListener('click', () => {
    if (pendingApkUrl) {
      window.location.href = pendingApkUrl;
    }
    apkModal.classList.remove('show');
    apkModal.setAttribute('aria-hidden', 'true');
  });

  cancelApkDownload.addEventListener('click', () => {
    apkModal.classList.remove('show');
    apkModal.setAttribute('aria-hidden', 'true');
    pendingApkUrl = '';
  });

  apkModal.addEventListener('click', (event) => {
    if (event.target === apkModal) {
      apkModal.classList.remove('show');
      apkModal.setAttribute('aria-hidden', 'true');
    }
  });
}

if (previewButtons.length && previewModal && previewModalTitle && closePreviewModal && previewActiveImage && previewActiveCount && previewActiveTitle && previewActiveDescription && previewPagination && prevPreviewScreen && nextPreviewScreen) {
  let previewIndex = 0;
  let previewRotationTimer = null;
  let activePreviewKey = 'careerBridge';

  const getCurrentTheme = () => document.body.getAttribute('data-theme') || 'light';

  const resolvePreviewImage = (screen) => {
    const selectedTheme = getCurrentTheme();
    const imageName = selectedTheme === 'dark' && screen.darkImage ? screen.darkImage : screen.image;
    return `${previewCatalog[activePreviewKey].folder}/${imageName}`;
  };

  const renderPreviewPagination = () => {
    const activeScreens = previewCatalog[activePreviewKey].screens;
    previewPagination.innerHTML = activeScreens.map((_, index) => `
      <button class="preview-dot ${index === previewIndex ? 'active' : ''}" data-index="${index}" type="button" aria-label="Show screen ${index + 1}"></button>
    `).join('');

    previewPagination.querySelectorAll('.preview-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        previewIndex = Number(dot.dataset.index);
        updatePreviewStage();
      });
    });
  };

  const updatePreviewStage = () => {
    const activeScreens = previewCatalog[activePreviewKey].screens;
    const current = activeScreens[previewIndex];
    if (!current) return;

    previewActiveImage.classList.remove('is-visible');
    previewActiveTitle.classList.remove('is-visible');
    previewActiveDescription.classList.remove('is-visible');

    window.setTimeout(() => {
      previewActiveImage.src = resolvePreviewImage(current);
      previewActiveImage.alt = `${current.title} screen preview`;
      previewActiveCount.textContent = `Screen ${previewIndex + 1}`;
      previewActiveTitle.textContent = current.title;
      previewActiveDescription.textContent = current.description;
      previewActiveImage.classList.add('is-visible');
      previewActiveTitle.classList.add('is-visible');
      previewActiveDescription.classList.add('is-visible');
      renderPreviewPagination();
    }, 180);
  };

  const startPreviewRotation = () => {
    clearInterval(previewRotationTimer);
    const activeScreens = previewCatalog[activePreviewKey].screens;
    previewRotationTimer = setInterval(() => {
      previewIndex = (previewIndex + 1) % activeScreens.length;
      updatePreviewStage();
    }, 4200);
  };

  const stopPreviewRotation = () => {
    clearInterval(previewRotationTimer);
    previewRotationTimer = null;
  };

  previewButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      activePreviewKey = button.dataset.previewApp || 'careerBridge';
      previewModalTitle.textContent = button.dataset.previewTitle || previewCatalog[activePreviewKey].title;
      previewIndex = 0;
      updatePreviewStage();
      previewModal.classList.add('show');
      previewModal.setAttribute('aria-hidden', 'false');
      startPreviewRotation();
    });
  });

  prevPreviewScreen.addEventListener('click', () => {
    const activeScreens = previewCatalog[activePreviewKey].screens;
    previewIndex = (previewIndex - 1 + activeScreens.length) % activeScreens.length;
    updatePreviewStage();
    startPreviewRotation();
  });

  nextPreviewScreen.addEventListener('click', () => {
    const activeScreens = previewCatalog[activePreviewKey].screens;
    previewIndex = (previewIndex + 1) % activeScreens.length;
    updatePreviewStage();
    startPreviewRotation();
  });

  closePreviewModal.addEventListener('click', () => {
    previewModal.classList.remove('show');
    previewModal.setAttribute('aria-hidden', 'true');
    stopPreviewRotation();
  });

  previewModal.addEventListener('click', (event) => {
    if (event.target === previewModal) {
      previewModal.classList.remove('show');
      previewModal.setAttribute('aria-hidden', 'true');
      stopPreviewRotation();
    }
  });

  // Refresh preview images when the site theme changes while preview modal is open
  document.addEventListener('portfolio:theme-change', () => {
    if (previewModal.classList.contains('show')) {
      updatePreviewStage();
    }
  });
}

// FAQ Accordion
const saasFaqItems = document.querySelectorAll('.saas-accordion-item');
saasFaqItems.forEach(item => {
  const button = item.querySelector('.saas-accordion-trigger');
  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all others
    saasFaqItems.forEach(otherItem => {
      otherItem.classList.remove('active');
      otherItem.querySelector('.saas-accordion-trigger').setAttribute('aria-expanded', 'false');
      otherItem.querySelector('.saas-accordion-content').style.maxHeight = null;
    });

    if (!isActive) {
      item.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
      const answer = item.querySelector('.saas-accordion-content');
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// 📧 EmailJS Integration
(function() {
  emailjs.init("KQgrkRjLOc7mphsTD"); 
})();

const contactForm = document.getElementById('contactForm');
const feedbackModal = document.getElementById('feedbackModal');
const closeFeedbackBtn = document.getElementById('closeFeedbackBtn');
const feedbackTitle = document.getElementById('feedbackTitle');
const feedbackMessage = document.getElementById('feedbackMessage');
const feedbackIcon = document.getElementById('feedbackIcon');

if (contactForm && feedbackModal) {
  closeFeedbackBtn.addEventListener('click', () => {
    feedbackModal.classList.remove('show');
    feedbackModal.setAttribute('aria-hidden', 'true');
  });

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    emailjs.sendForm("service_3hoxhp3", "template_037ylts", this)
      .then(() => {
        feedbackIcon.classList.remove('error');
        feedbackIcon.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        feedbackTitle.textContent = "Message Sent!";
        feedbackMessage.textContent = "Thank you for reaching out. I'll get back to you shortly.";
        feedbackModal.classList.add('show');
        feedbackModal.setAttribute('aria-hidden', 'false');
        
        this.reset();
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      })
      .catch((err) => {
        feedbackIcon.classList.add('error');
        feedbackIcon.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
        feedbackTitle.textContent = "Oops!";
        feedbackMessage.textContent = "Something went wrong. Please try again.";
        feedbackModal.classList.add('show');
        feedbackModal.setAttribute('aria-hidden', 'false');
        
        console.error(err);
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      });
  });
}

const revealItems = document.querySelectorAll('.reveal');

if (revealItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  revealItems.forEach((item) => observer.observe(item));
}
