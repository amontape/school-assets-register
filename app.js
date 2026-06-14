const STORAGE_KEY = "schoolAssetRegisterData";
const ASSETS_COLLECTION = "assets";

const firebaseConfig = {
  apiKey: "AIzaSyBGE94WK8S7ZEP2XsdjcWQ5s5kAeK5mrxM",
  authDomain: "school-assets-register.firebaseapp.com",
  projectId: "school-assets-register",
  storageBucket: "school-assets-register.firebasestorage.app",
  messagingSenderId: "531432697704",
  appId: "1:531432697704:web:7b4ebad6731cea0e54f0dd",
  measurementId: "G-TENDZR3QYV"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const assetsCollection = db.collection(ASSETS_COLLECTION);

const categories = [
  "ครุภัณฑ์สำนักงาน",
  "ครุภัณฑ์ยานพาหนะและขนส่ง",
  "ครุภัณฑ์ไฟฟ้าและวิทยุ",
  "ครุภัณฑ์โฆษณาและเผยแพร่",
  "ครุภัณฑ์การเกษตร",
  "ครุภัณฑ์โรงงาน",
  "ครุภัณฑ์ก่อสร้าง",
  "ครุภัณฑ์สำรวจ",
  "ครุภัณฑ์วิทยาศาสตร์และการแพทย์",
  "ครุภัณฑ์คอมพิวเตอร์",
  "ครุภัณฑ์การศึกษา",
  "ครุภัณฑ์งานบ้านงานครัว",
  "ครุภัณฑ์กีฬา",
  "ครุภัณฑ์ดนตรีและนาฏศิลป์",
  "ครุภัณฑ์สนาม",
  "ครุภัณฑ์อื่น ๆ"
];

const defaultAssetData = {
  "ครุภัณฑ์สำนักงาน": [
    {
      name: "เก้าอี้สำนักงาน",
      code: "7110-001-0001/67",
      feature: "เก้าอี้มีพนักพิง ใช้ประจำห้องธุรการ",
      location: "ห้องธุรการ",
      owner: "เจ้าหน้าที่พัสดุ",
      quantity: "12",
      price: "1,250.00",
      life: "5",
      acquiredDate: "1 ต.ค. 2567",
      depreciation: "yes",
      government: "สพป.ขอนแก่น เขต 2",
      organization: "โรงเรียนบ้านทุ่งมน",
      seller: "-",
      budget: "เงินงบประมาณ",
      method: "เฉพาะเจาะจง",
      image: "ยังไม่ได้เพิ่มรูป"
    },
    {
      name: "โต๊ะสำนักงาน",
      code: "7110-002-0001/67",
      feature: "โต๊ะทำงานพร้อมลิ้นชัก",
      location: "ห้องธุรการ",
      owner: "เจ้าหน้าที่พัสดุ",
      quantity: "6",
      price: "3,500.00",
      life: "5",
      acquiredDate: "1 ต.ค. 2567",
      depreciation: "yes",
      government: "สพป.ขอนแก่น เขต 2",
      organization: "โรงเรียนบ้านทุ่งมน",
      seller: "-",
      budget: "เงินงบประมาณ",
      method: "เฉพาะเจาะจง",
      image: "ยังไม่ได้เพิ่มรูป"
    }
  ],
  "ครุภัณฑ์คอมพิวเตอร์": [
    {
      name: "คอมพิวเตอร์ตั้งโต๊ะ",
      code: "7440-001-0001/67",
      feature: "คอมพิวเตอร์สำหรับงานสำนักงาน",
      location: "ห้องคอมพิวเตอร์",
      owner: "ครูผู้รับผิดชอบห้องคอม",
      quantity: "10",
      price: "18,000.00",
      life: "5",
      acquiredDate: "1 ต.ค. 2567",
      depreciation: "yes",
      government: "สพป.ขอนแก่น เขต 2",
      organization: "โรงเรียนบ้านทุ่งมน",
      seller: "-",
      budget: "เงินงบประมาณ",
      method: "เฉพาะเจาะจง",
      image: "ยังไม่ได้เพิ่มรูป"
    },
    {
      name: "เครื่องพิมพ์",
      code: "7440-002-0001/67",
      feature: "เครื่องพิมพ์เลเซอร์ขาวดำ",
      location: "ห้องธุรการ",
      owner: "เจ้าหน้าที่ธุรการ",
      quantity: "2",
      price: "5,900.00",
      life: "5",
      acquiredDate: "1 ต.ค. 2567",
      depreciation: "yes",
      government: "สพป.ขอนแก่น เขต 2",
      organization: "โรงเรียนบ้านทุ่งมน",
      seller: "-",
      budget: "เงินงบประมาณ",
      method: "เฉพาะเจาะจง",
      image: "ยังไม่ได้เพิ่มรูป"
    }
  ]
};

const depreciationRules = {
  "ครุภัณฑ์สำนักงาน": {
    before2554: { life: 8, rate: 8.5 },
    from2554: { life: 3, rate: 33.33 },
    from2558: { life: 3, rate: 8 },
    current: { life: 3, rate: 33.33 }
  },
  "ครุภัณฑ์ยานพาหนะและขนส่ง": {
    before2554: { life: 5, rate: 12.5 },
    from2554: { life: 5, rate: 20 },
    from2558: { life: 5, rate: 3 },
    current: { life: 5, rate: 20 }
  },
  "ครุภัณฑ์ไฟฟ้าและวิทยุ": {
    before2554: { life: 5, rate: 10 },
    from2554: { life: 5, rate: 20 },
    from2558: { life: 5, rate: 10 },
    current: { life: 5, rate: 20 }
  },
  "ครุภัณฑ์โฆษณาและเผยแพร่": {
    before2554: { life: 5, rate: 10 },
    from2554: { life: 5, rate: 20 },
    from2558: { life: 5, rate: 10 },
    current: { life: 5, rate: 20 }
  },
  "ครุภัณฑ์การเกษตร": {
    before2554: { life: 5, rate: 12.5 },
    from2554: { life: 5, rate: 20 },
    from2558: { life: 3, rate: 10 },
    current: { life: 5, rate: 20 }
  },
  "ครุภัณฑ์โรงงาน": {
    before2554: { life: 5, rate: 12.5 },
    from2554: { life: 5, rate: 20 },
    from2558: { life: 3, rate: 10 },
    current: { life: 5, rate: 20 }
  },
  "ครุภัณฑ์ก่อสร้าง": {
    before2554: { life: 5, rate: 12.5 },
    from2554: { life: 5, rate: 20 },
    from2558: { life: 3, rate: 10 },
    current: { life: 5, rate: 20 }
  },
  "ครุภัณฑ์สำรวจ": {
    before2554: { life: 8, rate: 10 },
    from2554: { life: 8, rate: 12.5 },
    from2558: { life: 5, rate: 10 },
    current: { life: 8, rate: 12.5 }
  },
  "ครุภัณฑ์วิทยาศาสตร์และการแพทย์": {
    before2554: { life: 5, rate: 12.5 },
    from2554: { life: 5, rate: 20 },
    from2558: { life: 5, rate: 6.5 },
    current: { life: 5, rate: 20 }
  },
  "ครุภัณฑ์คอมพิวเตอร์": {
    before2554: { life: 3, rate: 20 },
    from2554: { life: 3, rate: 33.33 },
    from2558: { life: 3, rate: 20 },
    current: { life: 3, rate: 33.33 }
  },
  "ครุภัณฑ์การศึกษา": {
    from2554: { life: 3, rate: 33.33 },
    from2558: { life: 2, rate: 20 },
    current: { life: 3, rate: 33.33 }
  },
  "ครุภัณฑ์งานบ้านงานครัว": {
    from2554: { life: 3, rate: 33.33 },
    from2558: { life: 2, rate: 20 },
    current: { life: 3, rate: 33.33 }
  },
  "ครุภัณฑ์กีฬา": {
    from2554: { life: 5, rate: 20 },
    from2558: { life: 2, rate: 20 },
    current: { life: 5, rate: 20 }
  },
  "ครุภัณฑ์ดนตรีและนาฏศิลป์": {
    from2554: { life: 5, rate: 20 },
    from2558: { life: 2, rate: 20 },
    current: { life: 5, rate: 20 }
  },
  "ครุภัณฑ์สนาม": {
    from2554: { life: 2, rate: 50 },
    from2558: { life: 2, rate: 20 },
    current: { life: 2, rate: 50 }
  },
  "ครุภัณฑ์อื่น ๆ": {
    from2558: { life: 2, rate: 6.5 },
    current: { life: 5, rate: 20 }
  }
};

let assetData = loadAssetData();
let currentCategory = "";
let currentSelectedIndex = -1;
let lastSavedCategory = "";
let lastSavedItemName = "";
let uploadedImageData = "";
let isCloudConnected = false;

const views = {
  home: document.querySelector("#homeView"),
  category: document.querySelector("#categoryView"),
  items: document.querySelector("#itemsView"),
  form: document.querySelector("#formView"),
  success: document.querySelector("#successView")
};

function showView(name) {
  Object.values(views).forEach((view) => view.classList.remove("active"));
  views[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function loadAssetData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return { ...defaultAssetData, ...parsedData };
    }
  } catch (error) {
    console.warn("Cannot load saved asset data", error);
  }

  return { ...defaultAssetData };
}

function saveAssetData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assetData));
  } catch (error) {
    alert("บันทึกข้อมูลในเครื่องไม่สำเร็จ กรุณาตรวจสอบพื้นที่จัดเก็บของเบราว์เซอร์");
  }
}

function updateSyncStatus(message, isError = false) {
  const syncStatus = document.querySelector("#syncStatus");
  if (!syncStatus) {
    return;
  }

  syncStatus.textContent = message;
  syncStatus.style.background = isError ? "rgba(180, 35, 24, 0.85)" : "rgba(255, 255, 255, 0.12)";
}

function emptyAssetGroups() {
  return categories.reduce((groups, category) => {
    groups[category] = [];
    return groups;
  }, {});
}

function removeLocalOnlyFields(item) {
  const { imageData, _cloudId, ...cloudItem } = item;
  return cloudItem;
}

function startCloudSync() {
  assetsCollection.onSnapshot((snapshot) => {
    const cloudData = emptyAssetGroups();
    snapshot.forEach((documentSnapshot) => {
      const item = {
        ...documentSnapshot.data(),
        _cloudId: documentSnapshot.id
      };
      const category = item.category || "ครุภัณฑ์อื่น ๆ";
      if (!cloudData[category]) {
        cloudData[category] = [];
      }
      cloudData[category].push(item);
    });

    assetData = cloudData;
    isCloudConnected = true;
    saveAssetData();
    renderCategories();
    if (currentCategory) {
      renderItems(currentCategory, lastSavedItemName);
    }
    updateSyncStatus("เชื่อมต่อฐานข้อมูลกลางแล้ว");
  }, (error) => {
    console.error("Cannot connect Firestore", error);
    isCloudConnected = false;
    updateSyncStatus("ยังเชื่อมต่อฐานข้อมูลกลางไม่ได้ ตรวจสอบว่าเปิด Firestore แล้ว", true);
  });
}

function setupCategoryOptions() {
  const formCategory = document.querySelector("#formCategory");
  categories.forEach((category, index) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = `${String(index + 1).padStart(2, "0")} ${category}`;
    formCategory.append(option);
  });
}

function parseNumber(value) {
  const number = Number(String(value || "0").replace(/,/g, ""));
  return Number.isFinite(number) ? number : 0;
}

function formatMoney(value) {
  return value.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toThaiDigits(value) {
  return String(value ?? "").replace(/\d/g, (digit) => "๐๑๒๓๔๕๖๗๘๙"[Number(digit)]);
}

function displayDate(value) {
  const date = parseThaiDate(value);
  const monthNames = ["", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  return `${date.day} ${monthNames[date.month]} ${date.year}`;
}

function formatPrintMoney(value) {
  return toThaiDigits(formatMoney(value));
}

function parseThaiDate(value) {
  const text = String(value || "").trim();
  const monthMap = {
    "ม.ค.": 1,
    "ก.พ.": 2,
    "มี.ค.": 3,
    "เม.ย.": 4,
    "พ.ค.": 5,
    "มิ.ย.": 6,
    "ก.ค.": 7,
    "ส.ค.": 8,
    "ก.ย.": 9,
    "ต.ค.": 10,
    "พ.ย.": 11,
    "ธ.ค.": 12
  };
  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    return {
      day: Number(iso[3]),
      month: Number(iso[2]),
      year: Number(iso[1]) + 543
    };
  }

  const slash = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (slash) {
    return {
      day: Number(slash[1]),
      month: Number(slash[2]),
      year: Number(slash[3])
    };
  }

  const thai = text.match(/^(\d{1,2})\s*([ก-ฮ.]+)\s*(\d{4})$/);
  if (thai && monthMap[thai[2]]) {
    return {
      day: Number(thai[1]),
      month: monthMap[thai[2]],
      year: Number(thai[3])
    };
  }

  return {
    day: 1,
    month: 10,
    year: new Date().getFullYear() + 543
  };
}

function fiscalYearEnd(date) {
  return date.month >= 10 ? date.year + 1 : date.year;
}

function nextMonth(date) {
  if (date.month === 12) {
    return { day: 1, month: 1, year: date.year + 1 };
  }

  return { day: 1, month: date.month + 1, year: date.year };
}

function depreciationStartDate(date) {
  return date.day <= 15 ? date : nextMonth(date);
}

function firstPeriodMonths(date) {
  const startDate = depreciationStartDate(date);
  return startDate.month >= 10 ? 22 - startDate.month : 10 - startDate.month;
}

function firstFiscalYearEnd(date) {
  const startDate = depreciationStartDate(date);
  return fiscalYearEnd(startDate);
}

function getDepreciationRule(category, date) {
  const rules = depreciationRules[category] || depreciationRules["ครุภัณฑ์อื่น ๆ"];
  const comparable = date.year * 10000 + date.month * 100 + date.day;

  if (comparable >= 25590223 && rules.current) {
    return rules.current;
  }

  if (comparable >= 25581001 && rules.from2558) {
    return rules.from2558;
  }

  if (comparable >= 25541001 && rules.from2554) {
    return rules.from2554;
  }

  return rules.before2554 || rules.from2554 || rules.current || { life: 5, rate: 20 };
}

function calculateDepreciation(item) {
  const quantity = Math.max(1, parseNumber(item.quantity));
  const price = parseNumber(item.price);
  const totalValue = quantity * price;
  const acquiredDate = parseThaiDate(item.acquiredDate);
  const rule = getDepreciationRule(item.category || currentCategory, acquiredDate);
  const life = rule.life || Math.max(1, parseNumber(item.life || "5"));
  const rate = rule.rate || (100 / life);
  const annual = totalValue * rate / 100;
  const schedule = [];

  if (totalValue < 5000 || totalValue <= 1 || item.depreciation === "no") {
    return { totalValue, life, rate, annual, schedule };
  }

  let accumulated = 0;
  let year = firstFiscalYearEnd(acquiredDate);
  let months = firstPeriodMonths(acquiredDate);

  while (accumulated < totalValue - 1 && schedule.length < life + 2) {
    const rawDepreciation = annual * (months / 12);
    const depreciation = Math.min(rawDepreciation, totalValue - 1 - accumulated);
    accumulated += depreciation;
    schedule.push({
      date: `30 ก.ย. ${year}`,
      note: `คำนวณค่าเสื่อมประจำปีงบประมาณ ${year}`,
      months,
      depreciation,
      accumulated,
      netValue: totalValue - accumulated
    });
    year += 1;
    months = 12;
  }

  return { totalValue, life, rate, annual, schedule };
}

function renderDepreciation(item) {
  const result = calculateDepreciation(item);
  if (result.totalValue < 5000) {
    return "<p>รายการนี้มูลค่าต่ำกว่า 5,000 บาท จึงไม่ต้องคำนวณค่าเสื่อมตามแบบฟอร์มตัวอย่าง</p>";
  }

  if (item.depreciation === "no" || result.schedule.length === 0) {
    return "<p>รายการนี้เลือกไม่คำนวณค่าเสื่อม</p>";
  }

  const rows = result.schedule.map((row) => `
    <tr>
      <td>${row.date}</td>
      <td>${row.note}</td>
      <td>${row.months} เดือน</td>
      <td>${formatMoney(row.depreciation)}</td>
      <td>${formatMoney(row.accumulated)}</td>
      <td>${formatMoney(row.netValue)}</td>
    </tr>
  `).join("");

  return `
    <div class="depreciation-box">
      <h4>ตารางคำนวณค่าเสื่อม</h4>
      <table class="depreciation-table">
        <thead>
          <tr>
            <th>วัน เดือน ปี</th>
            <th>รายการ</th>
            <th>ระยะเวลา</th>
            <th>ค่าเสื่อมประจำปี</th>
            <th>ค่าเสื่อมสะสม</th>
            <th>มูลค่าสุทธิ</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderAssetPhoto(item) {
  if (item.imageData) {
    return `<img src="${item.imageData}" alt="${escapeHtml(item.name || "รูปครุภัณฑ์")}">`;
  }

  return `<span>${escapeHtml(item.image || "รูปครุภัณฑ์")}</span>`;
}

function renderCategories() {
  const categoryGrid = document.querySelector("#categoryGrid");
  categoryGrid.replaceChildren();

  categories.forEach((category, index) => {
    const count = assetData[category]?.length ?? 0;
    const button = document.createElement("button");
    button.className = "category-card";
    button.type = "button";
    button.innerHTML = `<strong>${String(index + 1).padStart(2, "0")} ${escapeHtml(category)}</strong><span>${count} รายการ</span>`;
    button.addEventListener("click", () => renderItems(category));
    categoryGrid.append(button);
  });
}

function renderItems(category, selectedItemName = "") {
  currentCategory = category;
  document.querySelector("#selectedCategoryTitle").textContent = category;
  document.querySelector("#selectedCategoryLabel").textContent = "ข้อมูลของหมวดที่กดเข้ามา";

  const itemList = document.querySelector("#itemList");
  itemList.replaceChildren();

  const items = assetData[category] ?? [];
  if (items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "item-button";
    empty.innerHTML = "<strong>ยังไม่มีข้อมูลในหมวดนี้</strong><span>กดเพิ่มครุภัณฑ์ใหม่เพื่อบันทึกข้อมูล</span>";
    itemList.append(empty);
    renderDetail(null);
  } else {
    items.forEach((item, index) => {
      const button = document.createElement("button");
      button.className = "item-button";
      button.type = "button";
      button.innerHTML = `<strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.code || "ยังไม่มีรหัส")} | ${escapeHtml(item.location || "ยังไม่ระบุสถานที่")}</span>`;
      button.addEventListener("click", () => renderDetail(item, index));
      itemList.append(button);
    });
    const selectedItem = items.find((item) => item.name === selectedItemName) || items[0];
    renderDetail(selectedItem, items.indexOf(selectedItem));
  }

  showView("items");
}

function renderDetail(item, index = -1) {
  const detailPanel = document.querySelector("#detailPanel");
  currentSelectedIndex = index;
  if (!item) {
    currentSelectedIndex = -1;
    detailPanel.innerHTML = `
      <div class="asset-photo"><span>ไม่มีรูปภาพ</span></div>
      <h3>ยังไม่มีรายการครุภัณฑ์</h3>
      <p>หมวดนี้ยังไม่มีข้อมูล ให้เพิ่มครุภัณฑ์ใหม่จากหน้าเพิ่มข้อมูล</p>
    `;
    return;
  }

  const depreciation = calculateDepreciation(item);
  detailPanel.innerHTML = `
    <div class="asset-photo">${renderAssetPhoto(item)}</div>
    <h3>${escapeHtml(item.name)}</h3>
    <div class="detail-actions">
      <button class="primary-button" id="printAssetButton" type="button">พิมพ์ทะเบียน</button>
      <button class="danger-button" id="deleteAssetButton" type="button">ลบครุภัณฑ์</button>
    </div>
    <table class="detail-table">
      <tr><th>ส่วนราชการ</th><td>${escapeHtml(item.government || "-")}</td></tr>
      <tr><th>หน่วยงาน</th><td>${escapeHtml(item.organization || "-")}</td></tr>
      <tr><th>รหัสครุภัณฑ์</th><td>${escapeHtml(item.code || "-")}</td></tr>
      <tr><th>ลักษณะ/สมบัติ</th><td>${escapeHtml(item.feature || "-")}</td></tr>
      <tr><th>รุ่นแบบ</th><td>${escapeHtml(item.model || "-")}</td></tr>
      <tr><th>สถานที่ตั้ง</th><td>${escapeHtml(item.location || "-")}</td></tr>
      <tr><th>ผู้รับผิดชอบ</th><td>${escapeHtml(item.owner || "-")}</td></tr>
      <tr><th>ผู้ขาย/ผู้บริจาค</th><td>${escapeHtml(item.seller || "-")}</td></tr>
      <tr><th>วันที่ได้มา</th><td>${escapeHtml(displayDate(item.acquiredDate))}</td></tr>
      <tr><th>ประเภทเงิน</th><td>${escapeHtml(item.budget || "-")}</td></tr>
      <tr><th>วิธีการได้มา</th><td>${escapeHtml(item.method || "-")}</td></tr>
      <tr><th>จำนวน</th><td>${escapeHtml(item.quantity || "-")}</td></tr>
      <tr><th>ราคาต่อหน่วย</th><td>${escapeHtml(item.price || "-")}</td></tr>
      <tr><th>มูลค่ารวม</th><td>${formatMoney(depreciation.totalValue)}</td></tr>
      <tr><th>อายุใช้งาน</th><td>${depreciation.life} ปี</td></tr>
      <tr><th>อัตราค่าเสื่อม</th><td>${formatMoney(depreciation.rate)} %</td></tr>
      <tr><th>ค่าเสื่อมต่อปี</th><td>${formatMoney(depreciation.annual)}</td></tr>
      <tr><th>หมายเหตุ</th><td>${escapeHtml(item.note || "-")}</td></tr>
    </table>
    ${renderDepreciation(item)}
  `;

  document.querySelector("#printAssetButton").addEventListener("click", () => printAsset(item));
  document.querySelector("#deleteAssetButton").addEventListener("click", deleteCurrentAsset);
}

function markChoice(current, choice) {
  return current === choice ? "[ / ]" : "[   ]";
}

function printRows(item) {
  const depreciation = calculateDepreciation(item);
  const date = displayDate(item.acquiredDate);
  const unitPrice = parseNumber(item.price);
  const rows = [
    `
      <tr>
        <td>${toThaiDigits(date)}</td>
        <td>${escapeHtml(item.code || "-")}</td>
        <td class="left">${escapeHtml(item.name || "-")}</td>
        <td>${toThaiDigits(item.quantity || "-")}</td>
        <td class="right">${formatPrintMoney(unitPrice)}</td>
        <td class="right">${formatPrintMoney(depreciation.totalValue)}</td>
        <td>${toThaiDigits(`${depreciation.life} ปี`)}</td>
        <td>${toThaiDigits(formatMoney(depreciation.rate))} %</td>
        <td class="right">${formatPrintMoney(depreciation.annual)}</td>
        <td></td>
        <td class="right">${formatPrintMoney(depreciation.totalValue)}</td>
        <td>${escapeHtml(item.note || "")}</td>
      </tr>
    `
  ];

  depreciation.schedule.forEach((row) => {
    rows.push(`
      <tr>
        <td>${toThaiDigits(row.date)}</td>
        <td></td>
        <td class="left">${escapeHtml(row.note)}</td>
        <td></td>
        <td></td>
        <td></td>
        <td>${toThaiDigits(`${row.months} เดือน`)}</td>
        <td></td>
        <td class="right">${formatPrintMoney(row.depreciation)}</td>
        <td class="right">${formatPrintMoney(row.accumulated)}</td>
        <td class="right">${formatPrintMoney(row.netValue)}</td>
        <td></td>
      </tr>
    `);
  });

  while (rows.length < 14) {
    rows.push('<tr class="blank-row"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
  }

  return rows.join("");
}

function printAsset(item) {
  const budget = item.budget || "";
  const method = item.method || "";
  const printArea = document.querySelector("#printArea");
  printArea.innerHTML = `
    <div class="print-document">
      <div class="print-title">ทะเบียนคุมทรัพย์สิน</div>
      <div class="print-top">
        <div></div>
        <div></div>
        <div class="print-line">ส่วนราชการ : ${escapeHtml(item.government || "-")}</div>
        <div></div>
        <div class="center print-line">หน่วยงาน : ${escapeHtml(item.organization || "-")}</div>
        <div></div>
      </div>
      <div class="print-meta-row print-line">
        <div>ประเภท : ${escapeHtml(currentCategory || "-")} - ${escapeHtml(item.name || "-")}</div>
        <div>รหัส : ${escapeHtml(item.code || "-")}</div>
        <div>แบบรุ่น : ${escapeHtml(item.model || "-")}</div>
      </div>
      <div class="print-meta-row two print-line">
        <div>สถานที่ตั้ง/หน่วยงานที่รับผิดชอบ : ${escapeHtml(item.location || "-")}</div>
        <div>ชื่อผู้ขาย/ผู้รับจ้าง/ผู้บริจาค : ${escapeHtml(item.seller || "-")}</div>
      </div>
      <div class="print-line">ที่อยู่ผู้ขาย/ผู้รับจ้าง/ผู้บริจาค : -</div>
      <div class="print-line print-check-row">
        ประเภทเงิน :
        ${markChoice(budget, "เงินงบประมาณ")} เงินงบประมาณ
        &nbsp;&nbsp;&nbsp;&nbsp; ${markChoice(budget, "เงินนอกงบประมาณ")} เงินนอกงบประมาณ
        &nbsp;&nbsp;&nbsp;&nbsp; ${markChoice(budget, "เงินบริจาค/เงินช่วยเหลือ")} เงินบริจาค/เงินช่วยเหลือ
        &nbsp;&nbsp;&nbsp;&nbsp; ${markChoice(budget, "อื่น ๆ")} อื่น ๆ
      </div>
      <div class="print-line print-check-row">
        วิธีการได้มา :
        ${markChoice(method, "ตกลงราคา")} ตกลงราคา
        &nbsp;&nbsp; ${markChoice(method, "สอบราคา")} สอบราคา
        &nbsp;&nbsp; ${markChoice(method, "ประกวดราคา")} ประกวดราคา
        &nbsp;&nbsp; ${markChoice(method, "วิธีพิเศษ")} วิธีพิเศษ
        &nbsp;&nbsp; ${markChoice(method, "รับบริจาค")} รับบริจาค
        &nbsp;&nbsp; ${markChoice(method, "เฉพาะเจาะจง")} เฉพาะเจาะจง
        &nbsp;&nbsp; ${markChoice(method, "ประกาศเชิญชวนทั่วไป")} ประกาศเชิญชวนทั่วไป
        &nbsp;&nbsp; ${markChoice(method, "คัดเลือก")} คัดเลือก
      </div>
      <table class="print-table">
        <colgroup>
          <col style="width: 7.5%">
          <col style="width: 6.8%">
          <col style="width: 18.6%">
          <col style="width: 7.2%">
          <col style="width: 7.5%">
          <col style="width: 7.5%">
          <col style="width: 7.8%">
          <col style="width: 10%">
          <col style="width: 9.2%">
          <col style="width: 9.2%">
          <col style="width: 9.2%">
          <col style="width: 5.5%">
        </colgroup>
        <thead>
          <tr>
            <th>วัน เดือน ปี</th>
            <th>ที่เอกสาร</th>
            <th>รายการ</th>
            <th>จำนวนหน่วย</th>
            <th>ราคาต่อชุด</th>
            <th>มูลค่ารวม</th>
            <th>อายุใช้งาน</th>
            <th>อัตราค่าเสื่อมราคา</th>
            <th>ค่าเสื่อมประจำปี</th>
            <th>ค่าเสื่อมสะสม</th>
            <th>มูลค่าสุทธิ</th>
            <th>หมายเหตุ</th>
          </tr>
        </thead>
        <tbody>${printRows(item)}</tbody>
      </table>
    </div>
  `;
  document.body.classList.add("printing");
  window.onafterprint = () => {
    document.body.classList.remove("printing");
    printArea.innerHTML = "";
  };
  setTimeout(() => window.print(), 50);
}

async function deleteCurrentAsset() {
  if (!currentCategory || currentSelectedIndex < 0) {
    return;
  }

  const item = assetData[currentCategory]?.[currentSelectedIndex];
  if (!item) {
    return;
  }

  const ok = confirm(`ต้องการลบ "${item.name}" ใช่ไหม`);
  if (!ok) {
    return;
  }

  assetData[currentCategory].splice(currentSelectedIndex, 1);
  saveAssetData();
  if (item._cloudId) {
    try {
      await assetsCollection.doc(item._cloudId).delete();
    } catch (error) {
      console.error("Cannot delete cloud asset", error);
      alert("ลบจากฐานข้อมูลกลางไม่สำเร็จ กรุณาตรวจสอบ Firestore Rules หรือการเชื่อมต่อ");
    }
  }
  renderCategories();
  renderItems(currentCategory);
}

async function saveAsset(event) {
  event.preventDefault();

  const category = document.querySelector("#formCategory").value;
  const item = {
    category,
    government: document.querySelector("#formGovernment").value,
    organization: document.querySelector("#formOrganization").value,
    seller: document.querySelector("#formSeller").value,
    name: document.querySelector("#formName").value,
    code: document.querySelector("#formCode").value,
    feature: document.querySelector("#formFeature").value,
    model: document.querySelector("#formModel").value,
    location: document.querySelector("#formLocation").value,
    owner: document.querySelector("#formOwner").value,
    quantity: document.querySelector("#formQuantity").value,
    price: document.querySelector("#formPrice").value,
    life: document.querySelector("#formLife").value,
    acquiredDate: document.querySelector("#formDate").value,
    depreciation: document.querySelector("#formDepreciation").value,
    budget: document.querySelector("#formBudget").value,
    method: document.querySelector("#formMethod").value,
    image: document.querySelector("#formImage").value || "ยังไม่ได้เพิ่มรูป",
    imageData: uploadedImageData,
    note: document.querySelector("#formNote").value
  };

  if (!assetData[category]) {
    assetData[category] = [];
  }

  assetData[category].push(item);
  saveAssetData();
  try {
    const savedDocument = await assetsCollection.add({
      ...removeLocalOnlyFields(item),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    item._cloudId = savedDocument.id;
    isCloudConnected = true;
    updateSyncStatus("บันทึกเข้าฐานข้อมูลกลางแล้ว");
  } catch (error) {
    console.error("Cannot save cloud asset", error);
    isCloudConnected = false;
    updateSyncStatus("บันทึกฐานข้อมูลกลางไม่สำเร็จ เก็บสำรองไว้ในเครื่องนี้", true);
    alert("บันทึกเข้าฐานข้อมูลกลางไม่สำเร็จ ข้อมูลถูกเก็บสำรองไว้ในเครื่องนี้ก่อน กรุณาตรวจสอบว่าเปิด Firestore และตั้ง Rules แล้ว");
  }
  lastSavedCategory = category;
  lastSavedItemName = item.name;
  event.target.reset();
  document.querySelector("#formQuantity").value = "1";
  updateFormLifeFromRule();
  document.querySelector("#formImageFile").value = "";
  uploadedImageData = "";
  renderCategories();
  showView("success");
}

document.querySelector("#homeButton").addEventListener("click", () => showView("home"));
document.querySelector("#showCategoriesButton").addEventListener("click", () => showView("category"));
document.querySelector("#showFormButton").addEventListener("click", () => showView("form"));
document.querySelector("#backToCategoriesButton").addEventListener("click", () => showView("category"));
document.querySelector("#assetForm").addEventListener("submit", saveAsset);
document.querySelector("#assetForm").addEventListener("reset", () => {
  uploadedImageData = "";
});
document.querySelector("#viewSavedItemButton").addEventListener("click", () => {
  renderItems(lastSavedCategory || categories[0], lastSavedItemName);
});

document.querySelector("#formImageFile").addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  uploadedImageData = "";
  if (!file) {
    return;
  }

  if (file.size > 1200000) {
    alert("รูปนี้มีขนาดค่อนข้างใหญ่ อาจบันทึกในเครื่องไม่สำเร็จ แนะนำใช้รูปขนาดไม่เกินประมาณ 1 MB");
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploadedImageData = String(reader.result || "");
    if (!document.querySelector("#formImage").value) {
      document.querySelector("#formImage").value = file.name;
    }
  });
  reader.readAsDataURL(file);
});

document.querySelectorAll("[data-go-home]").forEach((button) => {
  button.addEventListener("click", () => showView("home"));
});

setupCategoryOptions();
renderCategories();
startCloudSync();

function updateFormLifeFromRule() {
  const category = document.querySelector("#formCategory").value;
  const date = parseThaiDate(document.querySelector("#formDate").value);
  const rule = getDepreciationRule(category, date);
  document.querySelector("#formLife").value = rule.life;
}

document.querySelector("#formCategory").addEventListener("change", updateFormLifeFromRule);
document.querySelector("#formDate").addEventListener("change", updateFormLifeFromRule);
updateFormLifeFromRule();
