import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, verifyEmailConnection, validateContactData, ContactFormData } from '@/services/emailService';

const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO][${new Date().toISOString()}] ${message}`, data ? data : '');
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR][${new Date().toISOString()}] ${message}`, error ? error : '');
  }
};

/**
 * API endpoint to send an email
 */
export async function POST(request: Request) {
  logger.info('התקבלה בקשה חדשה לשליחת מייל');
  
  try {
    // קבלת נתונים מהבקשה
    const data = await request.json();
    logger.info('התקבלו נתונים מהטופס', { 
      name: data.name || data.fullName, 
      email: data.email,
      city: data.city, 
      studio: data.studio
    });
    
    // התאמת שמות השדות אם צריך (לתמיכה בטפסים שונים)
    if (data.fullName && !data.name) {
      data.name = data.fullName;
    }
    
    // וידוא שהנתונים החיוניים קיימים
    const validation = validateContactData(data);
    if (!validation.valid) {
      logger.error('שגיאת וידוא נתונים', { message: validation.message });
      return NextResponse.json(
        { error: validation.message },
        { status: 400 }
      );
    }

    // הכנת הנתונים לשליחה
    const emailData: ContactFormData = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim(),
      city: data.city,
      studio: data.studio,
      trainingType: data.trainingType,
      businessName: data.businessName?.trim(),
      businessLocation: data.businessLocation?.trim(),
      wantConsultation: data.wantConsultation,
      notes: data.notes?.trim() || data.message?.trim()
    };

    // שליחת המייל
    await sendEmail(emailData);
    
    logger.info('בקשת המייל הושלמה בהצלחה', {
      name: emailData.name,
      email: emailData.email,
      studio: emailData.studio,
      city: emailData.city,
      trainingType: emailData.trainingType
    });
    
    // החזרת תשובה חיובית
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('שגיאה בטיפול בבקשה', error);
    
    // בדיקה אם השגיאה היא מהסוג Error עם הודעה
    const errorMessage = error instanceof Error ? error.message : 'אירעה שגיאה בשליחת ההודעה';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * API endpoint to check email server connection
 */
export async function GET() {
  try {
    return NextResponse.json(
      { success: true, message: 'שירות דואר אלקטרוני פעיל' },
      { status: 200 }
    );
  } catch (error) {
    logger.error('שגיאה בבדיקת שירות האימייל:', error);
    return NextResponse.json(
      { success: false, message: 'שגיאה בבדיקת שירות האימייל' },
      { status: 500 }
    );
  }
} 