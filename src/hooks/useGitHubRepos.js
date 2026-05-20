import { useEffect, useState } from 'react'

/**
 * Fetches public repos for a GitHub user, sorted by most recently pushed.
 * For each repo, also attempts to fetch the README to extract a description.
 * Returns { repos, loading, error }
 */
const CACHE_KEY = (username, limit) => `gh_repos_${username}_${limit}`
const README_CACHE_KEY = (username, repo) => `gh_readme_${username}_${repo}`
const REPO_LIST_TTL_MS = 10 * 60 * 1000       // 10 minutes (sessionStorage)
const README_TTL_MS    = 24 * 60 * 60 * 1000  // 24 hours   (localStorage)

function getCached(key, storage = sessionStorage) {
  try {
    const raw = storage.getItem(key)
    if (!raw) return null
    const { ts, data } = JSON.parse(raw)
    if (Date.now() - ts < (storage === localStorage ? README_TTL_MS : REPO_LIST_TTL_MS)) return data
    storage.removeItem(key)
  } catch { /* ignore */ }
  return null
}

function setCache(key, data, storage = sessionStorage) {
  try {
    storage.setItem(key, JSON.stringify({ ts: Date.now(), data }))
  } catch { /* ignore */ }
}

async function fetchReadme(username, repoName) {
  const key = README_CACHE_KEY(username, repoName)
  const cached = getCached(key, localStorage)
  if (cached !== null) return cached

  try {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/readme`,
      { headers: { Accept: 'application/vnd.github.raw+json' } }
    )
    if (!res.ok) return ''
    const text = await res.text()
    const summary = extractReadmeSummary(text)
    setCache(key, summary, localStorage)
    return summary
  } catch {
    return ''
  }
}

export default function useGitHubRepos(username, limit = 12) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    const cacheKey = CACHE_KEY(username, limit)
    const cached = getCached(cacheKey, sessionStorage)
    if (cached) {
      setRepos(cached)
      setLoading(false)
      return
    }

    setLoading(true)

    fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=${limit}&type=public`
    )
      .then(res => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
        return res.json()
      })
      .then(async data => {
        const repos = await Promise.all(
          data
            .filter(r => !r.fork)
            .map(async r => {
              const readmeSummary = await fetchReadme(username, r.name)
              return {
                id: `gh-${r.id}`,
                title: r.name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                category: detectCategory(r),
                description: readmeSummary || r.description || '',
                liveUrl: r.homepage || '',
                repoUrl: r.html_url,
                language: r.language,
                stars: r.stargazers_count,
                image: '',
                source: 'github',
              }
            })
        )

        setCache(cacheKey, repos)
        setRepos(repos)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [username, limit])

  return { repos, loading, error }
}

function extractReadmeSummary(markdown, maxLength = 160) {
  const lines = markdown.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    if (trimmed.startsWith('#')) continue
    if (trimmed.startsWith('!')) continue
    if (trimmed.startsWith('<')) continue
    if (trimmed.startsWith('[') && trimmed.includes('shield')) continue
    if (trimmed.startsWith('---') || trimmed.startsWith('===')) continue
    const plain = trimmed
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_`~]/g, '')
      .replace(/<[^>]+>/g, '')
      .trim()
    if (plain.length > 20) {
      return plain.length > maxLength ? plain.slice(0, maxLength).replace(/\s\S*$/, '') + '…' : plain
    }
  }
  return ''
}

function detectCategory(repo) {
  const topics = repo.topics ?? []
  const lang = (repo.language || '').toLowerCase()
  const name = (repo.name || '').toLowerCase()

  if (topics.includes('salesforce') || name.includes('sfcc') || name.includes('salesforce')) return 'Salesforce'
  if (['javascript', 'typescript', 'html', 'css'].includes(lang)) return 'Web'
  if (['java', 'python', 'go', 'rust', 'c', 'c++', 'c#'].includes(lang)) return 'Backend'
  return 'Other'
}
