<template>
  <v-main :class="theme.global.name.value === 'dark' ? 'bg-grey-darken-4' : 'bg-grey-lighten-5'">
    <v-container fluid class="pa-0">
      <div class="d-flex flex-column" style="min-height: 100vh">
        <!-- Simple Header -->
        <div class="d-flex flex-column flex-md-row justify-space-between align-center align-md-center pa-4 pa-md-6 ga-4 header-responsive">
          <div class="text-h5 text-h6-sm font-weight-light header-name" :class="theme.global.name.value === 'dark' ? 'text-white' : 'text-grey-darken-1'">
            {{ resumeData.name }}
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
            >
            </v-btn>
            <v-btn
              @click="handleCopy"
              variant="text"
              size="small"
              :loading="copyLoading"
              :style="{ minWidth: '44px', minHeight: '44px' }"
              class="action-btn"
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
            >
              <v-icon start size="small">mdi-download</v-icon>
              <span class="d-none d-sm-inline">Download</span>
            </v-btn>
          </div>
        </div>

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
            <p class="text-body-1 mx-auto mb-0" style="max-width: 800px; line-height: 1.8;" :class="theme.global.name.value === 'dark' ? 'text-grey-lighten-2' : 'text-grey-darken-1'">
              {{ resumeData.summary }}
            </p>
          </div>

          <!-- Experience Section -->
          <div class="section-container pa-6 pa-md-8">
            <h2 class="text-h5 mb-5 section-title" :class="theme.global.name.value === 'dark' ? 'text-white' : 'text-grey-darken-1'">
              Experience
            </h2>
            <!-- Multiple horizontal scrolling rows (Netflix-style) -->
            <div
              v-for="(row, rowIndex) in experienceRows"
              :key="rowIndex"
              class="experience-row mb-6"
            >
              <div class="experience-scroll d-flex ga-6" style="overflow-x: auto; overflow-y: visible; padding: 8px 16px 24px 16px; justify-content: flex-start;">
                <v-card
                  v-for="(exp, index) in row"
                  :key="`${rowIndex}-${index}`"
                  class="experience-card flex-shrink-0"
                  :width="cardWidth"
                  variant="outlined"
                >
                  <v-card-title class="pb-2">
                    <div class="w-100">
                      <div class="text-h6 mb-1">{{ exp.company }}</div>
                      <div class="text-subtitle-2 text-grey">{{ exp.role }}</div>
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
                      <li v-for="(bullet, i) in exp.bullets" :key="i" class="mb-3 text-body-2" style="line-height: 1.6;">
                        {{ bullet }}
                      </li>
                    </ul>
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </div>

          <!-- Projects Section -->
          <div class="section-container pa-6 pa-md-8">
            <h2 class="text-h5 mb-5 section-title" :class="theme.global.name.value === 'dark' ? 'text-white' : 'text-grey-darken-1'">
              Projects
            </h2>
            <v-row class="ma-0">
              <v-col
                v-for="(project, index) in resumeData.projects"
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
                  <v-card-title class="pb-3">{{ project.name }}</v-card-title>
                  <v-card-text class="pt-0">
                    <div class="mb-4">
                      <v-chip
                        v-for="(tech, i) in project.tech"
                        :key="i"
                        size="x-small"
                        class="ma-1"
                        variant="tonal"
                      >
                        {{ tech }}
                      </v-chip>
                    </div>
                    <p class="text-body-2 mb-0" style="line-height: 1.6;">{{ project.description }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <!-- Skills Section -->
          <div class="section-container pa-6 pa-md-8">
            <h2 class="text-h5 mb-5 section-title" :class="theme.global.name.value === 'dark' ? 'text-white' : 'text-grey-darken-1'">
              Skills
            </h2>
            <div
              v-for="(skills, category) in resumeData.skills"
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
          <div class="section-container pa-6 pa-md-8">
            <v-row class="ma-0">
              <v-col cols="12" md="6" class="pa-3 pa-md-4">
                <h2 class="text-h5 mb-5 section-title" :class="theme.global.name.value === 'dark' ? 'text-white' : 'text-grey-darken-1'">
                  Education
                </h2>
                <v-card
                  v-for="(edu, index) in resumeData.education"
                  :key="index"
                  class="mb-4"
                  variant="outlined"
                >
                  <v-card-title class="text-subtitle-1 pb-1">{{ edu.school }}</v-card-title>
                  <v-card-subtitle class="pb-1">{{ edu.degree }}</v-card-subtitle>
                  <v-card-text class="text-caption pt-0">{{ edu.from }} - {{ edu.to }}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" class="pa-3 pa-md-4">
                <h2 class="text-h5 mb-5 section-title" :class="theme.global.name.value === 'dark' ? 'text-white' : 'text-grey-darken-1'">
                  Certifications
                </h2>
                <v-card
                  v-for="(cert, index) in resumeData.certifications"
                  :key="index"
                  class="mb-4"
                  variant="outlined"
                >
                  <v-card-text class="d-flex align-center">
                    <v-icon class="mr-3" color="primary" size="small">mdi-certificate</v-icon>
                    <span class="text-body-2">{{ cert }}</span>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </v-container>

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

<script setup>
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import { useTheme } from "vuetify";
import * as yaml from "js-yaml";
import * as TOML from "@ltd/j-toml";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-toml";

const theme = useTheme();
const format = ref("json");
const codeBlock = ref(null);
const copyLoading = ref(false);
const downloadLoading = ref(false);
const windowWidth = ref(window.innerWidth);
const snackbar = ref({
  show: false,
  message: "",
  color: "success",
});

// Update window width on resize for responsive calculations
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  if (format.value !== 'card') {
    highlightCode();
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const toggleTheme = () => {
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark';
  // Re-highlight after theme change
  nextTick(() => {
    highlightCode();
  });
};

const toggleFormat = () => {
  format.value = format.value === 'json' ? 'yaml' : 'json';
};

const highlightCode = () => {
  nextTick(() => {
    if (codeBlock.value) {
      Prism.highlightElement(codeBlock.value.querySelector('code'));
    }
  });
};

const showSnackbar = (message, color = "success") => {
  snackbar.value = {
    show: true,
    message,
    color,
  };
};

const resumeData = {
  name: "Karttik Hakimm",
  title: "Senior Software Engineer",
  contact: {
    email: "hakimmkarttik@zohomail.in",
    location: "Austin, TX",
    linkedin: "https://linkedin.com/in/kartik-hakim",
    github: "https://github.com/hakimkartik",
  },
  summary:
    "A results-driven Software Engineer with 6+ years of experience at leading companies like Amazon, Licious Private Limited, and Sprinklr. Expertise in designing and implementing scalable, distributed systems, automating CI/CD workflows, and optimizing databases to drive significant improvements in operational efficiency and user satisfaction. Technical depth includes Python, Java, AWS, Kubernetes, Terraform, and proficiency across full-stack development, cloud infrastructure, and MLOps principles.",
  experience: [
    {
      company: "Sprinklr, Inc",
      role: "Senior Software Engineer",
      location: "Austin, TX",
      from: "2025-04",
      to: "Present",
      bullets: [
        "Accelerated customer onboarding time by 98% (from 7 days to 3 hours) by designing and developing the end-to-end platform, Atlas, for the new Telephony product, utilizing Terraform, Terragrunt, Docker, and Flask.",
        "Implemented an in-house RAG + LLM backed Teams Chatbot supporting MCP client service architecture, reducing developer overhead by 25-30%. This was built using FastAPI, VLLM, Ollama, and Qwen.",
        "Designed and implemented a horizontal autoscaler for in-house Telephony services, enabling scaling from 1.2M calls/month to 3M calls/month, leveraging K8s, GKE, Flask, RtpEngine, and Freeswitch.",
      ],
    },
    {
      company: "Easley Dunn Productions Inc",
      role: "Backend Engineer",
      location: "Los Angeles, CA",
      from: "2024-07",
      to: "2025-04",
      bullets: [
        "Responsible for managing Jenkins and Assembla deployment pipelines and creating game level-designs using C# and Jupyter notebooks.",
        "Designed and implemented new analytics using Flask, Google Firebase, and Looker Studio for enhancing user engagement.",
        "Developed a heat map dashboard service depicting user engagement using a sidecar design pattern with Prometheus and FastAPI.",
      ],
    },
    {
      company: "Amazon",
      role: "Software Development Engineer Intern",
      location: "Irvine, CA",
      from: "2023-05",
      to: "2023-08",
      bullets: [
        "Collaborated with the customer management team to design and implement an automated Redshift query execution workflow.",
        "Deployed the workflow using AWS StepFunctions and AWS CDK, enabling dynamic query generation and execution in under 30 seconds.",
        "Leveraged SQL optimization and database management expertise to reduce Redshift database query times, resulting in a 15% improvement in page load speeds.",
      ],
    },
    {
      company: "Fundr Games",
      role: "Senior Technical Advisor",
      location: "Los Angeles, CA",
      from: "2022-09",
      to: "2023-02",
      bullets: [
        "Worked with the founders to develop service to host and publish indie games, using SailsJS, React, NextJS.",
        "Implemented customized algorithm for game developers to reach out to market their game and promote it on several social media platforms, reducing the turn-around time from 7 days to 24-48 hrs (Facebook, Instagram, Discord).",
      ],
    },
    {
      company: "Licious Private Limited",
      role: "Software Development Engineer 2",
      location: "Bengaluru, KA",
      from: "2021-08",
      to: "2022-07",
      bullets: [
        "Utilized VueJS to design and implement responsive user interfaces, resulting in a 15% boost in user satisfaction scores by enhancing usability and aesthetics.",
        "Spearheaded an agile team in developing an efficient in-house user authentication gateway using Spring Security, achieving a 25% reduction in login time through optimized security processes.",
        "Designed and deployed a user-segmentation service using AWS Lambda, Firebase, and Spring Batch, leading to a 20% increase in customer engagement.",
      ],
    },
    {
      company: "Sprinklr, Inc.",
      role: "Software Engineer",
      location: "Bengaluru, KA",
      from: "2017-07",
      to: "2021-08",
      bullets: [
        "Developed and deployed automation APIs for efficient data migration (Solr to Elasticsearch; Cassandra to Scylla), achieving a 45% increase in speed.",
        "Implemented a high-availability Redis architecture with Sentinel, resulting in enhanced system reliability and generating $3k in direct monthly profits.",
        "Engineered Python modules to facilitate the dynamic provisioning of Jenkins slaves in Azure, generating $9k in monthly profits by optimizing resource utilization.",
        "Designed and executed a payment gateway solution using a microservices architecture in Node.js, enhancing API response times by 25% and decreasing server load by 30%.",
      ],
    },
  ],
  projects: [
    {
      name: "Vulnerability Scanning Tool",
      tech: ["Python", "Django", "Docker API", "Clair API", "Trivy API", "SNS", "VueJS", "Bootstrap", "CSS", "HTML"],
      description:
        "Developed and implemented a full-stack application having REST APIs using Django, targeting the scanning of deployed Docker images for vulnerabilities (integrating Clair and Trivy APIs). Created a visualization dashboard with a CSV export and email-sharing feature for timely security dissemination to banking stakeholders. Enhanced stakeholder engagement and response efficiency by developing an email-sharing option for the dashboard, ensuring that critical vulnerability information is promptly and securely communicated to relevant parties.",
    },
    {
      name: "User Authentication Service",
      tech: ["Spring Batch", "Spring Security", "SailsJS", "ExpressJS", "OAuth", "GCP", "RBAC", "JWTs"],
      description:
        "Designed and developed hybrid user authentication web services which used JSON Web Token (JWTs) along with Google OAuth. Implemented a decentralized architecture to store and process user and employee roles and permissions which were used to authenticate clients as well as employees accessing public and private services using Spring Batch along with MySQL and MongoDB. Using Spring Batch implemented periodic updates of user roles and permissions submitted by different teams after they have been verified by respective stakeholders. Implemented a centralized logging feature to keep track of changes to user permissions and pushed all actions to InfluxDB for easy debugging. Added integrations to core codebase in SailsJS and ExpressJS for all internal platforms to use the new authentication service and work efficiently.",
    },
    {
      name: "Split Screen Runner",
      tech: ["Unity", "C#", "TextMeshPro", "Animations", "Particle Effects", "Post Processing", "Plotly Dash"],
      description:
        "Led a team of 4 to design and develop a 2D platformer game with inversion control as core mechanic, using Unity Play and deployed using GitHub Pages and Actions. Implemented the user analytics and generated hypothesis to enhance user engagement and experience using Flask based REST APIs and created plots using Plotly.",
    },
    {
      name: "Fundr Games MVP",
      tech: ["React", "Next.js", "AWS (S3, Route53, ELB)", "SailsJS", "Docker", "Postgres"],
      description:
        "As part of USC Incubator, worked with Fundr Games founders to develop service to host and publish indie games. Implemented customized algorithm for game developers to reach out to market their game and promote it on several social media platforms (Facebook, Instagram, Discord).",
    },
  ],
  skills: {
    "Programming Languages": [
      "C/C++",
      "JavaScript",
      "Java",
      "Python",
      "Rust",
      "Go",
      "Bash",
      "Perl",
      "Groovy",
      "C#",
      "PHP",
      "TypeScript",
      "Angular",
      "Ruby",
      "Kotlin",
      "R",
      "CUDA",
      "D3.js",
    ],
    "Web Frameworks": [
      "ReactJS",
      "VueJS",
      "NodeJS",
      "Django",
      "Flask",
      "Spring Boot",
      "Hibernate",
      "Mojolicious",
      "Laravel",
      "SailsJS",
      "ExpressJS",
      "Next.js",
      "JUnit",
      "Mockito",
      "JMeter",
      "Ruby on Rails",
      "Selenium",
    ],
    "Cloud Technologies": [
      "AWS (EC2, S3, EKS, CloudFront, Fargate, Lambda, StepFunction, SNS, ElastiCache, Redshift, RDS, CloudFormation, DynamoDB, CloudWatch, ECS)",
      "Azure",
      "GCP (Google Cloud Platform)",
      "BigQuery",
      "Databricks",
      "BigTable",
    ],
    "Infrastructure Technologies": [
      "Ansible",
      "Kubernetes (K8s)",
      "Docker",
      "Jenkins",
      "Gitlab",
      "Gradle",
      "Maven",
      "PostgreSQL",
      "Graylog",
      "Sensu",
      "Prometheus",
      "Terraform",
      "Apache Spark",
      "Hadoop",
      "Apache Kafka",
      "Parquet",
      "Vault",
      "Helm",
      "gRPC",
      "Apache Airflow",
      "LDAP",
    ],
    "Concepts": [
      "Web Crawler",
      "Inverted Index",
      "Big Data",
      "DNS",
      "Distributed System/Computing",
      "Operating System",
      "Virtual Memory",
      "Cache Memory",
      "Encryption",
      "Decryption",
      "Neural Networks",
      "Database Normalization",
      "Agile Development Methodology",
      "Cloud Infrastructure",
      "Cloud Computing",
      "VPN",
      "CDN",
      "Software Development LifeCycle (SDLC)",
      "Continuous Integration Continuous Development (CI/CD)",
      "Full Stack Development",
      "Containerization",
      "Git Version Control",
      "Product Engineering",
      "Product Management",
      "Linux Systems",
      "DevOps",
      "Object Oriented Programming (OOPs)",
      "Design Patterns",
      "Design Reviews",
      "Functional Programming",
      "SRE",
      "System Design",
      "Platform Engineering",
      "UI/UX",
      "Server Side Development",
      "Software Design",
      "CRM",
      "Scalability",
      "Algorithms",
      "NoSQL",
      "Data Structures",
      "SaaS",
      "Data Architecture",
      "Fintech",
      "Data Storage",
      "Web Applications",
      "Data Analytics",
      "Features Development",
      "Technical Expertise",
      "Software Engineering Patterns",
      "Web Technologies",
      "SSL",
      "TLS",
      "JIRA",
      "Service Level Agreements (SLA)",
      "Relational Databases",
      "Messaging Queues",
      "Internal tools",
      "Caching",
    ],
    "Interpersonal Skills": [
      "Product Development",
      "Product Design",
      "Project Management",
      "Leadership",
      "Collaboration",
      "Code Review",
      "Teamwork",
      "Problem Solving",
      "Excellent Verbal and Written Communication Skills",
      "Adaptability",
      "Flexible",
      "Collaborative",
      "Self-Driven",
      "Detail-Oriented",
      "Highly Motivated",
      "Cross-Functional Team",
      "Reliability",
      "Innovative",
      "Troubleshooting",
      "Accountability",
      "Communication Skills",
      "Mentoring",
      "Resilient",
      "Research Oriented",
      "Pragmatic",
      "Customer Experience",
      "Analytical",
      "Critical Thinking",
      "Innovation",
      "Constructive Feedback",
      "Highly Competitive",
      "Industry Trends",
      "Strong Technical Skill",
      "Logistics and Event Planning",
      "Fast Paced Environment",
      "Process Improvement",
      "User Research",
      "Team Building",
      "Mentorship",
      "Agility",
    ],
  },
  education: [
    {
      school: "University of Southern California",
      degree: "MS, Computer Science",
      from: "2022-08",
      to: "2024-12",
    },
    {
      school: "BMS College of Engineering",
      degree: "BE, Computer Science",
      from: "2013-08",
      to: "2017-04",
    },
  ],
  certifications: [
    "RU202: Redis Streams",
    "M103: MongoDB Basic Cluster Administration",
    "Natural Language Processing (NLP) with Python",
    "Hands-on PyTorch Machine Learning",
    "gRPC in Python",
    "Building a Recommendation System with Python Machine Learning & AI",
  ],
};

const formattedContent = computed(() => {
  if (format.value === 'yaml') {
    return yaml.dump(resumeData, { indent: 2, lineWidth: -1 });
  }
  if (format.value === 'toml') {
    try {
      return TOML.stringify(resumeData, { newline: '\n', indent: 2 });
    } catch (error) {
      console.error('TOML stringify error:', error);
      return `# Error converting to TOML: ${error.message}\n# Falling back to JSON\n${JSON.stringify(resumeData, null, 2)}`;
    }
  }
  return JSON.stringify(resumeData, null, 2);
});

// Split experience into multiple rows (Netflix-style)
// Each row contains multiple cards that scroll horizontally
// We'll create rows with enough cards to enable horizontal scrolling
const experienceRows = computed(() => {
  const experiences = resumeData.experience;
  const rows = [];
  // Determine how many cards fit on screen (for horizontal scrolling)
  // Mobile: ~1 card visible, Tablet: ~2 cards, Desktop: ~3 cards
  // We'll put 3-4 cards per row to enable scrolling
  const cardsPerRow = windowWidth.value < 600 ? 3 : windowWidth.value < 960 ? 4 : 5;
  
  for (let i = 0; i < experiences.length; i += cardsPerRow) {
    rows.push(experiences.slice(i, i + cardsPerRow));
  }
  
  return rows;
});

// Responsive card width (wider cards as requested)
const cardWidth = computed(() => {
  if (windowWidth.value < 600) {
    return 380;
  } else if (windowWidth.value < 960) {
    return 480;
  } else if (windowWidth.value < 1280) {
    return 520;
  }
  return 560;
});

// Watch for format changes and re-highlight (only for code formats)
watch(format, () => {
  if (format.value !== 'card') {
    highlightCode();
  }
});

// Watch for content changes and re-highlight (only for code formats)
watch(formattedContent, () => {
  if (format.value !== 'card') {
    highlightCode();
  }
});

const handleCopy = async () => {
  if (format.value === 'card') {
    showSnackbar("Card view cannot be copied. Please select a code format (JSON, YAML, or TOML).", "info");
    return;
  }
  copyLoading.value = true;
  try {
    await navigator.clipboard.writeText(formattedContent.value);
    showSnackbar(`${format.value.toUpperCase()} copied to clipboard!`, "success");
  } catch (e) {
    showSnackbar("Copy failed — try selecting and copying manually.", "error");
  } finally {
    copyLoading.value = false;
  }
};

const handleDownload = () => {
  if (format.value === 'card') {
    showSnackbar("Card view cannot be downloaded. Please select a code format (JSON, YAML, or TOML).", "info");
    return;
  }
  downloadLoading.value = true;
  try {
    let extension = 'json';
    let mimeType = 'application/json';
    
    if (format.value === 'yaml') {
      extension = 'yaml';
      mimeType = 'text/yaml';
    } else if (format.value === 'toml') {
      extension = 'toml';
      mimeType = 'text/toml';
    }
    
  const blob = new Blob([formattedContent.value], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `karttik_hakimm_resume.${extension}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
    showSnackbar(`File downloaded successfully!`, "success");
  } catch (e) {
    showSnackbar("Download failed. Please try again.", "error");
  } finally {
    downloadLoading.value = false;
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

/* Header Responsive Styles */
.header-responsive {
  /* iOS safe area support */
  padding-top: max(16px, env(safe-area-inset-top));
  padding-left: max(16px, env(safe-area-inset-left));
  padding-right: max(16px, env(safe-area-inset-right));
}

.header-name {
  font-size: clamp(1.1rem, 4vw, 1.5rem);
  text-align: center;
}

@media (min-width: 960px) {
  .header-name {
    text-align: left;
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
