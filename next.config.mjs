/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vaqybtnqyonvlwtskzmv.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },

      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },

      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/demo/image/upload/e_blur:2000/docs/diy-house.jpg",
        port: "",
      },

      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/daetxhtss/image/upload/**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
