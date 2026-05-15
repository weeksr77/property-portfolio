import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import sanityClient from '../sanityClient'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LifestyleNearby from '../components/LifestyleNearby'
import { applyPageMetadata, resetPageMetadata, siteUrl } from '../seo'

function LifestylePage() {
  const { slug } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    sanityClient
      .fetch(
        `*[_type == "property" && slug.current == $slug][0]{
          title,
          navTitle,
          slug,
          contactPhone,
          lifestyleTitle,
          lifestyleIntro,
          lifestyleHeroImage,
          nearbyGroups[]{
            title,
            description,
            items[]{
              name,
              summary,
              travelTime,
              distance,
              note,
              websiteUrl,
              directionsUrl,
              featured
            }
          }
        }`,
        { slug }
      )
      .then((data) => setProperty(data || null))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (!property) return undefined

    applyPageMetadata({
      title: `${property.title} Lifestyle & Nearby | Castle Rock Management`,
      description: `Explore nearby employers, schools, shopping, healthcare, attractions, and commuter routes around ${property.title}.`,
      url: `${siteUrl}/property/${property.slug?.current || slug}/lifestyle`,
    })

    return resetPageMetadata
  }, [property, slug])

  if (loading) return <p style={{ padding: 40 }}>Loading lifestyle preview...</p>

  if (!property) {
    return (
      <div className="page-wrapper">
        <Header propertySlug={slug} navTitle=" " />
        <main className="page-main container-fluid">
          <p style={{ padding: 40 }}>
            Could not find a property for <strong>{slug}</strong>. Make sure the slug matches Sanity.
          </p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <Header
        propertySlug={property.slug?.current || slug}
        navTitle={property.navTitle || property.title || ' '}
        contactPhone={property.contactPhone}
      />

      <main className="page-main container-fluid">
        <LifestyleNearby
          title={property.lifestyleTitle}
          intro={property.lifestyleIntro}
          heroImage={property.lifestyleHeroImage}
          groups={property.nearbyGroups || []}
          propertyTitle={property.title}
          propertySlug={property.slug?.current || slug}
          previewFallback
        />
      </main>

      <Footer />
    </div>
  )
}

export default LifestylePage
