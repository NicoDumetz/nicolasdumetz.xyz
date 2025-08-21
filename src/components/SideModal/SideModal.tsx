import { motion, AnimatePresence } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface SideModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-8 w-8 text-white"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SideModal: FC<SideModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60"
          />

          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed top-0 right-0 z-50 h-full w-full bg-[#03000b] shadow-lg md:w-2/10"
          >
            <div className="flex h-full flex-col p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white font-migra tracking-wide">{title}</h2>
                <button onClick={onClose} className="md:hidden">
                  <CloseIcon />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto text-white">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideModal;