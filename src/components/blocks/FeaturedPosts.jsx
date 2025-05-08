import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FeaturedPosts = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link
          key={post.slug}
          to={post.url}
          className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          {/* Image */}
          <div className="aspect-w-16 aspect-h-9 bg-gray-100">
            <img
              src={post.image}
              alt={post.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Category */}
            <div className="text-sm font-medium text-red-600 mb-2">
              {post.category}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {post.description}
            </p>

            {/* Metadata */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{post.formattedDate}</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

FeaturedPosts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      formattedDate: PropTypes.string.isRequired,
      readingTime: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default FeaturedPosts;
