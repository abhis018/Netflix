// useMovieLogo.js
import { useEffect, useState } from 'react';

const useMovieLogo = (movieId) => {
  const [logoPath, setLogoPath] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=830d1d60d9d47143773bf24d34557a0b`
        );
        const data = await res.json();
        const logo = data.logos.find((img) => img.iso_639_1 === 'en') || data.logos[0];
        if (logo) setLogoPath(logo.file_path);
      } catch (error) {
        console.error('Failed to fetch logo:', error);
      }
    };

    if (movieId) fetchLogo();
  }, [movieId]);

  return logoPath;
};

export default useMovieLogo;
