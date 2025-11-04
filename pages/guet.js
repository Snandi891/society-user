import React, { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import toast from "react-hot-toast";

const GuestPage = () => {
  const [guestName, setGuestName] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/guest-visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestName, flatNumber }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Visit logged successfully!");
        await generatePDF(guestName, flatNumber);
        setGuestName("");
        setFlatNumber("");
      } else {
        toast.error(data.error || "❌ Failed to log visit");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("⚠️ Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePDF = async (guestName = "GUEST", flatNumber = "N/A") => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 400]);
      const { width, height } = page.getSize();
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Background
      page.drawRectangle({
        x: 0,
        y: 0,
        width,
        height,
        color: rgb(0.95, 0.95, 0.98),
      });

      // Premium Header (gradient simulation)
      const headerHeight = 110;
      const gradientSteps = 50;
      for (let i = 0; i < gradientSteps; i++) {
        const t = i / gradientSteps;
        const r = 0.1 * (1 - t) + 0.2 * t;
        const g = 0.3 * (1 - t) + 0.5 * t;
        const b = 0.6 * (1 - t) + 0.8 * t;
        page.drawRectangle({
          x: 0,
          y: height - headerHeight + i * (headerHeight / gradientSteps),
          width,
          height: headerHeight / gradientSteps + 1,
          color: rgb(r, g, b),
        });
      }

      // Header Text with shadow
      const title = "PREMIUM RESIDENCES";
      const titleSize = 16;
      const titleWidth = fontBold.widthOfTextAtSize(title, titleSize);
      const titleX = (width - titleWidth) / 2;
      const titleY = height - 50;

      page.drawText(title, {
        x: titleX + 1,
        y: titleY - 1,
        size: titleSize,
        font: fontBold,
        color: rgb(0, 0, 0),
      });
      page.drawText(title, {
        x: titleX,
        y: titleY,
        size: titleSize,
        font: fontBold,
        color: rgb(1, 1, 1),
      });

      const subtitle = "VISITOR PASS";
      const subtitleSize = 12;
      const subtitleWidth = fontRegular.widthOfTextAtSize(
        subtitle,
        subtitleSize
      );
      const subtitleX = (width - subtitleWidth) / 2;
      const subtitleY = height - 70;

      page.drawText(subtitle, {
        x: subtitleX + 1,
        y: subtitleY - 1,
        size: subtitleSize,
        font: fontRegular,
        color: rgb(0, 0, 0),
      });
      page.drawText(subtitle, {
        x: subtitleX,
        y: subtitleY,
        size: subtitleSize,
        font: fontRegular,
        color: rgb(0.9, 0.9, 0.9),
      });

      // Decorative lines
      page.drawRectangle({
        x: 30,
        y: height - 90,
        width: 40,
        height: 3,
        color: rgb(0, 0.8, 1),
      });
      page.drawRectangle({
        x: width - 70,
        y: height - 90,
        width: 40,
        height: 3,
        color: rgb(0, 0.8, 1),
      });

      // Main card
      const cardWidth = 500;
      const cardHeight = 200;
      const cardX = (width - cardWidth) / 2;
      const cardY = height - 240;

      page.drawRectangle({
        x: cardX,
        y: cardY,
        width: cardWidth,
        height: cardHeight,
        color: rgb(1, 1, 1),
        borderColor: rgb(0.9, 0.9, 0.9),
        borderWidth: 1,
      });

      // Card header text
      const cardHeaderY = cardY + cardHeight - 30;
      page.drawRectangle({
        x: cardX,
        y: cardY + cardHeight - 40,
        width: cardWidth,
        height: 40,
        color: rgb(0.9, 0.95, 1),
      });
      page.drawText("DIGITAL VISITOR AUTHORIZATION", {
        x: cardX + 20,
        y: cardHeaderY,
        size: 12,
        font: fontBold,
        color: rgb(0.1, 0.3, 0.6),
      });

      const infoStartY = cardY + cardHeight - 60;
      const drawBulletText = (label, value, yPos) => {
        page.drawText("-", {
          x: cardX + 30,
          y: yPos,
          size: 14,
          font: fontBold,
          color: rgb(0.1, 0.3, 0.6),
        });
        page.drawText(`${label}:`, {
          x: cardX + 45,
          y: yPos,
          size: 11,
          font: fontRegular,
          color: rgb(0.4, 0.4, 0.4),
        });
        page.drawText(value, {
          x: cardX + 150,
          y: yPos,
          size: 12,
          font: fontBold,
          color: rgb(0.1, 0.1, 0.1),
        });
      };

      const currentTime = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const passId = `VP${Date.now().toString().slice(-6)}`;

      drawBulletText("Guest Name", guestName.toUpperCase(), infoStartY);
      drawBulletText("Flat Number", flatNumber, infoStartY - 30);
      drawBulletText("Visit Time", currentTime, infoStartY - 60);
      drawBulletText("Pass ID", passId, infoStartY - 90);

      // Security section
      const securityY = cardY - 20;
      page.drawRectangle({
        x: cardX,
        y: securityY - 40,
        width: cardWidth,
        height: 30,
        color: rgb(0.98, 0.98, 0.98),
        borderColor: rgb(0.9, 0.9, 0.9),
        borderWidth: 1,
      });
      page.drawText("v SECURITY FEATURES", {
        x: cardX + 20,
        y: securityY - 25,
        size: 9,
        font: fontRegular,
        color: rgb(0.3, 0.5, 0.3),
      });
      page.drawText(
        "• Digital Verification • Time-Stamped • Unique ID • Society Approved",
        {
          x: cardX + 20,
          y: securityY - 40,
          size: 8,
          font: fontRegular,
          color: rgb(0.6, 0.6, 0.6),
        }
      );

      // Footer
      const footerY = 40;
      page.drawRectangle({
        x: 0,
        y: 0,
        width,
        height: footerY,
        color: rgb(0.05, 0.1, 0.2),
      });
      page.drawText(
        "For verification, contact: Security Desk • +91-XXXXXX-XXXX",
        {
          x: width / 2 - 140,
          y: 20,
          size: 8,
          font: fontRegular,
          color: rgb(0.8, 0.8, 0.9),
        }
      );
      page.drawText(
        "This pass is automatically generated and valid for 24 hours",
        {
          x: width / 2 - 150,
          y: 10,
          size: 7,
          font: fontRegular,
          color: rgb(0.6, 0.6, 0.8),
        }
      );

      // Save & download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${guestName.replace(
        /\s+/g,
        "_"
      )}_visitor_pass_${passId}.pdf`;
      link.click();

      toast.success("🎟️ Premium visitor pass generated successfully!");
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("❌ Failed to generate PDF, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 border-b border-white/10">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Visitor Access
              </h1>
              <p className="text-blue-200/80 text-sm mt-2 font-light">
                Generate digital visitor pass for society entry
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              {/* Guest Name Field */}
              <div className="group">
                <label className="block text-sm font-medium text-blue-100/90 mb-2 group-focus-within:text-white transition-colors duration-200">
                  Guest Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-blue-300/70 group-focus-within:text-blue-200 transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all duration-200 backdrop-blur-sm"
                    placeholder="Enter guest full name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Flat Number Field */}
              <div className="group">
                <label className="block text-sm font-medium text-blue-100/90 mb-2 group-focus-within:text-white transition-colors duration-200">
                  Flat Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-blue-300/70 group-focus-within:text-blue-200 transition-colors duration-200"
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
                  </div>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all duration-200 backdrop-blur-sm"
                    placeholder="Enter flat number"
                    value={flatNumber}
                    onChange={(e) => setFlatNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-blue-400 disabled:to-purple-500 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg hover:shadow-xl disabled:shadow-md group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="relative flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Generate Visitor Pass
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 py-4 bg-black/20 border-t border-white/5">
            <p className="text-center text-xs text-blue-200/60 font-light">
              Secure digital pass • Instant generation • Society approved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestPage;
