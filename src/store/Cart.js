import { defineStore } from "pinia";
import axios from "axios";

export const CartStore1 = defineStore("CartS", {
  state: () => ({
    CartProduct: [],   // كارت محلي
    CartProduct2: [],  // كارت السيرفر
    domin: "https://web-production-a6d4.up.railway.app/api/",
  }),
  getters: {},
  actions: {
    // إضافة عنصر للكارت المحلي
    async Additem(item) {
      let vivo = false;
      for (let i = 0; i < this.CartProduct.length; i++) {
        if (this.CartProduct[i].id === item.id) {
          this.CartProduct[i].quantity += item.quantity;
          vivo = true;
          break;
        }
      }
      if (!vivo) {
        this.CartProduct.push(JSON.parse(JSON.stringify(item)));
      }
      localStorage.setItem("todo", JSON.stringify(this.CartProduct));
    },

    // جلب الكارت المحلي
    async GetCart() {
      if (localStorage.getItem("todo")) {
        this.CartProduct = JSON.parse(localStorage.getItem("todo"));
        localStorage.setItem("todo", JSON.stringify(this.CartProduct));
      }
    },

    // حذف عنصر من الكارت المحلي
    async delitem(id) {
      this.CartProduct = this.CartProduct.filter(item => item.id !== id);
      localStorage.setItem("todo", JSON.stringify(this.CartProduct));
    },

    // حذف كل عناصر الكارت المحلي
    async delitemAll() {
      this.CartProduct = [];
      localStorage.setItem("todo", JSON.stringify(this.CartProduct));
    },

    // جلب الكارت من السيرفر
    async GetCart2() {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${this.domin}cart/show`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.CartProduct2 = res.data.cart.pro_c_item;
      } catch (err) {
        console.error(err.response?.data || err);
      }
    },

    // إضافة عنصر للكارت المرتبط بالسيرفر مع تحديث الكمية إذا موجود
    async Additem2(item) {
      const token = localStorage.getItem("token");
      let vivo = false;

      for (let i = 0; i < this.CartProduct2.length; i++) {
        if (this.CartProduct2[i].product_id === item.id) {
          // زيادة الكمية محليًا
          this.CartProduct2[i].quantity += item.quantity;
          vivo = true;

          // مزامنة الكمية الجديدة مع السيرفر
          try {
            await axios.put(
              `${this.domin}cart/update/${item.id}`,
              { quantity: this.CartProduct2[i].quantity },
              { headers: { Authorization: `Bearer ${token}` } }
            );
          } catch (err) {
            console.error(err.response?.data || err);
          }
          break;
        }
      }

      if (!vivo) {
        // إضافة جديدة على السيرفر
        try {
          const res = await axios.post(
            `${this.domin}cart/add`,
            { product_id: item.id, quantity: item.quantity },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          // تحديث الكارت المحلي بعد الإضافة
          if (res.data && res.data.cart_item) {
            this.CartProduct2.push(res.data.cart_item);
          }
        } catch (err) {
          console.error(err.response?.data || err);
        }
      }
    },

    // حذف عنصر من كارت السيرفر
    async delitem2(pro) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`${this.domin}cart/delete/${pro.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error(err.response?.data || err);
      }
      // تحديث الكارت بعد الحذف
      await this.GetCart2();
    },

    // حذف كل عناصر كارت السيرفر
    async CartDelAll() {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`${this.domin}cart/deleteAll`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.CartProduct2 = [];
      } catch (err) {
        console.error(err.response?.data || err);
      }
    },
  },
});
