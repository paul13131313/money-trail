import { ProductData } from '@/types';

export const products: ProductData[] = [
  {
    id: "coffee",
    name: "コーヒー1杯",
    price: 500,
    category: "product",
    isRealData: true,
    dataSource: "Fairtrade Foundation / ICO",
    nodes: [
      { id: "retail", name: "カフェ利益・人件費・家賃", type: "retail", amount: 195, percentage: 39 },
      { id: "roaster", name: "焙煎業者", type: "manufacturing", amount: 90, percentage: 18, country: "日本" },
      { id: "importer", name: "輸入・商社", type: "distribution", amount: 75, percentage: 15 },
      { id: "processing", name: "産地精製・輸送", type: "distribution", amount: 65, percentage: 13 },
      { id: "farmer", name: "農家の収入", type: "labor", amount: 25, percentage: 5, country: "エチオピア・ブラジル・コロンビア",
        description: "生産者が受け取る金額はわずか5%。フェアトレード認証でも10〜12%程度。" },
      { id: "other", name: "農業資材・輸送費", type: "other", amount: 50, percentage: 10 }
    ]
  },
  {
    id: "tshirt",
    name: "Tシャツ",
    price: 3000,
    category: "product",
    isRealData: true,
    dataSource: "Clean Clothes Campaign / Fashion Transparency Index",
    nodes: [
      { id: "brand", name: "ブランド利益・マーケティング", type: "retail", amount: 900, percentage: 30 },
      { id: "retail2", name: "小売・流通コスト", type: "distribution", amount: 600, percentage: 20 },
      { id: "factory", name: "縫製工場（管理・設備）", type: "manufacturing", amount: 450, percentage: 15, country: "バングラデシュ・ベトナム" },
      { id: "fabric", name: "生地・染色・加工", type: "material", amount: 450, percentage: 15, country: "中国・インド" },
      { id: "labor", name: "縫製労働者の賃金", type: "labor", amount: 60, percentage: 2, country: "バングラデシュ",
        description: "縫製工の時給は約25〜40円。1枚のシャツを縫うのに約30分かかる。" },
      { id: "cotton", name: "綿花・原材料", type: "material", amount: 300, percentage: 10, country: "インド・アメリカ" },
      { id: "tax", name: "関税・輸送費・その他", type: "other", amount: 240, percentage: 8 }
    ]
  },
  {
    id: "iphone",
    name: "iPhone",
    price: 150000,
    category: "product",
    isRealData: true,
    dataSource: "Counterpoint Research / iFixit Teardown 2023",
    nodes: [
      { id: "apple_profit", name: "Apple利益・R&D・マーケティング", type: "retail", amount: 60000, percentage: 40 },
      { id: "retail3", name: "流通・小売マージン", type: "distribution", amount: 22500, percentage: 15 },
      { id: "foxconn", name: "Foxconn組み立てコスト", type: "manufacturing", amount: 7500, percentage: 5, country: "中国・インド" },
      { id: "display", name: "ディスプレイ（Samsung/LG）", type: "material", amount: 18000, percentage: 12, country: "韓国" },
      { id: "chip", name: "A17チップ（TSMC製造）", type: "material", amount: 15000, percentage: 10, country: "台湾" },
      { id: "camera", name: "カメラ・センサー（Sony等）", type: "material", amount: 9000, percentage: 6, country: "日本" },
      { id: "other_parts", name: "その他部品・素材", type: "material", amount: 12000, percentage: 8, country: "世界各地" },
      { id: "labor_iphone", name: "組み立て労働者の賃金", type: "labor", amount: 3000, percentage: 2, country: "中国・インド",
        description: "Foxconn工場の基本時給は約220〜280円。iPhoneの組み立てには約400工程が必要。" },
      { id: "tax2", name: "関税・輸送・その他", type: "other", amount: 3000, percentage: 2 }
    ]
  },
  {
    id: "sneakers",
    name: "スニーカー",
    price: 15000,
    category: "product",
    isRealData: true,
    dataSource: "Labour Behind the Label / Nike Annual Report",
    nodes: [
      { id: "brand2", name: "Nike利益・マーケティング・R&D", type: "retail", amount: 5250, percentage: 35 },
      { id: "retail4", name: "小売・流通コスト", type: "distribution", amount: 3000, percentage: 20 },
      { id: "factory2", name: "工場管理・設備コスト", type: "manufacturing", amount: 2250, percentage: 15, country: "ベトナム・インドネシア" },
      { id: "materials2", name: "素材（ゴム・メッシュ・接着剤）", type: "material", amount: 2700, percentage: 18, country: "中国・台湾" },
      { id: "labor2", name: "工場労働者の賃金", type: "labor", amount: 450, percentage: 3, country: "ベトナム",
        description: "ベトナム工場の最低賃金は月約2.5万円。スニーカー1足あたりの人件費は約450円。" },
      { id: "tax3", name: "関税・輸送・その他", type: "other", amount: 1350, percentage: 9 }
    ]
  },
  {
    id: "chocolate",
    name: "チョコレート1枚",
    price: 300,
    category: "product",
    isRealData: true,
    dataSource: "Tony's Chocolonely Annual Report / Fairtrade",
    nodes: [
      { id: "brand3", name: "ブランド・小売利益", type: "retail", amount: 105, percentage: 35 },
      { id: "manufacturer", name: "製造・包装コスト", type: "manufacturing", amount: 60, percentage: 20, country: "日本" },
      { id: "importer2", name: "輸入・商社", type: "distribution", amount: 45, percentage: 15 },
      { id: "cocoa_process", name: "カカオ精製・輸送", type: "distribution", amount: 39, percentage: 13 },
      { id: "farmer2", name: "カカオ農家の収入", type: "labor", amount: 18, percentage: 6, country: "コートジボワール・ガーナ",
        description: "世界のカカオの約70%はコートジボワール・ガーナ産。農家の1日収入は約200円以下の場合も。" },
      { id: "sugar", name: "砂糖・乳製品", type: "material", amount: 33, percentage: 11 }
    ]
  },
  {
    id: "gasoline",
    name: "ガソリン1L",
    price: 180,
    category: "product",
    isRealData: true,
    dataSource: "資源エネルギー庁 石油製品価格調査",
    nodes: [
      { id: "tax4", name: "ガソリン税・消費税", type: "other", amount: 72, percentage: 40 },
      { id: "crude", name: "原油代", type: "material", amount: 63, percentage: 35, country: "サウジアラビア・UAE・ロシア等" },
      { id: "refinery", name: "精製コスト", type: "manufacturing", amount: 22, percentage: 12 },
      { id: "distribution2", name: "輸送・流通コスト", type: "distribution", amount: 12, percentage: 7 },
      { id: "ss", name: "ガソリンスタンド利益", type: "retail", amount: 11, percentage: 6 }
    ]
  },
  {
    id: "water",
    name: "ペットボトル水",
    price: 150,
    category: "product",
    isRealData: true,
    dataSource: "各社IR・業界推定",
    nodes: [
      { id: "brand4", name: "ブランド・マーケティング利益", type: "retail", amount: 45, percentage: 30 },
      { id: "retail5", name: "小売マージン", type: "distribution", amount: 30, percentage: 20 },
      { id: "bottle", name: "PETボトル製造", type: "manufacturing", amount: 30, percentage: 20 },
      { id: "filling", name: "充填・検査・物流", type: "distribution", amount: 24, percentage: 16 },
      { id: "water_source", name: "採水・水源管理", type: "material", amount: 12, percentage: 8, country: "富士山麓・南アルプス等",
        description: "水そのものの原価は極めて低い。価格の大半はボトル・輸送・ブランドコスト。" },
      { id: "tax5", name: "消費税・その他", type: "other", amount: 9, percentage: 6 }
    ]
  },
  {
    id: "banana",
    name: "バナナ1本",
    price: 30,
    category: "product",
    isRealData: true,
    dataSource: "Fairtrade Foundation / バナナ労働者ネットワーク",
    nodes: [
      { id: "supermarket", name: "スーパー利益", type: "retail", amount: 9, percentage: 30 },
      { id: "importer3", name: "輸入・卸売業者", type: "distribution", amount: 8, percentage: 27 },
      { id: "shipping", name: "冷蔵輸送コスト", type: "distribution", amount: 6, percentage: 20 },
      { id: "plantation", name: "農園会社（土地・設備・農薬）", type: "manufacturing", amount: 4, percentage: 13, country: "フィリピン・エクアドル" },
      { id: "worker", name: "農園労働者の賃金", type: "labor", amount: 2, percentage: 7, country: "フィリピン・エクアドル",
        description: "大手プランテーション労働者の日当は約500〜700円。1日に数百本を収穫する。" },
      { id: "other2", name: "その他", type: "other", amount: 1, percentage: 3 }
    ]
  },
  {
    id: "gyudon",
    name: "牛丼1杯",
    price: 500,
    category: "product",
    isRealData: false,
    nodes: [
      { id: "store", name: "店舗運営・人件費・利益", type: "retail", amount: 150, percentage: 30 },
      { id: "beef", name: "牛肉（ショートプレート）", type: "material", amount: 125, percentage: 25, country: "アメリカ・オーストラリア" },
      { id: "rice", name: "米", type: "material", amount: 50, percentage: 10, country: "日本" },
      { id: "logistics", name: "物流・セントラルキッチン", type: "distribution", amount: 75, percentage: 15 },
      { id: "franchise", name: "本部・フランチャイズ費用", type: "other", amount: 50, percentage: 10 },
      { id: "condiment", name: "タレ・玉ねぎ・その他食材", type: "material", amount: 30, percentage: 6 },
      { id: "tax6", name: "消費税・諸経費", type: "other", amount: 20, percentage: 4 }
    ]
  },
  {
    id: "jeans",
    name: "ジーンズ",
    price: 10000,
    category: "product",
    isRealData: true,
    dataSource: "Labour Behind the Label",
    nodes: [
      { id: "brand5", name: "ブランド利益・マーケティング", type: "retail", amount: 3000, percentage: 30 },
      { id: "retail6", name: "小売・流通コスト", type: "distribution", amount: 2000, percentage: 20 },
      { id: "factory3", name: "工場コスト（設備・管理）", type: "manufacturing", amount: 1500, percentage: 15, country: "バングラデシュ・中国" },
      { id: "denim", name: "デニム生地", type: "material", amount: 1500, percentage: 15, country: "中国・トルコ" },
      { id: "cotton2", name: "綿花", type: "material", amount: 800, percentage: 8, country: "アメリカ・インド" },
      { id: "labor3", name: "縫製労働者の賃金", type: "labor", amount: 200, percentage: 2, country: "バングラデシュ",
        description: "ジーンズ1本の縫製には熟練作業員で約1時間。賃金は1本あたり200円程度。" },
      { id: "wash", name: "洗い加工・仕上げ", type: "manufacturing", amount: 600, percentage: 6 },
      { id: "tax7", name: "関税・輸送・その他", type: "other", amount: 400, percentage: 4 }
    ]
  },
  // --- 人生・社会 ---
  {
    id: "lifetime-income",
    name: "生涯年収3億円",
    price: 300000000,
    category: "life",
    isRealData: false,
    nodes: [
      { id: "tax_income", name: "所得税・住民税", type: "other", amount: 60000000, percentage: 20,
        description: "累進課税により高所得ほど税率が上がる。平均実効税率は約20%前後。" },
      { id: "social_ins", name: "社会保険料", type: "other", amount: 45000000, percentage: 15,
        description: "健康保険・厚生年金・雇用保険など。給与の約15%が天引きされる。" },
      { id: "housing", name: "住居費", type: "retail", amount: 54000000, percentage: 18,
        description: "賃貸・住宅ローン合計。都市部では生涯で5,000万円以上になることも。" },
      { id: "food_life", name: "食費", type: "material", amount: 36000000, percentage: 12 },
      { id: "education", name: "教育費", type: "distribution", amount: 30000000, percentage: 10,
        description: "子ども1人あたり1,000万円以上。大学まで私立だと2,500万円を超える場合も。" },
      { id: "transport", name: "交通・通信費", type: "distribution", amount: 24000000, percentage: 8 },
      { id: "savings", name: "貯蓄・投資", type: "manufacturing", amount: 27000000, percentage: 9,
        description: "日本の家計貯蓄率は約5〜10%。老後2,000万円問題も話題に。" },
      { id: "other_life", name: "その他（娯楽・医療・保険）", type: "other", amount: 24000000, percentage: 8 }
    ]
  },
  // --- エンタメ ---
  {
    id: "movie-ticket",
    name: "映画チケット",
    price: 1900,
    category: "entertainment",
    isRealData: false,
    nodes: [
      { id: "theater", name: "映画館（施設・人件費・利益）", type: "retail", amount: 950, percentage: 50,
        description: "映画館の取り分は約50%。ポップコーン等の売店が利益の大部分を占める。" },
      { id: "distributor", name: "配給会社", type: "distribution", amount: 380, percentage: 20 },
      { id: "production", name: "制作費（監督・俳優・スタッフ）", type: "manufacturing", amount: 285, percentage: 15,
        description: "ハリウッド大作の制作費は200〜300億円。日本映画は平均3〜5億円。" },
      { id: "marketing_movie", name: "宣伝・マーケティング", type: "retail", amount: 152, percentage: 8 },
      { id: "tax_movie", name: "消費税", type: "other", amount: 133, percentage: 7 }
    ]
  },
  {
    id: "spotify",
    name: "Spotify月額",
    price: 980,
    category: "entertainment",
    isRealData: false,
    nodes: [
      { id: "royalty", name: "アーティスト・権利者", type: "labor", amount: 294, percentage: 30,
        description: "Spotifyの1再生あたりの支払いは約0.3〜0.5円。月1万再生で3,000〜5,000円。" },
      { id: "label", name: "レコード会社", type: "distribution", amount: 245, percentage: 25,
        description: "レコード会社がロイヤリティの大半を受け取り、アーティストへの分配は一部。" },
      { id: "spotify_profit", name: "Spotify運営（開発・サーバー）", type: "manufacturing", amount: 245, percentage: 25 },
      { id: "spotify_marketing", name: "マーケティング・営業", type: "retail", amount: 98, percentage: 10 },
      { id: "tax_spotify", name: "決済手数料・税", type: "other", amount: 98, percentage: 10 }
    ]
  },
  // --- ブラック枠 ---
  {
    id: "cigarette",
    name: "タバコ1本",
    price: 30,
    category: "dark",
    isRealData: false,
    nodes: [
      { id: "tobacco_tax", name: "たばこ税・消費税", type: "other", amount: 19, percentage: 63,
        description: "タバコ価格の約6割が税金。国・地方たばこ税、たばこ特別税、消費税の4重課税。" },
      { id: "jt_profit", name: "JT利益・販売管理費", type: "retail", amount: 5, percentage: 16 },
      { id: "tobacco_leaf", name: "葉タバコ原料", type: "material", amount: 3, percentage: 10, country: "ブラジル・中国・インド",
        description: "葉タバコ農家の多くは途上国の小規模農家。児童労働の問題も指摘されている。" },
      { id: "manufacturing_cig", name: "製造コスト", type: "manufacturing", amount: 2, percentage: 7 },
      { id: "filter", name: "フィルター・包装", type: "material", amount: 1, percentage: 4 }
    ]
  },
  {
    id: "gacha",
    name: "スマホゲーム課金",
    price: 10000,
    category: "dark",
    isRealData: false,
    nodes: [
      { id: "platform_fee", name: "Apple/Google手数料", type: "distribution", amount: 3000, percentage: 30,
        description: "アプリストアは売上の30%を手数料として徴収。開発者の最大の支出先。" },
      { id: "game_profit", name: "運営会社利益", type: "retail", amount: 2500, percentage: 25 },
      { id: "dev_cost", name: "開発・サーバー運用", type: "manufacturing", amount: 2000, percentage: 20,
        description: "ソーシャルゲームの開発費は数億〜数十億円。サーバー費用も高額。" },
      { id: "marketing_game", name: "広告・マーケティング", type: "retail", amount: 1500, percentage: 15,
        description: "ユーザー1人獲得コスト（CPI）は数百〜数千円。広告費は売上の15〜25%。" },
      { id: "creator_pay", name: "クリエイター報酬", type: "labor", amount: 500, percentage: 5,
        description: "イラストレーター・声優・シナリオライターへの報酬。全体の5%程度。" },
      { id: "tax_game", name: "消費税・その他", type: "other", amount: 500, percentage: 5 }
    ]
  },
];
