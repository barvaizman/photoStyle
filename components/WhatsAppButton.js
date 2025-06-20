export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/972501234567"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 bg-green-500 text-white p-3 rounded-full shadow-lg z-50 hover:bg-green-600 transition"
      aria-label="צ'אט WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.77 11.77 0 0012 0C5.37 0 .04 6.13 0 12.64a11.72 11.72 0 001.6 5.94L0 24l5.6-1.48a11.84 11.84 0 005.62 1.45H12c6.63 0 12-6.13 12-12.64a12.21 12.21 0 00-3.48-8.33z"/>
      </svg>
    </a>
  )
}