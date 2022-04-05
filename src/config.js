const config = {
  baseURL: process.env.REACT_APP_BASE_URL,
  accountSid: process.env.REACT_APP_TWILIO_ACCOUNT_SID,
  authTokenUrl: process.env.REACT_APP_TWILIO_AUTH_TOKEN_URL,
  searchUrl: process.env.REACT_APP_SEARCH_URL,
  tempToken: process.env.REACT_APP_TEMP_TOKEN,
  userOne: process.env.REACT_APP_USER_ONE,
  userTwo: process.env.REACT_APP_USER_TWO,
  uniqueChatName: process.env.REACT_APP_UNIQUE_CHAT_NAME,
}

export default config;