import CyberSecurityImage from '../../Assests/cyber security.webp';
import MobileImage from '../../Assests/mobile.webp';
import BackendImage from '../../Assests/backend.webp';

export interface TrackItem {
  id: string;
  /** Vite-resolved image URL. When absent, `gradient` is used instead. */
  imageUrl?: string;
  /** CSS gradient string used as the card header when there is no image. */
  gradient: string;
  title: string;
  description: string;
}

export const allTracks: TrackItem[] = [
  {
    id: 'cyber-security',
    imageUrl: CyberSecurityImage,
    gradient: 'linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)',
    title: 'Cyber Security',
    description:
      'Safeguarding digital assets through proactive threat management and robust security protocols.',
  },
  {
    id: 'mobile',
    imageUrl: MobileImage,
    gradient: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
    title: 'Mobile',
    description:
      'Involves creating user-friendly mobile apps for Android and iOS platforms.',
  },
  {
    id: 'backend',
    imageUrl: BackendImage,
    gradient: 'linear-gradient(135deg, #16a34a 0%, #14532d 100%)',
    title: 'Backend',
    description:
      'Deals with servers, databases, and logic that power applications behind the scenes.',
  },
  {
    id: 'frontend',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)',
    title: 'Frontend & UI/UX',
    description:
      'Build beautiful, responsive interfaces and craft seamless user experiences that delight users.',
  },
  {
    id: 'ai',
    gradient: 'linear-gradient(135deg, #ea580c 0%, #9a3412 100%)',
    title: 'AI & Machine Learning',
    description:
      'Dive into data science, neural networks, and intelligent systems that learn and adapt.',
  },
  {
    id: '3d-design',
    gradient: 'linear-gradient(135deg, #0d9488 0%, #134e4a 100%)',
    title: '3D Design',
    description:
      'Master 3D modeling, animation, and visualization to bring creative ideas to life.',
  },
];

/** The three cards shown on the landing page */
export const featuredTracks = allTracks.slice(0, 3);
