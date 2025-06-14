import React, { useEffect } from 'react';

const TicketPrintout = ({
  children,
  className = '',
  printClassName = '',
}: {
  children: React.ReactNode;
  className?: string;
  printClassName?: string;
}) => {
  useEffect(() => {
    // Add print styles to head
    const printStyles = `
      .print-mode body * {
        visibility: hidden !important;
      }
      
      .print-mode .print-section,
      .print-mode .print-section * {
        visibility: visible !important;
      }
      
      .print-mode .print-section {
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        background: white !important;
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = printStyles;
    document.head.appendChild(styleElement);

    // Cleanup function
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  const handlePrint = () => {
    const cleanup = () => {
      document.body.classList.remove('print-mode');
      window.removeEventListener('afterprint', cleanup);
    };

    document.body.classList.add('print-mode');
    window.addEventListener('afterprint', cleanup);

    // Small delay to ensure styles are applied
    setTimeout(() => {
      window.print();
    }, 10);
  };

  return (
    <div className={`print-section ${className}`}>
      <button
        onClick={handlePrint}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 print:hidden"
      >
        Print This Section
      </button>
      <div className={printClassName}>TEST123</div>
    </div>
  );
};

export default TicketPrintout;
