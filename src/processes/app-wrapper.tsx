import { Root } from "@radix-ui/react-dialog"
import { PropsWithChildren, useEffect } from "react"
import { Toaster } from "sonner"

export const AppWrapper = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    if (Telegram.WebApp.initData?.length) {
      Telegram.WebApp.expand()
      Telegram.WebApp.enableClosingConfirmation()
      Telegram.WebApp.disableVerticalSwipes()
    }
  }, [])

  return (
    <Root>
      {children}
      <Toaster theme="light" richColors />
    </Root>
  )
}
