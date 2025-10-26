// Simple mock authentication service using localStorage
const USERS_KEY = 'tf_users'
// use the required session key name for the app
const TOKEN_KEY = 'ticketapp_session'
const USER_KEY = 'ticketapp_user'

// Simple synchronous "hash" for demo purposes (base64). Not secure — this is a demo only.
function _hashPassword(password) {
  if (!password) return ''
  try {
    return btoa(password)
  } catch {
    // older envs
    return String(password)
  }
}

function _readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

function _writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function _saveSession(user) {
  const token = btoa(`${user.email}:${Date.now()}`)
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return { token, user }
}

export async function signup({ name, email, password }) {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 200))
  const users = _readUsers()
  if (users.find((u) => u.email === email)) {
    const err = new Error('Email already registered')
    err.code = 'EMAIL_EXISTS'
    throw err
  }
  const passwordHash = _hashPassword(password)
  const user = { id: Date.now().toString(), name, email, passwordHash }
  users.push(user)
  _writeUsers(users)
  return _saveSession(user)
}

export async function login({ email, password }) {
  await new Promise((r) => setTimeout(r, 150))
  const users = _readUsers()
  const passwordHash = _hashPassword(password)
  const user = users.find((u) => u.email === email && u.passwordHash === passwordHash)
  if (!user) {
    const err = new Error('Invalid credentials')
    err.code = 'INVALID_CREDENTIALS'
    throw err
  }
  return _saveSession(user)
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function currentUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null
  } catch {
    return null
  }
}

export function isAuthenticated() {
  return !!localStorage.getItem(TOKEN_KEY)
}

export default { signup, login, logout, currentUser, isAuthenticated }
