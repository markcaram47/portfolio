/**
 * ============================================================
 *  📁 PROJECTS DATA — src/data/projects.js
 * ============================================================
 *  To ADD a new project: copy one of the objects below and
 *  paste it at the top of the array. Fill in your details.
 *
 *  Fields:
 *  - id        : unique number (increment each time)
 *  - title     : project name
 *  - description: short description (2–3 sentences)
 *  - tags      : array of tech stack strings
 *  - color     : accent hex color for this card
 *  - gradient  : CSS gradient for the card banner
 *  - github    : GitHub repo URL (or null if private)
 *  - demo      : live demo URL (or null if not deployed)
 *  - featured  : true = shows ⭐ Featured badge
 *  - category  : 'Fullstack' | 'Frontend' | 'Backend' | 'Mobile'
 * ============================================================
 */

export const projects = [
  {
    id: 1,
    title: 'PowerMed E-Commerce',
    description:
      'A full-stack e-commerce platform for medical/wellness products with admin dashboard, product management, Shopee integration, and multi-image support per product.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Shopee API'],
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
    github: 'https://github.com/',
    demo: null,
    featured: true,
    category: 'Fullstack',
  },
  {
    id: 2,
    title: 'Project Title 2',
    description:
      'Brief description of your second project. Highlight the purpose, key features, and what problem it solves. Update this with your actual project details.',
    tags: ['React', 'PHP', 'MySQL', 'Bootstrap'],
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #0284c7)',
    github: 'https://github.com/',
    demo: null,
    featured: false,
    category: 'Fullstack',
  },
  {
    id: 3,
    title: 'Project Title 3',
    description:
      'Brief description of your third project. Highlight the purpose, key features, and what problem it solves. Update this with your actual project details.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Figma'],
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    github: 'https://github.com/',
    demo: null,
    featured: false,
    category: 'Frontend',
  },
  {
    id: 4,
    title: 'Project Title 4',
    description:
      'Brief description of your fourth project. Highlight the purpose, key features, and what problem it solves. Update this with your actual project details.',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    github: 'https://github.com/',
    demo: null,
    featured: false,
    category: 'Frontend',
  },
  {
    id: 5,
    title: 'Project Title 5',
    description:
      'Brief description of your fifth project. Highlight the purpose, key features, and what problem it solves. Update this with your actual project details.',
    tags: ['PHP', 'MySQL', 'Bootstrap', 'jQuery'],
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    github: 'https://github.com/',
    demo: null,
    featured: false,
    category: 'Fullstack',
  },
  // ✅ ADD MORE PROJECTS BELOW — just copy the template above!
]

/**
 * Filter categories — automatically built from your projects.
 * Add a new category string to a project's `category` field
 * and it will appear as a filter tab automatically.
 */
export const filterCategories = [
  'All',
  ...Array.from(new Set(projects.map((p) => p.category))),
]
