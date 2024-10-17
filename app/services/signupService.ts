import APIClient from '../lib/apiClient'
import { SIGNUP_ENDPOINT } from '../constants/url'
import { Utilisateur } from '../types/type'

export default new APIClient<Utilisateur>(SIGNUP_ENDPOINT)
