import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tours/food-local-culture",
        destination: "/tours/marrakesh-by-night",
        permanent: true,
      },
      {
        source: "/tours/bahia-palace-monuments",
        destination: "/tours/marrakesh-private-signature-experience-7-days",
        permanent: true,
      },
      {
        source: "/tours/day-trips-around-marrakesh",
        destination: "/tours/marrakesh-oualidia-coastal-escape-5-days",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
