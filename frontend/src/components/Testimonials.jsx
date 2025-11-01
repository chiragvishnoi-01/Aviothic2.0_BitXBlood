import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Donor",
      image: "https://i.pravatar.cc/150?img=5",
      text: "BloodLink made donating blood so easy! I've saved 3 lives so far and the platform keeps me updated on my impact. Truly amazing!",
      rating: 5,
      bloodType: "O+",
    },
    {
      name: "Michael Brown",
      role: "Recipient's Family",
      image: "https://i.pravatar.cc/150?img=13",
      text: "When my father needed urgent blood in New York, BloodLink connected us with donors in under 10 minutes. They literally saved his life!",
      rating: 5,
      bloodType: "AB-",
    },
    {
      name: "Emily Davis",
      role: "Hero Donor",
      image: "https://i.pravatar.cc/150?img=9",
      text: "The gamification and leaderboard feature motivates me to donate regularly. I'm proud to be in the top 10 donors in Houston this month!",
      rating: 5,
      bloodType: "B+",
    },
    {
      name: "John Smith",
      role: "Campaign Organizer",
      image: "https://i.pravatar.cc/150?img=12",
      text: "Organizing blood donation camps in Chicago has never been easier. BloodLink's platform is intuitive and reaches thousands of potential donors.",
      rating: 5,
      bloodType: "A+",
    },
    {
      name: "Dr. Lisa Anderson",
      role: "Medical Professional",
      image: "https://i.pravatar.cc/150?img=1",
      text: "As a doctor at City Hospital, I've seen how BloodLink bridges the gap between blood banks and patients. The verification system is top-notch!",
      rating: 5,
      bloodType: "O-",
    },
    {
      name: "David Wilson",
      role: "First-time Donor",
      image: "https://i.pravatar.cc/150?img=15",
      text: "I was nervous about donating for the first time in Los Angeles, but BloodLink's guides and supportive community made the experience wonderful!",
      rating: 5,
      bloodType: "A-",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-red-50/30 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-red-300 to-rose-400 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-pink-300 to-red-400 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-red-100 to-rose-100 border-2 border-red-200 rounded-full"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <span className="text-red-600 font-black text-sm">💬 TESTIMONIALS</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 bg-clip-text text-transparent">
              Stories From
            </span>
            <br />
            <span className="text-gray-800">Our Heroes</span>
          </h2>

          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Real experiences from donors and recipients who trust Raktchain
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Card */}
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border-2 border-gray-100 hover:border-red-200 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-red-200/50 overflow-hidden h-full">
                {/* Background Gradient on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-50 to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Quote Icon */}
                <motion.div
                  className="absolute top-6 right-6 text-red-200 opacity-20 group-hover:opacity-40 transition-opacity"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaQuoteLeft className="text-6xl" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Profile */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-600 rounded-full blur-md opacity-50"></div>
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="relative w-16 h-16 rounded-full border-4 border-white shadow-xl object-cover"
                      />
                      {/* Blood Type Badge */}
                      <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-red-600 to-rose-600 text-white text-xs font-black px-2 py-1 rounded-lg shadow-lg">
                        {testimonial.bloodType}
                      </div>
                    </motion.div>
                    <div>
                      <h4 className="font-black text-gray-800 text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-sm font-semibold">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.1 + i * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <FaStar className="text-yellow-400 text-lg" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-600 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-red-500/5 to-rose-500/10 rounded-tl-full"></div>
              </div>

              {/* Floating Hearts */}
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-red-400 opacity-0 group-hover:opacity-60"
                  style={{
                    top: `${30 + i * 40}%`,
                    right: `${10 + i * 15}%`,
                  }}
                  animate={{
                    y: [-10, -30, -10],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                >
                  ❤️
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
