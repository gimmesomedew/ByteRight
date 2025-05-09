import React from "react";
import { Blog7 } from "../components/blocks/Blog7";

const demoData = {
  tagline: "Latest Updates",
  heading: "ByteRight Blog",
  description:
    "Stay up to date with the latest web development trends, WordPress tips, and digital transformation strategies.",
  buttonText: "View All Posts",
  buttonUrl: "#",
  posts: [
    {
      id: "post-1",
      title: "Build websites in minutes with shadcn/ui",
      summary:
        "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
      label: "Development",
      author: "ByteRight Team",
      published: "1 Jan 2024",
      url: "#",
      image: "https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg",
    },
    {
      id: "post-2",
      title: "Easily copy code to build your website",
      summary:
        "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
      label: "Tips & Tricks",
      author: "ByteRight Team",
      published: "1 Jan 2024",
      url: "#",
      image: "https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg",
    },
    {
      id: "post-3",
      title: "The future of web design",
      summary:
        "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
      label: "Design",
      author: "ByteRight Team",
      published: "1 Jan 2024",
      url: "#",
      image: "https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg",
    },
  ],
};

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      <Blog7 {...demoData} />
    </div>
  );
}
