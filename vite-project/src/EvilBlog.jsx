"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaRegCalendarAlt, FaUserAlt } from "react-icons/fa"
import { useLang } from "./local/LanguageContext"
import "./assets/EvilBlog.css"

const text = {
  en: {
    heading: "Latest News & Articles",
    readMore: "Read More →",
  },
  az: {
    heading: "Ən Son Xəbərlər və Məqalələr",
    readMore: "Daha Çox Oxu →",
  },
}

const Blog = () => {
  const [articles, setArticles] = useState([])
  const { language } = useLang()
  const t = text[language]

  useEffect(() => {
    const realArticles = [
      {
        id: 1,
        title: "The Future of E-Commerce in 2025",
        date: "2025-04-10",
        author: "John Doe",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        excerpt: "Explore how AI, AR, and personalization will shape the shopping experience of tomorrow...",
        category: "Technology",
      },
      {
        id: 2,
        title: "Top 10 Gadgets You Need This Summer",
        date: "2025-03-27",
        author: "Anna Smith",
        image: "https://images.unsplash.com/photo-1611174743420-3d7df880ce32", // New image URL
        excerpt: "From smart sunglasses to solar chargers, here's your guide to the most exciting tech...",
        category: "Gadgets",
      },
      {
        id: 3,
        title: "How to Build a Minimalist Workspace",
        date: "2025-02-14",
        author: "Carlos Ruiz",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        excerpt: "Less clutter means more focus. Discover ideas to make your desk a zone of productivity...",
        category: "Lifestyle",
      },
      {
        id: 4,
        title: "Why Dark Mode is More Than a Trend",
        date: "2025-04-01",
        author: "Natalie Ford",
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
        excerpt: "Dark themes are easier on the eyes and your device. Learn why they're here to stay...",
        category: "Design",
      },
      {
        id: 5,
        title: "The Rise of Remote Work Tools",
        date: "2025-03-12",
        author: "David Lin",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", // New image URL
        excerpt: "Tools like Notion, Slack, and Zoom are reshaping the way we work and collaborate...",
        category: "Work",
      },
      {
        id: 6,
        title: "Design Tips for Better UX",
        date: "2025-03-01",
        author: "Laura Chen",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5", 
        excerpt: "Small details make a big difference. Here's how to design with the user in mind...",
        category: "Design",
      },
    ]

    setArticles(realArticles)
  }, [])

  return (
    <div className="blog-page">
      <h1 className="blog-heading">{t.heading}</h1>
      <div className="blog-grid">
        {articles.map((article, index) => (
          <motion.div
            className="blog-card"
            key={article.id}
            data-category={article.category}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <img src={`${article.image}?auto=format&fit=crop&w=800&q=80`} alt={article.title} className="blog-image" />
            <div className="blog-content">
              <h2 className="blog-title">{article.title}</h2>
              <div className="blog-meta">
                <span>
                  <FaRegCalendarAlt /> {article.date}
                </span>
                <span>
                  <FaUserAlt /> {article.author}
                </span>
              </div>
              <p className="blog-excerpt">{article.excerpt}</p>
              <Link to={`/blog/${article.id}`} className="read-more">
                {t.readMore}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Blog
