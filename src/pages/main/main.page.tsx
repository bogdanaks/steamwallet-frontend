import { TopUpSteamBalance } from "features/top-up-steam-balance"

import styles from "./styles.module.css"

export const MainPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Пополнение Steam</h1>
      <TopUpSteamBalance />
    </div>
  )
}
