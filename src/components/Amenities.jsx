import { urlFor } from '../imageUrl'

function Amenities({ title = 'Amenities', lists = [], data = [] }) {
  const hasImages = Array.isArray(data) && data.length > 0
  const hasLists = Array.isArray(lists) && lists.length > 0

  if (!hasImages && !hasLists) return null

  return (
    <section className="amenities">
      <div className="amenities-content">
        <h2 className="amenities-title">{title}</h2>

        {/* Images FIRST */}
        {hasImages && (
          <div className="amenities-grid">
            {data.map((img, i) => (
              <div key={i} className="amenity-item">
                <img
                  src={urlFor(img).width(300).height(200).url()}
                  alt={`Amenity ${i + 1}`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Bullet categories UNDER images */}
        {hasLists && (
          <div className="amenities-lists">
            {lists.map((group, idx) => (
              <div key={idx} className="amenities-list">
                {group?.category && (
                  <h3 className="amenities-category">{group.category}</h3>
                )}

                {Array.isArray(group?.points) && group.points.length > 0 && (
                  <ul className="amenities-bullets">
                    {group.points.map((point, i) => (
                      <li key={i} className="amenities-bullet">
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Amenities

/*import { urlFor } from '../imageUrl'

function Amenities({ data }) {
  if (!data || !data.length) return null

  return (
    <section className="amenities">
      <div className="amenities-content">
        <h2 className="amenities-title">Amenities</h2>

        <div className="amenities-grid">
          {data.map((img, i) => (
            <div key={i} className="amenity-item">
              <img
                src={urlFor(img).width(300).height(200).url()}
                alt={`Amenity ${i + 1}`}
              />
            </div>
          ))}
        </div>

       
        <div className="amenities-btn-wrapper">
          <button className="apply-btn">
            View Amenities
          </button>
        </div>
      </div>
    </section>
  )
}

export default Amenities

/*import { useEffect, useState } from 'react'
import sanityClient from '../sanityClient'
import imageUrlBuilder from '@sanity/image-url'
import 'bootstrap/dist/css/bootstrap.min.css'

const builder = imageUrlBuilder(sanityClient)
const urlFor = (source) => builder.image(source)

function Amenities() {
  const [amenities, setAmenities] = useState(null)

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "amenities"][0]{
        title,
        description,
        images
      }`)
      .then(setAmenities)
      .catch(console.error)
  }, [])

  if (!amenities) return null

  return (
    <section className="amenities">
      <div className="amenities-content">
        <h2 className="amenities-title">{amenities.title}</h2>
        <p className="amenities-text">{amenities.description}</p>

        <div className="amenities-grid">
          {amenities.images?.map((img, i) => (
            <div key={i} className="amenity-item">
              <img
                src={urlFor(img).width(300).height(200).url()}
                alt={`Amenity ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Amenities




/*import 'bootstrap/dist/css/bootstrap.min.css';

function Amenities() {
  return (
    <section className="amenities">
      <div className="amenities-content">
        <h2 className="amenities-title">Amenities</h2>
        <p className="amenities-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacus 
          vel ligula tincidunt varius at a justo. Integer vehicula, ligula non pretium 
          dapibus, metus lacus pulvinar leo, non commodo ex nunc ac nunc.
        </p>

        <div className="amenities-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="amenity-item">
              <img src="https://placehold.co/300x200" alt={`Amenity ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Amenities;*/
