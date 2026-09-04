import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SendOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

/* ─── Static data ────────────────────────────────────────── */
const CONTACT_INFO = [
  {
    id: 'email',
    icon: MailOutlined,
    label: 'Email',
    value: 'sajeelanwar.dev@gmail.com',
    href: 'mailto:sajeelanwar.dev@gmail.com',
    accent: '#4338ca',
    bg: '#eef2ff',
  },
  {
    id: 'phone',
    icon: PhoneOutlined,
    label: 'Phone',
    value: '+92 301 726 8016',
    href: 'tel:+923017268016',
    accent: '#0891b2',
    bg: '#ecfeff',
  },
  {
    id: 'location',
    icon: EnvironmentOutlined,
    label: 'Location',
    value: 'Faisalabad, Pakistan',
    href: null,
    accent: '#059669',
    bg: '#ecfdf5',
  },
];

const SOCIAL_LINKS = [
  { icon: FaGithub, url: 'https://github.com/sajeelanwar', label: 'GitHub' },
  { icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/sajeel-anwar-69b97124b', label: 'LinkedIn' },
  { icon: FaWhatsapp, url: 'https://wa.me/923017268016', label: 'WhatsApp' },
];

/* ─── Field config — keeps JSX clean below ───────────────── */
const FIELDS = [
  {
    id: 'name',
    type: 'text',
    label: 'Full Name',
    placeholder: 'e.g. John Smith',
    autoComplete: 'name',
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'you@example.com',
    autoComplete: 'email',
  },
  {
    id: 'title',
    type: 'text',
    label: 'Subject',
    placeholder: 'Project enquiry / Freelance / Consulting…',
    autoComplete: 'off',
  },
];

/* ─── Animation helpers ──────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── Shared input / textarea class ─────────────────────── */
const inputCls = `
  w-full px-4 py-3 rounded-xl
  bg-gray-50 border border-gray-200 text-slate-800
  text-sm placeholder-gray-400
  outline-none transition-all duration-200
  focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20
`;

/* ─── Contact Info Row ───────────────────────────────────── */
const InfoRow = ({ item }) => {
  const Icon = item.icon;
  const content = (
    <div className="flex items-center gap-4 group">
      {/* Icon badge */}
      <div
        style={{ backgroundColor: item.bg, color: item.accent }}
        className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200"
      >
        <Icon />
      </div>
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
          {item.label}
        </p>
        <p
          className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors duration-200"
        >
          {item.value}
        </p>
      </div>
    </div>
  );

  return item.href ? (
    <a href={item.href} className="block">{content}</a>
  ) : (
    <div>{content}</div>
  );
};

/* ─── Success Toast ──────────────────────────────────────── */
const SuccessToast = () => (
  <motion.div
    initial={{ opacity: 0, y: 12, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -8, scale: 0.95 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700"
  >
    <CheckCircleOutlined className="text-xl flex-shrink-0" />
    <div>
      <p className="text-sm font-bold">Message sent!</p>
      <p className="text-xs text-emerald-600">I'll get back to you within 24 hours.</p>
    </div>
  </motion.div>
);

/* ─── Contact Section ────────────────────────────────────── */
const Contact = () => {
  const form = useRef(null);
  const [formData, setFormData] = useState({
    name: '', email: '', title: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: '', text: '' });

    emailjs
      .sendForm(
        'service_tju03xt',
        'template_8st48fr',
        form.current,
        'PBKDWRNDGHYZgmwRt'
      )
      .then(() => {
        form.current.reset();
        setFormData({ name: '', email: '', title: '', message: '' });
        setStatusMessage({ type: 'success', text: 'Message sent successfully!' });
        setIsSubmitting(false);
      })
      .catch(() => {
        setStatusMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.5,
        }}
      />
      {/* Soft blobs */}
      <div aria-hidden="true" className="absolute top-0 left-0 w-[420px] h-[280px] bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-[340px] h-[280px] bg-violet-50 rounded-full blur-3xl opacity-50 pointer-events-none translate-x-1/4 translate-y-1/4" />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">

        {/* ── Section header ── */}
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 tracking-widest uppercase mb-3">
            <span className="w-6 h-px bg-indigo-400 inline-block" />
            Get In Touch
            <span className="w-6 h-px bg-indigo-400 inline-block" />
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Let&apos;s <span className="text-indigo-600">Work Together</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            I am currently available for freelance projects, technical consulting, and full-time
            opportunities. Whether you have a specific project in mind or just want to connect,
            my inbox is always open.
          </p>
        </motion.div>

        {/* ── Two-column body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ── Left: info + socials ── */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col gap-8">

            {/* Heading */}
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                Contact Information
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Prefer a direct line? Reach out via any of the channels below. I typically
                respond to emails within a business day.
              </p>
            </div>

            {/* Info rows */}
            <div className="flex flex-col gap-4">
              {CONTACT_INFO.map((item) => (
                <InfoRow key={item.id} item={item} />
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200" />

            {/* Social links */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Find me on
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, url, label }) => (
                  <motion.a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3, backgroundColor: '#eef2ff', color: '#4338ca', borderColor: '#a5b4fc' }}
                    whileTap={{ scale: 0.93 }}
                    className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 text-lg shadow-sm transition-colors"
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm w-fit">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold text-gray-700">
                Available for new projects
              </span>
            </div>
          </motion.div>

          {/* ── Right: form card ── */}
          <motion.div {...fadeUp(0.2)}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md shadow-gray-100/60 p-7 md:p-9">

              <h3 className="text-xl font-extrabold text-gray-900 mb-1">Send a Message</h3>
              <p className="text-gray-400 text-sm mb-7">
                Fill in the form and I&apos;ll reply as soon as possible.
              </p>

              {/* Success toast (only shown on explicit success) */}
              <AnimatePresence>
                {statusMessage.type === 'success' && (
                  <div className="mb-6">
                    <SuccessToast />
                  </div>
                )}
              </AnimatePresence>

              <form ref={form} onSubmit={sendEmail} noValidate className="space-y-5">

                {/* Text fields */}
                {FIELDS.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-1.5"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      name={field.id}
                      value={formData[field.id] ?? ''}
                      onChange={handleChange}
                      required
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      className={inputCls}
                    />
                  </div>
                ))}

                {/* Message textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Hello, I'd like to talk about…"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 8px 28px rgba(67,56,202,0.22)' } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full flex items-center justify-center gap-2.5
                    py-3.5 px-6 rounded-xl
                    text-sm font-bold text-white
                    transition-all duration-200
                    ${isSubmitting
                      ? 'bg-indigo-400 cursor-not-allowed opacity-70'
                      : 'bg-indigo-700 hover:bg-indigo-800 shadow-md shadow-indigo-200'}
                  `}
                >
                  {isSubmitting ? (
                    <>
                      {/* Spinner */}
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <SendOutlined />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status message */}
                <AnimatePresence>
                  {statusMessage.type === 'error' && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-center text-sm font-medium text-red-500 mt-2"
                    >
                      {statusMessage.text}
                    </motion.p>
                  )}
                </AnimatePresence>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;