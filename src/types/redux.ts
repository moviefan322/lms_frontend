export interface AuthState {
  loading: boolean
  email: string | null
  name: string | null
  token: string | null
  error: string | null
  success: boolean
  isLoggedIn: boolean
  isNewData: boolean
}

export interface League {
  id: number
  name: string
  is_active: boolean
  admin: string
  additional_admins: string[]
  seasons: Season[]
}

export interface Season {
  id: number
  name: string
  year: number
  is_active: boolean
  league: number
  schedule?: Schedule
}

export interface Schedule {
  id: number
  start_date: string // ISO 8601 date string
  num_weeks: number
  default_start_time: string // ISO 8601 time string
  matchnights: MatchNight[]
}

export interface MatchNight {
  id: number
  date: string
  start_time: string
  status: string
  matches: Match[]
}

export interface Match {
  id: number
  match_night: number
  home_team: number
  away_team: number
  home_score?: number
  away_score?: number
  status: string
}
