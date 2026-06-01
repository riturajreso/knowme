import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

export interface UserActivity {
  id: string
  type: string
  path: string
  postSlug?: string
  userAgent?: string
  ipAddress?: string
  createdAt: string
}

const dataDir = path.join(process.cwd(), 'data')
const dataFile = path.join(dataDir, 'user-activity.json')

async function ensureStore(): Promise<void> {
  await mkdir(dataDir, { recursive: true })
  try {
    await readFile(dataFile, 'utf-8')
  } catch {
    await writeFile(dataFile, '[]', 'utf-8')
  }
}

export async function readActivities(): Promise<UserActivity[]> {
  await ensureStore()
  const raw = await readFile(dataFile, 'utf-8')

  try {
    const parsed = JSON.parse(raw) as UserActivity[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function appendActivity(activity: Omit<UserActivity, 'id' | 'createdAt'>): Promise<UserActivity> {
  const existing = await readActivities()

  const entry: UserActivity = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...activity
  }

  existing.push(entry)
  await writeFile(dataFile, JSON.stringify(existing, null, 2), 'utf-8')
  return entry
}
