import APIClient from '../lib/apiClient'
import { LOGIN_ENDPOINT_URL } from '../constants/url'
import { IUserLogin } from '../types/type'

export default new APIClient<IUserLogin>(LOGIN_ENDPOINT_URL)
