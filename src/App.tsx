import { BrowserRouter, Route, Routes } from "react-router-dom"

import { MainPage } from "pages/main/main.page"
import { PrivacyPolicyPage } from "pages/privacy-policy/privacy-policy.page"
import { TermsOfTheOfferPage } from "pages/terms-of-the-offer/terms-of-the-offer.page"
import { UserAgreementPage } from "pages/user-agreement/user-agreement.page"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="terms-of-the-offer" element={<TermsOfTheOfferPage />} />
        <Route path="user-agreement" element={<UserAgreementPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
