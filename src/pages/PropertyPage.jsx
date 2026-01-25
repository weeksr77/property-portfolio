import { useEffect, useState } from 'react'
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
    return <p style={{ padding: 40 }}>Loading property…</p>
    
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

export default PropertyPage




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


