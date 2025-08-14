import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturedProducts from "@/components/featured-products";
import CollectionsBanner from "@/components/collections-banner";
import ProductCategories from "@/components/product-categories";
import NewsletterSignup from "@/components/newsletter-signup";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral">
      <Navigation />
      <HeroSection />
      <FeaturedProducts />
      <CollectionsBanner />
      <ProductCategories />
      <NewsletterSignup />
      <Footer />
    </div>
  );
}
