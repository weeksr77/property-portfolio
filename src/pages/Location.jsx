import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import sanityClient from '../sanityClient'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Map from '../components/Map'
import ContactInfo from '../components/ContactInfo'

function Location() {
  const { slug } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(Boolean(slug))

  useEffect(() => {
    // ✅ Global route: /location (no slug) — don’t fetch
    if (!slug) {
      setProperty(null)
      setLoading(false)
      return
    }

    setLoading(true)
    sanityClient
      .fetch(
        `*[_type == "property" && slug.current == $slug][0]{
          title,
          slug,
          mapEmbedUrl,
          googleMapsUrl,
          location
        }`,
        { slug }
      )
      .then((data) => setProperty(data || null))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  // ✅ GLOBAL LOCATION PAGE (portfolio-safe)
  if (!slug) {
    return (
      <div className="page-wrapper">
        <Header propertySlug={null} navTitle="Castle Rock Management" />

        <main className="page-main container-fluid">
          <div className="container-fluid" style={{ padding: 20 }}>
            <h2 style={{ marginBottom: 12 }}>Location</h2>
            <p style={{ marginBottom: 20 }}>
              Please select a property from the portfolio to view directions for that specific location.
            </p>

            <Link to="/" className="apply-btn-map" style={{ textDecoration: 'none' }}>
              View Properties
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  // ✅ PROPERTY LOCATION PAGE
  if (loading) return <p style={{ padding: 40 }}>Loading location…</p>

  // If slug exists but doc not found, show a helpful message (no blank page)
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
        navTitle={property.title || ' '}
      />

      <main className="page-main container-fluid">
        <Map
          embedUrl={property.mapEmbedUrl}
          mapsUrl={property.googleMapsUrl}
          address={property.location}
        />
        <ContactInfo />
      </main>

      <Footer />
    </div>
  )
}

export default Location

/*import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import sanityClient from '../sanityClient'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Map from '../components/Map'
import ContactInfo from '../components/ContactInfo'

function Location() {
  const { slug } = useParams()
  const [property, setProperty] = useState(null)

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "property" && slug.current == $slug][0]{
          title,
          slug,
          mapEmbedUrl,
          googleMapsUrl,
          location
        }`,
        { slug }
      )
      .then(setProperty)
      .catch(console.error)
  }, [slug])

  if (!property) return <p style={{ padding: 40 }}>Loading location…</p>

  return (
    <div className="page-wrapper">
      <Header
        propertySlug={property.slug?.current || null}
        navTitle={property.title || ' '}
      />

      <main className="page-main container-fluid">
        <Map
          embedUrl={property.mapEmbedUrl}
          mapsUrl={property.googleMapsUrl}
          address={property.location}
        />
        <ContactInfo />
      </main>

      <Footer />
    </div>
  )
}

export default Location*/