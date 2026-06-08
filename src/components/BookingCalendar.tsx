import { useState } from "react";
import { Calendar as CalendarIcon, Clock, ChevronRight, CheckCircle2, User, Mail, Globe } from "lucide-react";

interface Slot {
  id: string;
  time: string;
  available: boolean;
}

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    timezone: "UTC - 5 (Eastern Time)",
    projectGoals: "",
  });

  const availableSlots: Slot[] = [
    { id: "s1", time: "09:30 AM", available: true },
    { id: "s2", time: "11:00 AM", available: true },
    { id: "s3", time: "01:30 PM", available: false },
    { id: "s4", time: "03:00 PM", available: true },
    { id: "s5", time: "04:30 PM", available: true },
    { id: "s6", time: "06:00 PM", available: true },
  ];

  // Simple current month calendar (30 days from today)
  const days = Array.from({ length: 28 }, (_, i) => i + 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot || !bookingDetails.name || !bookingDetails.email) return;
    setIsBooked(true);
  };

  const selectedDayString = selectedDate 
    ? `June ${selectedDate}, 2026` 
    : "No date selected";

  return (
    <div id="booking-calendar-outer-id" className="w-full bg-white dark:bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-205 dark:border-slate-800 backdrop-blur-xl shadow-md dark:shadow-xl">
      {isBooked ? (
        <div className="text-center py-12 flex flex-col items-center justify-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500 flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle2 className="w-8 h-8 text-cyan-500 dark:text-cyan-400" />
          </div>
          <h3 className="text-2xl font-bold font-sans text-slate-800 dark:text-slate-100 tracking-tight">Your Session is Secured!</h3>
          <p className="text-slate-650 dark:text-slate-400 text-sm mt-3 max-w-sm mx-auto leading-relaxed">
            We have emailed a calendar invite to <span className="text-cyan-650 dark:text-cyan-400 font-bold">{bookingDetails.email}</span> along with preparatory questions.
          </p>
          <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-left w-full max-w-md">
            <p className="text-xs font-mono text-slate-450 dark:text-slate-500 uppercase tracking-widest mb-3">Meeting Coordinates</p>
            <div className="flex gap-2 items-center text-slate-705 dark:text-slate-300 text-sm mb-2">
              <CalendarIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{selectedDayString}</span>
            </div>
            <div className="flex gap-2 items-center text-slate-705 dark:text-slate-300 text-sm mb-2">
              <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{availableSlots.find((s) => s.id === selectedSlot)?.time} ({bookingDetails.timezone})</span>
            </div>
            <div className="flex gap-2 items-center text-slate-705 dark:text-slate-300 text-sm">
              <User className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Advisor: Kiara (Lead Growth Coordinator)</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsBooked(false);
              setSelectedDate(null);
              setSelectedSlot(null);
            }}
            className="mt-8 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 underline pointer-events-auto cursor-pointer"
          >
            Schedule Another Consultation
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
          {/* Calendar Day Picker (4 Cols) */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800/80 pb-6 lg:pb-0 lg:pr-6">
            <h4 className="text-sm font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2 uppercase tracking-wide mb-4">
              <CalendarIcon className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              1. Select a Date
            </h4>
            <div className="flex justify-between items-center mb-4 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/50">
              <span>June 2026</span>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono tracking-wider">MON - FRI ACTIVE</span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono text-slate-400 dark:text-slate-500 mb-2">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span className="text-red-500">S</span><span className="text-red-500">S</span>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {days.map((day) => {
                // Mock weekends on index
                const isWeekend = day % 7 === 6 || day % 7 === 0;
                const isSelected = selectedDate === day;
                return (
                  <button
                    key={day}
                    disabled={isWeekend}
                    onClick={() => {
                      setSelectedDate(day);
                      setSelectedSlot(null);
                    }}
                    type="button"
                    className={`h-9 rounded-lg border flex items-center justify-center text-xs font-semibold font-mono transition-all duration-150 cursor-pointer ${
                      isWeekend 
                        ? "border-transparent text-slate-305 dark:text-slate-700 cursor-not-allowed bg-transparent" 
                        : isSelected
                        ? "bg-cyan-500 border-cyan-400 text-slate-950 shadow-[0_2px_12px_rgba(6,182,212,0.35)] font-bold scale-1.02"
                        : "border-slate-200 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-900"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Picker and Core Survey Form (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h4 className="text-sm font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2 uppercase tracking-wide mb-3">
                  <Clock className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                  2. Select Slot ({selectedDayString})
                </h4>
                {selectedDate ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot.id)}
                        className={`py-2 px-3 rounded-lg border text-xs font-mono transition-all duration-150 cursor-pointer ${
                          !slot.available
                            ? "bg-slate-100 dark:bg-slate-950/20 border-slate-200 dark:border-slate-900/50 text-slate-300 dark:text-slate-800 cursor-not-allowed line-through"
                            : selectedSlot === slot.id
                            ? "bg-cyan-500/15 border-cyan-500 text-cyan-600 dark:text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.1)] font-boldScale"
                            : "bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-750 hover:bg-slate-100 dark:hover:bg-slate-905"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs bg-slate-50 dark:bg-slate-950/30 p-4 border border-slate-200 dark:border-slate-855 rounded-xl text-slate-500 text-center leading-relaxed">
                    Please select a specific date on the calendar first to populate active slot availability patterns.
                  </div>
                )}
              </div>

              {/* Timezone Indicator */}
              <div className="flex items-center gap-2 text-xs text-slate-655 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded-lg border border-slate-200 dark:border-slate-850">
                <Globe className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <span>Broker timezone automatically matched:</span>
                <select
                  value={bookingDetails.timezone}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, timezone: e.target.value })}
                  className="bg-transparent border-none text-cyan-650 dark:text-cyan-400 font-bold focus:ring-0 cursor-pointer p-0 text-xs ml-auto outline-none dark:bg-slate-900"
                >
                  <option value="EST" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">UTC -5 (Eastern Time)</option>
                  <option value="PST" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">UTC -8 (Pacific Time)</option>
                  <option value="GMT" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">UTC +0 (London Time)</option>
                  <option value="IST" className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">UTC +5:30 (India Time)</option>
                </select>
              </div>

              {/* Core Survey Inputs */}
              <div className="space-y-3">
                <h4 className="text-sm font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wide">3. Submit Verification Profile</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={bookingDetails.name}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="Corporate Email Address"
                      value={bookingDetails.email}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div>
                  <textarea
                    placeholder="Briefly state your core digital growth objectives or description (e.g., Launching modern direct-sales portal with AI helper widget)."
                    value={bookingDetails.projectGoals}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, projectGoals: e.target.value })}
                    rows={2}
                    className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 rounded-lg p-3 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none font-sans"
                  />
                </div>
              </div>

              {/* Action */}
              <button
                type="submit"
                disabled={!selectedDate || !selectedSlot}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-350 dark:disabled:text-slate-600 disabled:cursor-not-allowed text-slate-950 px-4 py-3 rounded-xl font-bold font-sans text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_2px_12px_rgba(6,182,212,0.15)] hover:shadow-[0_4px_20px_rgba(6,182,212,0.3)] transition-all pointer-events-auto cursor-pointer"
              >
                Lock In Growth Strategy Consultation
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
