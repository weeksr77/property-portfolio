import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import sanityClient from "../sanityClient"
import { urlFor } from "../imageUrl"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Gallery from "../components/Gallery"
import ContactInfo from "../components/ContactInfo"   // ✅ add this

function GalleryPage() {
  const { slug } = useParams()
  const [property, setProperty] = useState(null)

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "property" && slug.current == $slug][0]{
          title,
          slug,
          gallery
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

  if (!property) return <p style={{ padding: 40 }}>Loading gallery…</p>

  return (
    <div className="page-wrapper">
      <Header
        propertySlug={property.slug?.current}
        navTitle={property.title}
      />

      <main className="page-main container-fluid">
        <Gallery images={property.formattedGallery} />

        {/* ✅ Add contact info below gallery */}
        <ContactInfo />
      </main>

      <Footer />
    </div>
  )
}

export default GalleryPage