import Header from '../components/Header';
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


function ContactUs() {
  return (
    <div className="page-wrapper">
      <Header />
      
      
      {/* Main content: full width wrapper with centered container inside */}
      <main className="page-main container-fluid"> 
        
        <div className="container-fluid">
           <Contact />
           <ContactInfo />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ContactUs;