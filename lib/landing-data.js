// Landing page content. Kept out of the component so the markup stays readable.

export const SCRIPT = [
  { type: "user", text: "תמצא לי דירת 3 חדרים בפלורנטין או במרכז ת״א (לא בכרם התימנים), עם חניה וממ״ד ליד הרכבת הקלה. תקציב 7,000–8,500 ₪" },
  { type: "bot", text: "🕵️ בודק את הבקשה…" },
  { type: "bot", text: "✨ נמצאו 86 מודעות מתאימות" },
  { type: "user", text: "שכחתי מרפסת, תוסיף מרפסת ותגדיל את התקציב עד 9,000" },
  { type: "bot", text: "💪 קיבלתי, מעדכן את החיפוש… נמצאו 22 מודעות! מתחיל לשלוח" },
  {
    type: "card",
    image: "/assets/listing-a.jpg",
    area: "מונטיפיורי · עוזי חיטמן",
    price: "8,500 ₪",
    tags: ["🛏️ 5 חדרים", "📐 115 מ״ר", "🏢 קומה 5", "🌇 מרפסת", "🚗 חניה", "🛗 מעלית", "🛡️ ממ״ד", "✨ חדשה", "🚈 350 מ׳ מהרק״ל", "🤝 תיווך"],
    meta: "🕐 פורסם לפני 3 דק׳"
  },
  {
    type: "card",
    image: "/assets/listing-b.jpg",
    area: "גני שרונה",
    price: "8,400 ₪",
    tags: ["🛏️ 4 חדרים", "📐 109 מ״ר", "🌇 מרפסת", "🚗 חניה", "🛡️ ממ״ד", "🙅 ללא תיווך", "🚈 300 מ׳ מהרק״ל", "📅 כניסה 1.9.26"],
    meta: "🕐 פורסם לפני 7 דק׳"
  },
  { type: "bot", text: "שמרתי את החיפוש! 🔔 אעדכן כשיעלו דירות חדשות 😸" }
];

export const HINTS = [
  "נסו: 3 חדרים בפלורנטין עד 8,000 ₪",
  "נסו: עד 10 דק׳ הליכה מבר אילן",
  "נסו: מרכז תל אביב, בלי כרם התימנים",
  "כתבו מה אתם מחפשים…"
];

export const MARQUEE = [
  "״עד 5 דק׳ מכיכר מילאנו״",
  "״לא קומת קרקע ומעלית״",
  "״צפון תא ליד הים״",
  "״דירת גג או דירת גן״",
  "״2 חד׳ ליד רכבת קלה״",
  "״חדר בדירת שותפים״",
  "״כל רמת גן חוץ מעמידר״",
  "״סבלט לחודש בקיץ״",
  "״רק רחובות כצנלסון וסירקין״",
  "״דירה חדשה מקבלן״",
  "״פנטהאוז שמאפשר להביא כלב״",
  "״ללא תיווך כניסה עוד שבועיים״"
];

export const LOCATION_CARDS = [
  {
    title: "כל מיקום שתרצו",
    body: "פרויקט ספציפי, רחוב, שכונה ועד אזור שלם",
    quote: "״ברחוב שינקין או בכל דרום תל אביב״",
    icon: "pin"
  },
  {
    title: "קרוב למה שחשוב לכם",
    body: "רכבת, ים, אוניברסיטה, גן או כל כתובת",
    quote: "״עד 10 דקות הליכה מאוניברסיטת בר אילן״",
    icon: "target"
  },
  {
    title: "וגם איפה לא",
    body: "מחריגים רחובות, שכונות ואזורים שלא מתאימים",
    quote: "״מרכז תל אביב ליד הים אבל לא בכרם״",
    icon: "pinOff"
  }
];

export const FEATURE_CARDS = [
  {
    title: "חיפוש דינמי",
    body: "קיבלתם תוצאות? כתבו מה לשנות וקיריל מדייק מיד ושולח מחדש",
    quote: "״ללא תיווך ובלי קומת קרקע״",
    quoteKind: "user",
    icon: "refresh"
  },
  {
    title: "התראות לפני כולם",
    body: "מודעה חדשה עולה ואתם מקבלים אותה בדקות הראשונות, לפני שכולם ראו",
    quote: "🕐 פורסם: לפני 4 דק׳",
    quoteKind: "bot",
    icon: "bell"
  },
  {
    title: "הכול במקום אחד",
    body: "אלפי מודעות בכל יום מכל המקורות הרלוונטיים, מרוכזות במקום אחד",
    icon: "layers"
  }
];

export const STEPS = [
  { side: "user", who: "אתם", title: "מגדירים חיפוש", body: "״3 חדרים בפלורנטין או מרכז ת״א, עם חניה וממ״ד, עד 8,500״", time: "21:04" },
  { side: "bot", who: "קיריל", title: "מקבלים תוצאות", body: "תמונת שוק מלאה תוך שניות, בלי להמתין להתראה", time: "21:04" },
  { side: "user", who: "אתם", title: "מדייקים", body: "״תוסיף מרפסת ותעלה את התקציב ל-9,000״", time: "21:06" },
  { side: "bot", who: "קיריל", title: "מקבלים התראות", body: "כל דירה חדשה שמתאימה, ישר אליכם", time: "21:07" }
];

export const FAQ = [
  { q: "איך קיריל עובד", a: "קיריל הוא בוט AI חכם בטלגרם שמרכז מודעות מכל הפלטפורמות המובילות. **כותבים לו בטקסט חופשי מה לחפש** (כמו שמדברים עם בן אדם), והוא מבין את הבקשה, **ומאותו רגע מעדכן על כל דירה חדשה רלוונטית שמתפרסמת בשוק** (בסמוך לזמן פרסום המודעה). אפשר גם להמשיך לדייק אותו לאורך הדרך לפי התוצאות: מה כן ומה לא" },
  { q: "למה דווקא בטלגרם?", a: "הלב של קיריל הוא לשלוח לכם כמה שיותר התראות, כמה שיותר מהר. **בוואטסאפ יש מגבלות רבות על כמות וקצב ההודעות**, בעוד ש**טלגרם מאפשרת לנו לשלוח לכם את כל המודעות הרלוונטיות בזמן אמת**" },
  { q: "באילו ערים קיריל פעיל?", a: "כרגע **תל אביב יפו, רמת גן וגבעתיים**. ובקרוב **פריסה ארצית מלאה** (השכרה, מכירה וסבלט)" },
  { q: "צריך להירשם?", a: "לא. **אין צורך בהרשמה ובפרטים מזהים בכלל**. פותחים את קיריל בטלגרם ומתחילים לכתוב" },
  { q: "יש ניסיון חינם?", a: "כן, יש **4 ימי ניסיון חינם** שמאפשרים גישה מלאה לכל הפיצ׳רים. גם לאחר מכן, הרבה מהיכולות נשארות פתוחות בחינם" },
  { q: "כמה מהירות ההתראות?", a: "ההתראות לרוב מגיעות **דקות בודדות לאחר פרסום המודעה**. בדיוק **היתרון שעושה את ההבדל**" }
];

export const FAQ_EN = [
  { q: "How does Keyreal work", a: "Keyreal is a smart AI bot on Telegram that gathers listings from all the leading platforms. **You write to it in plain text what to look for** (the way you would talk to a person), it understands the request, **and from that moment it updates you on every relevant new apartment posted on the market** (close to the time the listing goes up). You can keep refining it along the way based on the results: what works and what does not" },
  { q: "Why Telegram?", a: "Keyreal is built to send you as many alerts as possible, as fast as possible. **WhatsApp puts heavy limits on message volume and rate**, while **Telegram lets us push every relevant listing to you in real time**" },
  { q: "Which cities is Keyreal active in?", a: "Right now **Tel Aviv-Yafo, Ramat Gan and Givatayim**. And soon **full nationwide coverage** (rentals, sales and sublets)" },
  { q: "Do I need to sign up?", a: "No. **No signup and no identifying details at all**. Open Keyreal on Telegram and start typing" },
  { q: "Is there a free trial?", a: "Yes, there is a **4 day free trial** with full access to every feature. Even after it ends, many of the capabilities stay free" },
  { q: "How fast are the alerts?", a: "Alerts usually arrive within **a few minutes of a listing going up**. That is exactly **the edge that makes the difference**" }
];

export const TESTIMONIALS = [
  { name: "ליאור ר.", photo: "/assets/p-lior.png", city: "תל אביב-יפו", quote: "אהבתי שזה מעדכן אותי כמה פעמים ביום. זה מרגיע אותי שאני לא מפספס, למרות שעוד לא מצאתי כי כולם בתל אביב חיים בסרט עם המחירים" },
  { name: "הילה ב.", photo: "/assets/p-hila.png", city: "גבעתיים", quote: "ניסיתי כבר איזה 3 כאלה חחח אף אחד לא באמת עבד, הייתי מקבלת דירה ביומיים. זה עובד פי מאה יותר טוב! אבל תוסיפו את גבעתיים" },
  { name: "מאור ש.", photo: "/assets/p-maor.png", city: "רמת גן", quote: "אנחנו זוג וחיפשנו ממש הרבה זמן! בכלל לא הסתכלנו מחוץ לפייסבוק. זה הביא לנו דירות שלא היינו רואים בחיים, בסוף סגרנו במחיר נדיר" },
  { name: "רומן ק.", photo: "/assets/p-roman.png", city: "תל אביב-יפו", quote: "גאוני, לא יודע איך לא חשבו על זה לפני. הפילטרים ממש עובדים טוב וזה מגיב מהר, רק חבל שלא פועל בפתח תקווה" },
  { name: "גיל א.", photo: "/assets/p-gil.png", city: "תל אביב-יפו", quote: "אחלה מוצר. אהבתי מאוד" },
  { name: "דולב מ.", photo: "/assets/p-dolev.png", city: "רמת גן", quote: "שולח לי כל יום מלא תוצאות, עוד לא סגרתי כלום אבל התחלה טובה, חוסך לי מלא זמן וכאב ראש" },
  { name: "אלי ת.", photo: "/assets/p-eli.png", city: "תל אביב-יפו", quote: "סגר לי את הפינה בשבוע וחצי. אחרי 3 חודשים של חיפושים שהייתי צמוד לפייסבוק נכנס כל 5 דקות לבדוק אם יש משהו חדש. וואלה שווה כל שקל" },
  { name: "שני א.", photo: "/assets/p-shani.png", city: "תל אביב-יפו", quote: "האמת זלזלתי בהתחלה. אמרתי ננסה בגלל הניסיון חינם. זה הקפיץ לי דירה מהממת 5 דק אחרי שפרסמו אותה. והייתי הראשונה לראות ישר קבעתי לראות וסגרתי אותה בסוף" },
  { name: "עדן ל.", photo: "/assets/p-eden.png", city: "תל אביב-יפו", quote: "מצאתי דירה עוד בתקופה של הניסיון!!!! ב-4 ימים הזיה! מומלץ ברמות הסינון הצגה ומדויק" }
];

export const STATS = [
  { n: "20K+", label: "מודעות חדשות ביום" },
  { n: "5M+", label: "מודעות נותחו" },
  { n: "150+", label: "מקורות מידע" }
];
