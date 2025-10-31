
<template>
  <v-container class="pa-6">
    <v-card elevation="3" class="pa-4">
      <h2 class="mb-4 text-h5 font-weight-bold text-center">💰 أرباحي الحالية</h2>

      <!-- بطاقات الملخص -->
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="pa-3 text-center bg-green-lighten-5">
            <h3 class="text-h6">إجمالي الأرباح</h3>
            <h2 class="text-green font-weight-bold">
              {{ profits.total_profit }} ج.م
            </h2>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="pa-3 text-center bg-amber-lighten-5">
            <h3 class="text-h6">المبالغ المسحوبة</h3>
            <h2 class="text-amber-darken-2 font-weight-bold">
              {{ profits.withdrawn }} ج.م
            </h2>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="pa-3 text-center bg-blue-lighten-5">
            <h3 class="text-h6">الرصيد الحالي المتاح</h3>
            <h2 class="text-blue-darken-2 font-weight-bold">
              {{ profits.available_profit }} ج.م
            </h2>
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="my-6"></v-divider>

      <!-- جدول الطلبات -->
      <h3 class="mb-3 text-h6 font-weight-bold">🧾 تفاصيل الطلبات</h3>
      <v-data-table
        :headers="headers"
        :items="profits.orders"
        class="elevation-1"
        no-data-text="لا توجد طلبات حالياً"
      >
        <template v-slot:item.date="{ item }">
          <span>{{ formatDate(item.date) }}</span>
        </template>
      </v-data-table>

      <v-divider class="my-6"></v-divider>

      <!-- نموذج السحب -->
      <v-card class="pa-4">
        <h3 class="mb-3 text-h6 font-weight-bold">🏦 طلب سحب الأرباح</h3>

        <v-form ref="withdrawForm" @submit.prevent="requestWithdraw">
          <v-row align="center">
            <v-col cols="12" md="8">
              <v-text-field
                v-model="withdraw.amount"
                label="المبلغ المطلوب (ج.م)"
                type="number"
                min="1"
                :rules="[(v) => !!v || 'هذا الحقل مطلوب']"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" class="text-center">
              <v-btn
                color="blue-darken-2"
                variant="outlined"
                @click="withdraw.amount = profits.available_profit"
                :disabled="!profits.available_profit"
              >
                سحب كل الأرباح
              </v-btn>
            </v-col>
          </v-row>

          <v-textarea
            v-model="withdraw.note"
            label="ملاحظات (اختياري)"
            rows="2"
          ></v-textarea>

          <div class="text-caption mt-2 text-grey-darken-1">
            الرصيد المتاح للسحب: <strong>{{ profits.available_profit }} ج.م</strong>
          </div>

          <v-btn
            type="submit"
            color="primary"
            class="mt-4"
            :loading="loading"
            :disabled="!profits.available_profit"
          >
            إرسال طلب السحب
          </v-btn>
        </v-form>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import axios from "@/axios";

export default {
  name: "SellerProfits",
  data() {
    return {
      profits: {
        total_profit: 0,
        withdrawn: 0,
        available_profit: 0,
        orders: [],
      },
      headers: [
        { text: "رقم الطلب", value: "order_id" },
        { text: "اسم العميل", value: "customer_name" },
        { text: "إجمالي الفاتورة", value: "total_price" },
        { text: "ربح المندوب", value: "seller_profit" },
        { text: "التاريخ", value: "date" },
      ],
      withdraw: {
        amount: "",
        note: "",
      },
      loading: false,
    };
  },
  methods: {
    async fetchProfits() {
      try {
        const { data } = await axios.get("/seller/my-profits");
        this.profits = data;
      } catch (error) {
        console.error(error);
      }
    },
    async requestWithdraw() {
      if (!this.withdraw.amount) return;

      this.loading = true;
      try {
        await axios.post("/seller/request-withdraw", this.withdraw);
        this.$toast.success("تم إرسال طلب السحب بنجاح!");
        this.withdraw.amount = "";
        this.withdraw.note = "";
        this.fetchProfits(); // تحديث الأرباح بعد الطلب
      } catch (error) {
        this.$toast.error(
          error.response?.data?.message || "حدث خطأ أثناء الإرسال"
        );
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString("ar-EG");
    },
  },
  mounted() {
    this.fetchProfits();
  },
};
</script>

<style scoped>
.text-green {
  color: #2e7d32;
}
.text-amber-darken-2 {
  color: #f57c00;
}
.text-blue-darken-2 {
  color: #1565c0;
}
</style>
