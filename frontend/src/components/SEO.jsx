import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Soul Felt Music - Experience the Soul of Music',
  description = 'Discover and stream soulful music from talented artists. Explore albums, tracks, and exclusive content at Soul Felt Music.',
  keywords = 'soul music, music streaming, albums, tracks, artists, music store',
  image = 'https://soulfeltmusic.com/og-image.jpg',
  url = 'https://soulfeltmusic.com',
  type = 'website',
  artist,
  album,
  track,
  schemaData
}) => {
  const siteTitle = 'Soul Felt Music';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  // Construct schema.org structured data
  const getSchemaData = () => {
    if (schemaData) return schemaData;

    // Default organization schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Soul Felt Music',
      url: 'https://soulfeltmusic.com',
      logo: 'https://soulfeltmusic.com/logo.png',
      sameAs: [
        // Add social media links here
      ]
    };

    // Artist schema
    if (artist) {
      return {
        '@context': 'https://schema.org',
        '@type': 'MusicGroup',
        name: artist.name,
        image: artist.image_url,
        description: artist.bio,
        genre: artist.genre,
        url: `https://soulfeltmusic.com/artist/${artist.id}`
      };
    }

    // Album schema
    if (album) {
      return {
        '@context': 'https://schema.org',
        '@type': 'MusicAlbum',
        name: album.title,
        image: album.cover_image_url,
        description: album.description,
        byArtist: {
          '@type': 'MusicGroup',
          name: album.artist_name
        },
        datePublished: album.release_date,
        url: `https://soulfeltmusic.com/album/${album.id}`
      };
    }

    // Track schema
    if (track) {
      return {
        '@context': 'https://schema.org',
        '@type': 'MusicRecording',
        name: track.title,
        byArtist: {
          '@type': 'MusicGroup',
          name: track.artist_name
        },
        duration: track.duration,
        inAlbum: track.album_title ? {
          '@type': 'MusicAlbum',
          name: track.album_title
        } : undefined,
        url: `https://soulfeltmusic.com/track/${track.id}`
      };
    }

    return organizationSchema;
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(getSchemaData())}
      </script>
    </Helmet>
  );
};

export default SEO;
