function MapSection() {
  return (
    <section className="map-section text-center">
      <h2 className="mb-3">Find Us</h2>
      <div className="map-container">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.001620211859!2d-77.1723386241836!3d39.04297757167909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c828fdc2f4c5%3A0x1c7982f4f1e61ed!2sBlue%20Ridge%20Apartments!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <a
        href="https://goo.gl/maps/yourlocationlink"
        target="_blank"
        rel="noopener noreferrer"
        className="apply-btn-map"
      >
        Open in Google Maps
      </a>
    </section>
  );
}

export default MapSection;
