import { defineStore } from "pinia";
import axios from "axios";
export const CartStore1 = defineStore("CartS", {
  state: () => ({
    CartProduct: [],
    CartProduct2: [],
    domin: "https://web-production-a6d4.up.railway.app/api/",
  }),
  getters: {},
  actions: {
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
    async GetCart() {
      if (localStorage.getItem("todo")) {
        this.CartProduct = JSON.parse(localStorage.getItem("todo"));
        localStorage.setItem("todo", JSON.stringify(this.CartProduct));
      }
    },
    async delitem(id) {
      for (let i = 0; i <= this.CartProduct.length; i++) {
        if (this.CartProduct[i].id == id) {
          this.CartProduct.splice(i, 1);
        }
      }
      localStorage.setItem("todo", JSON.stringify(this.CartProduct));
    },
    async delitemAll() {
      this.CartProduct = [];
      localStorage.setItem("todo", JSON.stringify(this.CartProduct));
    },
    async update() {
      if (localStorage.getItem("todo")) {
        this.CartProduct.push(JSON.parse(localStorage.getItem("todo")));
      }
    },
    async GetCart2() {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${this.domin}cart/show`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.CartProduct2 = res.data.cart.pro_c_item;
      } catch (err) {
        console.error(err.response?.data || err);
      }
    },

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
        try {
          const res = await axios.post(
            `${this.domin}cart/add`,
            {
              product_id: item.id,
              quantity: item.quantity,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (err) {
          console.error(err.response?.data || err);
        }
      }
    },

    async delitem2(pro) {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.delete(`${this.domin}cart/delete/${pro.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.error(err.response?.data || err);
      }
      this.GetCart();
    },
    async CartDelAll() {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.delete(`${this.domin}cart/deleteAll`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.error(err.response?.data || err);
      }
    },
  },
});
