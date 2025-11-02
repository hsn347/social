export type Language = 'en' | 'ar' | 'tr';

export interface Translations {
  // Navigation
  home: string;
  signIn: string;
  signOut: string;
  signInWithGoogle: string;
  signInWithGitHub: string;
  
  // Theme
  lightMode: string;
  darkMode: string;
  systemMode: string;
  
  // Home Page
  dashboard: string;
  data: string;
  edit: string;
  save: string;
  cancel: string;
  saving: string;
  delete: string;
  addNew: string;
  createdOn: string;
  
  // Data Fields
  email: string;
  password: string;
  troopsTraining: string;
  shield: string;
  attackOutsideCastle: string;
  productionInsideCastle: string;
  maxTwoOptions: string;
  chooseAttackType: string;
  addNewAttack: string;
  
  // Resources
  wood: string;
  wheat: string;
  iron: string;
  diamond: string;
  
  // Status
  active: string;
  inactive: string;
  enabled: string;
  disabled: string;
  selected: string;
  
  // Messages
  mustSignIn: string;
  noDataAvailable: string;
  checkUsernameMatch: string;
  loadingAuth: string;
  loadingData: string;
  errorLoadingData: string;
  retry: string;
  noPermission: string;
  rowNotFound: string;
  errorSaving: string;
  
  // Attack Options
  attackOutsideCastleMaxTwo: string;
  alreadySelected: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: 'Home',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    signInWithGoogle: 'Sign in with Google',
    signInWithGitHub: 'Sign in with GitHub',
    
    // Theme
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    systemMode: 'System Mode',
    
    // Home Page
    dashboard: 'Dashboard',
    data: 'Data',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    saving: 'Saving...',
    delete: 'Delete',
    addNew: 'Add New',
    createdOn: 'Created:',
    
    // Data Fields
    email: 'Email',
    password: 'Password',
    troopsTraining: 'Troops Training',
    shield: 'Shield',
    attackOutsideCastle: 'Attack Outside Castle',
    productionInsideCastle: 'Production Inside Castle',
    maxTwoOptions: 'Maximum Two Options',
    chooseAttackType: 'Choose Attack Type',
    addNewAttack: 'Add New Attack',
    
    // Resources
    wood: 'Wood',
    wheat: 'Wheat',
    iron: 'Iron',
    diamond: 'Diamond',
    
    // Status
    active: 'Active',
    inactive: 'Inactive',
    enabled: 'Enabled',
    disabled: 'Disabled',
    selected: 'Selected',
    
    // Messages
    mustSignIn: 'You must sign in to view data',
    noDataAvailable: 'No data available',
    checkUsernameMatch: 'Make sure the username in the data matches your account',
    loadingAuth: 'Loading authentication...',
    loadingData: 'Loading data...',
    errorLoadingData: 'Error loading data',
    retry: 'Retry',
    noPermission: 'You do not have permission to modify this data',
    rowNotFound: 'Row not found',
    errorSaving: 'Error saving data',
    
    // Attack Options
    attackOutsideCastleMaxTwo: 'Attack Outside Castle (Maximum Two Options)',
    alreadySelected: '(Already Selected)',
  },
  
  ar: {
    // Navigation
    home: 'الرئيسية',
    signIn: 'تسجيل الدخول',
    signOut: 'تسجيل الخروج',
    signInWithGoogle: 'تسجيل الدخول عبر Google',
    signInWithGitHub: 'تسجيل الدخول عبر GitHub',
    
    // Theme
    lightMode: 'الوضع النهاري',
    darkMode: 'الوضع الليلي',
    systemMode: 'وضع النظام',
    
    // Home Page
    dashboard: 'لوحة التحكم',
    data: 'البيانات',
    edit: 'تعديل',
    save: 'حفظ',
    cancel: 'إلغاء',
    saving: 'جاري الحفظ...',
    delete: 'حذف',
    addNew: 'إضافة جديد',
    createdOn: 'تم الإنشاء:',
    
    // Data Fields
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    troopsTraining: 'تدريب القوات',
    shield: 'الدرع',
    attackOutsideCastle: 'الهجوم خارج القلعة',
    productionInsideCastle: 'الانتاج داخل القلعة',
    maxTwoOptions: 'حد أقصى خيارين',
    chooseAttackType: 'اختر نوع الهجوم',
    addNewAttack: 'إضافة هجوم جديد',
    
    // Resources
    wood: 'خشب',
    wheat: 'قمح',
    iron: 'حديد',
    diamond: 'الماس',
    
    // Status
    active: 'مفعل',
    inactive: 'معطل',
    enabled: 'مفعل',
    disabled: 'معطل',
    selected: 'مختار',
    
    // Messages
    mustSignIn: 'يجب تسجيل الدخول لعرض البيانات',
    noDataAvailable: 'لا توجد بيانات متاحة',
    checkUsernameMatch: 'تأكد من أن اسم المستخدم في البيانات يطابق حسابك',
    loadingAuth: 'جاري تحميل حالة المصادقة...',
    loadingData: 'جاري تحميل البيانات...',
    errorLoadingData: 'حدث خطأ في جلب البيانات',
    retry: 'إعادة المحاولة',
    noPermission: 'ليس لديك صلاحية لتعديل هذه البيانات',
    rowNotFound: 'الصف غير موجود',
    errorSaving: 'حدث خطأ في حفظ البيانات',
    
    // Attack Options
    attackOutsideCastleMaxTwo: 'الهجوم خارج القلعة (حد أقصى خيارين)',
    alreadySelected: '(مختار مسبقاً)',
  },
  
  tr: {
    // Navigation
    home: 'Ana Sayfa',
    signIn: 'Giriş Yap',
    signOut: 'Çıkış Yap',
    signInWithGoogle: 'Google ile Giriş Yap',
    signInWithGitHub: 'GitHub ile Giriş Yap',
    
    // Theme
    lightMode: 'Açık Mod',
    darkMode: 'Koyu Mod',
    systemMode: 'Sistem Modu',
    
    // Home Page
    dashboard: 'Kontrol Paneli',
    data: 'Veriler',
    edit: 'Düzenle',
    save: 'Kaydet',
    cancel: 'İptal',
    saving: 'Kaydediliyor...',
    delete: 'Sil',
    addNew: 'Yeni Ekle',
    createdOn: 'Oluşturuldu:',
    
    // Data Fields
    email: 'E-posta',
    password: 'Şifre',
    troopsTraining: 'Birlik Eğitimi',
    shield: 'Kalkan',
    attackOutsideCastle: 'Kale Dışı Saldırı',
    productionInsideCastle: 'Kale İçi Üretim',
    maxTwoOptions: 'Maksimum İki Seçenek',
    chooseAttackType: 'Saldırı Türü Seç',
    addNewAttack: 'Yeni Saldırı Ekle',
    
    // Resources
    wood: 'Odun',
    wheat: 'Buğday',
    iron: 'Demir',
    diamond: 'Elmas',
    
    // Status
    active: 'Aktif',
    inactive: 'Pasif',
    enabled: 'Etkin',
    disabled: 'Devre Dışı',
    selected: 'Seçili',
    
    // Messages
    mustSignIn: 'Verileri görüntülemek için giriş yapmalısınız',
    noDataAvailable: 'Veri bulunmuyor',
    checkUsernameMatch: 'Verilerdeki kullanıcı adının hesabınızla eşleştiğinden emin olun',
    loadingAuth: 'Kimlik doğrulama yükleniyor...',
    loadingData: 'Veriler yükleniyor...',
    errorLoadingData: 'Veri yükleme hatası',
    retry: 'Tekrar Dene',
    noPermission: 'Bu verileri değiştirme izniniz yok',
    rowNotFound: 'Satır bulunamadı',
    errorSaving: 'Veri kaydetme hatası',
    
    // Attack Options
    attackOutsideCastleMaxTwo: 'Kale Dışı Saldırı (Maksimum İki Seçenek)',
    alreadySelected: '(Zaten Seçili)',
  },
};
