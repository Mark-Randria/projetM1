import APIClient from '../lib/apiClient'
import { SIGNUP_ENDPOINT_URL } from '../constants/url'
import { IUser } from '../types/type'

export default new APIClient<IUser>(SIGNUP_ENDPOINT_URL)
