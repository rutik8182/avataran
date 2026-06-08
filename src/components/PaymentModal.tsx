import { useState } from "react";
import { X, CreditCard, Lock, ShieldCheck, Mail, AlertCircle, ShoppingBag, CheckCircle } from "lucide-react";
import { PricingPlan } from "../types";

interface PaymentModalProps {
  plan: PricingPlan | null;
  onClose: () => void;
}

export default function PaymentModal({ plan, onClose }: PaymentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    cvc: "",
    expiry: ""
  });
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  if (!plan) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.cardNumber) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setComplete(true);
    }, 1500);
  };

  return (
    <div id="payment-modal-backdrop-id" className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl relative overflow-hidden animate-scaleIn">
        {/* Glow corner detail */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/10 via-transparent to-transparent rounded-full blur-xl pointer-events-none" />

        {/* Header bar */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/30">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <h3 className="text-sm font-bold font-sans text-slate-800 dark:text-slate-100 uppercase tracking-widest">Avtaran checkout</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/50 text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-700 transition-colors pointer-events-auto cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {complete ? (
          <div className="p-8 text-center flex flex-col items-center justify-center animate-fadeIn font-sans">
            <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500 flex items-center justify-center mb-5 animate-bounce">
              <CheckCircle className="w-7 h-7 text-cyan-500 dark:text-cyan-400" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">Plan Activated Successfully!</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs mt-3 leading-relaxed max-w-sm mx-auto">
              We have completed your secure retainer pre-authorization for the <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{plan.name}</span> plan. A contract draft and strategy agenda have been sent.
            </p>
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-850 text-xs font-mono text-slate-600 dark:text-slate-400 text-left w-full">
              <p className="border-b border-slate-100 dark:border-slate-900 pb-1.5 mb-1.5 uppercase text-slate-450 dark:text-slate-500 tracking-wider">Transaction Record</p>
              <div className="flex justify-between mb-1"><span>Retainer Package:</span><span className="text-slate-850 dark:text-slate-205 font-sans font-bold">{plan.name}</span></div>
              <div className="flex justify-between mb-1"><span>Periodic Total:</span><span className="text-slate-850 dark:text-slate-205 font-sans font-bold">${plan.price}/mo</span></div>
              <div className="flex justify-between"><span>Secure Hash:</span><span className="text-cyan-600 dark:text-cyan-400 font-mono text-[10px]">AVT_TX_7xBC9ef81z</span></div>
            </div>
            <button
              onClick={onClose}
              className="mt-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-sans uppercase tracking-wider px-6 py-2.5 rounded-lg transition-all pointer-events-auto cursor-pointer shadow-md"
            >
              Continue to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 font-sans text-left animate-fadeIn">
            {/* Plan display detail */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-455 dark:text-slate-500">Selected Retainer</span>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">{plan.name}</h4>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-cyan-600 dark:text-cyan-400">${plan.price}<span className="text-xs text-slate-500 font-normal"> / mo</span></p>
                <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-900/30">SECURE DISPATCH</span>
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400">Account Owner Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Catherine Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400">Corporate Billing Email</label>
                <input
                  type="email"
                  required
                  placeholder="catherine@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Secure card parameters */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400">Credit Card Credentials</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="4111 2222 3333 4444"
                    maxLength={19}
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-800 dark:text-slate-202 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-405">Expiration Date</label>
                  <input
                    type="text"
                    required
                    placeholder="MM / YY"
                    maxLength={5}
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-800 dark:text-slate-202 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-405">Security Code (CVC)</label>
                  <input
                    type="password"
                    required
                    placeholder="•••"
                    maxLength={4}
                    value={formData.cvc}
                    onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-850 dark:text-slate-202 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Compliance notice */}
            <div className="text-[10px] text-slate-550 dark:text-slate-500 bg-slate-50 dark:bg-slate-950/40 p-3 rounded-lg border border-slate-200 dark:border-slate-850 flex items-start gap-2 leading-relaxed">
              <Lock className="w-3.5 h-3.5 text-cyan-555 dark:text-cyan-500 shrink-0 mt-0.5" />
              <span>
                 Retainer parameters processed through a sandbox configuration. We utilize standard SSL 256-bit encryption pipelines ensuring security alignment.
              </span>
            </div>

            {/* Form submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-550 disabled:cursor-not-allowed text-slate-950 px-4 py-3 rounded-xl font-bold font-sans text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_2px_12px_rgba(6,182,212,0.15)] pointer-events-auto"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  processing payment credentials...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  initiate {plan.name} retainer
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
