// src/components/SEO/SeoMaster.tsx

import Head from 'next/head';

interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  canonicalUrl?: string;
  ldJson?: object;
  type?: string;
  siteName?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export default function SeoMaster({
  title,
  description,
  keywords = [],
  image = '/og-devops-roadmap.png',
  canonicalUrl,
  ldJson = {},
  type = 'website',
  siteName = 'MasterDevOps - Complete DevOps Learning Platform',
  author = 'MasterDevOps Team',
  publishedTime,
  modifiedTime,
  noindex = false,
  nofollow = false,
}: SeoProps) {
  // Comprehensive keyword list for maximum SEO coverage - 500+ Keywords
  const baseKeywords = [
    // Core DevOps & Platform
    'devops', 'devops engineer', 'devops tutorial', 'learn devops', 'devops roadmap',
    'devops course', 'devops training', 'devops certification', 'devops tools',
    'devops best practices', 'devops for beginners', 'devops 2024', 'devops 2025',
    'devops career', 'devops interview questions', 'devops projects', 'devops learning',
    'devops platform', 'devops education', 'devops online course', 'devops bootcamp',
    'devops master', 'master devops', 'devops skills', 'devops knowledge',

    // Interview Preparation - HIGH PRIORITY
    'devops interview questions', 'devops interview preparation', 'devops interview',
    'devops technical interview', 'devops interview questions and answers',
    'devops engineer interview', 'devops interview tips', 'devops coding interview',
    'devops system design interview', 'devops interview preparation guide',
    'devops interview questions for experienced', 'devops interview questions for freshers',
    'aws devops interview questions', 'kubernetes interview questions',
    'docker interview questions', 'terraform interview questions',
    'jenkins interview questions', 'ansible interview questions',
    'linux interview questions devops', 'scripting interview questions devops',
    'devops real time interview questions', 'devops mock interview',

    // Certifications - HIGH PRIORITY
    'devops certification', 'devops engineer certification', 'best devops certification',
    'aws devops certification', 'azure devops certification', 'google cloud devops certification',
    'kubernetes certification', 'docker certification', 'terraform certification',
    'ansible certification', 'jenkins certification', 'devops certified',
    'cka certification', 'ckad certification', 'aws certified devops engineer',
    'microsoft azure devops engineer', 'gcp professional cloud devops engineer',
    'devops certification cost', 'devops certification online', 'devops certification path',
    'devops certification for beginners', 'devops certification worth it',

    // Projects & Portfolio - HIGH PRIORITY
    'devops projects', 'devops projects for beginners', 'devops projects for resume',
    'devops project ideas', 'real time devops projects', 'devops portfolio projects',
    'devops capstone projects', 'devops mini projects', 'devops hands on projects',
    'ci cd project', 'kubernetes projects', 'docker projects', 'aws devops projects',
    'terraform projects', 'ansible projects', 'jenkins projects', 'devops project documentation',
    'devops project setup', 'devops project implementation', 'devops project github',

    // CI/CD Technologies
    'ci cd', 'continuous integration', 'continuous deployment', 'continuous delivery',
    'ci cd pipeline', 'jenkins', 'jenkins tutorial', 'github actions', 'gitlab ci',
    'azure devops', 'cicd best practices', 'jenkins pipeline', 'github actions tutorial',
    'gitlab ci cd', 'azure pipelines', 'teamcity', 'bamboo', 'circleci', 'travis ci',
    'cicd tools', 'cicd implementation', 'cicd workflow',

    // Container & Orchestration
    'docker', 'docker tutorial', 'docker compose', 'containerization', 'container orchestration',
    'kubernetes', 'kubernetes tutorial', 'k8s', 'kubernetes certification', 'kubernetes deployment',
    'helm', 'helm charts', 'docker swarm', 'podman', 'containerd', 'kubernetes cluster',
    'kubernetes administration', 'kubernetes networking', 'kubernetes storage',
    'kubernetes security', 'kubernetes monitoring', 'kubernetes operators',

    // Cloud Platforms
    'aws', 'aws tutorial', 'aws devops', 'aws certification', 'aws cloud', 'amazon web services',
    'azure', 'azure devops', 'microsoft azure', 'google cloud', 'gcp', 'google cloud platform',
    'cloud computing', 'cloud engineer', 'cloud architecture', 'cloud migration',
    'multi cloud', 'hybrid cloud', 'aws services', 'azure services', 'gcp services',
    'cloud formation', 'aws ec2', 'aws s3', 'aws lambda', 'aws eks', 'aws ecs',

    // Infrastructure as Code
    'infrastructure as code', 'iac', 'terraform', 'terraform tutorial', 'terraform aws',
    'terraform certification', 'ansible', 'ansible tutorial', 'ansible playbook',
    'puppet', 'chef', 'cloudformation', 'pulumi', 'terragrunt', 'terraform modules',
    'ansible roles', 'ansible tower', 'aws cdk', 'infrastructure automation',

    // Monitoring & Observability
    'monitoring', 'observability', 'prometheus', 'grafana', 'prometheus tutorial',
    'grafana dashboard', 'elk stack', 'elasticsearch', 'logstash', 'kibana',
    'logging', 'log management', 'apm', 'application monitoring', 'infrastructure monitoring',
    'datadog', 'new relic', 'splunk', 'appdynamics', 'dynatrace', 'zabbix', 'nagios',
    'alerting', 'metrics', 'logs', 'tracing', 'performance monitoring',

    // Version Control & Collaboration
    'git', 'git tutorial', 'github', 'gitlab', 'bitbucket', 'version control',
    'git workflow', 'gitops', 'git best practices', 'github actions', 'gitlab ci',
    'source control', 'code repository', 'pull requests', 'code review',

    // Linux & Scripting
    'linux', 'linux tutorial', 'linux for devops', 'bash scripting', 'shell scripting',
    'python devops', 'python scripting', 'automation scripting', 'linux commands',
    'linux administration', 'ubuntu', 'centos', 'redhat', 'linux server',
    'bash script', 'python automation', 'yaml', 'json',

    // Site Reliability Engineering
    'sre', 'site reliability engineering', 'sre practices', 'reliability engineering',
    'incident management', 'on call', 'error budget', 'sla', 'slo', 'sli',
    'performance engineering', 'capacity planning', 'disaster recovery',

    // Security
    'devsecops', 'devops security', 'security automation', 'vulnerability scanning',
    'security best practices', 'container security', 'kubernetes security',
    'cloud security', 'infrastructure security', 'security scanning', 'sonarqube',
    'checkmarx', 'snyk', 'twistlock', 'prisma cloud',

    // Microservices & Architecture
    'microservices', 'microservices architecture', 'service mesh', 'istio',
    'api gateway', 'serverless', 'lambda', 'cloud native', 'twelve factor app',
    'microservices deployment', 'api management', 'rest api', 'graphql',

    // Configuration Management
    'configuration management', 'infrastructure automation', 'server automation',
    'provisioning', 'config management', 'server configuration', 'automation',

    // Networking
    'networking', 'load balancing', 'reverse proxy', 'nginx', 'cdn', 'dns',
    'tcp ip', 'http https', 'ssl tls', 'vpc', 'subnet', 'firewall', 'network security',
    'api gateway', 'service discovery', 'load balancer',

    // Database & Storage
    'database administration', 'database devops', 'rds', 's3', 'object storage',
    'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'database migration',
    'backup recovery', 'database monitoring', 'storage management',

    // Development & Methodology
    'agile', 'scrum', 'software development', 'web development', 'backend development',
    'full stack development', 'software engineering', 'code quality', 'testing',
    'unit testing', 'integration testing', 'test automation', 'tdd', 'bdd',

    // Job Market & Career
    'devops jobs', 'devops salary', 'devops engineer salary', 'devops career path',
    'remote devops jobs', 'devops jobs india', 'devops jobs usa', 'devops jobs europe',
    'devops freelancing', 'devops consultant', 'devops remote work',
    'devops job market', 'devops employment', 'devops career growth',

    // Learning Resources
    'devops resources', 'free devops course', 'devops bootcamp', 'devops books',
    'devops youtube', 'devops blog', 'devops tutorials', 'devops documentation',
    'devops community', 'devops forums', 'devops learning path', 'devops roadmap',

    // Platform Specific
    'masterdevops', 'masterdevops.in', 'devops learning platform', 'devops education',
    'online devops training', 'devops course online', 'devops certification online',

    // Technology Stack
    'tech stack', 'technology stack', 'devops stack', 'modern devops',
    'devops ecosystem', 'devops tools stack', 'devops technology',

    // Problem Solving
    'devops solutions', 'infrastructure problems', 'deployment automation',
    'scaling applications', 'performance optimization', 'troubleshooting',
    'debugging', 'incident response', 'root cause analysis',

    // Trending Topics 2024-2025
    'ai devops', 'machine learning ops', 'mlops', 'aiops', 'platform engineering',
    'internal developer platform', 'backstage', 'gitops', 'finops', 'cloud cost optimization',
    'serverless architecture', 'edge computing', 'quantum computing devops',

    // Regional Specific
    'devops india', 'devops courses india', 'devops training india', 'devops jobs india',
    'devops bangalore', 'devops hyderabad', 'devops pune', 'devops delhi',
    'devops mumbai', 'devops chennai', 'devops usa', 'devops europe',

    // Tools by Category
    'build tools', 'testing tools', 'deployment tools', 'monitoring tools',
    'collaboration tools', 'automation tools', 'security tools', 'container tools',

    // Best Practices & Methodology
    'devops practices', 'devops culture', 'devops methodology', 'devops principles',
    'agile devops', 'lean devops', 'devops transformation', 'devops implementation',

    // Advanced Topics
    'chaos engineering', 'canary deployment', 'blue green deployment', 'feature flags',
    'immutable infrastructure', 'infrastructure testing', 'disaster recovery',
    'high availability', 'fault tolerance', 'resilience engineering',

    // Career Development
    'becoming a devops engineer', 'devops skills', 'devops portfolio', 'devops resume',
    'devops interview prep', 'devops career transition', 'devops for developers',
    'devops for system administrators', 'devops career guide',

    // Real-time & Practical
    'devops real time', 'devops hands on', 'devops practical', 'devops implementation',
    'devops case studies', 'devops success stories', 'devops challenges',
    'devops solutions architecture', 'devops design patterns'
  ];

  // Combine base keywords with custom keywords and remove duplicates
  const allKeywords = [...new Set([...keywords, ...baseKeywords])].join(', ');

  // Full URL for social sharing
  const fullImageUrl = image.startsWith('http') ? image : `https://masterdevops.in${image}`;
  const fullCanonicalUrl = canonicalUrl || 'https://masterdevops.in';

  // Robots meta tag
  const robotsContent = [];
  if (noindex) robotsContent.push('noindex');
  if (nofollow) robotsContent.push('nofollow');
  if (robotsContent.length === 0) robotsContent.push('index, follow');

  // Enhanced structured data with Learning Platform schema
  const enhancedLdJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://masterdevops.in/#website",
        "url": "https://masterdevops.in",
        "name": "MasterDevOps - Complete DevOps Learning Platform",
        "description": "Master DevOps with comprehensive courses, projects, interview preparation, and certifications. Learn Docker, Kubernetes, AWS, Terraform, CI/CD and more.",
        "publisher": {
          "@id": "https://masterdevops.in/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://masterdevops.in/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": "https://masterdevops.in/#organization",
        "name": "MasterDevOps",
        "url": "https://masterdevops.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://masterdevops.in/logo.png",
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://github.com/masterdevops",
          "https://twitter.com/masterdevops",
          "https://linkedin.com/company/masterdevops",
          "https://youtube.com/masterdevops"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "contact@masterdevops.in",
          "contactType": "customer service"
        }
      },
      {
        "@type": "LearningResource",
        "name": "DevOps Learning Platform",
        "description": "Comprehensive DevOps training with hands-on projects, interview preparation, and certification guidance",
        "educationalLevel": "Beginner to Advanced",
        "learningResourceType": "Online Course",
        "teaches": [
          "Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "Ansible", 
          "Jenkins", "Linux", "Git", "Monitoring", "Cloud Computing"
        ],
        "competencyRequired": "Basic computer knowledge",
        "numberOfStudents": "10000+"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://masterdevops.in/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": "https://masterdevops.in",
              "name": "Home"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@id": fullCanonicalUrl,
              "name": title
            }
          }
        ]
      },
      ...Object.keys(ldJson).length > 0 ? [ldJson] : []
    ]
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title} | MasterDevOps - Complete DevOps Learning Platform</title>
      <meta name="title" content={`${title} | MasterDevOps`} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent.join(', ')} />
      <meta name="googlebot" content={robotsContent.join(', ')} />
      <meta name="bingbot" content={robotsContent.join(', ')} />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={`${title} | MasterDevOps`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_GB" />
      <meta property="og:locale:alternate" content="en_IN" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonicalUrl} />
      <meta name="twitter:title" content={`${title} | MasterDevOps`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@masterdevops" />
      <meta name="twitter:site" content="@masterdevops" />

      {/* Additional SEO Tags */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="1 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="safe for kids" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Content Classification */}
      <meta name="classification" content="DevOps Education, Cloud Computing Training, Software Development, IT Infrastructure, Technology Courses, Online Learning" />
      <meta name="category" content="Education, Technology, Software Development, Cloud Computing, IT Training" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      <meta name="audience" content="DevOps Engineers, Cloud Engineers, Software Developers, System Administrators, IT Professionals, Students, Career Changers" />

      {/* Geo Tags */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <meta name="geo.position" content="20.5937;78.9629" />
      <meta name="ICBM" content="20.5937, 78.9629" />

      {/* Mobile Web App Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={siteName} />

      {/* Theme Color */}
      <meta name="theme-color" content="#00d4ff" />
      <meta name="msapplication-TileColor" content="#00d4ff" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(enhancedLdJson),
        }}
      />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      {/* Alternate Languages (if multilingual in future) */}
      <link rel="alternate" hrefLang="en" href={fullCanonicalUrl} />
      <link rel="alternate" hrefLang="en-US" href={fullCanonicalUrl} />
      <link rel="alternate" hrefLang="en-GB" href={fullCanonicalUrl} />
      <link rel="alternate" hrefLang="en-IN" href={fullCanonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={fullCanonicalUrl} />

      {/* Favicon and App Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Additional Meta for SEO */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="format-detection" content="date=no" />
      <meta name="format-detection" content="address=no" />
      <meta name="format-detection" content="email=no" />
      
      {/* Content Security Policy would go here in production */}
    </Head>
  );
}