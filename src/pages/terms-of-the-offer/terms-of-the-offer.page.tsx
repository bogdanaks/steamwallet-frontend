import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const TermsOfTheOfferPage = () => {
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

  return <div>TermsOfTheOfferPage</div>
}
