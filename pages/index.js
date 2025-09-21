import { useState, useEffect, useRef } from "react";
import Head from "next/head";

export default function Home() {
  const [currentProperty, setCurrentProperty] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const propertiesRef = useRef(null);

  const featuredProperties = [
    {
      id: 1,
      title: "Luxury Villa with Ocean View",
      price: "$2,450,000",
      location: "Miami Beach, FL",
      beds: 5,
      baths: 4,
      sqft: "4,200",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      type: "luxury",
    },
    {
      id: 2,
      title: "Modern Downtown Penthouse",
      price: "$1,850,000",
      location: "New York, NY",
      beds: 4,
      baths: 3,
      sqft: "3,500",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1453&q=80",
      type: "apartment",
    },
    {
      id: 3,
      title: "Contemporary Lakeside Estate",
      price: "$3,200,000",
      location: "Lake Tahoe, CA",
      beds: 6,
      baths: 5,
      sqft: "5,800",
      image:
        "https://images.unsplash.com/photo-1600566753051-475254d7b3e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      type: "luxury",
    },
    {
      id: 4,
      title: "Urban Loft in Historic District",
      price: "$875,000",
      location: "Boston, MA",
      beds: 3,
      baths: 2,
      sqft: "2,100",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1680&q=80",
      type: "apartment",
    },
    {
      id: 5,
      title: "Suburban Family Home",
      price: "$650,000",
      location: "Austin, TX",
      beds: 4,
      baths: 3,
      sqft: "3,200",
      image:
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1684&q=80",
      type: "house",
    },
    {
      id: 6,
      title: "Mountain Retreat Cabin",
      price: "$1,100,000",
      location: "Aspen, CO",
      beds: 4,
      baths: 3,
      sqft: "2,800",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80",
      type: "house",
    },
  ];

  const filteredProperties =
    activeFilter === "all"
      ? featuredProperties
      : featuredProperties.filter((property) => property.type === activeFilter);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProperty((prev) => (prev + 1) % featuredProperties.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProperties = () => {
    propertiesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Primeum Real Estate | Luxury Properties</title>
        <meta
          name="description"
          content="Find your dream home with Primeum Real Estate"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">Primeum</span>
            <span className="text-gray-700 ml-1 hidden sm:inline">
              Real Estate
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10">
            <a
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Properties
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Agents
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hidden md:block">
            Sign In
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Properties
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Agents
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Contact
              </a>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${featuredProperties[currentProperty].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <div className="z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your <span className="text-indigo-400">Dream Home</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 mx-auto">
            Discover luxury properties in the most desirable locations around
            the world
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              onClick={scrollToProperties}
            >
              Browse Properties
            </button>
            <button className="bg-white hover:bg-gray-100 text-indigo-600 font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg">
              Learn More
            </button>
          </div>
        </div>

        {/* Property indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {featuredProperties.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                currentProperty === index ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setCurrentProperty(index)}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-6 -mt-16 relative z-30">
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Find Your Perfect Property
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option>Select City</option>
                <option>New York</option>
                <option>Los Angeles</option>
                <option>Miami</option>
                <option>Chicago</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option>Any Type</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Commercial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option>Any Price</option>
                <option>Under $500,000</option>
                <option>$500,000 - $1M</option>
                <option>$1M - $2M</option>
                <option>Over $2M</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <section ref={propertiesRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Properties
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of premium properties in the most
              sought-after locations
            </p>

            {/* Property Type Filters */}
            <div className="flex flex-wrap justify-center mt-8 gap-2">
              {["all", "luxury", "apartment", "house"].map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeFilter === type
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setActiveFilter(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 group"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                    {property.type}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {property.title}
                    </h3>
                    <span className="text-indigo-600 font-bold">
                      {property.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {property.location}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 border-t border-gray-200 pt-4">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      {property.beds} Beds
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {property.baths} Baths
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                        />
                      </svg>
                      {property.sqft} sqft
                    </span>
                  </div>
                  <button className="mt-6 w-full bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white py-2 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
              View All Properties
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">2,500+</div>
              <p className="text-indigo-100">Properties Listed</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <p className="text-indigo-100">Client Satisfaction</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
              <p className="text-indigo-100">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive real estate services to meet all your
              property needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6 rounded-xl hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Property Sales
              </h3>
              <p className="text-gray-600">
                Find your dream home from our extensive collection of premium
                properties.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Property Management
              </h3>
              <p className="text-gray-600">
                Professional management services to maintain and enhance your
                property's value.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Real Estate Investment
              </h3>
              <p className="text-gray-600">
                Expert advice on property investments to maximize your returns
                and build wealth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied clients who found their perfect property
              through Primeum
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold mr-4">
                    JD
                  </div>
                  <div>
                    <h4 className="font-bold">John Doe</h4>
                    <p className="text-gray-600">Miami, FL</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Primeum helped us find our dream home in just two weeks.
                  Their agents are knowledgeable and professional. Highly
                  recommended!"
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-10">
            Join thousands of satisfied clients who found their perfect property
            through Primeum Real Estate
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors shadow-lg">
              Browse Properties
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Primeum Real Estate</h3>
              <p className="text-gray-400">
                Luxury properties for discerning clients. Find your dream home
                with us.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Properties
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Agents
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <address className="not-italic text-gray-400">
                <p>123 Luxury Avenue</p>
                <p>Beverly Hills, CA 90210</p>
                <p className="mt-2">info@primeum.com</p>
                <p>+1 (555) 123-4567</p>
              </address>
            </div>
            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for updates
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Primeum Real Estate. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
