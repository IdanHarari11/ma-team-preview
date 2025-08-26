"use client";
import React from "react";

type Tab = "privacy" | "terms";

declare global {
  interface Window {
    openLegal?: (tab: Tab) => void;
  }
}

export default function LegalCenter() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [tab, setTab] = React.useState<Tab>("privacy");
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    window.openLegal = (t: Tab) => { setTab(t); setIsOpen(true); };
    return () => { delete window.openLegal; };
  }, []);

  React.useEffect(() => {
    if (!dialogRef.current) return;
    isOpen ? dialogRef.current.showModal() : dialogRef.current.close();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="w-full max-w-3xl rounded-xl p-0 backdrop:bg-black/60"
      onCancel={(e) => { e.preventDefault(); setIsOpen(false); }}
      onClick={(e) => {
        const r = (e.target as HTMLDialogElement).getBoundingClientRect();
        const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        if (!inside) setIsOpen(false);
      }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex gap-2">
            <button type="button" onClick={() => setTab("privacy")} className={`px-3 py-1 text-sm rounded ${tab === "privacy" ? "bg-white/10" : "hover:bg-white/5"}`}>מדיניות פרטיות</button>
            <button type="button" onClick={() => setTab("terms")} className={`px-3 py-1 text-sm rounded ${tab === "terms" ? "bg-white/10" : "hover:bg-white/5"}`}>תנאי שימוש</button>
          </div>
          <button type="button" onClick={() => setIsOpen(false)} className="px-2 py-1 text-sm hover:bg-white/10 rounded" aria-label="סגור">✕</button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto text-sm leading-6 space-y-6">
          {tab === "privacy" ? (
            <>
              <div dir="rtl" className="space-y-2" dangerouslySetInnerHTML={{ __html: PRIVACY_HE }} />
              <hr className="border-white/10" />
              <div dir="ltr" className="space-y-2" dangerouslySetInnerHTML={{ __html: PRIVACY_EN }} />
            </>
          ) : (
            <>
              <div dir="rtl" className="space-y-2" dangerouslySetInnerHTML={{ __html: TERMS_HE }} />
              <hr className="border-white/10" />
              <div dir="ltr" className="space-y-2" dangerouslySetInnerHTML={{ __html: TERMS_EN }} />
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}

/* תוכן משפטי - דו לשוני - MA-Studio */
const PRIVACY_HE = `
<p><strong>עודכנה לאחרונה: 2025-08</strong></p>
<ol>
<li><strong>כללי</strong><br/>חברת MA-Studio ("החברה") מחויבת להגן על פרטיות המשתמשים באתר ובשירותיה. מסמך זה מפרט כיצד אנו אוספים, שומרים, משתמשים ומגנים על המידע האישי שלך, בהתאם לחוק הגנת הפרטיות, תשמ"א-1981 (כולל תיקון 13), תקנות הגנת הפרטיות (אבטחת מידע), ה-GDPR וה-CCPA ככל שהן חלות.</li>
<li><strong>איסוף מידע</strong><br/>בעת יצירת קשר או שימוש בשירותינו, אנו עשויים לאסוף: שם מלא, טלפון, דוא"ל, פרטי התקשרות נוספים, מידע עסקי/מקצועי שמסרת, ומידע טכני כדוגמת כתובות IP, Cookies, נתוני גלישה ומיקום גיאוגרפי כללי. אין חובה חוקית למסור מידע, אך ייתכן שהמסירה תנאי לקבלת שירות.</li>
<li><strong>מטרות שימוש</strong><br/>
<ul>
<li>יצירת קשר ומתן מענה לפניות.</li>
<li>ניהול חשבונות משתמשים ומתן שירותי החברה.</li>
<li>ניתוח ושיפור השירותים והמוצרים.</li>
<li>עמידה בהתחייבויות חוקיות ורגולטוריות.</li>
</ul>
</li>
<li><strong>העברת מידע לצדדים שלישיים</strong><br/>לא נעביר מידע לצדדים שלישיים אלא אם נדרש על פי דין או צו שיפוטי, או לצורך טכני חיוני כגון אחסון, CRM או סליקה - בכפוף להתחייבות לסודיות ואבטחה. מסירה בהסכמה מפורשת תכובד.</li>
<li><strong>זכויותיך</strong><br/>עיון, תיקון, מחיקה ("Right to be Forgotten"), התנגדות לשיווק, וניידות מידע בכפוף ל-GDPR. פנייה למימוש זכויות ל<a href="mailto:mafstudio3@gmail.com">mafstudio3@gmail.com</a> או בטלפון 052-657-6685.</li>
<li><strong>אבטחת מידע</strong><br/>החברה מפעילה אמצעי אבטחה מקובלים, לרבות SSL, בקרת גישה והרשאות. אין אפשרות להבטיח הגנה מוחלטת מפני חדירות או שימוש בלתי מורשה.</li>
<li><strong>שמירת מידע</strong><br/>נשמור את המידע האישי כל עוד הוא דרוש למטרות שפורטו או כפי שנדרש לפי דין, ולאחר מכן יימחק או יעבור אנונימיזציה.</li>
<li><strong>Cookies וטכנולוגיות מעקב</strong><br/>נעשה שימוש ב-Cookies וטכנולוגיות דומות להפעלה תקינה, שיפור חוויית המשתמש, ניתוח שימוש ושיווק מותאם. ניתן לנהל או לחסום דרך הגדרות הדפדפן או באנר ה-Cookie באתר.</li>
<li><strong>קטינים</strong><br/>השירות מיועד לבני 14 ומעלה. אם נודע לנו כי נאסף מידע מקטין מתחת לגיל זה, המידע יימחק מיידית.</li>
<li><strong>שינויים</strong><br/>החברה רשאית לעדכן מדיניות זו מעת לעת. שינוי מהותי יימסר באתר ובאמצעים נוספים לפי הצורך.</li>
</ol>
`;

const PRIVACY_EN = `
<p><strong>Last updated: 2025-08</strong></p>
<ol>
<li><strong>General</strong><br/>MA-Studio ("the Company") is committed to protecting users' privacy. This notice explains how we collect, store, use and protect personal data in accordance with the Israeli Privacy Protection Law (including Amendment 13), the Israeli Security Regulations, and where applicable the GDPR and CCPA.</li>
<li><strong>Data we collect</strong><br/>When you contact us or use our services, we may collect: full name, phone, email, additional contact details, business/professional information you provide, and technical data such as IP addresses, cookies, browsing data and approximate geolocation. You are not legally required to provide data, yet it may be necessary to receive certain services.</li>
<li><strong>Purposes</strong><br/>
<ul>
<li>To contact you and respond to inquiries.</li>
<li>To manage user accounts and provide our services.</li>
<li>To analyze and improve our services and products.</li>
<li>To comply with legal and regulatory obligations.</li>
</ul>
</li>
<li><strong>Sharing with third parties</strong><br/>We do not share data with third parties except as required by law or court order, or for essential operations such as hosting, CRM or payment processing - under confidentiality and security obligations. Sharing based on your explicit consent will be honored.</li>
<li><strong>Your rights</strong><br/>Access, rectification, erasure ("Right to be Forgotten"), objection to marketing, and data portability subject to the GDPR. Requests: <a href="mailto:mafstudio3@gmail.com">mafstudio3@gmail.com</a> or +972-52-657-6685.</li>
<li><strong>Security</strong><br/>We apply industry-standard security measures including SSL, access control and permissions. Absolute protection cannot be guaranteed.</li>
<li><strong>Retention</strong><br/>We retain personal data as long as needed for the stated purposes or as required by law, then delete or anonymize it.</li>
<li><strong>Cookies and tracking</strong><br/>We use cookies and similar technologies for proper operation, user experience, analytics and tailored marketing. You may manage or block cookies via your browser or the site's cookie banner.</li>
<li><strong>Minors</strong><br/>Services are intended for users aged 14 and above. If we learn data was collected from a child under that age, it will be deleted immediately.</li>
<li><strong>Changes</strong><br/>We may update this policy from time to time. Material changes will be posted on the site and by additional means where appropriate.</li>
</ol>
`;

const TERMS_HE = `
<p><strong>עודכנו לאחרונה: 2025-08</strong></p>
<ol>
<li><strong>הסכמה</strong><br/>השימוש באתר ובשירותי MA-Studio כפוף לתנאים אלה ולמדיניות הפרטיות. כל שימוש מהווה הסכמה מלאה.</li>
<li><strong>שימוש מותר</strong><br/>
<ul>
<li>האתר והשירותים לשימוש אישי, עסקי ולגיטימי בלבד.</li>
<li>אסור שימוש בלתי חוקי, פוגעני או הפוגע בצדדים שלישיים.</li>
</ul>
</li>
<li><strong>קניין רוחני</strong><br/>כל זכויות היוצרים, סימני המסחר, התוכן, העיצובים, המידע והקוד שייכים ל-MA-Studio. אין להעתיק, לשכפל, להפיץ או לעשות שימוש מסחרי ללא אישור מראש ובכתב.</li>
<li><strong>הגבלת אחריות</strong><br/>השירותים ניתנים "As-Is" ללא אחריות מכל סוג. אין התחייבות לזמינות רציפה, לדיוק המידע או להתאמה לצורכי המשתמש. החברה לא תהיה אחראית לנזקים ישירים, עקיפים, תוצאתיים או כלכליים.</li>
<li><strong>קישורים חיצוניים</strong><br/>האתר עשוי לכלול קישורים לאתרים חיצוניים. MA-Studio אינה אחראית לתוכנם או למדיניותם.</li>
<li><strong>שיפוי</strong><br/>המשתמש מתחייב לשפות את MA-Studio בגין כל נזק, הפסד או הוצאה עקב הפרת תנאים אלה או שימוש בלתי חוקי.</li>
<li><strong>שינויים והפסקת שירות</strong><br/>החברה רשאית לשנות או להפסיק את האתר והשירותים בכל עת ללא הודעה מוקדמת. תנאים אלה עשויים להתעדכן מעת לעת והשימוש המתמשך מהווה הסכמה לתנאים המעודכנים.</li>
<li><strong>דין וסמכות שיפוט</strong><br/>דיני מדינת ישראל יחולו. סמכות השיפוט הבלעדית לבתי המשפט במחוז תל אביב.</li>
</ol>
`;

const TERMS_EN = `
<p><strong>Last updated: 2025-08</strong></p>
<ol>
<li><strong>Acceptance</strong><br/>Use of the MA-Studio website and services is subject to these Terms and the Privacy Policy. Any use constitutes full acceptance.</li>
<li><strong>Permitted use</strong><br/>
<ul>
<li>Website and services are for personal, business and lawful use only.</li>
<li>No unlawful, offensive or harmful use is permitted.</li>
</ul>
</li>
<li><strong>Intellectual property</strong><br/>All copyrights, trademarks, content, designs, information and code belong to MA-Studio. No copying, reproduction, distribution or commercial use without prior written consent.</li>
<li><strong>Limitation of liability</strong><br/>Services are provided "As-Is" without any warranty. No commitment to continuous availability, accuracy or fitness. The company will not be liable for direct, indirect, consequential or economic damages.</li>
<li><strong>External links</strong><br/>The site may contain links to external websites. MA-Studio is not responsible for their content or policies.</li>
<li><strong>Indemnity</strong><br/>You agree to indemnify MA-Studio for any damage, loss or expense due to breach of these Terms or unlawful use.</li>
<li><strong>Changes and termination</strong><br/>We may change or discontinue the site and services at any time without notice. These Terms may be updated and continued use constitutes acceptance.</li>
<li><strong>Governing law and jurisdiction</strong><br/>Laws of the State of Israel apply. Exclusive jurisdiction lies with the competent courts in Tel Aviv district.</li>
</ol>
`;
