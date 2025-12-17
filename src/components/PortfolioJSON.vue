<template>
  <v-main :class="theme.global.name.value === 'dark' ? 'bg-grey-darken-4' : 'bg-grey-lighten-5'">
    <v-container fluid class="pa-0">
      <div class="d-flex flex-column" style="min-height: 100vh">
        <!-- Netflix-Style Header -->
        <div class="netflix-header" :class="{ 'scrolled': showScrollTop }">
          <div class="netflix-header-content">
            <div class="netflix-logo" @click="scrollToTop">
              <span class="netflix-logo-text" :class="theme.global.name.value === 'dark' ? 'text-white' : 'text-grey-darken-1'">
                {{ resumeData.name }}
              </span>
            </div>
            <div class="d-flex align-center ga-2 ga-md-4 flex-wrap justify-center header-controls">
            <!-- Format Toggle Switch -->
            <div class="d-flex align-center ga-1" :style="`border: 1px solid ${theme.global.name.value === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}; border-radius: 24px; padding: 2px;`">
              <v-btn
                @click="format = 'json'"
                :variant="format === 'json' ? 'flat' : 'text'"
                :color="format === 'json' ? 'primary' : 'transparent'"
                size="small"
                class="text-caption format-btn px-2 px-sm-3 px-md-4"
                :style="{ minWidth: '44px', minHeight: '44px' }"
                aria-label="Switch to JSON format (Press J)"
              >
                JSON
              </v-btn>
              <v-btn
                @click="format = 'yaml'"
                :variant="format === 'yaml' ? 'flat' : 'text'"
                :color="format === 'yaml' ? 'primary' : 'transparent'"
                size="small"
                class="text-caption format-btn px-2 px-sm-3 px-md-4"
                :style="{ minWidth: '44px', minHeight: '44px' }"
                aria-label="Switch to YAML format (Press Y)"
              >
                YAML
              </v-btn>
              <v-btn
                @click="format = 'toml'"
                :variant="format === 'toml' ? 'flat' : 'text'"
                :color="format === 'toml' ? 'primary' : 'transparent'"
                size="small"
                class="text-caption format-btn px-2 px-sm-3 px-md-4"
                :style="{ minWidth: '44px', minHeight: '44px' }"
                aria-label="Switch to TOML format (Press T)"
              >
                TOML
              </v-btn>
              <v-btn
                @click="format = 'card'"
                :variant="format === 'card' ? 'flat' : 'text'"
                :color="format === 'card' ? 'primary' : 'transparent'"
                size="small"
                class="text-caption format-btn px-2 px-sm-3 px-md-4"
                :style="{ minWidth: '44px', minHeight: '44px' }"
                aria-label="Switch to Card view (Press C)"
              >
                CARD
              </v-btn>
            </div>
            
            <v-divider vertical class="d-none d-md-flex"></v-divider>
            
            <v-btn
              @click="toggleTheme"
              variant="text"
              size="small"
              :icon="theme.global.name.value === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
              :style="{ minWidth: '44px', minHeight: '44px' }"
              class="action-btn"
              :aria-label="`Switch to ${theme.global.name.value === 'dark' ? 'light' : 'dark'} theme`"
            >
            </v-btn>
            <v-btn
              @click="handleCopy"
              variant="text"
              size="small"
              :loading="copyLoading"
              :style="{ minWidth: '44px', minHeight: '44px' }"
              class="action-btn"
              aria-label="Copy to clipboard"
            >
              <v-icon start size="small">mdi-content-copy</v-icon>
              <span class="d-none d-sm-inline">Copy</span>
            </v-btn>
            <v-btn
              @click="handleDownload"
              variant="text"
              size="small"
              :loading="downloadLoading"
              :style="{ minWidth: '44px', minHeight: '44px' }"
              class="action-btn"
              aria-label="Download file"
            >
              <v-icon start size="small">mdi-download</v-icon>
              <span class="d-none d-sm-inline">Download</span>
            </v-btn>
            <v-btn
              v-if="format === 'card'"
              @click="handlePDFExport"
              variant="text"
              size="small"
              :loading="pdfLoading"
              :style="{ minWidth: '44px', minHeight: '44px' }"
              class="action-btn"
              aria-label="Export to PDF"
            >
              <v-icon start size="small">mdi-file-pdf-box</v-icon>
              <span class="d-none d-sm-inline">PDF</span>
            </v-btn>
            </div>
          </div>
        </div>
        
        <!-- Content starts here with padding for fixed header -->
        <div class="main-content-wrapper">

        <!-- Format Display -->
        <div v-if="format !== 'card'" class="flex-grow-1 pa-4 pa-md-6" style="overflow-y: auto; text-align: left;">
          <pre 
            ref="codeBlock"
            class="ma-0 code-block" 
            :class="`language-${format}`"
            style="font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.6; text-align: left;"
          ><code :class="`language-${format}`">{{ formattedContent }}</code></pre>
        </div>

        <!-- Card View (Netflix-style) -->
        <div v-else class="flex-grow-1 card-view-container" style="overflow-y: auto;">
          <!-- Search Bar (only in card view) -->
          <div class="pa-4 pa-md-6 pb-2">
            <div class="d-flex align-center ga-3">
              <v-text-field
  v-model="searchQuery"
  prepend-inner-icon="mdi-magnify"
  placeholder="Search experience, projects, skills..."
  variant="outlined"
  density="compact"
  clearable
  hide-details
  @click:clear="searchQuery = ''"
/>
              <div v-if="searchQuery.trim()" class="search-results-count text-caption" :class="theme.global.name.value === 'dark' ? 'text-grey-lighten-1' : 'text-grey-darken-1'">
                {{ searchResultsCount }} result{{ searchResultsCount !== 1 ? 's' : '' }}
              </div>
            </div>
          </div>
          
          <!-- Hero Section -->
          <div class="hero-section pa-8 pa-md-12 text-center">
            <h1 class="text-h3 text-md-h2 font-weight-bold mb-3" :class="theme.global.name.value === 'dark' ? 'text-white' : 'text-grey-darken-1'">
              {{ resumeData.name }}
            </h1>
            <p class="text-h6 mb-6" :class="theme.global.name.value === 'dark' ? 'text-grey-lighten-1' : 'text-grey-darken-2'">
              {{ resumeData.title }}
            </p>
            <div class="d-flex justify-center ga-3 mb-8 flex-wrap">
              <v-chip size="small" variant="outlined" prepend-icon="mdi-email" class="contact-chip">
                {{ resumeData.contact.email }}
              </v-chip>
              <v-chip size="small" variant="outlined" prepend-icon="mdi-map-marker" class="contact-chip">
                {{ resumeData.contact.location }}
              </v-chip>
              <v-chip 
                size="small" 
                variant="outlined" 
                prepend-icon="mdi-linkedin"
                :href="resumeData.contact.linkedin"
                target="_blank"
                clickable
                class="contact-chip"
              >
                LinkedIn
              </v-chip>
              <v-chip 
                size="small" 
                variant="outlined" 
                prepend-icon="mdi-github"
                :href="resumeData.contact.github"
                target="_blank"
                clickable
                class="contact-chip"
              >
                GitHub
              </v-chip>
            </div>
            <p class="text-body-1 mx-auto mb-0 text-center summary-text" style="max-width: 800px; line-height: 1.8;" :class="theme.global.name.value === 'dark' ? 'text-grey-lighten-2' : 'text-grey-darken-1'">
              {{ resumeData.summary }}
            </p>
          </div>

          <!-- Experience Section -->
          <div class="section-container pa-6 pa-md-8 experience-section-wrapper" v-show="filteredExperience.length > 0">
            <h2 class="text-h5 mb-5 section-title" :class="theme.global.name.value === 'dark' ? 'text-white' : 'text-grey-darken-1'">
              Experience
            </h2>
            
            <!-- Timeline with branches and emojis -->
            <div class="experience-timeline-container">
              <!-- Vertical Timeline Line -->
              <div class="timeline-line"></div>
              
              <!-- Experience Cards with Timeline Nodes -->
              <div class="experience-cards-with-timeline">
                <div
                  v-for="(row, rowIndex) in filteredExperienceRows"
                  :key="rowIndex"
                  class="experience-row mb-6"
                >
                  <!-- Row Branch connecting to main timeline with Year Label -->
                  <div class="timeline-row-branch">
                    <div class="timeline-row-year">
                      <span class="timeline-row-year-text">{{ getRowYearRange(row) }}</span>
                    </div>
                  </div>
                  
                  <div class="experience-scroll d-flex ga-6" style="overflow-x: auto; overflow-y: visible; padding: 8px 16px 24px 16px; justify-content: flex-start;">
                    <div
                      v-for="(exp, index) in row"
                      :key="`${rowIndex}-${index}`"
                      class="experience-card-wrapper"
                    >
                      <!-- Timeline Node with Emoji/Logo -->
                      <div class="timeline-node">
                        <div class="timeline-node-connector"></div>
                        <div class="timeline-node-icon">
                          <span v-if="exp.emoji" class="timeline-emoji">{{ exp.emoji }}</span>
                          <v-avatar v-else-if="exp.logo" size="40" class="timeline-logo">
                            <v-img :src="exp.logo" :alt="exp.company" />
                          </v-avatar>
                          <v-icon v-else size="24" color="primary">mdi-briefcase</v-icon>
                        </div>
                        <div class="timeline-node-branch"></div>
                      </div>
                      
                      <!-- Experience Card -->
                      <v-card
                        class="experience-card flex-shrink-0"
                        :width="cardWidth"
                        variant="outlined"
                      >
                  <v-card-title class="pb-2">
                    <div class="w-100">
                      <div class="text-h6 mb-1" v-html="highlightText(exp.company, searchQuery)"></div>
                      <div class="text-subtitle-2 text-grey" v-html="highlightText(exp.role, searchQuery)"></div>
                    </div>
                  </v-card-title>
                  <v-card-subtitle class="d-flex align-center ga-2 pt-0 pb-2">
                    <v-icon size="small">mdi-map-marker</v-icon>
                    <span class="text-body-2">{{ exp.location }}</span>
                    <v-spacer></v-spacer>
                    <span class="text-caption">{{ exp.from }} - {{ exp.to }}</span>
                  </v-card-subtitle>
                  <v-divider class="mx-4 mb-3"></v-divider>
                  <v-card-text class="pt-0">
                    <ul class="pl-4 mb-0" style="list-style-type: disc;">
                      <li v-for="(bullet, i) in exp.bullets" :key="i" class="mb-3 text-body-2" style="line-height: 1.6;" v-html="highlightText(bullet, searchQuery)"></li>
                    </ul>
                  </v-card-text>
                </v-card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Projects Section -->
          <div class="section-container pa-6 pa-md-8" v-show="filteredProjects.length > 0">
            <h2 class="text-h5 mb-5 section-title" :class="theme.global.name.value === 'dark' ? 'text-white' : 'text-grey-darken-1'">
              Projects
            </h2>
            <v-row class="ma-0">
              <v-col
                v-for="(project, index) in filteredProjects"
                :key="index"
                cols="12"
                sm="6"
                md="4"
                class="pa-2"
              >
                <v-card
                  class="project-card h-100"
                  variant="outlined"
                  hover
                >
                  <v-card-title class="pb-3" v-html="highlightText(project.name, searchQuery)"></v-card-title>
                  <v-card-text class="pt-0">
                    <div class="mb-4">
                      <v-chip
                        v-for="(tech, i) in project.tech"
                        :key="i"
                        size="x-small"
                        class="ma-1"
                        variant="tonal"
                      >
                        <span v-html="highlightText(tech, searchQuery)"></span>
                      </v-chip>
                    </div>
                    <p class="text-body-2 mb-0" style="line-height: 1.6;" v-html="highlightText(project.description, searchQuery)"></p>
                  </v-card-text>
                  <v-card-actions v-if="project.github || project.live">
                    <v-btn
                      v-if="project.github"
                      :href="project.github"
                      target="_blank"
                      size="small"
                      variant="text"
                      prepend-icon="mdi-github"
                    >
                      Code
                    </v-btn>
                    <v-btn
                      v-if="project.live"
                      :href="project.live"
                      target="_blank"
                      size="small"
                      variant="text"
                      prepend-icon="mdi-open-in-new"
                    >
                      Live
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <!-- Skills Section -->
          <div class="section-container pa-6 pa-md-8" v-show="Object.keys(filteredSkills).length > 0">
            <h2 class="text-h5 mb-5 section-title" :class="theme.global.name.value === 'dark' ? 'text-white' : 'text-grey-darken-1'">
              Skills
            </h2>
            <div
              v-for="(skills, category) in filteredSkills"
              :key="category"
              class="mb-8"
            >
              <h3 class="text-subtitle-1 mb-4 font-weight-medium" :class="theme.global.name.value === 'dark' ? 'text-grey-lighten-1' : 'text-grey-darken-2'">
                {{ category }}
              </h3>
              <div class="d-flex flex-wrap ga-2">
                <v-chip
                  v-for="(skill, i) in skills"
                  :key="i"
                  size="small"
                  variant="outlined"
                  class="skill-chip"
                >
                  {{ skill }}
                </v-chip>
              </div>
            </div>
          </div>

          <!-- Education & Certifications -->
          <div class="section-container pa-6 pa-md-8" v-show="filteredEducation.length > 0 || filteredCertifications.length > 0">
            <div class="education-certifications-wrapper">
              <!-- Education Section -->
              <div class="education-section" v-show="filteredEducation.length > 0">
                <h2 class="text-h5 mb-5 section-title text-center" :class="theme.global.name.value === 'dark' ? 'text-white' : 'text-grey-darken-1'">
                  Education
                </h2>
                <div class="education-cards-container">
                  <v-card
                    v-for="(edu, index) in filteredEducation"
                    :key="index"
                    class="education-card"
                    variant="outlined"
                  >
                    <v-card-text class="d-flex align-center pa-4">
                      <div class="education-logo-wrapper mr-4">
                        <div v-if="edu.emoji" class="education-emoji">
                          {{ edu.emoji }}
                        </div>
                        <v-img 
                          v-else-if="edu.logo"
                          :src="edu.logo" 
                          :alt="edu.school"
                          class="education-logo-img"
                          @error="handleLogoError"
                          cover
                        />
                        <v-icon
                          v-else
                          size="64"
                          color="primary"
                          class="education-logo-icon"
                        >
                          mdi-school
                        </v-icon>
                      </div>
                      <div class="flex-grow-1">
                        <div class="text-h6 mb-1">{{ edu.school }}</div>
                        <div class="text-subtitle-2 text-grey mb-2">{{ edu.degree }}</div>
                        <div class="text-caption">{{ edu.from }} - {{ edu.to }}</div>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
              </div>

              <!-- Certifications Section -->
              <div class="certifications-section" v-show="filteredCertifications.length > 0">
                <h2 class="text-h5 mb-5 section-title text-center" :class="theme.global.name.value === 'dark' ? 'text-white' : 'text-grey-darken-1'">
                  Certifications
                </h2>
                <div class="d-flex justify-center flex-wrap ga-3">
                  <v-card
                    v-for="(cert, index) in filteredCertifications"
                    :key="index"
                    class="certification-card"
                    variant="outlined"
                    min-width="280"
                    max-width="100%"
                  >
                    <v-card-text class="d-flex align-center pa-3">
                      <v-icon class="mr-3" color="primary" size="small">mdi-certificate</v-icon>
                      <span class="text-body-2">{{ cert }}</span>
                    </v-card-text>
                  </v-card>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </v-container>

    <!-- Scroll to Top Button -->
    <v-fade-transition>
      <v-btn
        v-show="showScrollTop"
        @click="scrollToTop"
        icon
        size="large"
        color="primary"
        class="scroll-to-top-btn"
        aria-label="Scroll to top"
        style="position: fixed; bottom: 24px; right: 24px; z-index: 1000;"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-fade-transition>

    <!-- Toast Notification -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      location="top"
    >
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import { useTheme } from "vuetify";
import * as yaml from "js-yaml";
import * as TOML from "@ltd/j-toml";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-toml";
import type { ResumeData } from "@/types/resume";
import resumeDataJson from "@/data/resume.json";

const theme = useTheme();
const format = ref<"json" | "yaml" | "toml" | "card">("json");
const codeBlock = ref<HTMLElement | null>(null);
const copyLoading = ref(false);
const downloadLoading = ref(false);
const pdfLoading = ref(false);
const windowWidth = ref(window.innerWidth);
const searchQuery = ref("");
const showScrollTop = ref(false);
const snackbar = ref({
  show: false,
  message: "",
  color: "success",
});

// Load resume data with type safety
const resumeData = resumeDataJson as ResumeData;

// Update window width on resize for responsive calculations
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

// Scroll to top functionality
const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Highlight search terms in text
const highlightText = (text: string, query: string): string => {
  if (!query || !query.trim()) {
    return text;
  }
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
};

// Fixed handleLogoError with proper type check
const handleLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  if (img && img.parentElement) {
    img.style.display = 'none';
    const card = img.closest('.education-card');
    if (card) {
      const cardIndex = Array.from(card.parentElement?.children || []).indexOf(card);
      const edu = resumeData.education[cardIndex];
      if (edu?.emoji) {
        const emojiDiv = document.createElement('div');
        emojiDiv.className = 'education-emoji';
        emojiDiv.textContent = edu.emoji;
        img.parentElement?.appendChild(emojiDiv);
      }
    }
  }
};

// Keyboard shortcuts
const handleKeydown = (event: KeyboardEvent) => {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
    return;
  }
  if (event.key === 'j' && !event.ctrlKey && !event.metaKey) {
    event.preventDefault();
    format.value = 'json';
  } else if (event.key === 'y' && !event.ctrlKey && !event.metaKey) {
    event.preventDefault();
    format.value = 'yaml';
  } else if (event.key === 't' && !event.ctrlKey && !event.metaKey) {
    event.preventDefault();
    format.value = 'toml';
  } else if (event.key === 'c' && !event.ctrlKey && !event.metaKey) {
    event.preventDefault();
    format.value = 'card';
  } else if (event.key === 'Escape') {
    searchQuery.value = '';
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('scroll', handleScroll);
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    theme.global.name.value = savedTheme;
  }
  if (format.value !== 'card') {
    highlightCode();
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('scroll', handleScroll);
});

const toggleTheme = () => {
  const newTheme = theme.global.name.value === 'dark' ? 'light' : 'dark';
  theme.global.name.value = newTheme;
  localStorage.setItem('portfolio-theme', newTheme);
  nextTick(() => {
    highlightCode();
  });
};

const highlightCode = () => {
  nextTick(() => {
    if (codeBlock.value) {
      const codeElement = codeBlock.value.querySelector('code');
      if (codeElement) {
        Prism.highlightElement(codeElement);
      }
    }
  });
};

const showSnackbar = (message: string, color: string = "success") => {
  snackbar.value = { show: true, message, color };
};

const formattedContent = computed(() => {
  if (format.value === 'yaml') {
    return yaml.dump(resumeData, { indent: 2, lineWidth: -1 });
  }
  if (format.value === 'toml') {
    try {
      return TOML.stringify(resumeData as any, { newline: '\n', indent: 2 });
    } catch (error) {
      return `# Error converting to TOML\n${JSON.stringify(resumeData, null, 2)}`;
    }
  }
  return JSON.stringify(resumeData, null, 2);
});

// Search/filter functionality
const filteredExperience = computed(() => {
  if (!searchQuery.value.trim()) return resumeData.experience;
  const query = searchQuery.value.toLowerCase();
  return resumeData.experience.filter(exp =>
    exp.company.toLowerCase().includes(query) ||
    exp.role.toLowerCase().includes(query) ||
    exp.bullets.some(bullet => bullet.toLowerCase().includes(query))
  );
});

const filteredProjects = computed(() => {
  if (!searchQuery.value.trim()) return resumeData.projects;
  const query = searchQuery.value.toLowerCase();
  return resumeData.projects.filter(project =>
    project.name.toLowerCase().includes(query) ||
    project.description.toLowerCase().includes(query)
  );
});

const filteredSkills = computed(() => {
  if (!searchQuery.value.trim()) return resumeData.skills;
  const query = searchQuery.value.toLowerCase();
  const filtered: Record<string, string[]> = {};
  Object.entries(resumeData.skills).forEach(([category, skills]) => {
    const matchingSkills = skills.filter(skill => skill.toLowerCase().includes(query));
    if (matchingSkills.length > 0) filtered[category] = matchingSkills;
  });
  return filtered;
});

const filteredEducation = computed(() => {
  if (!searchQuery.value.trim()) return resumeData.education;
  const query = searchQuery.value.toLowerCase();
  return resumeData.education.filter(edu => edu.school.toLowerCase().includes(query));
});

const filteredCertifications = computed(() => {
  if (!searchQuery.value.trim()) return resumeData.certifications;
  const query = searchQuery.value.toLowerCase();
  return resumeData.certifications.filter(cert => cert.toLowerCase().includes(query));
});

const searchResultsCount = computed(() => {
  if (!searchQuery.value.trim()) return 0;
  return filteredExperience.value.length + filteredProjects.value.length + 
         Object.values(filteredSkills.value).flat().length + 
         filteredEducation.value.length + filteredCertifications.value.length;
});

const getRowYearRange = (row: typeof resumeData.experience): string => {
  if (row.length === 0) return '';
  const years = row.flatMap(exp => {
    const fromYear = parseInt(exp.from.split('-')[0]);
    const toYear = exp.to === 'Present' ? new Date().getFullYear() : parseInt(exp.to.split('-')[0]);
    return [fromYear, toYear].filter(y => !isNaN(y));
  });
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  return row.some(exp => exp.to === 'Present') ? `${minYear} - Present` : `${minYear} - ${maxYear}`;
};

const filteredExperienceRows = computed(() => {
  const experiences = filteredExperience.value;
  const rows = [];
  const cardsPerRow = windowWidth.value < 600 ? 3 : windowWidth.value < 960 ? 4 : 5;
  for (let i = 0; i < experiences.length; i += cardsPerRow) {
    rows.push(experiences.slice(i, i + cardsPerRow));
  }
  return rows;
});

const cardWidth = computed(() => {
  if (windowWidth.value < 600) return 380;
  if (windowWidth.value < 960) return 480;
  if (windowWidth.value < 1280) return 520;
  return 560;
});

watch(format, () => { if (format.value !== 'card') highlightCode(); });
watch(formattedContent, () => { if (format.value !== 'card') highlightCode(); });

const handleCopy = async () => {
  if (format.value === 'card') return;
  copyLoading.value = true;
  try {
    await navigator.clipboard.writeText(formattedContent.value);
    showSnackbar("Copied!", "success");
  } finally {
    copyLoading.value = false;
  }
};

const handleDownload = () => {
  if (format.value === 'card') return;
  const blob = new Blob([formattedContent.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `resume.${format.value}`;
  a.click();
  URL.revokeObjectURL(url);
};

const handlePDFExport = async () => {
  pdfLoading.value = true;
  try {
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).jsPDF;
    const element = document.querySelector('.card-view-container') as HTMLElement;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
    pdf.save("resume.pdf");
  } finally {
    pdfLoading.value = false;
  }
};
</script>

<style scoped>
pre.code-block {
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align: left;
  display: block;
  margin: 0;
  padding: 0;
  background: transparent !important;
}

pre.code-block code {
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  background: transparent !important;
}

/* Prism theme adjustments */
:deep(.token) {
  background: transparent !important;
}

/* Override Prism styles to work with Vuetify themes */
:deep(code[class*="language-"]) {
  background: transparent !important;
}

/* Responsive Design - Comprehensive Breakpoints */

/* Base styles for all devices */
pre.code-block {
  font-size: clamp(11px, 2vw, 14px);
}

.card-view-container {
  padding-bottom: 32px;
  /* iOS safe area support */
  padding-bottom: max(32px, env(safe-area-inset-bottom));
}

.hero-section {
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%);
  margin-bottom: 24px;
  /* iOS safe area support */
  padding-left: max(32px, env(safe-area-inset-left));
  padding-right: max(32px, env(safe-area-inset-right));
  padding-top: max(32px, env(safe-area-inset-top));
  display: flex;
  flex-direction: column;
  align-items: center;
}

.summary-text {
  text-align: center !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.section-container {
  margin-bottom: 16px;
  /* iOS safe area support */
  padding-left: max(24px, env(safe-area-inset-left));
  padding-right: max(24px, env(safe-area-inset-right));
}

.section-title {
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
}

.contact-chip {
  margin: 4px;
  /* Touch-friendly sizing */
  min-height: 32px;
  padding: 4px 12px;
}

/* Timeline Styles */
.experience-section-wrapper {
  position: relative;
}

.experience-timeline-container {
  position: relative;
  padding-left: 100px;
}

.timeline-line {
  position: absolute;
  left: 50px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(
    to bottom,
    rgba(25, 118, 210, 0.3) 0%,
    rgba(25, 118, 210, 0.6) 50%,
    rgba(25, 118, 210, 0.3) 100%
  );
  border-radius: 2px;
  z-index: 0;
}


.experience-cards-with-timeline {
  position: relative;
  z-index: 1;
}

.experience-row {
  position: relative;
}

.timeline-row-branch {
  position: absolute;
  left: -100px;
  top: 50%;
  width: 50px;
  height: 2px;
  background: linear-gradient(
    to right,
    rgba(25, 118, 210, 0.6),
    rgba(25, 118, 210, 0.3)
  );
  transform: translateY(-50%);
  z-index: 1;
  display: flex;
  align-items: center;
}

.timeline-row-year {
  position: absolute;
  left: -80px;
  transform: translateX(-100%);
  white-space: nowrap;
}

.timeline-row-year-text {
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.15), rgba(25, 118, 210, 0.25));
  border: 2px solid rgba(25, 118, 210, 0.4);
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(25, 118, 210, 0.9);
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.2);
  backdrop-filter: blur(10px);
  display: inline-block;
}

.v-theme--dark .timeline-row-year-text {
  background: linear-gradient(135deg, rgba(100, 181, 246, 0.15), rgba(100, 181, 246, 0.25));
  border-color: rgba(100, 181, 246, 0.4);
  color: rgba(100, 181, 246, 0.9);
  box-shadow: 0 2px 8px rgba(100, 181, 246, 0.2);
}

.experience-card-wrapper {
  position: relative;
  display: inline-block;
}

.timeline-node {
  position: absolute;
  left: -70px;
  top: 20px;
  display: flex;
  align-items: center;
  z-index: 2;
  pointer-events: none;
}

.timeline-node-connector {
  width: 15px;
  height: 2px;
  background: linear-gradient(
    to right,
    rgba(25, 118, 210, 0.6),
    rgba(25, 118, 210, 0.3)
  );
}

.timeline-node-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(25, 118, 210, 0.2));
  border: 3px solid rgba(25, 118, 210, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  margin: 0 8px;
}

.experience-card-wrapper:hover .timeline-node-icon {
  transform: scale(1.15);
  border-color: rgba(25, 118, 210, 0.8);
  box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4);
}

.timeline-emoji {
  font-size: 24px;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.timeline-logo {
  border: 2px solid rgba(25, 118, 210, 0.3);
}

.timeline-node-branch {
  width: 20px;
  height: 2px;
  background: linear-gradient(
    to right,
    rgba(25, 118, 210, 0.4),
    transparent
  );
}

/* Dark theme adjustments */
.v-theme--dark .timeline-line {
  background: linear-gradient(
    to bottom,
    rgba(100, 181, 246, 0.3) 0%,
    rgba(100, 181, 246, 0.6) 50%,
    rgba(100, 181, 246, 0.3) 100%
  );
}

.v-theme--dark .timeline-node-connector,
.v-theme--dark .timeline-node-branch {
  background: linear-gradient(
    to right,
    rgba(100, 181, 246, 0.6),
    rgba(100, 181, 246, 0.3)
  );
}

.v-theme--dark .timeline-node-icon {
  background: linear-gradient(135deg, rgba(100, 181, 246, 0.15), rgba(100, 181, 246, 0.25));
  border-color: rgba(100, 181, 246, 0.5);
  box-shadow: 0 4px 12px rgba(100, 181, 246, 0.2);
}

.v-theme--dark .timeline-node-icon:hover {
  border-color: rgba(100, 181, 246, 0.8);
  box-shadow: 0 6px 20px rgba(100, 181, 246, 0.4);
}

/* Search highlight styles */
.search-highlight {
  background-color: rgba(255, 235, 59, 0.4);
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: 600;
  color: inherit;
}

.v-theme--dark .search-highlight {
  background-color: rgba(255, 235, 59, 0.3);
  color: rgba(255, 235, 59, 0.9);
}

.search-results-count {
  min-width: 80px;
  text-align: right;
  font-weight: 500;
}

/* Responsive adjustments for timeline */
@media (max-width: 1279px) {
  .experience-timeline-container {
    padding-left: 80px;
  }
  
  .timeline-line {
    left: 40px;
  }
  
  .timeline-row-year-text {
    font-size: 10px;
    padding: 3px 8px;
  }
  
  .timeline-row-branch {
    left: -80px;
    width: 40px;
  }
  
  .timeline-node {
    left: -60px;
  }
  
  .timeline-node-icon {
    width: 42px;
    height: 42px;
  }
  
  .timeline-emoji {
    font-size: 20px;
  }
}

@media (max-width: 959px) {
  .experience-timeline-container {
    padding-left: 70px;
  }
  
  .timeline-line {
    left: 35px;
  }
  
  .timeline-row-year-text {
    font-size: 9px;
    padding: 2px 6px;
  }
  
  .timeline-row-branch {
    left: -70px;
    width: 35px;
  }
  
  .timeline-node {
    left: -55px;
  }
  
  .timeline-node-icon {
    width: 38px;
    height: 38px;
  }
  
  .timeline-emoji {
    font-size: 18px;
  }
}

@media (max-width: 599px) {
  .experience-timeline-container {
    padding-left: 0;
  }
  
  .timeline-line,
  .timeline-node,
  .timeline-row-branch {
    display: none;
  }
}

.experience-row {
  margin-bottom: 32px;
}

.experience-row:last-child {
  margin-bottom: 0;
}

.experience-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  /* Smooth scrolling on iOS */
  -webkit-overflow-scrolling: touch;
  /* Momentum scrolling */
  overscroll-behavior-x: contain;
  /* Add padding for better scroll indication */
  padding-left: max(16px, env(safe-area-inset-left));
  padding-right: max(16px, env(safe-area-inset-right));
  /* Center align cards when content is smaller than container */
  justify-content: center;
}

/* When content overflows, allow scrolling */
.experience-scroll:has(.experience-card:nth-child(3)) {
  justify-content: flex-start;
}

.experience-scroll::-webkit-scrollbar {
  height: 8px;
}

.experience-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.experience-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.experience-card {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              z-index 0.3s ease,
              filter 0.3s ease;
  height: 100%;
  /* Touch-friendly */
  touch-action: manipulation;
  /* Ensure cards can overlap when magnified */
  position: relative;
  z-index: 1;
  /* Add margin to prevent overlap */
  margin: 0 8px;
  margin-left: 0;
}

/* Netflix-style hover magnify effect with backlight */
@media (hover: hover) and (pointer: fine) {
  .experience-card:hover {
    transform: scale(1.08) translateY(-8px);
    /* Backlight/glow effect */
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3),
                0 0 30px rgba(25, 118, 210, 0.4),
                0 0 60px rgba(25, 118, 210, 0.2);
    /* Glow filter for additional backlight */
    filter: drop-shadow(0 0 20px rgba(25, 118, 210, 0.3));
    z-index: 10;
    /* Smooth transition */
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                z-index 0s;
  }
  
  .project-card:hover {
    transform: scale(1.05) translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
}

.project-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
  touch-action: manipulation;
}

.skill-chip {
  margin: 2px;
  /* Touch-friendly */
  min-height: 28px;
}

/* Education & Certifications Styles */
.education-certifications-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.education-section,
.certifications-section {
  margin-bottom: 48px;
}

.education-section:last-child,
.certifications-section:last-child {
  margin-bottom: 0;
}

.education-cards-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.education-card {
  flex: 0 1 400px;
  min-width: 300px;
  max-width: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  touch-action: manipulation;
}

.education-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.education-logo-wrapper {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(25, 118, 210, 0.2);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(25, 118, 210, 0.05);
}

.education-emoji {
  font-size: 48px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.education-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 4px;
}

.education-logo-icon {
  width: 100%;
  height: 100%;
}

.certification-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  touch-action: manipulation;
}

.certification-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media (min-width: 960px) {
  .education-cards-container {
    flex-wrap: nowrap;
  }
  
  .education-card {
    flex: 0 1 450px;
  }
}

@media (max-width: 959px) {
  .education-card {
    flex: 0 1 100%;
    max-width: 500px;
  }
  
  .certification-card {
    min-width: 100% !important;
    max-width: 500px;
  }
}

@media (max-width: 599px) {
  .education-card {
    flex: 0 1 100%;
    min-width: 100%;
  }
  
  .education-card .v-card-text {
    flex-direction: column;
    text-align: center;
  }
  
  .education-logo-wrapper {
    margin-right: 0 !important;
    margin-bottom: 16px;
  }
}

/* Extra Small Devices (Phones, < 480px) */
@media (max-width: 479px) {
  pre.code-block {
    font-size: 11px;
    padding: 8px;
  }
  
  .hero-section {
    padding: 24px 16px !important;
  }
  
  .section-container {
    padding: 20px 12px !important;
  }
  
  .experience-card {
    width: 380px !important;
    min-width: 380px;
    margin: 0 12px;
  }
  
  .contact-chip {
    font-size: 0.7rem;
    padding: 2px 8px;
  }
}

/* Small Devices (Phones, 480px - 599px) */
@media (min-width: 480px) and (max-width: 599px) {
  pre.code-block {
    font-size: 12px;
  }
  
  .hero-section {
    padding: 32px 24px !important;
  }
  
  .section-container {
    padding: 24px 16px !important;
  }
  
  .experience-card {
    width: 380px !important;
    min-width: 380px;
    margin: 0 12px;
  }
}

/* Medium Devices (Tablets, 600px - 959px) */
@media (min-width: 600px) and (max-width: 959px) {
  .hero-section {
    padding: 48px 32px !important;
  }
  
  .section-container {
    padding: 32px 24px !important;
  }
  
  .experience-card {
    width: 480px !important;
    min-width: 480px;
    margin: 0 16px;
  }
}

/* Large Devices (Desktops, 960px - 1279px) */
@media (min-width: 960px) and (max-width: 1279px) {
  .experience-card {
    width: 520px !important;
    min-width: 520px;
    margin: 0 20px;
  }
}

/* Extra Large Devices (Large Desktops, 1280px+) */
@media (min-width: 1280px) {
  .experience-card {
    width: 560px !important;
    min-width: 560px;
    margin: 0 24px;
  }
  
  .card-view-container {
    max-width: 1400px;
    margin: 0 auto;
  }
}

/* Landscape Orientation (Mobile) */
@media (max-width: 959px) and (orientation: landscape) {
  .hero-section {
    padding: 24px 32px !important;
  }
  
  .section-container {
    padding: 20px 24px !important;
  }
}

/* High DPI Displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .experience-card,
  .project-card {
    border-width: 0.5px;
  }
}

/* iOS Specific */
@supports (-webkit-touch-callout: none) {
  .card-view-container {
    /* Better scrolling on iOS */
    -webkit-overflow-scrolling: touch;
  }
  
  .experience-scroll {
    /* Prevent rubber band effect on horizontal scroll */
    overscroll-behavior-x: none;
  }
  
  /* Fix iOS input zoom */
  input, select, textarea {
    font-size: 16px !important;
  }
}

/* Android Specific */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .experience-scroll {
    /* Better scrolling on Android */
    scroll-behavior: smooth;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .experience-scroll::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

/* Reduced Motion (Accessibility) */
@media (prefers-reduced-motion: reduce) {
  .experience-card,
  .project-card {
    transition: none;
  }
  
  .experience-card:hover,
  .project-card:hover {
    transform: none;
  }
}

/* Netflix-Style Header */
.netflix-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
  transition: background 0.3s ease;
  padding: 16px 24px;
  /* iOS safe area support */
  padding-top: max(16px, env(safe-area-inset-top));
  padding-left: max(24px, env(safe-area-inset-left));
  padding-right: max(24px, env(safe-area-inset-right));
}

.netflix-header.scrolled {
  background: rgba(0, 0, 0, 0.9);
}

.v-theme--light .netflix-header {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 100%
  );
}

.v-theme--light .netflix-header.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.netflix-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
}

.netflix-logo {
  cursor: pointer;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.netflix-logo:hover {
  transform: scale(1.05);
}

.netflix-logo-text {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  user-select: none;
  background: linear-gradient(135deg, rgba(25, 118, 210, 1), rgba(100, 181, 246, 1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.v-theme--light .netflix-logo-text {
  background: linear-gradient(135deg, rgba(25, 118, 210, 1), rgba(66, 165, 245, 1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.main-content-wrapper {
  margin-top: 80px;
  /* Adjust based on header height */
}

@media (max-width: 959px) {
  .netflix-header {
    padding: 12px 16px;
  }
  
  .main-content-wrapper {
    margin-top: 70px;
  }
  
  .netflix-logo-text {
    font-size: clamp(1rem, 4vw, 1.5rem);
  }
}

.format-btn,
.action-btn {
  /* Touch-friendly minimum size (44x44px recommended by Apple/Google) */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* Improve button spacing on small screens */
@media (max-width: 599px) {
  .header-controls {
    width: 100%;
    justify-content: center;
  }
  
  .format-btn {
    font-size: 0.65rem;
    padding: 4px 8px !important;
  }
}

/* Tablet optimizations */
@media (min-width: 600px) and (max-width: 959px) {
  .format-btn {
    font-size: 0.7rem;
  }
}

/* Print Styles */
@media print {
  .header-controls,
  .format-btn,
  .action-btn,
  .v-text-field,
  .v-snackbar {
    display: none !important;
  }
  
  .header-responsive {
    padding: 16px !important;
    border-bottom: 1px solid #ccc;
    margin-bottom: 16px;
  }
  
  .card-view-container {
    padding: 0 !important;
    overflow: visible !important;
  }
  
  .hero-section {
    padding: 24px !important;
    margin-bottom: 24px;
    page-break-inside: avoid;
  }
  
  .section-container {
    padding: 16px !important;
    page-break-inside: avoid;
  }
  
  .experience-scroll {
    overflow: visible !important;
    display: block !important;
    padding: 0 !important;
  }
  
  .experience-card {
    page-break-inside: avoid;
    margin-bottom: 16px;
    width: 100% !important;
    min-width: auto !important;
    display: block !important;
    transform: none !important;
    box-shadow: none !important;
    border: 1px solid #ccc !important;
  }
  
  .experience-row {
    margin-bottom: 24px;
  }
  
  .project-card {
    page-break-inside: avoid;
    margin-bottom: 16px;
  }
  
  .v-card {
    box-shadow: none !important;
    border: 1px solid #ccc !important;
  }
  
  body {
    background: white !important;
    color: black !important;
  }
  
  /* Hide scrollbars in print */
  * {
    overflow: visible !important;
  }
}
</style>

<style>
/* Global styles for Prism themes - custom colors for dark and light modes */
/* Dark theme (Tomorrow Night inspired) */
.v-theme--dark code[class*="language-"] {
  color: #e6e6e6;
}

.v-theme--dark .token.comment,
.v-theme--dark .token.prolog,
.v-theme--dark .token.doctype,
.v-theme--dark .token.cdata {
  color: #6a9955;
}

.v-theme--dark .token.punctuation {
  color: #e6e6e6;
}

.v-theme--dark .token.property,
.v-theme--dark .token.tag,
.v-theme--dark .token.boolean,
.v-theme--dark .token.number,
.v-theme--dark .token.constant,
.v-theme--dark .token.symbol,
.v-theme--dark .token.deleted {
  color: #f92672;
}

.v-theme--dark .token.selector,
.v-theme--dark .token.attr-name,
.v-theme--dark .token.string,
.v-theme--dark .token.char,
.v-theme--dark .token.builtin,
.v-theme--dark .token.inserted {
  color: #a6e22e;
}

.v-theme--dark .token.operator,
.v-theme--dark .token.entity,
.v-theme--dark .token.url,
.v-theme--dark .language-css .token.string,
.v-theme--dark .style .token.string {
  color: #f92672;
}

.v-theme--dark .token.atrule,
.v-theme--dark .token.attr-value,
.v-theme--dark .token.keyword {
  color: #66d9ef;
}

.v-theme--dark .token.function,
.v-theme--dark .token.class-name {
  color: #e6db74;
}

.v-theme--dark .token.regex,
.v-theme--dark .token.important,
.v-theme--dark .token.variable {
  color: #fd971f;
}

/* Light theme (default Prism colors) */
.v-theme--light code[class*="language-"] {
  color: #333;
}

.v-theme--light .token.comment,
.v-theme--light .token.prolog,
.v-theme--light .token.doctype,
.v-theme--light .token.cdata {
  color: slategray;
}

.v-theme--light .token.punctuation {
  color: #999;
}

.v-theme--light .token.property,
.v-theme--light .token.tag,
.v-theme--light .token.boolean,
.v-theme--light .token.number,
.v-theme--light .token.constant,
.v-theme--light .token.symbol,
.v-theme--light .token.deleted {
  color: #905;
}

.v-theme--light .token.selector,
.v-theme--light .token.attr-name,
.v-theme--light .token.string,
.v-theme--light .token.char,
.v-theme--light .token.builtin,
.v-theme--light .token.inserted {
  color: #690;
}

.v-theme--light .token.operator,
.v-theme--light .token.entity,
.v-theme--light .token.url,
.v-theme--light .language-css .token.string,
.v-theme--light .style .token.string {
  color: #a67f59;
}

.v-theme--light .token.atrule,
.v-theme--light .token.attr-value,
.v-theme--light .token.keyword {
  color: #07a;
}

.v-theme--light .token.function,
.v-theme--light .token.class-name {
  color: #dd4a68;
}

.v-theme--light .token.regex,
.v-theme--light .token.important,
.v-theme--light .token.variable {
  color: #e90;
}
</style>
