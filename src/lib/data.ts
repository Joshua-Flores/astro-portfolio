import { getCollection, type CollectionEntry } from 'astro:content'

// Sort posts by date
export function postsSort(posts: CollectionEntry<'posts'>[]) {
  return posts.slice().sort((a, b) => {
    const dateA = a.data.updatedDate ?? a.data.pubDate
    const dateB = b.data.updatedDate ?? b.data.pubDate
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })
}

// Get all non-draft posts, sorted by date
export async function getAllPosts(): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  return postsSort(allPosts.filter((post) => !post.data.draft))
}

// Get all pinned posts
export async function getPinnedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  const pinnedPosts = allPosts.filter((post) => post.data.pinned)
  return postsSort(pinnedPosts)
}

// Get a fixed number of latest posts
export async function getNumPosts(size: number): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  return postsSort(allPosts.filter((post) => !post.data.draft)).slice(0, size)
}

// Get tags
export async function getAllTags(): Promise<Record<string, number>> {
  const allPosts = await getAllPosts()
  const tags = allPosts.flatMap((post) => post.data.tags || [])
  return tags.reduce(
    (acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )
}

// Sort projects by date
export function projectsSort(projects: CollectionEntry<'projects'>[]) {
  return projects.slice().sort((a, b) => {
    return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  })
}

// Get all non-draft projects, sorted by date
export async function getAllProjects(): Promise<CollectionEntry<'projects'>[]> {
  const allProjects = await getCollection('projects')
  return projectsSort(allProjects.filter((project) => !project.data.draft))
}

// Get a fixed number of latest projects
export async function getNumProjects(size: number): Promise<CollectionEntry<'projects'>[]> {
  const allProjects = await getAllProjects()
  return allProjects.slice(0, size)
}
