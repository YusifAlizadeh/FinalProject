import "./assets/BlogDropdown.css";
import post1 from "./assets/img/blog-04-320x200.jpg"
import post2 from "./assets/img/blog-08-320x200.jpg"
import post3 from "./assets/img/blog-02-320x200.jpg"


const BlogDropdown = () => {
  return (
    <div className="blog-dropdown">
      <div className="blog-category">
        <h4>SMART PHONE</h4>
        <ul>
          <li>Apple</li>
          <li>Huawei</li>
          <li>Pioneer</li>
          <li>Beats</li>
          <li>Samsung</li>
          <li>Haylou</li>
          <li>Lenovo</li>
          <li>LG</li>
          <li>Sony</li>
          <li>Xiaomi</li>
          <li>Microsoft</li>
        </ul>
      </div>

      <div className="blog-category">
        <h4>SMART PHONE</h4>
        <ul>
          <li>Apple</li>
          <li>Huawei</li>
          <li>Pioneer</li>
          <li>Beats</li>
          <li>Samsung</li>
          <li>Haylou</li>
          <li>Lenovo</li>
          <li>LG</li>
          <li>Sony</li>
          <li>Xiaomi</li>
          <li>Microsoft</li>
        </ul>
      </div>

      <div className="recent-posts">
        <h4>RECENT POSTS</h4>
        <div className="post">
        <img src={post1} alt="Post 1" />
          <div>
            <p>Every Thing About Trending Jewellery</p>
            <span>Jan 20, 2024</span>
          </div>
        </div>

        <div className="post">
        <img src={post2} alt="Post 2" />
          <div>
            <p>Create Fashion That Is Really Memorable</p>
            <span>Jan 20, 2024</span>
          </div>
        </div>

        <div className="post">
        <img src={post3} alt="Post 3" />
          <div>
            <p>Having A Beautiful Roof Garden At Your...</p>
            <span>Jan 20, 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDropdown;
