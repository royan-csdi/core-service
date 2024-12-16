export interface IEnv {
  APP: {
    PORT: string | number
    HOSTNAME: string
    JWT_SECRET: string
    JWT_EXPIRES_IN: string
  }
  REDIS: {
    HOST: string
    PORT: string | number
    USERNAME: string
    PASSWORD: string
  }
}
