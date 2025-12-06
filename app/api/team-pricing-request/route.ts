import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      companyName,
      numberOfAgents,
      contactPerson,
      email,
      phone,
      currentChallenges,
    } = body

    // Validate required fields
    if (!companyName || !numberOfAgents || !contactPerson || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Determine pricing tier based on number of agents
    let pricingTier = ""
    let monthlyPrice = 0
    const agentCount = parseInt(numberOfAgents)

    if (agentCount <= 3) {
      pricingTier = "Up to 3 users"
      monthlyPrice = 99
    } else if (agentCount <= 10) {
      pricingTier = "Up to 10 users"
      monthlyPrice = 199
    } else if (agentCount <= 25) {
      pricingTier = "Up to 25 users"
      monthlyPrice = 399
    } else {
      pricingTier = "Custom pricing"
      monthlyPrice = 0
    }

    // Email content for admin (you)
    const adminEmailContent = `
New Team Pricing Request

Company Name: ${companyName}
Number of Agents: ${numberOfAgents}
Contact Person: ${contactPerson}
Email: ${email}
Phone: ${phone}
Current Challenges: ${currentChallenges || "Not provided"}

Suggested Pricing Tier: ${pricingTier} - $${monthlyPrice}/month

Next Steps:
1. Create a Stripe invoice for $${monthlyPrice}/month
2. Set up team admin login in the app
3. Send login credentials to ${email}
    `.trim()

    // Email content for user
    const userEmailContent = `
Thank you for your team pricing request!

We've received your request for team pricing for ${companyName}.

We'll set up your team account within 12 hours. You'll receive:
- A Stripe invoice for your team plan
- Team admin login credentials
- Setup instructions

If you have any questions, please don't hesitate to reach out.

Best regards,
The BossyEmail Team
    `.trim()

    // TODO: Integrate with your email service (SendGrid, Resend, etc.)
    // For now, we'll log the emails. Replace this with actual email sending:
    
    console.log("=== ADMIN EMAIL ===")
    console.log(adminEmailContent)
    console.log("\n=== USER EMAIL ===")
    console.log(`To: ${email}`)
    console.log(userEmailContent)

    // Example with Resend (uncomment and configure):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    // Send to admin
    await resend.emails.send({
      from: "noreply@bossyemail.com",
      to: process.env.ADMIN_EMAIL || "your-email@example.com",
      subject: `New Team Pricing Request - ${companyName}`,
      text: adminEmailContent,
    })

    // Send to user
    await resend.emails.send({
      from: "noreply@bossyemail.com",
      to: email,
      subject: "Team Pricing Request Received - BossyEmail",
      text: userEmailContent,
    })
    */

    // Example with SendGrid (uncomment and configure):
    /*
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    const adminMsg = {
      to: process.env.ADMIN_EMAIL || "your-email@example.com",
      from: "noreply@bossyemail.com",
      subject: `New Team Pricing Request - ${companyName}`,
      text: adminEmailContent,
    }
    
    const userMsg = {
      to: email,
      from: "noreply@bossyemail.com",
      subject: "Team Pricing Request Received - BossyEmail",
      text: userEmailContent,
    }
    
    await sgMail.send([adminMsg, userMsg])
    */

    return NextResponse.json(
      {
        success: true,
        message: "Team pricing request submitted successfully",
        pricingTier,
        monthlyPrice,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing team pricing request:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

