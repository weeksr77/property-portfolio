import 'bootstrap/dist/css/bootstrap.min.css'

function Map({ embedUrl, mapsUrl, address }) {
  // If embedUrl is missing, don't crash the page
  if (!embedUrl) return null

  return (
    <section className="map-section text-center">
      <h2 className="mb-3">Find Us</h2>

      <div className="map-container">
        <iframe
          title="map"
          src={embedUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {mapsUrl && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="apply-btn-map"
        >
          Open in Google Maps
        </a>
      )}

      {address && <p className="map-address">{address}</p>}
    </section>
  )
}

export default Map