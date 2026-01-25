import { urlFor } from '../imageUrl'
import 'bootstrap/dist/css/bootstrap.min.css'

function Teaser({ data }) {
  if (!data) return <p>Loading teaser…</p>

  const { title, description, image } = data

  return (
    <section className="teaser-banner">
      <div className="teaser-inner">

        {/* Image */}
        {image && (
          <div className="teaser-image">
            <img
              src={urlFor(image).width(800).url()}
              alt={title || 'Teaser'}
            />
          </div>
        )}

        {/* Text */}
        <div className="teaser-text">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}

          <a
              className="apply-btn"
              href="https://castlerockmanagementllc.appfolio.com/connect/users/sign_in?portfolio_uuid=cb0facc2-f943-11f0-86d6-023e3c77b63c"            // or hardcode the URL for now
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now
            </a>



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
