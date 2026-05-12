import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import sanityClient from "../sanityClient"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Contact from "../components/Contact"
import ContactInfo from "../components/ContactInfo"
import { applyPageMetadata, resetPageMetadata, siteUrl } from "../seo"

function ContactUs() {
  const { slug } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(Boolean(slug))

  useEffect(() => {
    // ✅ Global route: /contact (no slug) — don’t fetch
    if (!slug) {
      setProperty(null)
      setLoading(false)
      return
    }

    setLoading(true)
    sanityClient
      .fetch(
        `*[_type=="property" && slug.current==$slug][0]{ title, slug, contactPhone }`,
        { slug }
      )
      .then((data) => setProperty(data || null))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (!slug) {
      applyPageMetadata({
        title: "Contact Castle Rock Management",
        description: "Contact Castle Rock Management about apartments, townhomes, vacancies, applications, and property tours in Virginia.",
        url: `${siteUrl}/contact`,
      })

      return resetPageMetadata
    }

    if (!property) return undefined

    applyPageMetadata({
      title: `Contact ${property.title} | Castle Rock Management`,
      description: `Contact Castle Rock Management about ${property.title}, including availability, applications, property tours, and rental questions.`,
      url: `${siteUrl}/property/${property.slug?.current || slug}/contact`,
    })

    return resetPageMetadata
  }, [property, slug])

  // ✅ GLOBAL CONTACT PAGE (portfolio-safe)
  if (!slug) {
    return (
      <div className="page-wrapper">
        <Header propertySlug={null} navTitle="Castle Rock Management" />

        <main className="page-main container-fluid">
          <div className="container-fluid">
            <Contact />
            <ContactInfo />
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <Link to="/" className="apply-btn-map" style={{ textDecoration: "none" }}>
                View Properties
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  // ✅ PROPERTY CONTACT PAGE
  if (loading) return <p style={{ padding: 40 }}>Loading contact…</p>

  if (!property) {
    return (
      <div className="page-wrapper">
        <Header propertySlug={slug} navTitle=" " />
        <main className="page-main container-fluid" style={{ padding: 40 }}>
          <p>
            Couldn’t find a property for <strong>{slug}</strong>. Make sure the slug matches what’s in Sanity.
          </p>
          <Link to="/" className="apply-btn-map" style={{ textDecoration: 'none' }}>
            Back to Properties
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <Header
        propertySlug={property.slug?.current || null}
        navTitle={property.title || " "}
        contactPhone={property.contactPhone}
      />

      <main className="page-main container-fluid">
        <div className="container-fluid">
          <Contact />
          <ContactInfo contactPhone={property.contactPhone} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ContactUs

/*import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import sanityClient from "../sanityClient"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Contact from "../components/Contact"
import ContactInfo from "../components/ContactInfo"

function ContactUs() {
  const { slug } = useParams()
  const [property, setProperty] = useState(null)

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="property" && slug.current==$slug][0]{ title, slug }`,
        { slug }
      )
      .then(setProperty)
      .catch(console.error)
  }, [slug])

  if (!property) return <p style={{ padding: 40 }}>Loading contact…</p>

  return (
    <div className="page-wrapper">
      <Header
        propertySlug={property.slug.current}
        navTitle={property.title}
      />

      <main className="page-main container-fluid">
        <div className="container-fluid">
          <Contact />
          <ContactInfo />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ContactUs*/
