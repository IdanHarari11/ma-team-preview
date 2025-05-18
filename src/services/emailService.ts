import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// טיפוסים
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  studio?: string;
  trainingType?: string;
  businessName?: string;
  businessLocation?: string;
  wantConsultation?: boolean;
  notes?: string;
}

// פונקציה לעטיפת לוגים 
const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO][${new Date().toISOString()}] ${message}`, data ? data : '');
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR][${new Date().toISOString()}] ${message}`, error ? error : '');
  }
};

// יצירת טרנספורטר להודעות מייל
const createMailTransporter = () => {
  try {
    logger.info('יוצר חיבור לשרת SMTP');
    
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.zoho.com',
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: true, // שימוש ב-SSL
      auth: {
        user: process.env.EMAIL_USER || 'your_email@yourdomain.com',
        pass: process.env.EMAIL_PASSWORD || 'your_app_password' // השתמש ב-app password אם 2FA מופעל
      }
    });
  } catch (error) {
    logger.error('שגיאה ביצירת חיבור לשרת SMTP', error);
    throw new Error('לא ניתן ליצור חיבור לשרת המייל');
  }
};

// יצירת תבנית HTML למייל
const createEmailTemplate = (data: ContactFormData): string => {
  const { name, email, phone, city, studio, trainingType, businessName, businessLocation, wantConsultation, notes } = data;
  
  // צבעים מוגדרים ב-tailwind
  const colors = {
    primary: '#8BA888',    // ma-primary - Olive green
    black: '#1A1A1A',      // ma-black
    gray: '#E5E5E5',       // ma-gray
    light: '#F5F2EA',      // ma-light - Cream color
    white: '#FFFFFF',
    accent: '#8BA888',     // Accent color (using primary)
    textLight: '#F5F2EA',  // Light text
    textDark: '#1A1A1A',   // Dark text
  };
  
  return `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid ${colors.primary}; border-radius: 10px; background-color: ${colors.light}; color: ${colors.textDark};">
      <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid ${colors.primary}; padding-bottom: 15px;">
        <h1 style="color: ${colors.primary}; margin: 0;">פנייה חדשה מהאתר</h1>
        <p style="color: #666666; margin: 10px 0 0 0;">התקבלה בתאריך: ${new Date().toLocaleString('he-IL')}</p>
      </div>
      
      <div style="background-color: ${colors.gray}; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: ${colors.primary}; margin-top: 0; border-bottom: 1px solid ${colors.primary}; padding-bottom: 10px;">פרטי הפונה</h2>
        <p style="margin: 8px 0;"><strong style="color: ${colors.primary};">שם מלא:</strong> ${name}</p>
        <p style="margin: 8px 0;"><strong style="color: ${colors.primary};">מייל:</strong> <a href="mailto:${email}" style="color: ${colors.black};">${email}</a></p>
        ${phone ? `<p style="margin: 8px 0;"><strong style="color: ${colors.primary};">טלפון:</strong> <a href="tel:${phone}" style="color: ${colors.black};">${phone}</a></p>` : ''}
      </div>
      
      <div style="background-color: ${colors.gray}; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: ${colors.primary}; margin-top: 0; border-bottom: 1px solid ${colors.primary}; padding-bottom: 10px;">פרטי הפעילות</h2>
        ${city ? `<p style="margin: 8px 0;"><strong style="color: ${colors.primary};">עיר:</strong> ${city}</p>` : ''}
        ${studio ? `<p style="margin: 8px 0;"><strong style="color: ${colors.primary};">סטודיו:</strong> ${studio}</p>` : ''}
        ${trainingType ? `<p style="margin: 8px 0;"><strong style="color: ${colors.primary};">סוג אימון:</strong> ${trainingType}</p>` : ''}
        ${businessName ? `<p style="margin: 8px 0;"><strong style="color: ${colors.primary};">שם העסק:</strong> ${businessName}</p>` : ''}
        ${businessLocation ? `<p style="margin: 8px 0;"><strong style="color: ${colors.primary};">מיקום העסק:</strong> ${businessLocation}</p>` : ''}
        ${wantConsultation ? `<p style="margin: 8px 0;"><strong style="color: ${colors.primary};">מעוניין/ת בייעוץ:</strong> כן</p>` : ''}
      </div>
      
      ${notes ? `
      <div style="background-color: ${colors.gray}; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: ${colors.primary}; margin-top: 0; border-bottom: 1px solid ${colors.primary}; padding-bottom: 10px;">הערות</h2>
        <p style="margin: 8px 0; white-space: pre-line;">${notes.replace(/\n/g, '<br>')}</p>
      </div>
      ` : ''}
      
      <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666666;">
        <p>הודעה זו נשלחה מטופס יצירת הקשר באתר ${process.env.SITE_NAME || 'האתר שלך'}</p>
      </div>
    </div>
  `;
};

// פונקציה לשליחת מייל
export const sendEmail = async (data: ContactFormData): Promise<void> => {
  try {
    const transporter = createMailTransporter();
    const htmlTemplate = createEmailTemplate(data);
    
    const { name, businessName, trainingType } = data;
    
    logger.info(`מתחיל לשלוח מייל, עבור: ${businessName || name}`);
    
    const mailOptions = {
      from: `"${process.env.SITE_NAME || 'האתר שלך'}" <${process.env.EMAIL_USER || 'your_email@yourdomain.com'}>`,
      to: process.env.EMAIL_RECIPIENT || 'email@example.com',
      subject: `פנייה חדשה מהאתר: ${name}${trainingType ? ` - ${trainingType}` : ''}`,
      html: htmlTemplate
    };

    // שליחת המייל
    const info = await transporter.sendMail(mailOptions);
    logger.info(`מייל נשלח בהצלחה`, { 
      messageId: info.messageId, 
      recipient: process.env.EMAIL_RECIPIENT,
      sender: name
    });
    
    return Promise.resolve();
  } catch (error) {
    logger.error('שגיאה בשליחת המייל', error);
    throw error;
  }
};

// וידוא שהנתונים החיוניים קיימים
export const validateContactData = (data: any): { valid: boolean; message?: string } => {
  if (!data || typeof data !== 'object') {
    return { valid: false, message: 'נתונים לא תקינים' };
  }
  
  if (!data.name || !data.name.trim()) {
    return { valid: false, message: 'שדה שם הוא חובה' };
  }
  
  if (!data.email || !data.email.trim()) {
    return { valid: false, message: 'שדה מייל הוא חובה' };
  }
  
  // בדיקה בסיסית של תבנית אימייל
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, message: 'כתובת מייל לא תקינה' };
  }
  
  return { valid: true };
};

/**
 * Verify SMTP connection
 */
export async function verifyEmailConnection(): Promise<boolean> {
  try {
    const transporter = createMailTransporter();
    await transporter.verify();
    logger.info('SMTP connection verified successfully');
    return true;
  } catch (error) {
    logger.error('SMTP connection verification failed:', error);
    return false;
  }
}

export default {
  sendEmail,
  verifyEmailConnection,
  validateContactData,
  logger
}; 