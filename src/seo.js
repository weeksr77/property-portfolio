export const siteUrl = "https://www.crmapartments.com"
export const defaultTitle = "Castle Rock Management | Apartments & Townhomes in Virginia"
export const defaultDescription =
  "Explore Castle Rock Management apartments and townhomes in Virginia, including property details, floor plans, amenities, galleries, vacancies, and contact information."
export const defaultImage = `${siteUrl}/logo.png`

export function toMetaDescription(value) {
  const description = String(value || defaultDescription).replace(/\s+/g, " ").trim()

  if (description.length <= 180) return description

  return `${description.slice(0, 177).trim()}...`
}

function upsertMeta(attribute, key, content) {
  if (!content) return

  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)

  if (!tag) {
    tag = document.createElement("meta")
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }

  tag.setAttribute("content", content)
}

function upsertCanonical(href) {
  let tag = document.head.querySelector('link[rel="canonical"]')

  if (!tag) {
    tag = document.createElement("link")
    tag.setAttribute("rel", "canonical")
    document.head.appendChild(tag)
  }

  tag.setAttribute("href", href)
}

export function applyPageMetadata({
  title = defaultTitle,
  description = defaultDescription,
  image = defaultImage,
  url = `${siteUrl}/`,
  type = "website",
}) {
  const metaDescription = toMetaDescription(description)

  document.title = title
  upsertCanonical(url)

  upsertMeta("name", "description", metaDescription)
  upsertMeta("property", "og:type", type)
  upsertMeta("property", "og:title", title)
  upsertMeta("property", "og:description", metaDescription)
  upsertMeta("property", "og:url", url)
  upsertMeta("property", "og:image", image)
  upsertMeta("name", "twitter:title", title)
  upsertMeta("name", "twitter:description", metaDescription)
  upsertMeta("name", "twitter:image", image)
}

export function resetPageMetadata() {
  applyPageMetadata({
    title: defaultTitle,
    description: defaultDescription,
    image: defaultImage,
    url: `${siteUrl}/`,
  })
}

export function upsertJsonLd(id, data) {
  let tag = document.head.querySelector(`script[type="application/ld+json"][data-seo-id="${id}"]`)

  if (!tag) {
    tag = document.createElement("script")
    tag.type = "application/ld+json"
    tag.setAttribute("data-seo-id", id)
    document.head.appendChild(tag)
  }

  tag.textContent = JSON.stringify(data)
}

export function removeJsonLd(id) {
  const tag = document.head.querySelector(`script[type="application/ld+json"][data-seo-id="${id}"]`)
  if (tag) tag.remove()
}
