import { ProductData } from '@/types';

export const products: ProductData[] = [
  {
    id: "coffee",
    name: "コーヒー1杯",
    price: 500,
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
];
