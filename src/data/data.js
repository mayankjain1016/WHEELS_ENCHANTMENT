import img1 from '../assets/products_imgs/IMG_2353.PNG';
import img2 from '../assets/products_imgs/IMG_2354.PNG';
import img3 from '../assets/products_imgs/IMG_2355.PNG';
import img4 from '../assets/products_imgs/IMG_2356.PNG';
import img5 from '../assets/products_imgs/IMG_2357.PNG';
import img6 from '../assets/products_imgs/IMG_2358.PNG';
import img7 from '../assets/products_imgs/IMG_2359.PNG';
import img8 from '../assets/products_imgs/IMG_2360.PNG';
import img9 from '../assets/products_imgs/IMG_2361.PNG';
import img10 from '../assets/products_imgs/IMG_2362.PNG';
import img11 from '../assets/products_imgs/IMG_2363.PNG';
import img12 from '../assets/products_imgs/IMG_2364.PNG';
import img13 from '../assets/products_imgs/IMG_2365.PNG';
import img14 from '../assets/products_imgs/IMG_2366.PNG';
import img15 from '../assets/products_imgs/IMG_2367.PNG';
import img16 from '../assets/products_imgs/IMG_2368.PNG';
import img17 from '../assets/products_imgs/IMG_2369.PNG';
import img18 from '../assets/products_imgs/IMG_2370.PNG';
import img19 from '../assets/products_imgs/IMG_2371.PNG';
import img20 from '../assets/products_imgs/IMG_2372.PNG';
import img21 from '../assets/products_imgs/IMG_2373.PNG';
import img22 from '../assets/products_imgs/IMG_2374.PNG';
import img23 from '../assets/products_imgs/IMG_2375.PNG';
import img24 from '../assets/products_imgs/IMG_2376.PNG';
import img25 from '../assets/products_imgs/IMG_2377.PNG';
import img26 from '../assets/products_imgs/IMG_2378.PNG';
import img27 from '../assets/products_imgs/IMG_2379.PNG';
import img28 from '../assets/products_imgs/IMG_2380.PNG';
import img29 from '../assets/products_imgs/IMG_2381.PNG';
import img30 from '../assets/products_imgs/IMG_2382.PNG';
import img31 from '../assets/products_imgs/IMG_2383.PNG';
import img32 from '../assets/products_imgs/IMG_2384.PNG';
import img33 from '../assets/products_imgs/IMG_2385.PNG';
import img34 from '../assets/products_imgs/IMG_2386.PNG';
import img35 from '../assets/products_imgs/IMG_2387.PNG';
import img36 from '../assets/products_imgs/IMG_2388.PNG';
import img37 from '../assets/products_imgs/IMG_2389.PNG';
import img38 from '../assets/products_imgs/IMG_2390.PNG';
import img39 from '../assets/products_imgs/IMG_2391.PNG';
import img40 from '../assets/products_imgs/IMG_2392.PNG';
import img41 from '../assets/products_imgs/IMG_2393.PNG';
import img42 from '../assets/products_imgs/IMG_2394.PNG';
import img43 from '../assets/products_imgs/IMG_2395.PNG';
import img44 from '../assets/products_imgs/IMG_2396.PNG';
import img45 from '../assets/products_imgs/IMG_2397.PNG';
import img46 from '../assets/products_imgs/IMG_2398.PNG';
import img47 from '../assets/products_imgs/IMG_2399.PNG';
import img48 from '../assets/products_imgs/IMG_2400.PNG';

const productImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24, img25, img26, img27, img28, img29, img30, img31, img32, img33, img34, img35, img36, img37, img38, img39, img40, img41, img42, img43, img44, img45, img46, img47, img48];

export const products = productImages.map((image, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  description: `Premium skating product - Item ${2353 + index}`,
  category: 'Skates',
  image: image,
}));

import gimg1 from '../assets/products_imgs/IMG_2401.PNG';
import gimg2 from '../assets/products_imgs/IMG_2402.PNG';
import gimg3 from '../assets/products_imgs/IMG_2403.PNG';
import gimg4 from '../assets/products_imgs/IMG_2404.PNG';
import gimg5 from '../assets/products_imgs/IMG_2405.PNG';
import gimg6 from '../assets/products_imgs/IMG_2406.PNG';
import gimg7 from '../assets/products_imgs/IMG_2407.PNG';
import gimg8 from '../assets/products_imgs/IMG_2408.PNG';
import gimg9 from '../assets/products_imgs/IMG_2409.PNG';
import gimg10 from '../assets/products_imgs/IMG_2410.PNG';
import gimg11 from '../assets/products_imgs/IMG_2411.PNG';
import gimg12 from '../assets/products_imgs/IMG_2412.PNG';
import gimg13 from '../assets/products_imgs/IMG_2413.PNG';
import gimg14 from '../assets/products_imgs/IMG_2414.PNG';
import gimg15 from '../assets/products_imgs/IMG_2416.PNG';
import gimg16 from '../assets/products_imgs/IMG_2417.PNG';
import gimg17 from '../assets/products_imgs/IMG_2418.PNG';
import gimg18 from '../assets/products_imgs/IMG_2419.PNG';

export const galleryImages = [
  { id: 1, url: gimg1, category: 'Products' },
  { id: 2, url: gimg2, category: 'Action' },
  { id: 3, url: gimg3, category: 'Lifestyle' },
  { id: 4, url: gimg4, category: 'Products' },
  { id: 5, url: gimg5, category: 'Action' },
  { id: 6, url: gimg6, category: 'Lifestyle' },
  { id: 7, url: gimg7, category: 'Products' },
  { id: 8, url: gimg8, category: 'Action' },
  { id: 9, url: gimg9, category: 'Lifestyle' },
  { id: 10, url: gimg10, category: 'Products' },
  { id: 11, url: gimg11, category: 'Action' },
  { id: 12, url: gimg12, category: 'Lifestyle' },
  { id: 13, url: gimg13, category: 'Products' },
  { id: 14, url: gimg14, category: 'Action' },
  { id: 15, url: gimg15, category: 'Lifestyle' },
  { id: 16, url: gimg16, category: 'Products' },
  { id: 17, url: gimg17, category: 'Action' },
  { id: 18, url: gimg18, category: 'Lifestyle' },
];

export const features = [
  {
    id: 1,
    title: 'Premium Quality',
    description: 'Crafted with the finest materials for maximum performance',
    icon: 'star',
  },
  {
    id: 2,
    title: 'Fast Shipping',
    description: 'Get your gear delivered within 2-3 business days',
    icon: 'local_shipping',
  },
  {
    id: 3,
    title: 'Expert Support',
    description: '24/7 customer support from skating enthusiasts',
    icon: 'support_agent',
  },
];
