import { urlFor } from '../imageUrl'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function Teaser({ data, propertyTitle, propertySlug }) {
  if (!data) return <p>Loading teaser…</p>

  const { title, description, image } = data
  const applyPath = propertySlug ? `/property/${propertySlug}/applicants` : '/applicants'

  return (
    <section className="teaser-banner">
      <div className="teaser-inner">

        {/* Image */}
        {image && (
          <div className="teaser-image">
            <img
              src={urlFor(image).width(800).url()}
              alt={propertyTitle ? `${propertyTitle} apartment exterior or interior` : title || 'Property photo'}
            />
          </div>
        )}

        {/* Text */}
        <div className="teaser-text">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}

          <Link className="apply-btn" to={applyPath}>
            Apply Now
          </Link>



        </div>

      </div>
    </section>
  )
}

export default Teaser

/*import { urlFor } from '../imageUrl'
import 'bootstrap/dist/css/bootstrap.min.css'

function Teaser({ data }) {
  if (!data) return <p>Loading teaser…</p>

  const { title, description, image } = data

  return (
    <section className="teaser-banner">
      <div className="teaser-content">
        {title && <h1 id="teaser-title">{title}</h1>}
        {description && <p id="teaser-des">{description}</p>}

        {image && (
          <img
            src={urlFor(image).width(600).url()}
            alt={title || 'Teaser'}
            className="teaser-photo"
          />
        )}
      </div>
    </section>
  )
}

export default Teaser



/*import { useEffect, useState } from 'react'
import sanityClient from '../sanityClient'
import { urlFor } from '../imageUrl'
import 'bootstrap/dist/css/bootstrap.min.css'

function Teaser() {
  const [teaser, setTeaser] = useState(null)

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "teaser"][0]{
        title,
        description,
        image
      }`)
      .then(setTeaser)
      .catch(console.error)
  }, [])

  if (!teaser) return <p>Loading...</p>

  return (
    <section className="teaser-banner">
      <div className="teaser-content">
        <h1 id="teaser-title">{teaser.title}</h1>
        <p id="teaser-des">{teaser.description}</p>

        {teaser.image && (
          <img
            src={urlFor(teaser.image).width(600).url()}
            alt="Teaser"
            className="teaser-photo"
          />
        )}
      </div>
    </section>
  )
}

export default Teaser*/
