import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://mon-restaurant-lac.vercel.app/',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://mon-restaurant-lac.vercel.app/menu',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://mon-restaurant-lac.vercel.app/reservation',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://mon-restaurant-lac.vercel.app/contact',
      lastModified: new Date(),
      priority: 0.7,
    },
    // AJOUTE LA PAGE COMMANDE !
    {
      url: 'https://mon-restaurant-lac.vercel.app/commande',
      lastModified: new Date(),
      priority: 0.7,
    },
  ]
}