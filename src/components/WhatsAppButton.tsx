'use client';

import { motion } from 'framer-motion';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  branchName?: string;
  className?: string;
}

const WhatsAppButton = ({
  phoneNumber = '',
  message = 'היי, אשמח לקבל מידע נוסף על הסניף',
  branchName = '',
  className = '',
}: WhatsAppButtonProps) => {
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <>
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      className={`flex items-center bg-[#25D366] text-white rounded-xl font-medium shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 transition-all px-4 py-3 ${className}`}
        aria-label={`שלח הודעת וואטסאפ${branchName ? ' לסניף ' + branchName : ''}`}
    >
      <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M17.415 14.382c-.298-.149-1.759-.867-2.031-.967-.272-.099-.47-.148-.669.149-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M11.999 1C5.869 1 1 5.869 1 12s4.869 11 10.999 11C18.131 23 23 18.131 23 12S18.131 1 11.999 1M12 21.5c-5.246 0-9.5-4.253-9.5-9.5S6.754 2.5 12 2.5 21.5 6.754 21.5 12s-4.254 9.5-9.5 9.5" />
      </svg>
      <span>שלח הודעת וואצאפ</span>
    </motion.a>
      {branchName && (
        <div className="mt-4">
          <h4 className="text-base font-semibold mb-2">גלריה מהסניף</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 min-h-[80px] bg-gray-100/30 rounded-lg p-2">
            {/* כאן ייכנסו תמונות הגלריה של הסניף */}
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton; 