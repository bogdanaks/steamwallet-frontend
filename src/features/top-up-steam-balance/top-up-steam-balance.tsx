import { zodResolver } from "@hookform/resolvers/zod"
import * as Dialog from "@radix-ui/react-dialog"
import classNames from "classnames"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z } from "zod"

import CloseIcon from "shared/assets/icons/close.svg?react"
import { useTgMainButton } from "shared/hooks"

import styles from "./styles.module.css"

const validateAmount = (amount: string) => {
  const amountRegex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/
  const regexValidate = amountRegex.test(amount)
  const minValidate = Number(amount) >= 100
  const maxValidate = Number(amount) <= 15000
  return regexValidate && minValidate && maxValidate
}

const formSchema = z.object({
  login: z.string({ required_error: "Обязательное поле" }).min(3, { message: "Минимум 3 символа" }),
  amount: z.coerce
    .number({
      required_error: "Обязательное поле",
      invalid_type_error: "Некорректная сумма",
    })
    .min(100, { message: "Минимум 100 ₽" })
    .max(15000, { message: "Максимум 15000 ₽" }),
})

type FormFields = z.infer<typeof formSchema>

export const TopUpSteamBalance = () => {
  const form = useForm<FormFields>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: localStorage.getItem("login-value") ?? "",
      amount: localStorage.getItem("amount-value")
        ? Number(localStorage.getItem("amount-value"))
        : undefined,
    },
  })

  const watchLogin = form.watch("login")
  const watchAmount = form.watch("amount")

  console.log("watchLogin", watchLogin)
  console.log("watchAmount", watchAmount)

  const onSubmit = (data: FormFields) => {
    console.log("onSubmit data", data)
  }

  const { enable, disable } = useTgMainButton({
    text: "Пополнить",
    defaultEnabled: false,
    defaultVisible: true,
    onClick: () => form.handleSubmit(onSubmit)(),
  })

  const checkSteamLogin = (login: string) => {
    return login?.length > 2
  }

  useEffect(() => {
    const isLoginValid = checkSteamLogin(watchLogin)
    const isAmountValid = validateAmount(String(watchAmount))

    localStorage.setItem("amount-value", String(watchAmount))
    localStorage.setItem("login-value", watchLogin)

    if (isLoginValid && isAmountValid) {
      enable()
      form.clearErrors()
    } else {
      disable()
    }
  }, [watchAmount, watchLogin])

  const hasErrors = !!Object.keys(form.formState.errors).length

  return (
    <form className={styles.containerForm} onSubmit={form.handleSubmit(onSubmit)}>
      <label className={classNames(styles.formLabel, styles.formInput)}>
        <input placeholder="Логин Steam" {...form.register("login")} />
        <Dialog.Trigger asChild>
          <button type="button" className={styles.whereLoginBtn}>
            Где посмотреть?
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.dialogOverlay} />
          <Dialog.Content className={styles.dialogContent}>
            <div className={styles.dialogContentHeader}>
              <Dialog.Title>Где посмотреть свой steam логин?</Dialog.Title>
              <Dialog.Close asChild>
                <button type="button" className={styles.dialogClose}>
                  <CloseIcon width={24} height={24} />
                </button>
              </Dialog.Close>
            </div>
            <ul className={styles.list}>
              <li>
                Откройте клиент Steam. Нажмите на имя пользователя в правом верхнем углу главной
                страницы.
              </li>
              <li>В выпадающем меню выберите пункт «Об аккаунте».</li>
            </ul>
            <img src="login-steam.jpg" className={styles.image} />
          </Dialog.Content>
        </Dialog.Portal>
      </label>
      <label className={styles.formLabel}>
        <input placeholder="Сумма" {...form.register("amount")} />
      </label>
      <div className={styles.amountBtns}>
        <button type="button" onClick={() => form.setValue("amount", 100)}>
          100
        </button>
        <button type="button" onClick={() => form.setValue("amount", 300)}>
          300
        </button>
        <button type="button" onClick={() => form.setValue("amount", 500)}>
          500
        </button>
        <button type="button" onClick={() => form.setValue("amount", 1000)}>
          1000
        </button>
      </div>
      {hasErrors &&
        Object.entries(form.formState.errors).map(([key, error]) => (
          <span className={styles.error} key={key}>
            {error.message}
          </span>
        ))}
      {!hasErrors && <span>К зачислению на Steam: ~{watchAmount ?? 0} ₽</span>}
      <span className={styles.footer}>
        Нажимая “Пополнить”, вы соглашаетесь с условиямии{" "}
        <Link to="terms-of-the-offer">оферты</Link>,{" "}
        <Link to="user-agreement">пользовательского соглашения</Link> и{" "}
        <Link to="privacy-policy">политикой конфиденциальности</Link>
      </span>
    </form>
  )
}
