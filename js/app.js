// Grandeur SSCBS Website Main Application Logic

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // Initialize Modules
  initRouter();
  initMobileMenu();
  initDataRendering();
  initSearchAndFilters();
  initModals();
  initStatsCounter();
  initFaqAccordion();
  initContactForm();
});

/* ==========================================================================
   1. HASH-BASED SPA ROUTER
   ========================================================================== */
function initRouter() {
  const handleRoute = () => {
    // Read route from window location hash, default to 'home'
    let rawHash = window.location.hash || "#home";
    let route = rawHash.replace("#", "");
    
    // Map of routes to section element IDs
    const sectionMap = {
      "home": "home-view",
      "projects": "projects-view",
      "publications": "publications-view",
      "events": "events-view",
      "team": "team-view",
      "contact": "contact-view"
    };

    const targetSectionId = sectionMap[route] || "home-view";

    // Switch active view sections
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.remove("active");
    });
    const targetSec = document.getElementById(targetSectionId);
    if (targetSec) {
      targetSec.classList.add("active");
    }

    // Update nav links active states
    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.getAttribute("data-section") === route) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Update drawer links active states
    document.querySelectorAll(".drawer-link").forEach(link => {
      if (link.getAttribute("data-section") === route) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Scroll back to top on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Custom stats trigger if navigating to home
    if (route === "home") {
      resetAndTriggerStats();
    }
  };

  // Listen to hash change and load event
  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("load", handleRoute);

  // Shrink header on scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".main-header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Intercept clicks to helper navigation links (e.g. from footer or banners)
function navigateToSection(route) {
  window.location.hash = `#${route}`;
  closeDrawer();
}

/* ==========================================================================
   2. MOBILE MENU & DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector(".mobile-menu-toggle");
  const closeBtn = document.querySelector(".drawer-close");
  const drawer = document.querySelector(".mobile-drawer");
  const overlay = document.createElement("div");
  
  overlay.className = "drawer-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  overlay.style.zIndex = "150";
  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none";
  overlay.style.transition = "opacity 0.3s ease";
  document.body.appendChild(overlay);

  const openDrawer = () => {
    drawer.classList.add("open");
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";
  };

  const closeDrawerLocal = () => {
    drawer.classList.remove("open");
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
  };

  toggleBtn.addEventListener("click", openDrawer);
  closeBtn.addEventListener("click", closeDrawerLocal);
  overlay.addEventListener("click", closeDrawerLocal);

  // Attach reference globally to close from links
  window.closeDrawer = closeDrawerLocal;
}

/* ==========================================================================
   3. DATA RENDERING (DOM INJECTION)
   ========================================================================== */
function initDataRendering() {
  renderProjectsList("all");
  renderPublicationsList("all", "");
  renderEventsList();
  renderTeamAndPlacements();
}

// Projects list rendering
function renderProjectsList(filter = "all") {
  const container = document.getElementById("projects-list");
  if (!container) return;

  container.innerHTML = "";
  
  // Filter projects by domain category
  const filtered = filter === "all" 
    ? GrandeurData.projects 
    : GrandeurData.projects.filter(p => p.domain.includes(filter));

  if (filtered.length === 0) {
    container.innerHTML = `<p class="body-text">No case studies found matching this criteria.</p>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";
    
    card.innerHTML = `
      <div class="project-card-header">
        <span class="project-domain">${p.domain}</span>
        <span class="project-client">${p.client}</span>
      </div>
      <h3>${p.title}</h3>
      <p class="project-summary">${p.summary}</p>
      <div class="project-meta-bottom">
        <span class="project-duration"><i data-lucide="calendar" class="icon-sm"></i> ${p.duration}</span>
        <button class="btn btn-sm btn-gold-outline read-case-btn" data-id="${p.id}">Read Case Study</button>
      </div>
    `;
    
    container.appendChild(card);
  });
  
  // Re-init lucide icons inside generated HTML
  lucide.createIcons();

  // Attach click events for modals
  container.querySelectorAll(".read-case-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      openProjectModal(btn.getAttribute("data-id"));
    });
  });
}

// Publications list rendering
function renderPublicationsList(filter = "all", searchQuery = "") {
  const container = document.getElementById("publications-list");
  if (!container) return;

  container.innerHTML = "";

  // Apply filters
  let filtered = GrandeurData.publications;
  if (filter !== "all") {
    filtered = filtered.filter(p => p.category === filter);
  }

  // Apply search
  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.subtitle.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-8"><p class="body-text">No publications match your search criteria.</p></div>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "publication-card";
    
    const tagList = p.tags.map(t => `<span class="tag">${t}</span>`).join("");
    
    card.innerHTML = `
      <div class="pub-visual-mock">
        <span class="pub-visual-category">${p.category.replace("-", " ")}</span>
        <span class="pub-visual-title">${p.title}</span>
      </div>
      <div class="pub-body">
        <span class="pub-subtitle">${p.subtitle}</span>
        <p class="pub-desc">${p.description}</p>
        <div class="pub-tags">${tagList}</div>
        <div class="pub-footer">
          <span class="pub-pages"><i data-lucide="file-text" class="icon-sm"></i> ${p.readTime}</span>
          <button class="btn btn-sm btn-gold-outline pub-details-btn" data-id="${p.id}">Access Details</button>
        </div>
      </div>
    `;
    
    container.appendChild(card);
  });

  lucide.createIcons();

  container.querySelectorAll(".pub-details-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      openPublicationModal(btn.getAttribute("data-id"));
    });
  });
}

// Events list rendering
function renderEventsList() {
  const container = document.getElementById("events-list");
  if (!container) return;

  container.innerHTML = "";

  GrandeurData.events.forEach(e => {
    const item = document.createElement("div");
    item.className = "event-item-card";
    
    let roundsHtml = "";
    if (e.rounds && e.rounds.length > 0) {
      const nodes = e.rounds.map(r => `
        <div class="round-node">
          <div class="round-title-row">
            <span class="round-name">${r.name}</span>
            <span class="round-date">${r.date}</span>
          </div>
          <p class="round-desc">${r.description}</p>
        </div>
      `).join("");
      
      roundsHtml = `
        <div class="event-rounds">
          <h4>Event Timeline</h4>
          <div class="rounds-timeline">${nodes}</div>
        </div>
      `;
    }

    let sideHtml = "";
    if (e.pastWinners && e.pastWinners.length > 0) {
      const winners = e.pastWinners.map(w => `
        <div class="winner-entry">
          <div class="winner-row-main">
            <span class="winner-pos">${w.position}</span>
            <span>${w.team}</span>
          </div>
          <div class="winner-college">${w.college}</div>
        </div>
      `).join("");

      sideHtml = `
        <div class="winners-card">
          <h4>Past Winners Showcase</h4>
          <div class="winners-list">${winners}</div>
        </div>
      `;
    }

    item.innerHTML = `
      <span class="event-badge-pill">${e.type}</span>
      <div class="event-info">
        <h3>${e.title}</h3>
        <div class="event-meta-bar">
          <span class="meta-icon-text"><i data-lucide="globe" class="icon-sm"></i> ${e.scope}</span>
          <span class="meta-icon-text"><i data-lucide="calendar" class="icon-sm"></i> ${e.date}</span>
          ${e.prizePool !== 'N/A' && e.prizePool !== 'N/A (Certificate of Completion)' ? `<span class="meta-icon-text"><i data-lucide="trophy" class="icon-sm"></i> Prize: ${e.prizePool}</span>` : ''}
        </div>
        <p class="event-description">${e.description}</p>
        ${roundsHtml}
      </div>
      <div class="event-side-panel">
        ${sideHtml}
        <div class="event-actions">
          <a href="#contact" class="btn btn-gold btn-block" onclick="navigateToSection('contact'); selectEventSubject();">
            Inquire / Register
          </a>
        </div>
      </div>
    `;

    container.appendChild(item);
  });

  lucide.createIcons();
}

// Team, Faculty, Advisors and Placement Logo rendering
function renderTeamAndPlacements() {
  const facultyList = document.getElementById("faculty-list");
  const coreList = document.getElementById("core-list");
  const advisoryList = document.getElementById("advisory-list");
  const placementsList = document.getElementById("placements-list");

  // Renders Faculty Advisors
  if (facultyList) {
    facultyList.innerHTML = "";
    GrandeurData.team.faculty.forEach(f => {
      const card = document.createElement("div");
      card.className = "faculty-card";
      card.innerHTML = `
        <div class="faculty-avatar-placeholder">
          <i data-lucide="user" class="icon-lg"></i>
        </div>
        <div class="faculty-info">
          <h4>${f.name}</h4>
          <p class="faculty-role">${f.role}</p>
          <p class="faculty-dept">${f.department}, ${f.college}</p>
          <p class="faculty-desc">${f.description}</p>
        </div>
      `;
      facultyList.appendChild(card);
    });
  }

  // Renders Student Core leadership
  if (coreList) {
    coreList.innerHTML = "";
    GrandeurData.team.core.forEach(c => {
      const card = document.createElement("div");
      card.className = "member-card";
      card.innerHTML = `
        <div class="member-avatar-placeholder">
          <i data-lucide="user-check" class="icon-lg"></i>
        </div>
        <h4>${c.name}</h4>
        <p class="member-role">${c.role}</p>
        <span class="member-placement">${c.placement}</span>
        <p class="member-quote">"${c.quote}"</p>
        <div class="member-socials">
          <a href="${c.linkedin}" class="social-icon-btn"><i data-lucide="linkedin"></i></a>
        </div>
      `;
      coreList.appendChild(card);
    });
  }

  // Renders Advisory Board
  if (advisoryList) {
    advisoryList.innerHTML = "";
    GrandeurData.team.advisory.forEach(a => {
      const card = document.createElement("div");
      card.className = "member-card";
      card.innerHTML = `
        <div class="member-avatar-placeholder">
          <i data-lucide="award" class="icon-lg"></i>
        </div>
        <h4>${a.name}</h4>
        <p class="member-role">${a.role}</p>
        <span class="member-placement">${a.placement}</span>
        <p class="member-quote">"${a.quote}"</p>
        <div class="member-socials">
          <a href="${a.linkedin}" class="social-icon-btn"><i data-lucide="linkedin"></i></a>
        </div>
      `;
      advisoryList.appendChild(card);
    });
  }

  // Renders Placement Logo list
  if (placementsList) {
    placementsList.innerHTML = "";
    GrandeurData.team.alumniPlacements.forEach(p => {
      const card = document.createElement("div");
      card.className = "placement-card";
      card.innerHTML = `
        <div class="placement-logo-mock ${p.logo}">${p.firm}</div>
        <div class="placement-count">${p.count}+ Alumni</div>
      `;
      placementsList.appendChild(card);
    });
  }

  lucide.createIcons();
}

/* ==========================================================================
   4. SEARCH AND FILTERS CONTROLLERS
   ========================================================================== */
function initSearchAndFilters() {
  // Projects categories filter
  const projFilters = document.querySelectorAll("#project-filters .filter-btn");
  projFilters.forEach(btn => {
    btn.addEventListener("click", (e) => {
      projFilters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjectsList(btn.getAttribute("data-filter"));
    });
  });

  // Publications categories filter
  const pubFilters = document.querySelectorAll("#publication-filters .filter-btn");
  const searchInput = document.getElementById("publication-search");
  
  let currentFilter = "all";
  let currentSearch = "";

  const updatePubList = () => {
    renderPublicationsList(currentFilter, currentSearch);
  };

  pubFilters.forEach(btn => {
    btn.addEventListener("click", () => {
      pubFilters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      updatePubList();
    });
  });

  // Search input typing filter
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      updatePubList();
    });
  }
}

/* ==========================================================================
   5. MODALS INJECTOR AND HANDLER
   ========================================================================== */
function initModals() {
  // Global modal closing actions
  document.querySelectorAll(".modal-close, .modal-close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".modal-overlay").forEach(overlay => {
        overlay.classList.remove("open");
      });
    });
  });

  // Close modals when clicking on background overlays
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("open");
      }
    });
  });
}

// Open project detail modal
function openProjectModal(id) {
  const p = GrandeurData.projects.find(item => item.id === id);
  if (!p) return;

  const content = document.getElementById("project-modal-content");
  if (!content) return;

  const approachList = p.approach.map(a => `
    <div class="checklist-item">
      <i data-lucide="arrow-right" class="checklist-icon icon-sm"></i>
      <span>${a}</span>
    </div>
  `).join("");

  const resultsList = p.results.map(r => `
    <div class="checklist-item">
      <i data-lucide="check" class="checklist-icon icon-sm"></i>
      <span>${r}</span>
    </div>
  `).join("");

  content.innerHTML = `
    <div class="modal-header-section">
      <div class="modal-header-meta">
        <span>${p.client}</span>
        <span>•</span>
        <span>${p.domain}</span>
      </div>
      <h2 class="modal-header-title">${p.title}</h2>
    </div>
    
    <div class="modal-grid">
      <div class="modal-body-left">
        <h4>The Challenge / Problem</h4>
        <p>${p.problem}</p>
        
        <h4>Our Structured Approach</h4>
        <div class="highlights-checklist" style="margin-bottom: 32px;">
          ${approachList}
        </div>
        
        <h4>Impact & Client Outcomes</h4>
        <div class="highlights-checklist">
          ${resultsList}
        </div>
      </div>
      
      <div class="modal-body-right">
        <h4>Project Metadata</h4>
        <div class="modal-stats-list">
          <div class="modal-stat-row">
            <span class="modal-stat-name">Client Organization</span>
            <span class="modal-stat-val">${p.client}</span>
          </div>
          <div class="modal-stat-row">
            <span class="modal-stat-name">Focus Domain</span>
            <span class="modal-stat-val">${p.domain}</span>
          </div>
          <div class="modal-stat-row">
            <span class="modal-stat-name">Project Duration</span>
            <span class="modal-stat-val">${p.duration}</span>
          </div>
          <div class="modal-stat-row">
            <span class="modal-stat-name">Engagement Status</span>
            <span class="modal-stat-val" style="color: #22c55e;">${p.status}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  lucide.createIcons();
  document.getElementById("project-modal").classList.add("open");
}

// Open publication detail modal
function openPublicationModal(id) {
  const p = GrandeurData.publications.find(item => item.id === id);
  if (!p) return;

  const content = document.getElementById("publication-modal-content");
  if (!content) return;

  const highlightsList = p.highlights.map(h => `
    <div class="checklist-item">
      <i data-lucide="check" class="checklist-icon icon-sm"></i>
      <span>${h}</span>
    </div>
  `).join("");

  content.innerHTML = `
    <div class="modal-header-section" style="margin-bottom: 24px; padding-bottom: 16px;">
      <div class="modal-header-meta">
        <span>${p.category.replace("-", " ")}</span>
        <span>•</span>
        <span>${p.date}</span>
      </div>
      <h2 class="modal-header-title" style="font-size: 1.6rem;">${p.title}</h2>
    </div>
    
    <p class="body-text" style="font-size: 0.95rem; margin-bottom: 24px;">${p.description}</p>
    
    <h4 style="font-size: 1rem; margin-bottom: 16px; font-family: var(--font-headings); font-weight: 600; color: var(--gold-primary);">Key Insights & Highlights</h4>
    <div class="highlights-checklist" style="margin-bottom: 32px;">
      ${highlightsList}
    </div>
    
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 24px;">
      <span class="body-text" style="margin: 0; font-size: 0.85rem;"><i data-lucide="file-text" class="icon-sm"></i> Document Length: ${p.readTime}</span>
      <button class="btn btn-gold download-trigger-btn">
        <i data-lucide="download" class="icon-sm"></i> Download Report Details
      </button>
    </div>
  `;

  lucide.createIcons();
  
  // Attach simulation download trigger
  content.querySelector(".download-trigger-btn").addEventListener("click", () => {
    simulateDownload(p.title);
  });

  document.getElementById("publication-modal").classList.add("open");
}

// Simulation download alert
function simulateDownload(title) {
  const btn = document.querySelector(".download-trigger-btn");
  const originalHtml = btn.innerHTML;
  
  btn.innerHTML = `<i data-lucide="loader" class="icon-sm spin"></i> Generating PDF...`;
  lucide.createIcons();
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = `<i data-lucide="check" class="icon-sm"></i> Document Downloaded`;
    lucide.createIcons();
    
    // Create temporary mock PDF download trigger
    const blob = new Blob([`Grandeur SSCBS Research: ${title}\nThis is a mock PDF download simulation for testing purposes.\nDate: 2026`], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, "_")}_grandeur_research.pdf`;
    link.click();

    setTimeout(() => {
      btn.innerHTML = originalHtml;
      lucide.createIcons();
      btn.disabled = false;
    }, 2000);
  }, 1200);
}

/* ==========================================================================
   6. COUNT-UP STATS INTERSECTION OBSERVER
   ========================================================================= */
function initStatsCounter() {
  const statsSection = document.querySelector(".stats-grid");
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting();
        observer.unobserve(statsSection);
      }
    });
  }, { threshold: 0.25 });

  observer.observe(statsSection);
}

function startCounting() {
  document.querySelectorAll(".stat-number").forEach(num => {
    const target = parseInt(num.getAttribute("data-target"), 10);
    const suffix = target === 15 || target === 80 || target === 100 ? "+" : "";
    const speed = 2000 / target; // total animation time is 2 seconds
    
    let count = 0;
    const updateCount = () => {
      // Calculate increment step based on target size
      const increment = Math.ceil(target / 100);
      count += increment;
      
      if (count >= target) {
        num.innerText = target.toLocaleString() + suffix;
      } else {
        num.innerText = count.toLocaleString() + suffix;
        setTimeout(updateCount, speed * increment);
      }
    };
    
    updateCount();
  });
}

function resetAndTriggerStats() {
  document.querySelectorAll(".stat-number").forEach(num => {
    num.innerText = "0";
  });
  // Wait brief period for view section transitions to complete
  setTimeout(startCounting, 300);
}

/* ==========================================================================
   7. FAQ ACCORDION TRIGGER
   ========================================================================== */
function initFaqAccordion() {
  document.querySelectorAll(".faq-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const item = trigger.parentElement;
      const content = item.querySelector(".faq-content");
      const isOpen = item.classList.contains("open");

      // Close all other FAQ items
      document.querySelectorAll(".faq-item").forEach(other => {
        if (other !== item) {
          other.classList.remove("open");
          other.querySelector(".faq-content").style.maxHeight = "0px";
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove("open");
        content.style.maxHeight = "0px";
      } else {
        item.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

/* ==========================================================================
   8. CONTACT FORM VALIDATION & ACTIONS
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check basic HTML validation
    if (!form.checkValidity()) return;

    // Simulate sending network request
    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `<i data-lucide="loader" class="icon-sm spin"></i> Dispatching Message...`;
    lucide.createIcons();
    submitBtn.disabled = true;

    setTimeout(() => {
      // Show success modal
      document.getElementById("success-modal").classList.add("open");
      
      // Reset button and form fields
      submitBtn.innerHTML = originalText;
      lucide.createIcons();
      submitBtn.disabled = false;
      form.reset();
    }, 1500);
  });
}

// Helpers to set dropdown selections automatically from banners/clicks
function selectRecruitmentSubject() {
  const dropdown = document.getElementById("form-subject");
  if (dropdown) {
    dropdown.value = "recruitment";
  }
}

function selectEventSubject() {
  const dropdown = document.getElementById("form-subject");
  if (dropdown) {
    dropdown.value = "events";
  }
}

// Global helper attachments
window.navigateToSection = navigateToSection;
window.selectRecruitmentSubject = selectRecruitmentSubject;
window.selectEventSubject = selectEventSubject;
window.closeDrawer = window.closeDrawer || (() => {});
