import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import styles from "./styles.module.css"

export const UserAgreementPage = () => {
  const navigate = useNavigate()

  const redirectToMain = () => navigate("/")

  useEffect(() => {
    Telegram.WebApp.BackButton.show()
    Telegram.WebApp.BackButton.onClick(redirectToMain)

    return () => {
      Telegram.WebApp.BackButton.hide()
      Telegram.WebApp.BackButton.offClick(redirectToMain)
    }
  }, [])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Пользовательское соглашение</h2>
      <section className={styles.section}>
        <p className={styles.text} style={{ marginLeft: 0 }}>
          Настоящее Пользовательское Соглашение (Далее Соглашение) регулирует отношения между
          владельцем https://t.me/steampop_bot (далее Пополнение Steam или Администрация) с одной
          стороны и пользователем сайта с другой. Сайт Пополнение Steam не является средством
          массовой информации.
        </p>
        <p className={styles.text} style={{ marginLeft: 0 }}>
          Используя сайт, Вы соглашаетесь с условиями данного соглашения. Если Вы не согласны с
          условиями данного соглашения, не используйте сайт Пополнение Steam!
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Права и обязанности сторон</h2>
        <p className={styles.text} style={{ marginLeft: 12 }}>
          Пользователь имеет право:
        </p>
        <p className={styles.text}>- осуществлять поиск информации на сайте</p>
        <p className={styles.text}>- получать информацию на сайте</p>
        <p className={styles.text}>- распространять информацию на сайте</p>
        <p className={styles.text}>- копировать информацию на другие сайты с указанием источника</p>
        <p className={styles.text}>
          - копировать информацию на другие сайты с разрешения Администрации сайта
        </p>
        <p className={styles.text}>- использовать информацию сайта в личных некоммерческих целях</p>
        <p className={styles.text}>
          - использовать информацию сайта в коммерческих целях с разрешения Администрации
        </p>

        <p className={styles.text} style={{ marginLeft: 12 }}>
          Администрация имеет право:
        </p>
        <p className={styles.text}>
          - по своему усмотрению и необходимости создавать, изменять, отменять правила
        </p>
        <p className={styles.text}>- ограничивать доступ к любой информации на сайте</p>
        <p className={styles.text}>- создавать, изменять, удалять информацию</p>
        <p className={styles.text}>- отказывать в регистрации без объяснения причин</p>

        <p className={styles.text} style={{ marginLeft: 12 }}>
          Пользователь обязуется:
        </p>
        <p className={styles.text}>- обеспечить достоверность предоставляемой информации</p>
        <p className={styles.text}>
          - обеспечивать сохранность личных данных от доступа третьих лиц
        </p>
        <p className={styles.text}>- не нарушать работоспособность сайта</p>
        <p className={styles.text}>
          - не использовать скрипты (программы) для автоматизированного сбора информации и/или
          взаимодействия с Сайтом и его Сервисами
        </p>

        <p className={styles.text} style={{ marginLeft: 12 }}>
          Администрация обязуется:
        </p>
        <p className={styles.text}>
          - поддерживать работоспособность сайта за исключением случаев, когда это невозможно по
          независящим от Администрации причинам.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Ответственность сторон</h2>
        <p className={styles.text}>
          - пользователь лично несет полную ответственность за распространяемую им информацию
        </p>
        <p className={styles.text}>
          - администрация не несет никакой ответственности за достоверность информации,
          скопированной из других источников
        </p>
        <p className={styles.text}>
          - администрация не несёт ответственность за несовпадение ожидаемых Пользователем и реально
          полученных услуг
        </p>
        <p className={styles.text}>
          - администрация не несет никакой ответственности за услуги, предоставляемые третьими
          лицами
        </p>
        <p className={styles.text}>
          - в случае возникновения форс-мажорной ситуации (боевые действия, чрезвычайное положение,
          стихийное бедствие и т. д.) Администрация не гарантирует сохранность информации,
          размещённой Пользователем, а также бесперебойную работу информационного ресурса
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Условия действия Соглашения</h2>
        <p className={styles.text}>
          Данное Соглашение вступает в силу при любом использовании данного сайта. Соглашение
          перестает действовать при появлении его новой версии. Администрация оставляет за собой
          право в одностороннем порядке изменять данное соглашение по своему усмотрению.
          Администрация не оповещает пользователей об изменении в Соглашении.
        </p>
      </section>

      <span>Дата последнего изменения: 2024-09-05</span>
    </div>
  )
}
