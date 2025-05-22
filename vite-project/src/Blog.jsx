import "./assets/Blog.css";
import img1 from "./assets/img/blog-04-320x200.jpg";
import img2 from "./assets/img/blog-08-320x200.jpg";
import img3 from "./assets/img/blog-02-320x200.jpg";
import { useLang } from "./local/LanguageContext";
import { Link } from "react-router-dom";

const text = {
  subtitle: {
    en: "Most popular blog",
    az: "Ən populyar bloq",
  },
  title: {
    en: "Latest Blog",
    az: "Son Bloqlar",
  },
  continueReading: {
    en: "Continue Reading >",
    az: "Oxumağa Davam Et >",
  },
  admin: {
    en: "Admin",
    az: "Admin",
  },
};

const blogPosts = [
  {
    id: 1,
    image: img1,
    title: {
      en: "Every Thing About Trending Jewellery",
      az: "Trend Əşyalar Haqqında Hər Şey",
    },
    description: {
      en: "Vivamus enim sagittis aptent hac mi dui a per aptent suspendisse cras odio bibendum augue rhoncus la..",
      az: "Vivamus enim sagittis aptent hac mi dui a per aptent suspendisse cras odio bibendum augue rhoncus la..",
    },
    date: "Mar 11, 2025",
    views: 194,
    likes: 0,
  },
  {
    id: 2,
    image: img2,
    title: {
      en: "Create Fashion That Is Really Memorable",
      az: "Həqiqətən Yadda Qalan Moda Yarat",
    },
    description: {
      en: "Vivamus enim sagittis aptent hac mi dui a per aptent suspendisse cras odio bibendum augue rhoncus la..",
      az: "Vivamus enim sagittis aptent hac mi dui a per aptent suspendisse cras odio bibendum augue rhoncus la..",
    },
    date: "Mar 11, 2025",
    views: 60,
    likes: 0,
  },
  {
    id: 3,
    image: img3,
    title: {
      en: "Having A Beautiful Roof Garden At Your Home",
      az: "Evinizdə Gözəl Dam Bağınız Olsun",
    },
    description: {
      en: "Vivamus enim sagittis aptent hac mi dui a per aptent suspendisse cras odio bibendum augue rhoncus la..",
      az: "Vivamus enim sagittis aptent hac mi dui a per aptent suspendisse cras odio bibendum augue rhoncus la..",
    },
    date: "Mar 11, 2025",
    views: 47,
    likes: 0,
  },
];

const Blog = () => {
  const { language } = useLang();

  return (
    <div className="blog-container">
      <h4 className="blog-subtitle">{text.subtitle[language]}</h4>
      <h2 className="blog-title">{text.title[language]}</h2>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-card">
            <img src={post.image} alt={post.title[language]} className="blog-image" />
            <div className="blog-content">
              <h3 className="blog-heading">{post.title[language]}</h3>
              <p className="blog-description">{post.description[language]}</p>
              <Link to="/blog" className="blog-link">
  {text.continueReading[language]}
</Link>
              <div className="blog-footer">
                <div className="blog-info">
                  <span className="admin-icon">👤</span> {text.admin[language]}
                </div>
                <div className="blog-meta">
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-views">👁️ {post.views}</span>
                  <span className="blog-likes">❤️ {post.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
