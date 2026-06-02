import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export function ContactUsPage() {
    const form = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Required EmailJS parameters: serviceID service_06t4vlw , templateID template_82e7z88 , PUBLIC_KEY 7cOYqHLbHWPbjcrrO
        // Note to developer: Please replace these with actual keys from your EmailJS account
        // You can get these for free at https://www.emailjs.com/
        emailjs
            .sendForm(
                'service_06t4vlw', // Replace with your Service ID
                'template_82e7z88', // Replace with your Template ID
                form.current,
                '7cOYqHLbHWPbjcrrO' // Replace with your Public Key
            )
            .then(
                () => {
                    toast.success("Message sent successfully! We'll get back to you soon.");
                    form.current.reset();
                    setIsSubmitting(false);
                },
                (error) => {
                    toast.error("Failed to send message. Please try again later.");
                    console.error("FAILED...", error.text);
                    setIsSubmitting(false);
                }
            );
    };

    return (
        <div className="w-full py-16 px-4 bg-gray-50 flex flex-col items-center font-poppins">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Contact Us</h1>
            <p className="text-gray-500 mb-12 text-center max-w-2xl text-sm md:text-base">
                Have questions or need assistance? We're here to help! Reach out to our team using the contact details below, or send us a message directly.
            </p>

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Get in Touch</h2>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shrink-0">
                            <FaPhone className="text-xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                            <p className="text-gray-600 mt-1">+94 78 554 5340</p>
                            <p className="text-gray-600">+94 71 128 2082</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shrink-0">
                            <FaEnvelope className="text-xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Email</h3>
                            <p className="text-gray-600 mt-1">dinethnethsaradev@gmail.com</p>
                            <p className="text-gray-600">dinethnethsara24@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shrink-0">
                            <FaMapMarkerAlt className="text-xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">Location</h3>
                            <p className="text-gray-600 mt-1">Colombo,</p>
                            <p className="text-gray-600">Sri Lanka</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
                    <form ref={form} className="flex flex-col gap-5" onSubmit={sendEmail}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                            <input type="text" name="user_name" required placeholder="Chris Hemsworth" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" name="user_email" required placeholder="chrishemsworth@gmail.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea name="message" required rows="4" placeholder="How can we help you?" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-500 transition-colors resize-none"></textarea>
                        </div>
                        <button disabled={isSubmitting} type="submit" className={`w-full py-3 bg-black text-white rounded-xl font-medium transition-colors mt-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"}`}>
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
