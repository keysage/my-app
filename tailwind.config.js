/** @type {import('tailwindcss').Config} */
module.exports = {
  // 添加内容路径，以便 Tailwind 知道在哪里查找需要处理的文件：
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

