import { useEffect } from "react"

import { hexToHSL, hslToHex } from "shared/libs/utils"

interface Props {
  text: string
  onClick?: () => void | Promise<void>
  defaultEnabled?: boolean
  defaultVisible?: boolean
}

const docStyle = getComputedStyle(document.documentElement)
const btnBgColor = docStyle.getPropertyValue("--tg-theme-button-color")?.length
  ? docStyle.getPropertyValue("--tg-theme-button-color")
  : "#8c8c8c"
const btnTextColor = docStyle.getPropertyValue("--tg-theme-button-text-color")?.length
  ? docStyle.getPropertyValue("--tg-theme-button-text-color")
  : "#ffffff"
console.log(btnBgColor)
const hslaBtnBgColor = hexToHSL(btnBgColor, 30)
const hslaBtnTextColor = hexToHSL(btnTextColor, 45)
const disableBtnBgColor = hslToHex({
  h: hslaBtnBgColor.h,
  s: hslaBtnBgColor.s,
  l: hslaBtnBgColor.l,
})
const disableBtnTextColor = hslToHex({
  h: hslaBtnTextColor.h,
  s: hslaBtnTextColor.s,
  l: hslaBtnTextColor.l,
})

export const useTgMainButton = ({
  text,
  defaultEnabled = true,
  defaultVisible = true,
  onClick,
}: Props) => {
  useEffect(() => {
    Telegram.WebApp.MainButton.setParams({
      text,
      color: defaultEnabled ? btnBgColor : disableBtnBgColor,
      text_color: defaultEnabled ? btnTextColor : disableBtnTextColor,
      is_active: defaultEnabled,
      is_visible: defaultVisible,
    })
    onClick && Telegram.WebApp.MainButton.onClick(onClick)

    return () => {
      onClick && Telegram.WebApp.MainButton.offClick(onClick)
      Telegram.WebApp.MainButton.hide()
    }
  }, [])

  const enable = () => {
    Telegram.WebApp.MainButton.setParams({
      text,
      color: btnBgColor,
      text_color: btnTextColor,
      is_active: true,
      is_visible: true,
    })
  }

  const disable = () => {
    Telegram.WebApp.MainButton.setParams({
      text,
      color: disableBtnBgColor,
      text_color: disableBtnTextColor,
      is_active: false,
      is_visible: true,
    })
  }

  return {
    hide: Telegram.WebApp.MainButton.hide,
    update: Telegram.WebApp.MainButton.setParams,
    enable,
    disable,
  }
}
