<template>
  <v-container fluid class="pa-6" style="background-color: #f9f9f9">
    <v-row>
      <v-col cols="12" class="text-center mb-6">
        <h2 class="text-h4 font-weight-bold">🏆 قائمة أفضل البائعين</h2>
        <p class="text-subtitle-1 text-grey">
          حسب عدد الطلبات التي تمت الموافقة عليها من العملاء
        </p>
      </v-col>

      <!-- لو مفيش بيانات -->
      <v-col
        v-if="!topsellers || topsellers.length === 0"
        cols="12"
        class="text-center"
      >
        <v-card class="pa-8">
          <v-icon color="grey" size="64">mdi-account-off-outline</v-icon>
          <p class="text-subtitle-1 mt-3">
            لا يوجد بائعين لديهم طلبات موافق عليها بعد
          </p>
        </v-card>
      </v-col>

      <!-- عرض البائعين -->
      <v-col
        v-for="seller in topsellers"
        :key="seller.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card class="pa-4 rounded-xl elevation-3 hover-card">
          <div class="d-flex justify-space-between align-center mb-3">
            <h3 class="text-h6 font-weight-bold">👤 {{ seller.name }}</h3>
            <v-chip color="primary" text-color="white" label>
              {{ seller.approved_orders_count }} طلبية موافق عليها
            </v-chip>
          </div>

          <v-divider class="mb-3"></v-divider>

          <div class="text-body-2 mb-2">
            <strong>البريد الإلكتروني:</strong>
            {{ seller.email || "غير متوفر" }}
          </div>

          <div v-if="seller.phone" class="text-body-2 mb-2">
            <strong>رقم الهاتف:</strong> {{ seller.phone }}
          </div>

          <v-divider class="my-3"></v-divider>

          <v-btn
            color="green"
            variant="tonal"
            size="small"
            block
            @click="goToSellerOrders(seller.id)"
          >
            <v-icon start>mdi-eye</v-icon>
            عرض طلباته
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "pinia";
import { mystore } from "@/store";

export default {
  data() {
    return {
      topsellers: [],
    };
  },
  computed: {
    ...mapState(mystore, ["domin"]),
  },
  async mounted() {
    await this.fetchTopSellers();
  },
  methods: {
    async fetchTopSellers() {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${this.domin}top-sellers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.topsellers = res.data.sellers;
      } catch (err) {
        console.error(
          "❌ خطأ أثناء جلب قائمة البائعين:",
          err.response?.data || err
        );
      }
    },

    goToSellerOrders(id) {
      // تحويل لصفحة الطلبات الخاصة بالبائع
      this.$router.push({ name: "SellerOrders", params: { id } });
    },
  },
};
</script>

<style scoped>
.text-h4 {
  color: #222;
}
.hover-card {
  transition: 0.3s;
}
.hover-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}
.text-grey {
  color: #777;
}
</style>
