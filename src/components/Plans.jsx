import 'bootstrap/dist/css/bootstrap.min.css';
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

export default Floor;



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
