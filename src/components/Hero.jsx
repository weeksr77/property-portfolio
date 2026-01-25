import { urlFor } from '../imageUrl'
import 'bootstrap/dist/css/bootstrap.min.css'

function Hero({ title, image }) {
  return (
    <section className="hero-split">
      <div className="hero-text">
        <h1>{title}</h1>
      </div>

      {image && (
        <div
          className="hero-image"
          style={{
            backgroundImage: `url(${urlFor(image).width(2000).url()})`,
          }}
        />
      )}
    </section>
  )
}

export default Hero



/*import 'bootstrap/dist/css/bootstrap.min.css';

function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <h1>Find Your Home at Historic Old Town Winchester</h1>
        <button className="apply-btn">Apply Now</button>
      </div>
    </section>
  );
}

export default HeroBanner;*/
