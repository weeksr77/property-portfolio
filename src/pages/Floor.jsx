import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import sanityClient from "../sanityClient"

import Header from "../components/Header"
import Footer from "../components/Footer"
import AllPlans from "../components/AllPlans"

function Floor() {
  const { slug } = useParams()
  const [propertyTitle, setPropertyTitle] = useState(" ")
  const [floorplans, setFloorplans] = useState([])
  const [unitGallery, setUnitGallery] = useState([])

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "property" && slug.current == $slug][0]{
          title,
          unitGallery,
          floorplans[]->{
            name,
            price,
            "imageUrl": image.asset->url,
            virtualTourUrl,
            amenities,
            unitPhotos
          }
        }`,
        { slug }
      )
      .then((data) => {
        setPropertyTitle(data?.title || " ")
        setFloorplans(data?.floorplans || [])
        setUnitGallery(data?.unitGallery || [])
      })
      .catch(console.error)
  }, [slug])

  // Optional: show title even if no floorplans yet
  if (!floorplans.length) return <p style={{ padding: 40 }}>Loading floorplans…</p>

  return (
    <>
      <Header propertySlug={slug} navTitle={propertyTitle} />
      <AllPlans data={floorplans} gallery={unitGallery} />
      <Footer />
    </>
  )
}

export default Floor


/*import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Teaser from '../components/Teaser';
import Plans from '../components/Plans';
import Amenities from '../components/Amenities';
import Gallery from '../components/Gallery';
import Map from '../components/Map';
import Contact from '../components/Contact';
import AllPlans from '../components/AllPlans';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactInfo from '../components/ContactInfo';
import '../App.css';


function Floor() {
  return (
    <div className="page-wrapper">
      <Header />
      
      
      {/* Main content: full width wrapper with centered container inside *
      <main className="page-main container-fluid"> 
        
        <div className="container-fluid">
           <AllPlans />
           <ContactInfo />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Floor;*/