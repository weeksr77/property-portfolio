import { Link } from 'react-router-dom'
import { urlFor } from '../imageUrl'

const fallbackGroups = [
  {
    title: 'Major Employers',
    description: 'Helpful nearby anchors for residents who want a short commute.',
    items: [
      {
        name: 'Winchester Medical Center',
        summary: "A major regional hospital and one of the area's larger employment centers.",
        travelTime: '10-15 min',
        distance: 'Nearby',
        websiteUrl: 'https://www.valleyhealthlink.com/winchester-medical-center/',
        directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Winchester+Medical+Center',
        note: 'Healthcare employment',
        featured: true,
      },
      {
        name: 'Shenandoah University',
        summary: 'Local university with education, events, athletics, and career opportunities.',
        travelTime: '10 min',
        distance: 'Nearby',
        websiteUrl: 'https://www.su.edu/',
        directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Shenandoah+University',
        note: 'Higher education',
      },
    ],
  },
  {
    title: 'Shopping & Essentials',
    description: 'Everyday destinations and regional shopping close to home.',
    items: [
      {
        name: 'Apple Blossom Mall',
        summary: 'Regional shopping center with national retailers, dining, and services.',
        travelTime: '8-12 min',
        distance: 'Nearby',
        websiteUrl: 'https://www.theappleblossommall.com/',
        directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Apple+Blossom+Mall',
        note: 'Shopping',
        featured: true,
      },
    ],
  },
  {
    title: 'Highways & Travel',
    description: 'Useful routes for commuters and weekend trips around the Shenandoah Valley.',
    items: [
      {
        name: 'I-81 Access',
        summary: 'A key north-south route for regional commuting and travel.',
        travelTime: 'Varies',
        distance: 'Nearby',
        directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Interstate+81+Winchester+VA',
        note: 'Commuter route',
      },
    ],
  },
]

function hasLifestyleContent({ title, intro, heroImage, groups }) {
  return Boolean(
    title ||
      intro ||
      heroImage ||
      groups?.some((group) => group?.title || group?.description || group?.items?.length)
  )
}

function LifestyleNearby({
  title,
  intro,
  heroImage,
  groups = [],
  propertyTitle,
  propertySlug,
  previewFallback = false,
}) {
  const hasContent = hasLifestyleContent({ title, intro, heroImage, groups })

  if (!hasContent && !previewFallback) return null

  const displayTitle = title || `Lifestyle Near ${propertyTitle || 'This Property'}`
  const displayIntro =
    intro ||
    'Explore nearby employers, schools, shopping, healthcare, attractions, and commuter routes. Add real property-specific entries in Sanity to replace this preview content.'
  const displayGroups = groups?.length ? groups : fallbackGroups
  const featuredItems = displayGroups.flatMap((group) =>
    (group.items || [])
      .filter((item) => item?.featured)
      .map((item) => ({ ...item, groupTitle: group.title }))
  )
  const imageUrl = heroImage
    ? urlFor(heroImage).width(1600).height(760).fit('crop').url()
    : previewFallback
      ? '/test.jpg'
      : null
  const applicantsPath = propertySlug ? `/property/${propertySlug}/applicants` : '/applicants'

  return (
    <section className="lifestyle-nearby" aria-labelledby="lifestyle-nearby-title">
      <div className="lifestyle-nearby-inner">
        <div className="lifestyle-nearby-copy">
          <p className="lifestyle-eyebrow">Lifestyle</p>
          <h2 id="lifestyle-nearby-title">{displayTitle}</h2>
          <p>{displayIntro}</p>
          {propertySlug && (
            <div className="lifestyle-actions">
              <Link className="apply-btn" to={applicantsPath}>
                Check Active Vacancies
              </Link>
            </div>
          )}
        </div>

        {imageUrl && (
          <div className="lifestyle-image-wrap">
            <img
              className="lifestyle-image"
              src={imageUrl}
              alt={`${propertyTitle || displayTitle} nearby lifestyle`}
            />
          </div>
        )}

        {featuredItems.length > 0 && (
          <div className="lifestyle-featured" aria-label="Featured nearby locations">
            {featuredItems.slice(0, 3).map((item, index) => (
              <article className="lifestyle-featured-card" key={`${item.name}-${index}`}>
                <span>{item.groupTitle}</span>
                <h3>{item.name}</h3>
                {item.summary && <p>{item.summary}</p>}
                {(item.travelTime || item.distance) && (
                  <div className="lifestyle-meta">
                    {item.travelTime && <strong>{item.travelTime}</strong>}
                    {item.distance && <span>{item.distance}</span>}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        <div className="nearby-groups">
          {displayGroups.map((group, groupIndex) => {
            const items = group.items || []
            if (!group.title && !group.description && !items.length) return null

            return (
              <section className="nearby-group" key={`${group.title || 'group'}-${groupIndex}`}>
                <div className="nearby-group-heading">
                  {group.title && <h3>{group.title}</h3>}
                  {group.description && <p>{group.description}</p>}
                </div>

                {items.length > 0 && (
                  <div className="nearby-list">
                    {items.map((item, itemIndex) => (
                      <article className="nearby-item" key={`${item.name || 'item'}-${itemIndex}`}>
                        <div className="nearby-item-main">
                          {item.note && <span className="nearby-note">{item.note}</span>}
                          {item.name && <h4>{item.name}</h4>}
                          {item.summary && <p>{item.summary}</p>}
                        </div>

                        <div className="nearby-item-side">
                          {(item.travelTime || item.distance) && (
                            <div className="nearby-travel">
                              {item.travelTime && <strong>{item.travelTime}</strong>}
                              {item.distance && <span>{item.distance}</span>}
                            </div>
                          )}

                          <div className="nearby-links">
                            {item.websiteUrl && (
                              <a href={item.websiteUrl} target="_blank" rel="noreferrer">
                                Website
                              </a>
                            )}
                            {item.directionsUrl && (
                              <a href={item.directionsUrl} target="_blank" rel="noreferrer">
                                Directions
                              </a>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default LifestyleNearby
