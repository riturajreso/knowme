import { NextRequest, NextResponse } from 'next/server'
import { appendActivity, readActivities } from '@/lib/activity-store'

interface ActivityPayload {
  type: string
  path: string
  postSlug?: string
}

function getClientIp(request: NextRequest): string | undefined {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim()
    if (firstIp) {
      return firstIp
    }
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }

  const cfIp = request.headers.get('cf-connecting-ip')
  if (cfIp) {
    return cfIp.trim()
  }

  return undefined
}

export async function GET() {
  const activities = await readActivities()
  return NextResponse.json(activities)
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as Partial<ActivityPayload>

  if (!payload.type || !payload.path) {
    return NextResponse.json({ error: 'type and path are required' }, { status: 400 })
  }

  const entry = await appendActivity({
    type: payload.type,
    path: payload.path,
    postSlug: payload.postSlug,
    userAgent: request.headers.get('user-agent') ?? undefined,
    ipAddress: getClientIp(request)
  })

  return NextResponse.json(entry, { status: 201 })
}
