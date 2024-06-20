import { FaCartPlus as CartIcon } from 'react-icons/fa';

export default function ({ image, title, content, tags, published }) {
  return (
    <div className={`post ${published ? 'published' : ''}`}>
      <div className="card-image">
        <img src={image} alt="Post Random" />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        {tags.length > 0 ? (
          <div className="ingredienti">
            <strong>Tags:</strong>
            <ul>
              {tags.map((tag, index) => (
                <li key={`tag${index}`}>{tag}</li>
              ))}
            </ul>
          </div>
        ) : (
          <strong>Tag non specificato</strong>
        )}
        <p className={`${!content ? 'italic' : ''}`}>
          {content || 'Descrizione non disponibile'}
        </p>
        {published && (
          <button>
            Add to Cart <CartIcon />
          </button>
        )}
      </div>
    </div>
  );
}
