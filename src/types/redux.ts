export interface AuthState {
  loading: boolean
  email: string | null
  name: string | null
  token: string | null
  error: string | null
  success: boolean
  last_login: string | null
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

export interface Player {
  id: number
  is_active: boolean
  name: string
}

export interface Team {
  id: number
  name: string
  league: number
  team_seasons: TeamSeason[]
}

export interface TeamPlayer {
  id: number
  name: string
  handicap: number
  is_active: boolean
  wins: number
  losses: number
  player: Player
}

export interface TeamSeason {
  id: number
  name: string
  captain: number
  team: number
  season: number
  team_players: TeamPlayer[]
}

export interface Season {
  id: number
  name: string
  year: number
  is_active: boolean
  league: number
  schedule?: Schedule
  teamseason: TeamSeason[]
}

export interface Schedule {
  id: number
  default_start_time: string
  num_weeks: number
  start_date: string
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
  home_team_name: string
  away_team: number
  away_team_name: string
  home_score?: number
  away_score?: number
  status: string
}

export interface PostUserReq {
  email: string
  password: string
  name: string
}

export interface PostUserRes {
  email: string
  name: string
  token: string
}