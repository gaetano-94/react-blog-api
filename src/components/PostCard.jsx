import { FaCartPlus as CartIcon } from 'react-icons/fa';

export default function PostCard({
  image,
  title,
  content,
  tags,
  category,
  published,
}) {
  return (
    <div className={`post ${published ? 'published' : ''}`}>
      <div className="card-image">
        <img src={image} alt="Post Random" />
      </div>
      <div className="card-content">
        <h2>{title}</h2>
        {tags.length > 0 ? (
          <div>
            <strong>Tags: </strong>
            <ul>
              {tags.map((tag, index) => (
                <li key={`tg${index}`}>{tag.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <strong>Tag non specificato</strong>
        )}
        <div>
          <strong>Categoria: </strong>
          <ul>
            <li>{category.name}</li>
          </ul>
        </div>
        <p className={`${!content ? 'italic' : ''}`}>
          {content || 'Descrizione non disponibile'}
        </p>
        {published && (
          <button>
            Add to Post <CartIcon />
          </button>
        )}
      </div>
    </div>
  );
}
