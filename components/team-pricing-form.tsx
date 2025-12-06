"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface TeamPricingFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TeamPricingForm({ open, onOpenChange }: TeamPricingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    numberOfAgents: "",
    contactPerson: "",
    email: "",
    phone: "",
    currentChallenges: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit to API endpoint
      const response = await fetch("/api/team-pricing-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Reset form after 3 seconds and close dialog
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            companyName: "",
            numberOfAgents: "",
            contactPerson: "",
            email: "",
            phone: "",
            currentChallenges: "",
          })
          onOpenChange(false)
        }, 3000)
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting your request. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Request Team Pricing
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Fill out the form below and we'll get back to you within 12 hours to set up your team account.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--accent-1-20)' }}>
                <svg
                  className="w-8 h-8"
                  style={{ color: 'var(--accent-1)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Thank You!
            </h3>
            <p className="text-zinc-300">
              We'll set up your team account within 12 hours.
            </p>
            <p className="text-sm text-zinc-400 mt-2">
              You'll receive an email confirmation shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Company Name *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-none text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
                onFocus={(e) => e.currentTarget.style.setProperty('--tw-ring-color', 'var(--accent-1)')}
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label
                htmlFor="numberOfAgents"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Number of Agents *
              </label>
              <input
                type="number"
                id="numberOfAgents"
                name="numberOfAgents"
                required
                min="1"
                value={formData.numberOfAgents}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-none text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
                onFocus={(e) => e.currentTarget.style.setProperty('--tw-ring-color', 'var(--accent-1)')}
                placeholder="Enter number of agents"
              />
            </div>

            <div>
              <label
                htmlFor="contactPerson"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Contact Person *
              </label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                required
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-none text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
                onFocus={(e) => e.currentTarget.style.setProperty('--tw-ring-color', 'var(--accent-1)')}
                placeholder="Enter contact person name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-none text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
                onFocus={(e) => e.currentTarget.style.setProperty('--tw-ring-color', 'var(--accent-1)')}
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-none text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
                onFocus={(e) => e.currentTarget.style.setProperty('--tw-ring-color', 'var(--accent-1)')}
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label
                htmlFor="currentChallenges"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Current Challenges (Optional)
              </label>
              <textarea
                id="currentChallenges"
                name="currentChallenges"
                rows={4}
                value={formData.currentChallenges}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#D1B4C6] focus:border-transparent resize-none"
                placeholder="Tell us about your current email communication challenges..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 border border-[#161616] text-[#161616] hover:bg-[#FBFBFB] hover:text-[#161616] focus:text-[#161616] active:text-[#161616] transition-all duration-200 text-sm font-medium px-8 py-4 rounded-none uppercase tracking-wide h-12"
                style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 text-black text-sm font-medium px-8 py-4 rounded-none transition-all duration-200 uppercase tracking-wide inline-flex items-center gap-2 h-12 group"
                style={{ backgroundColor: 'var(--accent-1)', fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C4A7B9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-1)'}
              >
                {isSubmitting ? (
                  "SUBMITTING..."
                ) : (
                  <>
                    SUBMIT REQUEST
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

