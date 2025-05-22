import  { useState, useEffect } from "react";
import supabase from "./helper/supabaseClient";
import { useLang } from "./local/LanguageContext";
import './assets/admin-panel.css';

const text = {
  en: {
    adminTitle: "Admin Panel",
    productTitle: "Product title",
    price: "Price",
    imageLink: "Link to image",
    addProduct: "Add product",
    allProducts: "All products",
    delete: "Delete",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
  },
  az: {
    adminTitle: "Admin Paneli",
    productTitle: "Məhsul adı",
    price: "Qiymət",
    imageLink: "Şəkil linki",
    addProduct: "Məhsulu əlavə et",
    allProducts: "Bütün məhsullar",
    delete: "Sil",
    edit: "Dəyiş",
    save: "Yadda saxla",
    cancel: "Ləğv et",
  },
};

const AdminPanel = () => {
  const { language } = useLang();
  const t = text[language];

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: "", price: "", img: "" });
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedData, setEditedData] = useState({ title: "", price: "", img: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('final-unec').select('*');
    if (error) console.error(error.message);
    else setProducts(data);
  };

  const handleDeleteProduct = async (id) => {
    const { error } = await supabase.from('final-unec').delete().eq('id', id);
    if (error) console.error(error.message);
    else setProducts(products.filter((product) => product.id !== id));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('final-unec').insert([newProduct]).select();
    if (error) {
      console.error(error.message);
    } else {
      setProducts([...products, ...data]);
      setNewProduct({ title: "", price: "", img: "" });
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditedData({ title: product.title, price: product.price, img: product.img });
  };

  const handleSaveEdit = async () => {
    const { error } = await supabase
      .from("final-unec")
      .update(editedData)
      .eq("id", editingProduct.id);

    if (error) {
      console.error(error.message);
    } else {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...editedData } : p));
      setEditingProduct(null);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">{t.adminTitle}</h1>

      <form className="admin-form" onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder={t.productTitle}
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder={t.price}
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder={t.imageLink}
          value={newProduct.img}
          onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })}
          required
        />
        <button type="submit" className="add-btn">{t.addProduct}</button>
      </form>

      <h2 className="products-title">{t.allProducts}</h2>
      <div className="products-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.img} alt={product.title} className="product-img" />
            <div className="product-info">
              <h3>{product.title}</h3>
              <p>{product.price}$</p>
              <div className="card-buttons">
  <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
  <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
</div>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{t.edit} {editingProduct.title}</h2>
            <input
              type="text"
              value={editedData.title}
              onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
              placeholder={t.productTitle}
            />
            <input
              type="number"
              value={editedData.price}
              onChange={(e) => setEditedData({ ...editedData, price: e.target.value })}
              placeholder={t.price}
            />
            <input
              type="text"
              value={editedData.img}
              onChange={(e) => setEditedData({ ...editedData, img: e.target.value })}
              placeholder={t.imageLink}
            />
            <div className="modal-buttons">
              <button className="save-btn" onClick={handleSaveEdit}>{t.save}</button>
              <button className="cancel-btn" onClick={() => setEditingProduct(null)}>{t.cancel}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
