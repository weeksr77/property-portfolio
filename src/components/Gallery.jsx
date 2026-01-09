import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

function Gallery({ images }) {
  if (!images || images.length === 0) return null

  return (
    <section className="gallery-section">
      <div className="container text-center">
        <h2 className="mb-4">Photo Gallery</h2>

        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={true}
          autoPlay={false}
        />
      </div>
    </section>
  )
}

export default Gallery


/*import { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import sanityClient from '../sanityClient'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanityClient)
const urlFor = (source) => builder.image(source)

function Gallery() {
  const [images, setImages] = useState([])

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "gallery"][0]{ title, images }`)
      .then((data) => {
        if (!data?.images) return

        const formattedImages = data.images.map((img) => ({
          original: urlFor(img).width(1200).url(),
          thumbnail: urlFor(img).width(300).url(),
        }))

        setImages(formattedImages)
      })
      .catch(console.error)
  }, [])

  if (!images.length) return null

  return (
    <section className="gallery-section">
      <div className="container text-center">
        <h2 className="mb-4">Photo Gallery</h2>

        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={true}
          autoPlay={false}
        />
      </div>
    </section>
  )
}

export default Gallery





/* import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

function Gallery() {
  const images = [
    {
      original: '/test.jpg',
      thumbnail: '/test.jpg',
    },
    {
      original: '/test.jpg',
      thumbnail: '/test.jpg',
    },
    {
      original: '/test.jpg',
      thumbnail: '/test.jpg',
    },
  ];

  return (
    <section className="gallery-section">
      <div className="container text-center">
        <h2 className="mb-4">Photo Gallery</h2>
        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={true}
          autoPlay={false}
        />
      </div>
    </section>
  );
}

export default Gallery;*/
