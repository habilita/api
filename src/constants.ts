import * as dotenv from 'dotenv'
dotenv.config()

interface Ids {
  api: string
  web: string
  ios: string
  android: string
}

export const mongoConnectionString = process.env.MONGO_CONNECTION_STRING || ''
export const apiPort = process.env.API_PORT || '3000'
export const secret = process.env.SECRET || String(Math.random() ** Math.random())

export const CLIENTS_ID_GOOGLE: Ids = {
  api: '988830625756-esthojoesl72hag6s0srss94i3df7514.apps.googleusercontent.com',
  web: '988830625756-d77posio0rrf3c8db7dtim4cck7n8089.apps.googleusercontent.com',
  ios: '988830625756-38lotbtca2m3k73go7bkks83in5k3p9s.apps.googleusercontent.com',
  android: '988830625756-i1hub0fehl10i06fsfbdcnr967mvm3kb.apps.googleusercontent.com'
}
