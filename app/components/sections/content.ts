import type { LucideIcon } from 'lucide-react';
import {
  Code2,
  Compass,
  Cuboid,
  Film,
  Fingerprint,
  Instagram,
  LayoutTemplate,
  Lightbulb,
  Linkedin,
  Mail,
  Phone,
  Smartphone,
  Twitter,
} from 'lucide-react';

export type ServiceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  borderClass: string;
  iconClass: string;
  glowClass: string;
  explodeX: number;
  explodeY: number;
  explodeRotate: number;
};

export const serviceCards: ServiceCard[] = [
  {
    title: 'UI/UX Design',
    description:
      'Intuitive interfaces that blend aesthetics with seamless functionality. Every interaction is purposeful and refined.',
    icon: LayoutTemplate,
    borderClass: 'border-l-blue-500',
    iconClass: 'text-blue-500',
    glowClass: 'from-blue-500/10',
    explodeX: -320,
    explodeY: -280,
    explodeRotate: -12,
  },
  {
    title: 'Brand Identity',
    description:
      'Cohesive brand ecosystems that resonate deeply with your audience and stand the test of time.',
    icon: Fingerprint,
    borderClass: 'border-l-purple-500',
    iconClass: 'text-purple-500',
    glowClass: 'from-purple-500/10',
    explodeX: 150,
    explodeY: -340,
    explodeRotate: 8,
  },
  {
    title: 'Motion Design',
    description:
      'Cinematic animations and fluid micro-interactions that breathe life into every digital touchpoint.',
    icon: Film,
    borderClass: 'border-l-cyan-400',
    iconClass: 'text-cyan-400',
    glowClass: 'from-cyan-400/10',
    explodeX: 350,
    explodeY: -120,
    explodeRotate: 15,
  },
  {
    title: 'Web Development',
    description:
      'High-performance platforms built with modern architectures and pixel-perfect attention to detail.',
    icon: Code2,
    borderClass: 'border-l-pink-500',
    iconClass: 'text-pink-500',
    glowClass: 'from-pink-500/10',
    explodeX: 380,
    explodeY: 200,
    explodeRotate: -18,
  },
  {
    title: 'Digital Product',
    description:
      'End-to-end product design from concept to delivery, ensuring every feature serves the user.',
    icon: Smartphone,
    borderClass: 'border-l-fuchsia-500',
    iconClass: 'text-fuchsia-500',
    glowClass: 'from-fuchsia-500/10',
    explodeX: -380,
    explodeY: 160,
    explodeRotate: 20,
  },
  {
    title: 'Creative Direction',
    description: 'Guiding visual narratives across all touchpoints with a unified creative vision.',
    icon: Compass,
    borderClass: 'border-l-indigo-500',
    iconClass: 'text-indigo-500',
    glowClass: 'from-indigo-500/10',
    explodeX: -200,
    explodeY: 340,
    explodeRotate: -10,
  },
  {
    title: 'Animation & 3D',
    description: 'Immersive 3D environments and motion sequences that push creative boundaries.',
    icon: Cuboid,
    borderClass: 'border-l-teal-400',
    iconClass: 'text-teal-400',
    glowClass: 'from-teal-400/10',
    explodeX: 200,
    explodeY: 300,
    explodeRotate: 14,
  },
  {
    title: 'Strategic Consulting',
    description: 'Digital transformation and creative positioning strategies that drive measurable growth.',
    icon: Lightbulb,
    borderClass: 'border-l-orange-500',
    iconClass: 'text-orange-500',
    glowClass: 'from-orange-500/10',
    explodeX: -100,
    explodeY: -360,
    explodeRotate: 6,
  },
];

export type SocialLink = {
  id: string;
  href: string;
  label: string;
  ariaLabel: string;
  icon: LucideIcon;
};

export const socialLinks: SocialLink[] = [
  { id: 'ig', href: 'https://instagram.com/sorensdr', label: 'Instagram', ariaLabel: 'Follow on Instagram', icon: Instagram },
  { id: 'tw', href: 'https://twitter.com/sorensdr', label: 'Twitter', ariaLabel: 'Follow on Twitter', icon: Twitter },
  { id: 'li', href: 'https://linkedin.com/in/sorensdr', label: 'LinkedIn', ariaLabel: 'Connect on LinkedIn', icon: Linkedin },
];

export type FooterLinkGroup = {
  title: string;
  links: { id: string; label: string; href: string; external?: boolean; ariaLabel?: string }[];
};

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: 'Contact',
    links: [
      { id: 'email-link', label: 'sorensadr@gmail.com', href: 'mailto:sorensadr@gmail.com' },
      { id: 'phone-link', label: '(302) 763-6707', href: 'tel:3027636707' },
    ],
  },
  {
    title: 'Social',
    links: socialLinks.map((link) => ({ id: `${link.id}-link`, label: link.label, href: link.href, external: true })),
  },
  {
    title: 'Legal',
    links: [
      { id: 'privacy', label: 'Privacy', href: '/privacy', ariaLabel: 'Privacy Policy' },
      { id: 'terms', label: 'Terms', href: '/terms', ariaLabel: 'Terms of Service' },
    ],
  },
];

export const contactMethods: Array<{
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}> = [
  { label: 'Phone', value: '(302) 763-6707', href: 'tel:3027636707', icon: Phone },
  { label: 'Email', value: 'sorensadr@gmail.com', href: 'mailto:sorensadr@gmail.com', icon: Mail },
  { label: 'Instagram', value: '@sorensdr', href: 'https://instagram.com/sorensdr', icon: Instagram, external: true },
];
