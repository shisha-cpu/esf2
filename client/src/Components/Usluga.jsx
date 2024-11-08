export function Usluga({ title, description, img }) {
    return (
      <div className="usluga">
        <img src={img} className="usluga-img" />
        <h4><b>{title}</b></h4>
        <p>{description}</p>
      </div>
    );
  }