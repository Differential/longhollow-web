# Long Hollow Website - Text Content

This document contains all the text from the Long Hollow website codebase. Note that most page content (articles, events, sermon descriptions, etc.) is dynamically loaded from the Rock RMS content management system and is not stored in this codebase.

---

## Site Information & SEO

### Default Site Metadata
- **Site Title:** Long Hollow Church
- **Default Description:** We exist to invite one another into a growing relationship with Jesus.
- **Default Keywords:** Church, Long Hollow, Long Hollow Baptist, Long Hollow Church, Churches in Nashville
- **Logo Alt Text:** Long Hollow Church

---

## Navigation

### Main Navigation Links
- About
- Next Steps
- Connect
- Give
- Watch
- Search
- Profile

---

## Footer

### Hendersonville Campus
- 3031 Long Hollow Pike
- Hendersonville, TN 37075
- (615) 824-4006

### Gallatin Campus
- 1200 Hartsville Pike
- Gallatin, TN 37066

### Footer Quick Links
- Watch
- Search
- Give
- My Profile

### Social Media Links
- Facebook: https://www.facebook.com/longhollow
- Twitter: https://twitter.com/longhollow
- Instagram: https://www.instagram.com/longhollow/

### External Links
- My Profile: https://my.longhollow.com/page/673?returnurl=%252fMyAccount

---

## Home Page

### Hero Section (For Authenticated Users)
**Supertitle:** Don't miss what God's doing this week!

**Title:** There's Something for Everyone

**Description:** From Sunday services to Wednesday night activities, there's always a way to be a part of what God is doing every week at Long Hollow. Check out our weekly schedule for every member of your family, and mark your calendar for several upcoming events.

**Buttons:**
- Times and Locations
- Upcoming Events

### Hero Section (For Unauthenticated Users)
**Supertitle:** God wants to work in your life

**Title:** Join Us This Weekend

**Description:** Long Hollow is one church that meets just north of Nashville, and online all across the globe. Whether you're exploring faith for the first time, or are looking for a place to call home, we want you to be a part of our community. Join us on Sunday either in person or online!

**Buttons:**
- Times and Locations
- Join Us Online

### Next Steps Call-to-Action
**Title:** TAKE YOUR NEXT STEP

**Description:** Starting Point is a fun two-part experience that will introduce you to our church, help you learn more about yourself, and give you practical ways to take the next step in your journey as a disciple

**Link Text:** Get Started

### Video Labels
- HIGHLIGHTS FROM
- LATEST MESSAGE
- FULL MESSAGE
- Join us live!

---

## Watch Page

### Main Section
**Title:** Join us live

**Buttons (when live):**
- Watch Now
- Other Ways to Watch

**Buttons (when not live):**
- Our Weekly Schedule
- How to Watch

### Labels
- Watch now
- See More
- Baptisms
- Other ways to watch

---

## Authentication / Sign In Modal

### Step 1 - Identity
**Title:** Sign in

**Instructions:** Enter your phone number or email address to get started. We'll never share your information or contact you (unless you ask!).

**Field Label:** Mobile Number or Email

**Checkbox:** I agree to the Terms of Use and Privacy Policy laid out by Long Hollow Church.

**Button:** Agree and continue

**Error Message:** That is not a valid email or phone number.

### Step 2 - Profile Details (New Users)
**Instructions:** Help us learn a little more about you so we can connect you with the best ministries and events.

**Field Labels:**
- First Name
- Last Name
- Birth Date
- Gender (Male / Female)

**Error Message:** You must be at least 13.

**Button:** Finish

### Step 3 - Confirmation Code
**SMS Instructions:** Enter in the Confirmation Code that was texted to your mobile phone number.

**Password Instructions:** Enter in your existing password or create your password below.

**Field Labels:**
- Confirmation Code (SMS)
- Password (Email)

**Error Message:** The [Confirmation Code/Password] you entered is incorrect.

**Button:** Submit

**Resend Code Link:** Didn't get a code? Request a new one.

**Resend Success:** Sent. Try again!

**Resending Status:** Resending the code now...

### Step 4 - Success
**Message:** Success

---

## User Profile Page

### Profile Links
- Update My Info
- Giving History
- Giving Schedules
- Communication Preferences

### Profile Attributes
- My Campus
- Email
- Phone
- Home Address
- Date of Birth
- Gender
- Links

### Actions
- Sign in
- Log out
- Loading your profile

---

## Search Page

### Categories
- Events
- Mission Trips
- General
- Service Opportunities
- Volunteer Positions
- Staff
- Articles
- Messages

### Labels
- Category
- Filter
- Close

---

## Content Details / Metadata Callout

### Labels
- Details
- Time
- Schedule
- Signup Deadline
- For Who
- Membership Required
- Days Available
- Ministry
- Service Area
- Opportunity Type
- Related Skills
- Childcare Info
- Location
- Contact
- Cost
- Trip Type

---

## Event/Content Display

### Labels
- News & Events
- Learn More
- Full story

---

## Countdown Component
- Live in [countdown]
- Join us!
- [X] day(s)

---

## 404 Page
**Title:** Not Found

**Message:** Uh oh! We could not find the page you're looking for.

---

## Placeholder Pages

### Terms of Use
**Title:** Terms of Use

**Content:** This is where the page content will go...

### Privacy Policy
**Title:** Privacy Policy

**Content:** This is where the page content will go...

---

## Button Default Labels
- Go

---

## Note About Dynamic Content

The following types of content are loaded dynamically from Rock RMS (Content Management System) and are NOT stored in this codebase:

1. **Page Content** - All About, Connect, Next Steps, and Watch pages have their titles, descriptions, and body content stored in Rock RMS
2. **Articles** - All article titles, summaries, and content
3. **Events** - All event details, dates, locations, and descriptions
4. **Sermons/Messages** - All sermon titles, descriptions, video content
5. **Staff Information** - Staff names, bios, positions, and photos
6. **Campus Information** - Campus names and service times (beyond the hardcoded addresses)
7. **CTA (Call-to-Action) Content** - Button text and links on various pages
8. **Series Information** - Sermon series titles and descriptions
9. **Stories/Testimonials** - Quotes and testimonials
10. **Baptism Videos** - Baptism content and videos

To get this content, you would need to:
1. Export it directly from Rock RMS, or
2. Query the GraphQL API endpoint, or
3. Scrape the live website at longhollow.com

---

*Document generated from the longhollow-web repository*
*Slack Thread: https://differential.slack.com/archives/C03BRNGDCPK/p1779394084707449*
