// src/sanityClient.js
import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'ga7aj92a', // replace with your Sanity project ID
  dataset: 'production',       // or whatever dataset you used
  useCdn: true,                // `true` for fast, cached data; `false` for fresh data
});
