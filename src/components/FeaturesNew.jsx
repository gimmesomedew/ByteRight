import { Layout, Pointer, Zap } from "lucide-react";
import { Feature108 } from "./blocks/Feature108";

const demoData = {
  badge: "ByteRight Services",
  heading: "WordPress Solutions That Drive Results",
  description: "Transform your online presence with our expert WordPress development services.",
  tabs: [
    {
      value: "tab-1",
      icon: <Zap className="h-auto w-4 shrink-0" />,
      label: "Custom Development",
      content: {
        badge: "Expert Solutions",
        title: "Tailored WordPress Development",
        description:
          "Get a custom WordPress solution that perfectly matches your business needs. Our expert developers create fast, secure, and scalable websites that drive real results.",
        buttonText: "Learn More",
        imageSrc: "/images/design.jpg",
        imageAlt: "Custom WordPress Development",
      },
    },
    {
      value: "tab-2",
      icon: <Pointer className="h-auto w-4 shrink-0" />,
      label: "WooCommerce",
      content: {
        badge: "E-commerce",
        title: "Power Your Online Store",
        description:
          "Launch a successful online store with our WooCommerce expertise. We build user-friendly, secure, and conversion-optimized e-commerce solutions.",
        buttonText: "View Services",
        imageSrc: "/images/commerce.jpg",
        imageAlt: "WooCommerce Development",
      },
    },
    {
      value: "tab-3",
      icon: <Layout className="h-auto w-4 shrink-0" />,
      label: "Maintenance",
      content: {
        badge: "Support & Updates",
        title: "Keep Your Site Running Smoothly",
        description:
          "Ensure your WordPress site stays secure, fast, and up-to-date with our comprehensive maintenance services. Focus on your business while we handle the tech.",
        buttonText: "See Plans",
        imageSrc: "/images/remote-work.jpg",
        imageAlt: "WordPress Maintenance",
      },
    },
  ],
};

function Features() {
  return <Feature108 {...demoData} />;
}

export { Features };
