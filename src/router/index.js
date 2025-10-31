import { createRouter, createWebHistory } from "vue-router";

// === الصفحات العامة ===
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import DetilseProduct from "@/views/DetilseProduct.vue";
import CatigoryProduct from "@/views/CatigoryProduct.vue";
import CategoryPage from "@/views/CategoryPage.vue";
import CartPage from "@/views/CartPage.vue";
import ListsPage from "@/views/ListsPage.vue";
import CheckOutpage from "@/views/CheckOutpage.vue";
import SearchPage from "@/views/SearchPage.vue";
import MyPayes from "@/views/MyPayes.vue";
import Notifications from "@/views/Notifications.vue";
import Profile from "@/views/Profile.vue";
import SellerProfile from "@/views/SellerProfile.vue";
import CreateOrderBySeller from "@/views/CreateOrderBySeller.vue";
import SellerCustomers from "@/views/SellerCustomers.vue";
// === صفحات الدخول والتسجيل ===
import LogIn from "@/components/dashborad/LogIn.vue";
import UserRegister from "@/components/dashborad/UserRegister.vue";
import UserForgetPass from "@/views/UserForgetPass.vue";
import ResetPassword from "@/views/Resetpassword.vue";

// === لوحة التحكم ===
import DashBoard from "@/views/DashBoard.vue";
import AddProduct from "@/components/dashborad/AddProduct.vue";
import Settings from "@/components/dashborad/Settings.vue";
import UpdateProduct from "@/components/dashborad/UpdateProduct.vue";
import HomeProduct from "@/components/dashborad/HomeProduct.vue";
import CategoriesCom from "@/components/dashborad/CategoriesCom.vue";
import AddCategories from "@/components/dashborad/AddCategories.vue";
import UpdateCategories from "@/components/dashborad/UpdateCategories.vue";
import PagesCom from "@/components/dashborad/PagesCom.vue";
import AddPage from "@/components/dashborad/AddPage.vue";
import UpdatePage from "@/components/dashborad/UpdatePage.vue";
import UsersPage from "@/components/dashborad/UsersPage.vue";
import UpdateUser from "@/components/dashborad/UpdateUser.vue";
import ShowOrders from "@/components/dashborad/ShowOrders.vue";
import AboutUs from "@/views/AboutUs.vue";
import CustomerService from "@/views/CustomerService.vue";
import ShippingPolicy from "@/views/ShippingPolicy.vue";
import PrivacyPolicy from "@/views/PrivacyPolicy.vue";
import TermsConditions from "@/views/TermsConditions.vue";
import Inquiries from "@/views/Inquiries.vue";
import FAQ from "@/views/FAQ.vue";
import ContactUs from "@/views/ContactUs.vue";
import AdminSendNotification from "@/components/dashborad/AdminSendNotification.vue";
import QueriesShow from "@/components/dashborad/QueriesShow.vue";
import AdminWithdrawRequests from "@/components/dashborad/AdminWithdrawRequests.vue";
import OffersPage from "@/views/OffersPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "جُمـلـة الجُـمـلـة | منتجات الجملة في السوق المصري",
      description:
        "جُمـلـة الجُـمـلـة — موقعك الأول لتجارة الجملة في مصر. شاي، لبان، ملبس، كيك، مصاصات، وحلويات بأسعار المصنع للتجار والموزعين.",
    },
  },
  {
    path: "/products",
    name: "all",
    component: AboutView,
    meta: {
      title: "كل المنتجات | جُمـلـة الجُـمـلـة",
      description:
        "موقع جُمـلـة الجُـمـلـة يهدف إلى تسهيل تجارة الجملة في السوق المصري، وتوفير منتجات عالية الجودة بأسعار تنافسية.",
    },
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "حساب المستخدم  | جُمـلـة الجُـمـلـة",
      description:
        "موقع جُمـلـة الجُـمـلـة يهدف إلى تسهيل تجارة الجملة في السوق المصري، وتوفير منتجات عالية الجودة بأسعار تنافسية.",
    },
  },
  {
    path: "/SProfile",
    name: "SellerProfile",
    component: SellerProfile,
    meta: {
      title: "حساب البائع  | جُمـلـة الجُـمـلـة",
      description:
        "موقع جُمـلـة الجُـمـلـة يهدف إلى تسهيل تجارة الجملة في السوق المصري، وتوفير منتجات عالية الجودة بأسعار تنافسية.",
    },
  },

  {
    path: "/detilse/:idparam",
    name: "derilse",
    component: DetilseProduct,
    meta: {
      title: "تفاصيل المنتج | جُمـلـة الجُـمـلـة",
      description:
        "استعرض تفاصيل وأسعار منتجات الجملة في السوق المصري على موقع جُمـلـة الجُـمـلـة — الأفضل للتجار والموزعين.",
    },
  },
  {
    path: "/CatigoryProduct/:catigory",
    name: "catigory",
    component: CatigoryProduct,
    meta: {
      title: "المنتجات حسب الفئة | جُمـلـة الجُـمـلـة",
      description:
        "تصفح منتجات الجملة في السوق المصري حسب الفئة: شاي، لبان، حلويات، كيك، ومصاصات بأسعار منافسة.",
    },
  },
  {
    path: "/CatigoryPage/:catigory",
    name: "catigoryPage",
    component: CategoryPage,
    meta: {
      title: "المنتجات حسب الفئة | جُمـلـة الجُـمـلـة",
      description:
        "تصفح منتجات الجملة في السوق المصري حسب الفئة: شاي، لبان، حلويات، كيك، ومصاصات بأسعار منافسة.",
    },
  },
  {
    path: "/cartpage",
    name: "CartPage",
    component: CartPage,
    meta: { title: "سلة المشتريات | جُمـلـة الجُـمـلـة" },
  },
  {
    path: "/listpage",
    name: "listpage",
    component: ListsPage,
    meta: { title: "قائمة المفضلة | جُمـلـة الجُـمـلـة" },
  },
  {
    path: "/checkpage",
    name: "checkpage",
    component: CheckOutpage,
    meta: { title: "إتمام الطلب | جُمـلـة الجُـمـلـة" },
  },
  {
    path: "/checkpageBySeller",
    name: "checkBySeller",
    component: CreateOrderBySeller,
    meta: { title: "إتمام الطلب | جُمـلـة الجُـمـلـة" },
  },
  {
    path: "/SellerCustomer",
    name: "SellerCustomer",
    component: SellerCustomers,
    meta: { title: "عرض واضافه العملاء | جُمـلـة الجُـمـلـة" },
  },
  {
    path: "/shearch",
    name: "searchpage",
    component: SearchPage,
    meta: { title: "بحث المنتجات | جُمـلـة الجُـمـلـة" },
  },
  {
    path: "/login",
    name: "login",
    component: LogIn,
    meta: { title: "تسجيل الدخول | جُمـلـة الجُـمـلـة" },
  },
  {
    path: "/forgetPassword",
    name: "forget",
    component: UserForgetPass,
    meta: { title: "استعادة الحساب  | جُمـلـة الجُـمـلـة" },
  },
  {
    path: "/resetpassword",
    name: "ResetPassword",
    component: ResetPassword,
    meta: { title: " اعادة تعين كلمه المرور  | جُمـلـة الجُـمـلـة" },
  },
  {
    path: "/register",
    name: "register",
    component: UserRegister,
    meta: { title: "إنشاء حساب جديد | جُمـلـة الجُـمـلـة" },
  },
  {
    path: "/mypayes",
    name: "mypayes",
    component: MyPayes,
    meta: { title: "  مشترياتي | جُمـلـة الجُـمـلـة" },
  },
  {
    path: "/myNotifications",
    name: "notifications",
    component: Notifications,
    meta: { title: "  اشعاراتي | جُمـلـة الجُـمـلـة" },
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    component: AboutUs,
    meta: {
      title: "من نحن - جملة الجملة",
      description:
        "تعرف على جملة الجملة، موقع متخصص في بيع المنتجات بالجملة للتجار والموزعين في مصر.",
    },
  },
  {
    path: "/customer-service",
    name: "CustomerService",
    component: CustomerService,
    meta: {
      title: "خدمة العملاء - جملة الجملة",
      description:
        "تواصل مع فريق دعم جملة الجملة لأي استفسار أو مساعدة بخصوص الطلبات والشحن.",
    },
  },
  {
    path: "/shipping-policy",
    name: "ShippingPolicy",
    component: ShippingPolicy,
    meta: {
      title: "سياسة الشحن والإرجاع - جملة الجملة",
      description:
        "تعرف على سياسة الشحن والإرجاع الخاصة بموقع جملة الجملة وطرق التعامل مع المرتجعات.",
    },
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
    meta: {
      title: "سياسة الخصوصية - جملة الجملة",
      description:
        "تعرف على كيفية حماية بياناتك الشخصية أثناء استخدام موقع جملة الجملة.",
    },
  },
  {
    path: "/terms",
    name: "TermsConditions",
    component: TermsConditions,
    meta: {
      title: "الشروط والأحكام - جملة الجملة",
      description:
        "اقرأ الشروط والأحكام التي تنظم استخدامك لموقع جملة الجملة وخدماته.",
    },
  },
  {
    path: "/inquiries",
    name: "Inquiries",
    component: Inquiries,
    meta: {
      title: "الاستفسارات - جُمّله الجُمّله",
      description:
        "هل لديك استفسار؟ تواصل معنا للحصول على إجابات حول المنتجات أو التسجيل أو الطلبات.",
    },
  },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
    meta: {
      title: "الأسئلة الشائعة - جُمّله الجُمّله",
      description:
        "إجابات تفصيلية لأكثر الأسئلة شيوعًا حول الشحن، التسجيل، الدفع، وسياسات موقع جُمّله الجُمّله.",
    },
  },
  {
    path: "/contact",
    name: "ContactUs",
    component: ContactUs,
    meta: {
      title: "اتصل بنا - جُمّله الجُمّله",
      description:
        "تواصل مع فريق جُمّله الجُمّله عبر الهاتف أو البريد الإلكتروني. العنوان: شارع النصر، القاهرة، مصر. الهاتف: 0100 555 1234.",
    },
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: DashBoard,
    children: [
      { path: "create", name: "create", component: AddProduct },
      { path: "update/:id?", name: "update", component: UpdateProduct },
      { path: "homedash", name: "homedash", component: HomeProduct },
      { path: "catigores", name: "catigores", component: CategoriesCom },
      { path: "catigoreAdd", name: "catigoreAdd", component: AddCategories },
      {
        path: "catigoreUpdate/:id",
        name: "catigoreUpdate",
        component: UpdateCategories,
      },
      { path: "pages", name: "pages", component: PagesCom },
      { path: "page/add", name: "addpage", component: AddPage },
      { path: "pages/update/:id", name: "updatepage", component: UpdatePage },
      { path: "users", name: "users", component: UsersPage },
      { path: "updateuser/:id", name: "updateuser", component: UpdateUser },
      { path: "orders", name: "orders", component: ShowOrders },
      { path: "sendNotify", name: "send", component: AdminSendNotification },
      { path: "offer", name: "offer", component: OffersPage },
      { path: "Settings", name: "Settings", component: Settings },
      { path: "QueriesShow", name: "QueriesShow", component: QueriesShow },
      {
        path: "AdminWithdrawRequests",
        name: "Requests",
        component: AdminWithdrawRequests,
      },
    ],
  },

  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.onError((error) => {
  console.error("Router Error:", error);
  window.location.reload();
});

router.beforeEach((to, from, next) => {
  // لو رابط يبدأ بـ "dashboard"
  if (to.path.startsWith("/dashboard")) {
    // هنا نقدر نتحقق من شرط الدخول
    // مثال: لو المستخدم ليس مسجل أو ليس admin
    const userRole = localStorage.getItem("user_role"); // افترضنا تخزين role
    if (userRole !== "admin") {
      return next("/"); // منع الدخول وتحويله للصفحة الرئيسية
    }
  }
  if (to.path.startsWith("/Sprofile" && "/checkpageBySeller")) {
    // هنا نقدر نتحقق من شرط الدخول
    // مثال: لو المستخدم ليس مسجل أو ليس admin
    const userRole = localStorage.getItem("user_role"); // افترضنا تخزين role
    if (userRole !== "seller") {
      return next("/"); // منع الدخول وتحويله للصفحة الرئيسية
    }
  }
  if (to.path.startsWith("/resetpassword")) {
    // هنا نقدر نتحقق من شرط الدخول
    // مثال: لو المستخدم ليس مسجل أو ليس admin
    const userRole = localStorage.getItem("user_role"); // افترضنا تخزين role
    if (userRole === "seller") {
      return next("/"); // منع الدخول وتحويله للصفحة الرئيسية
    }
  }

  next(); // السماح بالدخول إذا لم تتحقق الشروط
  const defaultTitle = "جُمـلـة الجُـمـلـة | تجارة الجملة في السوق المصري";
  document.title = to.meta.title || defaultTitle;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute(
      "content",
      to.meta.description ||
        "جُمـلـة الجُـمـلـة — أكبر منصة لبيع منتجات الجملة في السوق المصري بأسعار المصنع للتجار والموزعين."
    );
  }

  if (to.name && from.name === to.name && to.fullPath === from.fullPath) {
    next(false);
  } else {
    next();
  }
});

export default router;
