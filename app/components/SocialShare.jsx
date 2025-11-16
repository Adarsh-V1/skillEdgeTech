'use client'
import { motion } from 'framer-motion'
import Tooltip from "./Tooltip";
export default function SocialShare({ url, title }) {
  return (
    <div className="flex gap-2 mt-4">
      <Tooltip text="Share on Twitter">
        <motion.a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative rounded-full px-3 py-2 text-white shadow hover:shadow-black/10 overflow-hidden bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6]"
          aria-label="Share on Twitter"
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.13 }
          }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="absolute inset-0 bg-white/20 opacity-20" />
          <span className="relative">Twitter</span>
        </motion.a>
      </Tooltip>
      <Tooltip text="Share on Facebook">
        <motion.a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-white text-gray-800 px-3 py-2 border border-gray-200 hover:bg-[#F8FAFC]"
          aria-label="Share on Facebook"
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.13 }
          }}
          whileTap={{ scale: 0.97 }}
        >
          Facebook
        </motion.a>
      </Tooltip>
      <Tooltip text="Share on LinkedIn">
        <motion.a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full text-blue-600 px-3 py-2 hover:bg-blue-50"
          aria-label="Share on LinkedIn"
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.13 }
          }}
          whileTap={{ scale: 0.97 }}
        >
          LinkedIn
        </motion.a>
      </Tooltip>
    </div>
  );
}
