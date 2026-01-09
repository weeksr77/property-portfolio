function AmenitiesModal({ isOpen, onClose, amenities }) {
  if (!isOpen) return null

  return (
    <div className="amenities-overlay" onClick={onClose}>
      <div
        className="amenities-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2 className="modal-title">Amenities</h2>

        {amenities && amenities.length ? (
          <ul className="amenities-list">
            {amenities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No amenities listed.</p>
        )}
      </div>
    </div>
  )
}

export default AmenitiesModal


/*function AmenitiesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="amenities-overlay" onClick={onClose}>
      <div className="amenities-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <h2 className="modal-title">Amenities</h2>
        <p className="modal-placeholder">
          Amenities will be added here later.
        </p>
      </div>
    </div>
  );
}

export default AmenitiesModal;*/
