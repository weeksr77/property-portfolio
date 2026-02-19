import { useMemo, useState } from "react"
import AmenitiesModal from "./AmenitiesModal"
import "bootstrap/dist/css/bootstrap.min.css"

import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import { urlFor } from "../imageUrl"

function AllPlans({ data = [], gallery = [] }) {
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // ✅ Unit photos lightbox modal state
  const [unitModalOpen, setUnitModalOpen] = useState(false)
  const [unitModalItems, setUnitModalItems] = useState([])
  const [unitModalStartIndex, setUnitModalStartIndex] = useState(0)

  const openUnitModal = (items, startIndex) => {
    setUnitModalItems(items)
    setUnitModalStartIndex(startIndex)
    setUnitModalOpen(true)
  }

  if (!data?.length) return <p style={{ padding: 40 }}>Loading floorplans…</p>

  const hasGallery = Array.isArray(gallery) && gallery.length > 0

  return (
    <section className="allplans">
      <h2 className="allplans-title">Our Floor Plans</h2>

     

      <div className="allplans-grid">
        {data.map((plan, index) => {
          // Build the gallery items for THIS card:
          // 1) floorplan "cover" imageUrl first (if exists)
          // 2) then unitPhotos from Sanity (if exists)
          const cardItems = []

          if (plan.imageUrl) {
            cardItems.push({
              original: plan.imageUrl,
              thumbnail: plan.imageUrl,
            })
          }

          if (Array.isArray(plan.unitPhotos) && plan.unitPhotos.length > 0) {
            plan.unitPhotos.forEach((img) => {
              const src = urlFor(img).width(1400).url()
              const thumb = urlFor(img).width(400).url()
              cardItems.push({ original: src, thumbnail: thumb })
            })
          }

          const hasCardPhotos = cardItems.length > 0

          return (
            <div key={index} className="plan-card">
              {/* existing main image */}
              {plan.imageUrl && (
                <img
                  src={plan.imageUrl}
                  alt={plan.name || "Floorplan"}
                  className="plan-img"
                />
              )}

              {/* ✅ NEW: scrollable photo strip inside the card */}
              {hasCardPhotos && (
                <div className="plan-photo-strip" aria-label="Unit photos">
                  {cardItems.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      className="plan-photo-thumb"
                      onClick={() => openUnitModal(cardItems, i)}
                      aria-label={`Open photo ${i + 1}`}
                    >
                      <img
                        src={item.thumbnail}
                        alt={`${plan.name || "Unit"} photo ${i + 1}`}
                      />
                    </button>
                  ))}
                </div>
              )}

              <h3 className="plan-name">{plan.name}</h3>
              {plan.price && <p className="plan-price">{plan.price}</p>}

              <button
                className="amenities-btn"
                onClick={() => {
                  setSelectedAmenities(plan.amenities || [])
                  setIsModalOpen(true)
                }}
              >
                View Amenities
              </button>

              {plan.virtualTourUrl && (
                <a
                  href={plan.virtualTourUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="amenities-btn"
                >
                  View Virtual Tour
                </a>
              )}
            </div>
          )
        })}
      </div>

      {/* Amenities Modal */}
      <AmenitiesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amenities={selectedAmenities}
      />

      {/* ✅ Unit Photos Lightbox Modal */}
      {unitModalOpen && (
        <div className="unitgallery-overlay" onClick={() => setUnitModalOpen(false)}>
          <div className="unitgallery-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="unitgallery-close"
              onClick={() => setUnitModalOpen(false)}
              aria-label="Close"
              type="button"
            >
              ×
            </button>

            <ImageGallery
              items={unitModalItems}
              startIndex={unitModalStartIndex}
              showPlayButton={false}
              showFullscreenButton={true}
              showThumbnails={true}
              autoPlay={false}
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default AllPlans

/*import { useState } from "react";
import AmenitiesModal from "./AmenitiesModal";
import "bootstrap/dist/css/bootstrap.min.css";

function AllPlans({ data }) {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data?.length) return <p>No floorplans available.</p>;

  const openModal = (amenities) => {
    setSelectedAmenities(amenities || []);
    setIsModalOpen(true);
  };

  return (
    <section className="allplans">
      <h2 className="allplans-title">Our Floor Plans</h2>

      <div className="allplans-grid">
        {data.map((plan, index) => (
          <div key={index} className="plan-card">
            <img src={plan.imageUrl} alt={plan.name} className="plan-img" />

            <h3 className="plan-name">{plan.name}</h3>
            <p className="plan-price">{plan.price}</p>

            <button
              className="amenities-btn"
              onClick={() => openModal(plan.amenities)}
            >
              View Amenities
            </button>

            {plan.virtualTourUrl && (
              <a
                href={plan.virtualTourUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="amenities-btn">
                  View Virtual Tour
                </button>
              </a>
            )}
          </div>
        ))}
      </div>

      <AmenitiesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amenities={selectedAmenities}
      />
    </section>
  );
}

export default AllPlans;


/*import { useEffect, useState } from "react";
import AmenitiesModal from "./AmenitiesModal";
import sanityClient from "../sanityClient";
import "bootstrap/dist/css/bootstrap.min.css";

function AllPlans() {
  const [floorplans, setFloorplans] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "floorplan"]{name, price, "imageUrl": image.asset->url, virtualTourUrl, amenities}`)
      .then((data) => setFloorplans(data))
      .catch(console.error);
  }, []);

  const openModal = (amenities) => {
    setSelectedAmenities(amenities);
    setIsModalOpen(true);
  };

  if (!floorplans.length) return <p>Loading...</p>;

  return (
    <section className="allplans">
      <h2 className="allplans-title">Our Floor Plans</h2>

      <div className="allplans-grid">
        {floorplans.map((plan, index) => (
          <div key={index} className="plan-card">
            <img src={plan.imageUrl} alt={plan.name} className="plan-img" />
            <h3 className="plan-name">{plan.name}</h3>
            <p className="plan-price">{plan.price}</p>

            <button className="amenities-btn" onClick={() => openModal(plan.amenities)}>
              View Amenities
            </button>
            {plan.virtualTourUrl && (
              <a href={plan.virtualTourUrl} target="_blank" rel="noopener noreferrer">
                <button className="amenities-btn">View Virtual Tour</button>
              </a>
            )}
          </div>
        ))}
      </div>

      <AmenitiesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} amenities={selectedAmenities} />
    </section>
  );
}

export default AllPlans;




/* import { useState } from "react";
import AmenitiesModal from "./AmenitiesModal";
import "bootstrap/dist/css/bootstrap.min.css";

function AllPlans() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="allplans">
      <h2 className="allplans-title">Our Floor Plans</h2>

      <div className="allplans-grid">

        {/* Card 1 */
        /*<div className="plan-card">
          <img
            src="https://placehold.co/800x600"
            alt="1 Bed 1 Bath layout"
            className="plan-img"
          />
          <h3 className="plan-name">1 Bed • 1 Bath</h3>
          <p className="plan-price">$1,500 per month</p>

          <button
            className="amenities-btn"
            onClick={() => setIsModalOpen(true)}
          >
            View Amenities
          </button>
           <button
            className="amenities-btn"
            
          >
            View Virtual Tour
          </button>
        </div>

        {/* Card 2 */
        /*<div className="plan-card">
          <img
            src="https://placehold.co/800x600"
            alt="2 Bed 2 Bath layout"
            className="plan-img"
          />
          <h3 className="plan-name">2 Bed • 2 Bath</h3>
          <p className="plan-price">$2,100 per month</p>

          <button
            className="amenities-btn"
            onClick={() => setIsModalOpen(true)}
          >
            View Amenities
          </button>
          <button
            className="amenities-btn"
            
          >
            View Virtual Tour
          </button>
        </div>

      </div>

      {/* Modal */
      /*<AmenitiesModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}

export default AllPlans;*/
