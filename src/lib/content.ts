import matter from 'gray-matter'

export interface ProjectFrontmatter {
  title: string
  description: string
  status: 'completed' | 'wip' | 'experimental' | 'sandbox'
  tags?: string[]
  repo?: string
  live?: string
  color?: string
  order?: number
}

export interface PostFrontmatter {
  title: string
  date: string
  tags?: string[]
  excerpt?: string
}

export interface Project extends ProjectFrontmatter {
  slug: string
  body: string
}

export interface Post extends PostFrontmatter {
  slug: string
  body: string
}

function slugFromPath(path: string): string {
  return path.split('/').pop()?.replace(/\.md$/, '') ?? ''
}

function warnMissing(file: string, field: string, fallback: string): string {
  console.warn(`[content] ${file}: missing "${field}", using "${fallback}"`)
  return fallback
}

// --- Posts ---

const postsGlob = import.meta.glob<string>('../../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function loadPosts(): Post[] {
  const entries: Post[] = []

  for (const [path, raw] of Object.entries(postsGlob)) {
    const slug = slugFromPath(path)
    const parsed = matter(raw)
    const fm = parsed.data as Record<string, unknown>

    const title =
      typeof fm.title === 'string' && fm.title
        ? fm.title
        : warnMissing(path, 'title', 'Untitled')

    const date = typeof fm.date === 'string' ? fm.date : ''
    const tags = Array.isArray(fm.tags) ? fm.tags.filter((t): t is string => typeof t === 'string') : []
    const excerpt = typeof fm.excerpt === 'string' ? fm.excerpt : undefined
    const body = parsed.content

    entries.push({ title, date, tags, excerpt, slug, body })
  }

  return entries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

let _postsCache: Post[] | null = null

export function getPosts(): Post[] {
  if (!_postsCache) _postsCache = loadPosts()
  return _postsCache
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug)
}

// --- Projects ---

const projectsGlob = import.meta.glob<string>('../../content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function loadProjects(): Project[] {
  const entries: Project[] = []

  for (const [path, raw] of Object.entries(projectsGlob)) {
    const slug = slugFromPath(path)
    const parsed = matter(raw)
    const fm = parsed.data as Record<string, unknown>

    const title =
      typeof fm.title === 'string' && fm.title
        ? fm.title
        : warnMissing(path, 'title', 'Untitled')

    const description = typeof fm.description === 'string' ? fm.description : ''
    const status = (
      typeof fm.status === 'string' &&
      ['completed', 'wip', 'experimental', 'sandbox'].includes(fm.status)
    )
      ? (fm.status as ProjectFrontmatter['status'])
      : 'wip'

    const tags = Array.isArray(fm.tags) ? fm.tags.filter((t): t is string => typeof t === 'string') : []
    const repo = typeof fm.repo === 'string' ? fm.repo : undefined
    const live = typeof fm.live === 'string' ? fm.live : undefined
    const color = typeof fm.color === 'string' ? fm.color : undefined
    const order = typeof fm.order === 'number' ? fm.order : undefined
    const body = parsed.content

    entries.push({ title, description, status, tags, repo, live, color, order, slug, body })
  }

  return entries.sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
}

let _projectsCache: Project[] | null = null

export function getProjects(): Project[] {
  if (!_projectsCache) _projectsCache = loadProjects()
  return _projectsCache
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug)
}
