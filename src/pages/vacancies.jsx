import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import sanityClient from "../sanityClient"

import Header from "../components/Header"
import Footer from "../components/Footer"

function Vacancies() {
  const { slug } = useParams() // if route has :slug, this will be defined
  const [cms, setCms] = useState(null)
  const [loading, setLoading] = useState(true)

  const isPropertyApplicants = Boolean(slug)

  useEffect(() => {
    setLoading(true)

    const query = isPropertyApplicants
      ? `*[_type == "property" && slug.current == $slug][0]{
          title,
          slug,
          applicantsTitle,
          applicantsInstructions
        }`
      : `*[_type == "vacanciesPage"][0]{
          title,
          instructions
        }`

    const params = isPropertyApplicants ? { slug } : {}

    sanityClient
      .fetch(query, params)
      .then((data) => setCms(data || null))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug, isPropertyApplicants])

  if (loading) return <p style={{ padding: 40 }}>Loading applicants…</p>

  // --- Header props ---
  const navTitle = isPropertyApplicants ? cms?.title || " " : "Castle Rock Management"
  const propertySlug = isPropertyApplicants ? cms?.slug?.current || slug : null

  // --- Title + instructions ---
  const title = isPropertyApplicants
    ? cms?.applicantsTitle || "Apply Online"
    : cms?.title || "Available Properties"

  const instructions = isPropertyApplicants
    ? cms?.applicantsInstructions ||
      "Use the filters below to find this property’s listings, then follow the steps to apply."
    : cms?.instructions ||
      "Use the filters below to browse available properties and apply online."

  return (
    <div className="page-wrapper">
      <Header propertySlug={propertySlug} navTitle={navTitle} />

      <main className="page-main container-fluid">
        <section className="vacancies-section">
          <div className="vacancies-instructions">
            <h2>{title}</h2>
            <p>{instructions}</p>
          </div>

          <iframe
            title="AppFolio Listings"
            className="appfolio-iframe"
            src="/appfolio.html"
            sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Vacancies


/*import { useEffect, useMemo, useState } from "react"
import sanityClient from "../sanityClient"

import Header from "../components/Header"
import Footer from "../components/Footer"

function escapeHtml(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function Vacancies() {
  const [cms, setCms] = useState(null)

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "vacanciesPage"][0]{ title, instructions }`)
      .then(setCms)
      .catch(console.error)
  }, [])

  const title = cms?.title || "Available Properties"
  const instructions =
    cms?.instructions ||
    "Use the filters below to browse available properties and apply online."

  const iframeSrcDoc = useMemo(() => {
    return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { margin: 0; font-family: Arial, sans-serif; }
    </style>
  </head>
  <body>
    <script src="https://castlerockmanagementllc.appfolio.com/javascripts/listing.js"></script>
    <script>
      if (window.Appfolio && window.Appfolio.Listing) {
        window.Appfolio.Listing({
          hostUrl: "castlerockmanagementllc.appfolio.com",
          themeColor: "#676767",
          height: "650px",
          width: "100%",
          defaultOrder: "date_posted"
        });
      }
    </script>
  </body>
</html>`
  }, [])

  return (
    <div className="page-wrapper">
      <Header navTitle="Castle Rock Management" />

      <main className="page-main container-fluid">
        <section className="vacancies-section">
          <div className="vacancies-instructions">
            <h2>{title}</h2>
            <p>{instructions}</p>
          </div>

          <iframe
            title="AppFolio Listings"
            className="appfolio-iframe"
            src="/appfolio.html"
            sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Vacancies*/