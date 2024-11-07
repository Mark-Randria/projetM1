import APIClient from '../lib/apiClient'
import { SIGNUP_ENDPOINT_URL } from '../constants/url'
import { IUser } from '../types/type'

const signupService = new APIClient<IUser>(SIGNUP_ENDPOINT_URL);
export default signupService;
