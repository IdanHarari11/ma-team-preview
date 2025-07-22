import { useTranslation } from 'react-i18next';

const faqs = [
  {
    question: "כמה סניפים יש ל־M.A והיכן הם נמצאים?",
    answer: (
      <div dir="rtl" className="space-y-4 text-[16px] md:text-[18px] text-[#333] leading-relaxed">
        <div>נכון להיום יש לנו שלושה סניפים פעילים:</div>
        <ul className="mt-2 space-y-4">
          <li>
            <span className="font-bold">סניף אשדוד פילאטיס מכשירים, פילאטיס מזרן, יוגה ומוביליטי</span>
            <span> (נמצא ברחוב התחנה, אשדוד) </span>
            <a
              href="https://maps.google.com/?q=רחוב התחנה, אשדוד"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block align-middle bg-[#A8C3A1] text-white text-sm px-4 py-1 rounded-full font-bold hover:bg-[#90AC8F] transition-colors ml-2"
            >
              מפה
            </a>
          </li>
          <li>
            <span className="font-bold">סניף אשדוד פונקציונלי</span>
            <span> (נמצא ברחוב הרידינג, אשדוד) </span>
            <a
              href="https://maps.google.com/?q=רחוב הרידינג, אשדוד"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block align-middle bg-[#A8C3A1] text-white text-sm px-4 py-1 rounded-full font-bold hover:bg-[#90AC8F] transition-colors ml-2"
            >
              מפה
            </a>
          </li>
          <li>
            <span className="font-bold">סניף תל אביב</span>
            <span> – כולל פילאטיס מכשירים, פילאטיס מזרן ויוגה (מקווה ישראל 4, תל אביב) </span>
            <a
              href="https://maps.google.com/?q=מקווה ישראל 4, תל אביב"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block align-middle bg-[#A8C3A1] text-white text-sm px-4 py-1 rounded-full font-bold hover:bg-[#90AC8F] transition-colors ml-2"
            >
              מפה
            </a>
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: "איך נרשמים לשיעור?",
    answer: (
      <div dir="rtl" className="space-y-4 text-[16px] md:text-[18px] text-[#333] leading-relaxed">
        <div>
          אנחנו קודם כל משפחה – ולפני ההרשמה, חשוב לנו להכיר אתכם, להבין את הצרכים שלכם ולתכנן יחד את האימון שמתאים לכם.<br />
          לאחר ההיכרות, התהליך פשוט ומהיר – ניתן לרכוש כרטיסיית היכרות, שיעור ניסיון או להירשם למנוי או כרטיסייה לפי בחירתכם.
        </div>
        <div>
          <a
            href="#contact"
            className="inline-block bg-[#A8C3A1] text-white text-sm px-4 py-1 rounded-full font-bold hover:bg-[#90AC8F] transition-colors mt-2"
          >
            השאירו פרטים כאן
          </a>
          <span className="ml-2">ונחזור אליכם עוד היום.</span>
        </div>
      </div>
    ),
  },
  {
    question: "האם ניתן להגיע לשיעור ניסיון?",
    answer: (
      <div dir="rtl" className="space-y-2 text-[16px] md:text-[18px] text-[#333] leading-relaxed">
        <div>
          בודאי. יש אפשרות לשיעור ניסיון בודד, או לרכוש כרטיסיית היכרות הכוללת שני שיעורים – כדי לחוות לעומק את הסטודיו, האווירה והצוות.
        </div>
      </div>
    ),
  },
  {
    question: "כמה משתתפים יש בכל שיעור?",
    answer: (
      <div dir="rtl" className="space-y-2 text-[16px] md:text-[18px] text-[#333] leading-relaxed">
        <div>השיעורים מתקיימים בקבוצות קטנות ואינטימיות:</div>
        <div>– באימוני כוח פונקציונליים: בין 3 ל־7 משתתפים</div>
        <div>– בפילאטיס וביוגה: עד 8 משתתפים בשיעור</div>
        <div>הדגש שלנו הוא על איכות, יחס אישי ודיוק מקצועי.</div>
      </div>
    ),
  },
  {
    question: "האם יש מנויים מוזלים?",
    answer: (
      <div dir="rtl" className="space-y-2 text-[16px] md:text-[18px] text-[#333] leading-relaxed">
        <div>
          כן. בכל מנוי קיימת אפשרות להתחייב לתקופה ארוכה יותר (3, 6 או 12 חודשים) ולקבל הנחה של עד 25% מהמחיר הרגיל.<br />
          בנוסף, חיילים בשירות סדיר זכאים ל־10% הנחה קבוצית.
        </div>
      </div>
    ),
  },
  {
    question: "האם יש מנוי משולב של אימוני כוח ופילאטיס?",
    answer: (
      <div dir="rtl" className="space-y-2 text-[16px] md:text-[18px] text-[#333] leading-relaxed">
        <div>
          כן. בסניפי אשדוד בלבד ניתן להצטרף למנוי משולב שמאפשר להשתתף גם באימוני כוח פונקציונליים וגם בשיעורי פילאטיס – במחיר מוזל ושווה במיוחד.<br />
          כמו כן, ניתן לרכוש כרטיסיית היכרות הכוללת שני שיעורים בכל תחום.
        </div>
      </div>
    ),
  },
  {
    question: "האם צריך ניסיון קודם לפני שנמצטרפים?",
    answer: (
      <div dir="rtl" className="space-y-2 text-[16px] md:text-[18px] text-[#333] leading-relaxed">
        <div>
          ממש לא. בגלל שאנחנו סטודיו בוטיק עם קבוצות קטנות, אנחנו יודעים לקבל כל רמה – ממתחילים ועד מתקדמים – ולהתאים לכל אחד ואחת את הקצב, ההכוונה והיחס האישי.
        </div>
      </div>
    ),
  },
  {
    question: "מאיזה גיל אפשר להצטרף?",
    answer: (
      <div dir="rtl" className="space-y-2 text-[16px] md:text-[18px] text-[#333] leading-relaxed">
        <div>האימונים הקבוצתיים מתאימים לגילאי 12 ומעלה.</div>
        <div>אימונים אישיים ניתן להתחיל כבר מגיל 6. אנחנו מתאימים את סוג האימון לכל גיל ולפי הצרכים של כל מתאמן.</div>
      </div>
    ),
  },
  {
    question: "האם הסטודיו מתאים גם לגברים?",
    answer: (
      <div dir="rtl" className="space-y-2 text-[16px] md:text-[18px] text-[#333] leading-relaxed">
        <div>
          בודאי. הסטודיו פתוח לנשים ולגברים כאחד, ויש לנו מגוון רחב של מתאמנים ומתאמנות מכל הגילאים והרמות.
        </div>
      </div>
    ),
  },
  {
    question: "האם יש חניה באזור?",
    answer: (
      <div dir="rtl" className="space-y-2 text-[16px] md:text-[18px] text-[#333] leading-relaxed">
        <div><span className="font-bold">סניף אשדוד פילאטיס מכשירים:</span> חניה בשפע ללא עלות באזור הדוגה / פארינו (אסור לחנות ברחוב התחנה)</div>
        <div><span className="font-bold">סניף אשדוד פונקציונלי:</span> חניה בשפע ללא עלות, רק לא לחסום את כניסת הרחוב והחניון</div>
        <div><span className="font-bold">בתל אביב:</span> חניית רכבת הקלה 'אליפלט' ממש על הכניסה לסטודיו. קיימת חניה בשפע כחול לבן וחניונים בתשלום בחלק משעות היום, ויש נגישות גבוהה לתחבורה ציבורית/קורקינטים/אופניים.</div>
      </div>
    ),
  },
];

const FAQSection = () => {
  return (
    <section className="faq-section flex flex-col gap-y-4">
      <h2 className="faq-title font-bold text-[#1A1A1A] text-2xl md:text-3xl text-center mb-8 break-words text-balance">
        שאלות נפוצות – סטודיו M.A
      </h2>
      <div className="flex flex-col gap-y-4">
        {faqs.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#F9F7F0] rounded-2xl p-6 md:p-8 w-full max-w-3xl mx-auto shadow-sm relative"
            dir="rtl"
          >
            {/* כפתור סגירה/פתיחה (דמה) */}
            <button
              className="absolute left-4 top-4 p-2 text-[#1A1A1A] text-lg rounded-full hover:bg-[#ecebe6] transition-colors"
              aria-label="סגור"
              tabIndex={-1}
              style={{ pointerEvents: 'none' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12L10 7L15 12" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="font-bold text-[#1A1A1A] text-lg md:text-xl break-words text-balance flex flex-wrap items-center">
              {item.question}
            </div>
            <div className="border-t border-[#A8C3A1] mt-3 mb-4 w-full" />
            <div className="answer-content">
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection; 