import { useEffect, useState } from "react"
import sanityClient from "../sanityClient"

function Vacancies() {
  const [cms, setCms] = useState(null)

  // 1) Fetch CMS content (title + instructions)
  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "vacanciesPage"][0]{ title, instructions }`)
      .then(setCms)
      .catch(console.error)
  }, [])

  // 2) Load AppFolio widget script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://castlerockmanagementllc.appfolio.com/javascripts/listing.js"
    script.async = true

    script.onload = () => {
      if (window.Appfolio?.Listing) {
        window.Appfolio.Listing({
          hostUrl: "castlerockmanagementllc.appfolio.com",
          themeColor: "#676767",
          height: "500px",
          width: "100%",
          defaultOrder: "date_posted",
        })
      }
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const title = cms?.title || "Available Properties"
  const instructions =
    cms?.instructions ||
    "Use the filters below to browse available properties. You can sort by location, price, or date posted to find the best match for you."

  return (
    <div className="page-wrapper">
      <main className="page-main container-fluid">
        <section className="vacancies-section">
          <div className="vacancies-instructions">
            <h2>{title}</h2>
            <p>{instructions}</p>
          </div>

          <div id="appfolio-listings"></div>
        </section>
      </main>
    </div>
  )
}

export default Vacancies