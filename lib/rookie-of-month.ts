export interface RookieOfMonth {
  firstName: string
  lastName: string
  city: string
  avatarUrl: string
  school: string
  degree: string
  fieldOfStudy: string
}

export async function fetchRookieOfMonth(): Promise<RookieOfMonth | null> {
  try {
    const res = await fetch('https://app.rookiework.com/api/rookie-of-the-month', {
      next: { revalidate: 86400 },
    })

    if (!res.ok) {
      console.error('Failed to fetch rookie of the month:', res.status)
      return null
    }

    const data = await res.json()
    return data.rookie ?? null
  } catch (error) {
    console.error('Error fetching rookie of the month:', error)
    return null
  }
}
