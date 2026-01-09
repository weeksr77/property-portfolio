import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import sanityClient from '../sanityClient'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Amenities from '../components/Amenities'
import ContactInfo from '../components/ContactInfo'

function AllAmenities() {
  const { slug } = useParams()
  const [amenities, setAmenities] = useState([])

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "property" && slug.current == $slug][0]{
          amenities
        }`,
        { slug }
      )
      .then(data => setAmenities(data?.amenities || []))
      .catch(console.error)
  }, [slug])

  return (
    <div className="page-wrapper">
      <Header />

      <main className="page-main container-fluid">
        <div className="container-fluid">
          <Amenities data={amenities} />
          <ContactInfo />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AllAmenities


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


function AllAmenities() {
  return (
    <div className="page-wrapper">
      <Header />
      
      
      {/* Main content: full width wrapper with centered container inside *
      <main className="page-main container-fluid"> 
        
        <div className="container-fluid">
           <Amenities />
           <ContactInfo />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AllAmenities;*/