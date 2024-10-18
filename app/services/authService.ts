import APIClient from '../lib/apiClient'
import { LOGIN_ENDPOINT_URL } from '../constants/url'
import { UserLogin } from '../types/type'

export default new APIClient<UserLogin>(LOGIN_ENDPOINT_URL)
