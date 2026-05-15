// ✅ React: PropertyPage.jsx (updated)
// Replace your PropertyPage.jsx with this version (or copy the relevant parts).
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import sanityClient from "../sanityClient"
import imageUrlBuilder from "@sanity/image-url"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Teaser from "../components/Teaser"
import Plans from "../components/Plans"
import Amenities from "../components/Amenities"
import Gallery from "../components/Gallery"
import LifestyleNearby from "../components/LifestyleNearby"
import Map from "../components/Map"
import Contact from "../components/Contact"
import ContactInfo from "../components/ContactInfo"
import {
  applyPageMetadata,
  defaultDescription,
  defaultImage,
  defaultTitle,
  removeJsonLd,
  resetPageMetadata,
  siteUrl,
  toMetaDescription,
  upsertJsonLd,
} from "../seo"

const builder = imageUrlBuilder(sanityClient)
const urlFor = (source) => builder.image(source)

function PropertyPage() {
  const { slug } = useParams()
  const [property, setProperty] = useState(null)

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "property" && slug.current == $slug][0]{
          title,
          navTitle,
          slug,
          seoTitle,
          seoDescription,
          seoImage,
          heroTitle,
          heroText,
          heroImage,
          "teaser": {
            "title": heroText,
            "description": teaserText,
            "image": teaserImage
          },

          // ✅ NEW CMS fields
          floorplansSubtitle,
          walkthroughTitle,
          walkthroughText,
          walkthroughButtonText,
          walkthroughPhone,

          // ✅ Use REAL floorplans for the home page section
          floorplans[]->{
            name,
            price,
            "imageUrl": image.asset->url,
            virtualTourUrl,
            amenities
          },

          amenities,
          gallery,
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
          },
          location,
          contactEmail,
          contactPhone,
          mapEmbedUrl,
          googleMapsUrl
        }`,
        { slug }
      )
      .then((data) => {
        if (!data) return

        const formattedGallery =
          data.gallery?.map((img, index) => ({
            original: urlFor(img).width(1400).url(),
            thumbnail: urlFor(img).width(300).url(),
            originalAlt: `${data.title || "Property"} photo ${index + 1}`,
            thumbnailAlt: `${data.title || "Property"} thumbnail ${index + 1}`,
          })) || []

        setProperty({
          ...data,
          formattedGallery,
        })
      })
      .catch(console.error)
  }, [slug])

  useEffect(() => {
    if (!property) return undefined

    const title = property.seoTitle || property.heroTitle || property.title || defaultTitle
    const description =
      property.seoDescription || property.teaser?.description || property.heroText || defaultDescription
    const image = property.seoImage
      ? urlFor(property.seoImage).width(1200).height(630).fit("crop").url()
      : property.heroImage
        ? urlFor(property.heroImage).width(1200).height(630).fit("crop").url()
        : defaultImage
    const url = `${siteUrl}/property/${property.slug?.current || slug}`

    applyPageMetadata({
      title,
      description: toMetaDescription(description),
      image,
      url,
      type: "article",
    })

    upsertJsonLd("organization", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Castle Rock Management",
      url: siteUrl,
      logo: defaultImage,
    })

    upsertJsonLd("property", {
      "@context": "https://schema.org",
      "@type": "ApartmentComplex",
      name: property.title,
      description: toMetaDescription(description),
      image,
      url,
      address: property.location,
      email: property.contactEmail,
      telephone: property.contactPhone,
      mainEntityOfPage: url,
      amenityFeature: Array.isArray(property.floorplans)
        ? property.floorplans
            .flatMap((plan) => plan.amenities || [])
            .filter(Boolean)
            .slice(0, 20)
            .map((amenity) => ({
              "@type": "LocationFeatureSpecification",
              name: amenity,
            }))
        : undefined,
    })

    return () => {
      resetPageMetadata()
      removeJsonLd("property")
    }
  }, [property, slug])

  if (!property) return <p style={{ padding: 40 }}>Loading property…</p>

  // ✅ Build tel link (strip non-digits so "(123) 456-7890" still works)
  const telHref = property.walkthroughPhone
    ? `tel:${String(property.walkthroughPhone).replace(/[^\d+]/g, "")}`
    : null

  return (
    <div className="page-wrapper">
      <Header
        propertySlug={property?.slug?.current || null}
        navTitle={property?.navTitle || property?.title || ""}
        contactPhone={property.contactPhone}
      />

      <Hero title={property.heroTitle} image={property.heroImage} />

      <main className="page-main container-fluid">
        <Teaser
          data={property.teaser}
          propertyTitle={property.title}
          propertySlug={property.slug?.current}
        />

        {/* ✅ NEW: Walk-through callout (between Teaser and Floor Plans) */}
        <section className="walkthrough-callout">
          <div className="walkthrough-inner">
            <h2 className="walkthrough-title">
              {property.walkthroughTitle || "Call today to set up a walk-through tour!"}
            </h2>

            {property.walkthroughText && (
              <p className="walkthrough-text">{property.walkthroughText}</p>
            )}

            {telHref && (
              <a className="walkthrough-btn" href={telHref}>
                {property.walkthroughButtonText || "Call Now"}
              </a>
            )}
          </div>
        </section>

        {/* ✅ Home page floorplans section (now uses real floorplans) */}
        <Plans
          data={property.floorplans || []}
          propertySlug={property.slug?.current}
          subtitle={property.floorplansSubtitle}
          propertyTitle={property.title}
        />

        <Amenities data={property.amenities} propertyTitle={property.title} />
        <Gallery images={property.formattedGallery} />
        <LifestyleNearby
          title={property.lifestyleTitle}
          intro={property.lifestyleIntro}
          heroImage={property.lifestyleHeroImage}
          groups={property.nearbyGroups || []}
          propertyTitle={property.title}
          propertySlug={property.slug?.current}
        />
        <Map
          address={property.location}
          embedUrl={property.mapEmbedUrl}
          mapsUrl={property.googleMapsUrl}
        />
        <Contact />
        <ContactInfo contactPhone={property.contactPhone} />
      </main>

      <Footer />
    </div>
  )
}

export default PropertyPage


/*import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import sanityClient from '../sanityClient'

import imageUrlBuilder from '@sanity/image-url'


const builder = imageUrlBuilder(sanityClient)
const urlFor = (source) => builder.image(source)

import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Teaser from '../components/Teaser'
import Plans from '../components/Plans'
import Amenities from '../components/Amenities'
import Gallery from '../components/Gallery'
import Map from '../components/Map'
import Contact from '../components/Contact'
import ContactInfo from '../components/ContactInfo'

function PropertyPage() {
  const { slug } = useParams()
  const [property, setProperty] = useState(null)

  useEffect(() => {
  sanityClient
    .fetch(
      `*[_type == "property" && slug.current == $slug][0]{
        title,
        navTitle,
        slug,
        heroTitle,
        heroImage,
        "teaser": {
          "title": heroText,
          "description": teaserText,
          "image": teaserImage
        },
        "floor": floor[]{ title, description, image },
         floorplans[]->{
      name,
      price,
      "imageUrl": image.asset->url,
      virtualTourUrl,
      amenities
    },
        amenities,
        gallery,
        floorplans,
        location,
        mapEmbedUrl,
        googleMapsUrl
      }`,
      { slug }
    )
        .then((data) => {
      if (!data) return

      const formattedGallery =
        data.gallery?.map((img) => ({
          original: urlFor(img).width(1400).url(),
          thumbnail: urlFor(img).width(300).url(),
        })) || []

      setProperty({
        ...data,
        formattedGallery,
      })
    })
    .catch(console.error)
}, [slug])

  if (!property) {
    return <p style={{ padding: 40 }}>Loading property xxx…</p>
    
  }


  return (
    <div className="page-wrapper">
      <Header
  propertySlug={property?.slug?.current || null}
  navTitle={property?.navTitle || property?.title || ""}
/>


      <Hero 
        title={property.heroTitle} 
        image={property.heroImage}
      />

      <main className="page-main container-fluid">
        <Teaser data={property.teaser} />
        <Plans data={property.floor}
               propertySlug={property.slug.current}
        />
        <Amenities data={property.amenities} />
        <Gallery images={property.formattedGallery} />
        <Map address={property.location} embedUrl={property.mapEmbedUrl} mapsUrl={property.googleMapsUrl}/>
        <Contact />
        <ContactInfo />
      </main>

      <Footer />
    </div>
  )
}

export default PropertyPage*/




/*import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Teaser from '../components/Teaser';
import Plans from '../components/Plans';
import Amenities from '../components/Amenities';
import Gallery from '../components/Gallery';
import Map from '../components/Map';
import Contact from '../components/Contact';
import ContactInfo from '../components/ContactInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function PropertyPage() {
  return (
    <div className="page-wrapper">
      <Header />
      <Hero />
      
      {/* Main content: full width wrapper with centered container inside }
      <main className="page-main container-fluid"> 
        
        <div className="container-fluid">
           <Teaser />
           <Plans />
           <Amenities />
           <Gallery />
           <Map />
           <Contact />
           <ContactInfo />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PropertyPage;*/
