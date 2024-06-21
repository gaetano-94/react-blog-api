import { useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

export default function CreatePost({ categories, onPostCreated }) {
  const initialData = {
    image: '',
    title: '',
    content: '',
    category: '',
    tags: '',
  };

  const [formData, setFormData] = useState(initialData);

  const handleField = (name, value) => {
    setFormData((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map((tag) => tag.trim()),
      };
      const res = await axios.post(`${apiUrl}/api/posts`, postData);
      if (res.status < 400) {
        onPostCreated(res.data);
        setFormData(initialData); // reset the form
      }
    } catch (error) {
      console.error('Errore nella creazione del post:', error);
    }
  };

  return (
    <div className="create-post">
      <h2>Crea un Nuovo Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Immagine
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={(e) => handleField('image', e.target.value)}
            placeholder="URL Immagine"
          />
        </label>
        <label>
          Titolo
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => handleField('title', e.target.value)}
            placeholder="Titolo"
          />
        </label>
        <label>
          Contenuto
          <textarea
            name="content"
            value={formData.content}
            onChange={(e) => handleField('content', e.target.value)}
            placeholder="Contenuto"
          />
        </label>
        <label>
          Categoria
          <select
            name="category"
            value={formData.category}
            onChange={(e) => handleField('category', e.target.value)}
          >
            <option value="" disabled>
              Seleziona una categoria
            </option>
            {categories.map((c) => (
              <option key={`category${c.id}`} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tags
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={(e) => handleField('tags', e.target.value)}
            placeholder="Tags (separati da virgola)"
          />
        </label>
        <button type="submit">Crea Post</button>
      </form>
    </div>
  );
}
