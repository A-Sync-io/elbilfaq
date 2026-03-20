export interface SEOProps {
  title: string;
  description: string;
  canonicalURL?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  pubDate?: Date;
  modifiedDate?: Date;
  author?: string;
  tags?: string[];
  noindex?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  language: string;
  author: string;
}
