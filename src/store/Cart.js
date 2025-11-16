import { defineStore } from "pinia";
import axios from "axios";

export const CartStore1 = defineStore("CartS", {
  state: () => ({
    CartProduct: [],    // الكارت المحلي
    CartProduct2: [],   // الكارت من السيرفر
    domin: "https://web-production-a6d4.up.railway.app/api/",
  }),
  getters: {},
  actions: {
    // إضافة عنصر للكارت المحلي
    async Additem(item) {
      let vivo = false;
      for (let i = 0; i < this.CartProduct.length; i++) {
        if (this.CartProduct[i].id == item.id) {
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
      }
    },

    // حذف عنصر من الكارت المحلي
    async delitem(id) {
      this.CartProduct = this.CartProduct.filter(item => item.id !== id);
      localStorage.setItem("todo", JSON.stringify(this.CartProduct));
    },

    // حذف كل العناصر من الكارت المحلي
    async delitemAll() {
      this.CartProduct = [];
      localStorage.setItem("todo", JSON.stringify(this.CartProduct));
    },

    // تحديث الكارت المحلي
    async update() {
      if (localStorage.getItem("todo")) {
        this.CartProduct = JSON.parse(localStorage.getItem("todo"));
      }
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

    // إضافة عنصر للكارت من السيرفر وتحديث الـ state فورًا
    async Additem2(item) {
      const token = localStorage.getItem("token");
      let vivo = false;

      for (let i = 0; i < this.CartProduct2.length; i++) {
        if (this.CartProduct2[i].product_id == item.id) {
          this.CartProduct2[i].quantity += item.quantity;
          vivo = true;
          break;
        }
      }

      if (!vivo) {
        // إضافة العنصر جديد في الـ state فورًا
        this.CartProduct2.push({
          product_id: item.id,
          quantity: item.quantity,
          product: item, // لو تحب تحتفظ بالبيانات الأصلية
        });

        try {
          await axios.post(
            `${this.domin}cart/add`,
            { product_id: item.id, quantity: item.quantity },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (err) {
          console.error(err.response?.data || err);
        }
      }
    },

    // حذف عنصر من الكارت من السيرفر وتحديث الـ state فورًا
    async delitem2(pro) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`${this.domin}cart/delete/${pro.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // حذف العنصر فورًا من state
        this.CartProduct2 = this.CartProduct2.filter(item => item.id !== pro.id && item.product_id !== pro.id);
      } catch (err) {
        console.error(err.response?.data || err);
      }
    },

    // حذف كل العناصر من الكارت من السيرفر وتحديث الـ state فورًا
    async CartDelAll() {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`${this.domin}cart/deleteAll`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // حذف كل العناصر فورًا من state
        this.CartProduct2 = [];
      } catch (err) {
        console.error(err.response?.data || err);
      }
    },
  },
});
