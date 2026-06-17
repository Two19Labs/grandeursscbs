// Grandeur SSCBS Website Main Application Logic - Sepia Light Theme

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // Initialize Application Modules
  initRouter();
  initMobileMenu();
  initDataRendering();
  initSearchAndFilters();
  initModals();
  initStatsCounter();
  initContactForm();
});

/* ==========================================================================
   1. HASH-BASED SPA ROUTER
   ========================================================================== */
function initRouter() {
  const handleRoute = () => {
    let rawHash = window.location.hash || "#home";
    let route = rawHash.replace("#", "");
    
    // Map routes to section element IDs
    const sectionMap = {
      "home": "home-view",
      "about": "about-view",
      "projects": "projects-view",
      "publications": "publications-view",
      "events": "events-view",
      "team": "team-view",
      "recruitment": "recruitment-view",
      "contact": "contact-view"
    };

    const targetSectionId = sectionMap[route] || "home-view";

    // Switch active views
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.remove("active");
    });
    const targetSec = document.getElementById(targetSectionId);
    if (targetSec) {
      targetSec.classList.add("active");
    }

    // Update main nav active indicators
    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.getAttribute("data-section") === route) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Update mobile drawer active links
    document.querySelectorAll(".drawer-link").forEach(link => {
      if (link.getAttribute("data-section") === route) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Re-trigger stats counter if navigating home
    if (route === "home") {
      resetAndTriggerStats();
    }
  };

  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("load", handleRoute);

  // Shrink header on scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".main-header");
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function navigateToSection(route) {
  window.location.hash = `#${route}`;
  closeDrawer();
}

/* ==========================================================================
   2. MOBILE DRAWER MENU
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
  overlay.style.backgroundColor = "rgba(16, 33, 65, 0.4)";
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

  window.closeDrawer = closeDrawerLocal;
}

/* ==========================================================================
   3. DATA RENDERING
   ========================================================================== */
function initDataRendering() {
  renderMarqueeLogos();
  renderProjectsList("all");
  renderPublicationsList("all", "");
  renderEventsList();
  renderAchievementsList();
  renderTeamList();
}

// Render Infinite Logo Marquee
function renderMarqueeLogos() {
  const container = document.getElementById("marquee-logos");
  if (!container) return;

  container.innerHTML = "";
  
  // Duplicate arrays to ensure seamless infinite looping translation
  const collabs = GrandeurData.collabs;
  const loopCollabs = [...collabs, ...collabs, ...collabs]; // Triple duplicate to buffer wider screen sizes

  const slide = document.createElement("div");
  slide.className = "marquee-slide";
  
  loopCollabs.forEach(c => {
    const item = document.createElement("div");
    item.className = "marquee-item";
    item.innerHTML = `
      <span class="marquee-item-name">${c.name}</span>
      <span class="marquee-item-label">${c.label}</span>
    `;
    slide.appendChild(item);
  });

  container.appendChild(slide);
}

// Render Consulting Case Studies
function renderProjectsList(filter = "all") {
  const container = document.getElementById("projects-list");
  if (!container) return;

  container.innerHTML = "";

  const filtered = filter === "all" 
    ? GrandeurData.projects 
    : GrandeurData.projects.filter(p => p.tags.includes(filter) || p.domain.includes(filter));

  if (filtered.length === 0) {
    container.innerHTML = `<p class="body-text">No projects found matching this category.</p>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card card-base";
    
    card.innerHTML = `
      <div class="project-card-header">
        <span class="project-domain">${p.domain}</span>
        <span class="project-client">${p.client}</span>
      </div>
      <h3>${p.title}</h3>
      <p class="project-summary">${p.summary}</p>
      <div class="project-meta-bottom">
        <span class="project-duration"><i data-lucide="clock" class="icon-sm"></i> ${p.duration}</span>
        <button class="btn btn-sm btn-outline read-case-btn" data-id="${p.id}">View Details</button>
      </div>
    `;
    container.appendChild(card);
  });

  lucide.createIcons();

  container.querySelectorAll(".read-case-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      openProjectModal(btn.getAttribute("data-id"));
    });
  });
}

// Render Research Publications
function renderPublicationsList(filter = "all", search = "") {
  const container = document.getElementById("publications-list");
  if (!container) return;

  container.innerHTML = "";

  let filtered = GrandeurData.publications;
  if (filter !== "all") {
    filtered = filtered.filter(p => p.category === filter);
  }

  if (search.trim() !== "") {
    const query = search.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.subtitle.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-8"><p class="body-text">No publications match your search.</p></div>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "publication-card card-base";
    
    const tagList = p.tags.map(t => `<span class="tag">${t}</span>`).join("");
    
    card.innerHTML = `
      <div class="pub-meta-top">
        <span class="pub-category">${p.category.replace("-", " ")}</span>
        <span class="pub-date">${p.date}</span>
      </div>
      <h3>${p.title}</h3>
      <p class="pub-desc">${p.description}</p>
      <div class="pub-tags">${tagList}</div>
      <div class="pub-footer">
        <span class="pub-pages"><i data-lucide="file" class="icon-sm"></i> ${p.readTime}</span>
        <button class="btn btn-sm btn-outline read-pub-btn" data-id="${p.id}">Access Primer</button>
      </div>
    `;
    container.appendChild(card);
  });

  lucide.createIcons();

  container.querySelectorAll(".read-pub-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      openPublicationModal(btn.getAttribute("data-id"));
    });
  });
}

// Render Events & Timelines
function renderEventsList() {
  const container = document.getElementById("events-list");
  if (!container) return;

  container.innerHTML = "";

  GrandeurData.events.forEach(e => {
    const card = document.createElement("div");
    card.className = "event-detail-card card-base";
    
    let roundsHtml = "";
    if (e.rounds && e.rounds.length > 0) {
      const nodes = e.rounds.map(r => `
        <div class="stage-node">
          <div class="stage-head">
            <span class="stage-title">${r.name}</span>
            <span class="stage-date">${r.date}</span>
          </div>
          <p class="stage-desc">${r.description}</p>
        </div>
      `).join("");
      
      roundsHtml = `
        <div class="timeline-stages-wrapper">
          <h4>Competition Timeline</h4>
          <div class="stages-line">${nodes}</div>
        </div>
      `;
    }

    let winnersHtml = "";
    if (e.pastWinners && e.pastWinners.length > 0) {
      const list = e.pastWinners.map(w => `
        <div class="win-card">
          <span class="win-pos">${w.position}</span>
          <span class="win-team">${w.team}</span>
          <span class="win-college">${w.college}</span>
        </div>
      `).join("");

      winnersHtml = `
        <div class="winners-sub-block">
          <h4>Past Winners</h4>
          <div class="winners-list">${list}</div>
        </div>
      `;
    }

    const regLinkAction = e.registrationLink === "#" 
      ? `href="#contact" onclick="navigateToSection('contact'); selectEventDropdown('${e.id}');"`
      : `href="${e.registrationLink}" target="_blank"`;

    card.innerHTML = `
      <span class="event-scope-badge">${e.scope}</span>
      <h3>${e.title}</h3>
      <div class="event-meta-info">
        <span class="meta-row"><i data-lucide="tag" class="icon-sm"></i> ${e.type}</span>
        <span class="meta-row"><i data-lucide="calendar" class="icon-sm"></i> ${e.date}</span>
        <span class="meta-row"><i data-lucide="award" class="icon-sm"></i> Prize Pool: ${e.prizePool}</span>
      </div>
      <p class="event-desc">${e.description}</p>
      
      ${roundsHtml}
      ${winnersHtml}

      <div style="margin-top: 24px;">
        <a ${regLinkAction} class="btn btn-navy">Register / Inquire</a>
      </div>
    `;

    container.appendChild(card);
  });

  lucide.createIcons();
}

// Render Achievements List
function renderAchievementsList() {
  const container = document.getElementById("achievements-list");
  if (!container) return;

  container.innerHTML = "";

  GrandeurData.achievements.forEach(a => {
    const card = document.createElement("div");
    card.className = "achievement-card card-base";
    
    card.innerHTML = `
      <div class="ach-icon"><i data-lucide="trophy" class="icon-sm"></i></div>
      <div class="ach-body">
        <h4>${a.title}</h4>
        <p>${a.desc}</p>
      </div>
    `;
    container.appendChild(card);
  });

  lucide.createIcons();
}

// Render Team Lists
function renderTeamList() {
  const faculty = document.getElementById("faculty-list");
  const core = document.getElementById("core-list");
  const advisory = document.getElementById("advisory-list");
  const placements = document.getElementById("placements-list");

  if (faculty) {
    faculty.innerHTML = "";
    GrandeurData.team.faculty.forEach(f => {
      const card = document.createElement("div");
      card.className = "faculty-card card-base";
      card.innerHTML = `
        <div class="faculty-avatar"><i data-lucide="user" class="icon-lg"></i></div>
        <div class="faculty-info">
          <h4>${f.name}</h4>
          <span class="fac-role">${f.role}</span>
          <p class="fac-dept">${f.department}, ${f.college}</p>
          <p class="fac-desc">${f.description}</p>
        </div>
      `;
      faculty.appendChild(card);
    });
  }

  if (core) {
    core.innerHTML = "";
    GrandeurData.team.core.forEach(c => {
      const card = document.createElement("div");
      card.className = "member-card card-base";
      card.innerHTML = `
        <div class="member-avatar"><i data-lucide="user-check" class="icon-lg"></i></div>
        <h4>${c.name}</h4>
        <span class="mem-role">${c.role}</span>
        <span class="mem-placement">${c.placement}</span>
        <div class="member-socials">
          <a href="${c.linkedin}" target="_blank" class="social-btn"><i data-lucide="linkedin"></i></a>
        </div>
      `;
      core.appendChild(card);
    });
  }

  if (advisory) {
    advisory.innerHTML = "";
    GrandeurData.team.advisory.forEach(a => {
      const card = document.createElement("div");
      card.className = "member-card card-base";
      card.innerHTML = `
        <div class="member-avatar"><i data-lucide="award" class="icon-lg"></i></div>
        <h4>${a.name}</h4>
        <span class="mem-role">${a.role}</span>
        <span class="mem-placement">${a.placement}</span>
        <div class="member-socials">
          <a href="${a.linkedin}" target="_blank" class="social-btn"><i data-lucide="linkedin"></i></a>
        </div>
      `;
      advisory.appendChild(card);
    });
  }

  if (placements) {
    placements.innerHTML = "";
    GrandeurData.team.placements.forEach(p => {
      const card = document.createElement("div");
      card.className = "placement-card card-base";
      card.innerHTML = `
        <div class="place-firm">${p.firm}</div>
        <div class="place-label">Alumni Placement</div>
      `;
      placements.appendChild(card);
    });
  }

  lucide.createIcons();
}

/* ==========================================================================
   4. SEARCH AND FILTERS CONTROLLERS
   ========================================================================== */
function initSearchAndFilters() {
  // Project Filter Tabs
  const projBtns = document.querySelectorAll("#project-filters .filter-btn");
  projBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      projBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjectsList(btn.getAttribute("data-filter"));
    });
  });

  // Publications Filter Tabs and Search Bar
  const pubBtns = document.querySelectorAll("#publication-filters .filter-btn");
  const searchInput = document.getElementById("publication-search");
  let filterVal = "all";
  let searchVal = "";

  const updatePubs = () => {
    renderPublicationsList(filterVal, searchVal);
  };

  pubBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      pubBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filterVal = btn.getAttribute("data-filter");
      updatePubs();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchVal = e.target.value;
      updatePubs();
    });
  }
}

/* ==========================================================================
   5. MODALS INJECTOR AND HANDLER
   ========================================================================== */
function initModals() {
  // Modal Close buttons
  document.querySelectorAll(".modal-close, .modal-close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".modal-overlay").forEach(overlay => {
        overlay.classList.remove("open");
      });
    });
  });

  // Overlay click close
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("open");
      }
    });
  });
}

// Inject Case Study Modal
function openProjectModal(id) {
  const p = GrandeurData.projects.find(item => item.id === id);
  if (!p) return;

  const container = document.getElementById("project-modal-content");
  if (!container) return;

  const approachList = p.approach.map(a => `
    <div class="m-check-item">
      <i data-lucide="arrow-right" class="m-check-icon icon-sm"></i>
      <span>${a}</span>
    </div>
  `).join("");

  const resultsList = p.results.map(r => `
    <div class="m-check-item">
      <i data-lucide="check" class="m-check-icon icon-sm"></i>
      <span>${r}</span>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="m-header-sec">
      <div class="m-header-meta">
        <span>${p.client}</span>
        <span>•</span>
        <span>${p.domain}</span>
      </div>
      <h2 class="m-header-title">${p.title}</h2>
    </div>
    
    <div class="m-grid">
      <div class="m-body-left">
        <h4>Corporate Dilemma / Problem</h4>
        <p>${p.problem}</p>
        
        <h4>Strategic Approach</h4>
        <div class="m-checklist" style="margin-bottom: 24px;">
          ${approachList}
        </div>
        
        <h4>Project Outcomes</h4>
        <div class="m-checklist">
          ${resultsList}
        </div>
      </div>
      
      <div class="m-body-right">
        <h4>LP Logistics</h4>
        <div class="m-stats-list">
          <div class="m-stat-row">
            <span class="m-stat-name">Client Enterprise</span>
            <span class="m-stat-val">${p.client}</span>
          </div>
          <div class="m-stat-row">
            <span class="m-stat-name">Scope Domain</span>
            <span class="m-stat-val">${p.domain}</span>
          </div>
          <div class="m-stat-row">
            <span class="m-stat-name">Duration</span>
            <span class="m-stat-val">${p.duration}</span>
          </div>
          <div class="m-stat-row">
            <span class="m-stat-name">LP Status</span>
            <span class="m-stat-val" style="color: #22c55e;">${p.status}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  lucide.createIcons();
  document.getElementById("project-modal").classList.add("open");
}

// Inject Publication Modal
function openPublicationModal(id) {
  const p = GrandeurData.publications.find(item => item.id === id);
  if (!p) return;

  const container = document.getElementById("publication-modal-content");
  if (!container) return;

  const highlightsList = p.highlights.map(h => `
    <div class="m-check-item">
      <i data-lucide="check" class="m-check-icon icon-sm"></i>
      <span>${h}</span>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="m-header-sec" style="margin-bottom: 20px; padding-bottom: 12px;">
      <div class="m-header-meta">
        <span>${p.category.replace("-", " ")}</span>
        <span>•</span>
        <span>${p.date}</span>
      </div>
      <h2 class="m-header-title" style="font-size: 1.5rem;">${p.title}</h2>
    </div>
    
    <p class="body-text" style="font-size: 0.9rem; margin-bottom: 20px;">${p.description}</p>
    
    <h4 style="font-size: 0.95rem; margin-bottom: 12px; font-family: var(--font-body); font-weight: 700; color: var(--primary);">Key Thesis Highlights</h4>
    <div class="m-checklist" style="margin-bottom: 28px;">
      ${highlightsList}
    </div>
    
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 20px;">
      <span class="body-text" style="margin: 0; font-size: 0.8rem;"><i data-lucide="file" class="icon-sm"></i> Size: ${p.readTime}</span>
      <button class="btn btn-navy download-trigger-btn">
        <i data-lucide="download" class="icon-sm"></i> Access PDF Document
      </button>
    </div>
  `;

  lucide.createIcons();
  
  // Attach simulation download trigger
  container.querySelector(".download-trigger-btn").addEventListener("click", () => {
    simulateDownload(p.title);
  });

  document.getElementById("publication-modal").classList.add("open");
}

function simulateDownload(title) {
  const btn = document.querySelector(".download-trigger-btn");
  const originalHtml = btn.innerHTML;
  
  btn.innerHTML = `<i data-lucide="loader" class="icon-sm spin"></i> Fetching Document...`;
  lucide.createIcons();
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = `<i data-lucide="check" class="icon-sm"></i> Download Complete`;
    lucide.createIcons();
    
    // Download script simulation
    const blob = new Blob([`Grandeur SSCBS Research: ${title}\nThis is a mock PDF download simulation from grandeur-sepia.\nDate: 2026`], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, "_")}_grandeur_research.pdf`;
    link.click();

    setTimeout(() => {
      btn.innerHTML = originalHtml;
      lucide.createIcons();
      btn.disabled = false;
    }, 2000);
  }, 1000);
}

/* ==========================================================================
   6. COUNT-UP STATS
   ========================================================================== */
function initStatsCounter() {
  const statsSection = document.querySelector(".stats-stripe");
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
    const suffix = "+";
    const speed = 1500 / target; // total animation time is 1.5 seconds
    
    let count = 0;
    const updateCount = () => {
      const increment = Math.ceil(target / 80);
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
  setTimeout(startCounting, 300);
}

/* ==========================================================================
   7. CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) return;

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `<i data-lucide="loader" class="icon-sm spin"></i> Transmitting...`;
    lucide.createIcons();
    submitBtn.disabled = true;

    setTimeout(() => {
      // Show success modal
      document.getElementById("success-modal").classList.add("open");
      
      submitBtn.innerHTML = originalText;
      lucide.createIcons();
      submitBtn.disabled = false;
      form.reset();
    }, 1200);
  });
}

// Dropdown selector helpers
function selectEventDropdown(eventId) {
  const dropdown = document.getElementById("c-subject");
  if (dropdown) {
    if (eventId === 'ev-invicta' || eventId === 'ev-echelon') {
      dropdown.value = "invicta";
    } else {
      dropdown.value = "other";
    }
  }
}

// Global helpers
window.navigateToSection = navigateToSection;
window.selectEventDropdown = selectEventDropdown;
window.closeDrawer = window.closeDrawer || (() => {});
