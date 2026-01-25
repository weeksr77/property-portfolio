import { useEffect, useState } from 'react'
import sanityClient from '../sanityClient'
import imageUrlBuilder from '@sanity/image-url'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const builder = imageUrlBuilder(sanityClient)
const urlFor = (source) => source ? builder.image(source) : null

function PortfolioCard({ property }) {
const imageUrl = urlFor(property.image)?.width(400).url() || '/placeholder.png'

return (
<div className="portfolio-card">
<img src={imageUrl} alt={property.title || 'Property'} className="portfolio-img" />
<h3 className="portfolio-title">{property.title || 'No Title'}</h3>
<p className="portfolio-description">{property.description || 'No description available.'}</p>
{property.slug?.current ? (
<Link to={`/property/${property.slug.current}`} className="portfolio-btn">
View Property
</Link>
) : (
<button className="portfolio-btn" disabled>No link available</button>
)}
</div>
)
}

function PortfolioPage() {
const [data, setData] = useState(null)

useEffect(() => {
sanityClient
.fetch(`*[_type == "portfolioPage"][0]{
backgroundImage,
overlayText,
properties[]{title, slug, description, image}
}`)
.then((fetchedData) => {
console.log('Fetched Portfolio Data:', fetchedData)
setData(fetchedData)
})
.catch(console.error)
}, [])

if (!data) return <p style={{ padding: 40 }}>Loading portfolio…</p>

const heroImageUrl = urlFor(data.backgroundImage)?.width(1600).url() || '/placeholder-hero.png'

return (
<div className="page-wrapper">
<Header navTitle="Castle Rock Managment"/>

<section
className="portfolio-hero"
style={{
backgroundImage: `url(${heroImageUrl})`,
}}
>
<div className="overlay">
<h1>{data.overlayText || 'Welcome to Our Properties'}</h1>
</div>
</section>

<main className="page-main container-fluid">
<section className="properties-section">
<h2 className="section-title">Our Properties</h2>
<p className="section-description">Explore our available properties below.</p>
<div className="properties-grid">
{data.properties?.length
? data.properties.map((property, index) => (
<PortfolioCard key={index} property={property} />
))
: <p>No properties available.</p>}
</div>
</section>
</main>

<Footer />
</div>
)
}

export default PortfolioPage