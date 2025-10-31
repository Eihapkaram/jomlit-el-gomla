تمام ✅ هنعمل صفحة Vue + Vuetify متكاملة لإدارة العروض (**إضافة، عرض، تعديل،
حذف**) في نفس الصفحة. الصفحة فيها فورم في الأعلى لإضافة عرض جديد، وتحتها جدول
بالعروض مع أزرار للتعديل والحذف. ها هو الكود كامل وجاهز للنسخ 👇
```{"id":"85021","variant":"standard","title":"صفحة إدارة العروض Vue + Vuetify"}
<template>
  <v-container>
    <!-- ✅ إضافة / تعديل عرض -->
    <v-card class="pa-6 mb-6">
      <h2>{{ isEditing ? "تعديل عرض" : "إضافة عرض جديد" }}</h2>

      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="form.title"
          label="العنوان"
          required
        ></v-text-field>

        <v-textarea v-model="form.description" label="الوصف"></v-textarea>

        <v-file-input
          label="صورة البانر"
          prepend-icon="mdi-image"
          @change="onFileChange"
        ></v-file-input>

        <v-text-field
          v-model="form.discount_value"
          label="قيمة الخصم"
          type="number"
        ></v-text-field>

        <v-select
          v-model="form.discount_type"
          :items="['percent', 'fixed']"
          label="نوع الخصم"
        ></v-select>

        <v-text-field
          v-model="form.product_id"
          label="رقم المنتج"
        ></v-text-field>

        <v-row>
          <v-col>
            <v-text-field
              v-model="form.start_date"
              label="تاريخ البداية"
              type="date"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="form.end_date"
              label="تاريخ النهاية"
              type="date"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-switch v-model="form.is_active" label="نشط؟"></v-switch>

        <v-btn type="submit" color="primary" class="mt-3">
          {{ isEditing ? "تحديث العرض" : "إضافة العرض" }}
        </v-btn>

        <v-btn
          v-if="isEditing"
          class="mt-3 ml-2"
          @click="resetForm"
          color="grey"
        >
          إلغاء التعديل
        </v-btn>
      </v-form>
    </v-card>

    <!-- ✅ قائمة العروض -->
    <v-card class="pa-4">
      <h2>كل العروض</h2>
      <v-data-table
        :headers="headers"
        :items="offers"
        class="mt-4"
        no-data-text="لا توجد عروض بعد"
      >
        <template v-slot:item.banner="{ item }">
          <v-img
            v-if="item.banner"
            :src="`${domin}storage/${item.banner}`"
            max-width="80"
          ></v-img>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn color="blue" icon @click="editOffer(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn color="red" icon @click="deleteOffer(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { mystore } from "@/store";
import { mapState } from "pinia";

export default {
  data() {
    return {
      offers: [],
      headers: [
        { text: "العنوان", value: "title" },
        { text: "الوصف", value: "description" },
        { text: "البانر", value: "banner" },
        { text: "الخصم", value: "discount_value" },
        { text: "النوع", value: "discount_type" },
        { text: "نشط", value: "is_active" },
        { text: "العمليات", value: "actions", sortable: false },
      ],
      form: {
        id: null,
        title: "",
        description: "",
        banner: null,
        discount_value: "",
        discount_type: "percent",
        product_id: "",
        start_date: "",
        end_date: "",
        is_active: true,
      },
      isEditing: false,
    };
  },
  computed: {
    ...mapState(mystore, ["domin"]),
  },
  mounted() {
    this.getOffers();
  },
  methods: {
    async getOffers() {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${this.domin}offers`);
      this.offers = res.data;
    },

    onFileChange(e) {
      this.form.banner = e.target.files[0];
    },

    async handleSubmit() {
      const token = localStorage.getItem("token");
      // ✅ الحل بدون أي تعديل على الباقي
      this.form.is_active = this.form.is_active ? 1 : 0;

      const formData = new FormData();
      for (let key in this.form) {
        formData.append(key, this.form[key]);
      }

      try {
        if (this.isEditing) {
          await axios.post(
            `${this.domin}dashboard/offers/${this.form.id}`,
            formData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else {
          await axios.post(`${this.domin}dashboard/offers`, formData, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
        this.getOffers();
        this.resetForm();
      } catch (err) {
        console.error(err.response?.data || err);
      }
    },

    editOffer(offer) {
      this.form = { ...offer, banner: null };
      this.isEditing = true;
    },

    async deleteOffer(id) {
      if (!confirm("هل أنت متأكد من حذف هذا العرض؟")) return;
      const token = localStorage.getItem("token");
      await axios.delete(`${this.domin}dashboard/offers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.getOffers();
    },

    resetForm() {
      this.form = {
        id: null,
        title: "",
        description: "",
        banner: null,
        discount_value: "",
        discount_type: "percent",
        product_id: "",
        start_date: "",
        end_date: "",
        is_active: true,
      };
      this.isEditing = false;
    },
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 15px;
}
.v-btn {
  border-radius: 10px;
}
</style>
