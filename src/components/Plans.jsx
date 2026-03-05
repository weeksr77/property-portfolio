// ✅ React: Plans.jsx (replace with this)
// This now renders REAL floorplan cards + Virtual Tour buttons + subtitle line.
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom"

function Plans({ data = [], propertySlug, subtitle }) {
  // data = property.floorplans[] (real floorplans)
  if (!Array.isArray(data) || data.length === 0) return null

  return (
    <section className="floorplans">
      <h2 className="floorplans-title">Our Floor Plans</h2>

      {subtitle && <p className="floorplans-subtitle">{subtitle}</p>}

      <div className="floorplans-row">
        {data.map((plan, idx) => (
          <div key={idx} className="floorplan-card">
            {plan.imageUrl && (
              <img
                src={plan.imageUrl}
                alt={plan.name || "Floor Plan"}
                className="floorplan-img"
              />
            )}

            {plan.name && <h3>{plan.name}</h3>}
            {plan.price && <p>{plan.price}</p>}

            {/* ✅ Virtual Tour button per card */}
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
        ))}
      </div>

      {propertySlug && (
        <Link to={`/property/${propertySlug}/floor`} className="apply-btn-plans">
          View Floorplans
        </Link>
      )}
    </section>
  )
}

export default Plans

/*import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { urlFor } from '../imageUrl';

function Floor({ data, propertySlug }) {
  if (!data || data.length === 0) return <p>No floor data available.</p>;

  return (
    <section className="floorplans">
      <h2 className="floorplans-title">Our Floor Options</h2>
      <div className="floorplans-row">
        {data.map((item, idx) => (
          <div key={idx} className="floorplan-card">
            {item.image && (
              <img
                src={urlFor(item.image).width(300).url()}
                alt={item.title || 'Floor Image'}
                className="floorplan-img"
              />
            )}
            {item.title && <h3>{item.title}</h3>}
            {item.description && <p>{item.description}</p>}
          </div>
        ))}
      </div>
      
      <Link to={`/property/${propertySlug}/floor`} className="apply-btn-plans">
        View Floorplans
      </Link>
    </section>
  );
}

export default Floor;*/



/*import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


function FloorPlans() {
  return (
    <section className="floorplans">
      <h2 className="floorplans-title">Our Floorplans</h2>
      <div className="floorplans-row">
        <div className="floorplan-card">
          <img 
            src="https://placehold.co/300x200" 
            alt="1 Bed 1 Bath Floorplan"
            className="floorplan-img"
          />
          <h3>1 Bed, 1 Bath</h3>
          <p>Perfect for individuals or couples. Enjoy cozy living with modern amenities.</p>
        </div>

        <div className="floorplan-card">
          <img 
            src="https://placehold.co/300x200" 
            alt="2 Bed 2 Bath Floorplan"
            className="floorplan-img"
          />
          <h3>2 Bed, 2 Bath</h3>
          <p>Spacious layout ideal for families or roommates, featuring ample storage.</p>
        </div>
      </div>
      <Link to="/floor" className="apply-btn-plans">
        View Floorplans
      </Link>

    </section>
  );
}

export default FloorPlans;*/
