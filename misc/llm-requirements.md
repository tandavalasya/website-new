# Tandavalasya Website Requirements

## Goal

To build a professional, modern yet creative website for TandavaLasya school of Arts (Tandavalasya LLC) where Bhargavi Venkataraman teaches Bharatanatyam classes -- inherently helping with stretches, body conditioning and strengthening.

## Requirements

Wear the hat of a senior web developer who has strong Javascript fundamentals and writes bug-free highly maintainable and scalable code with solid design patterns and SOLID principles. You have read the best selling books on JavaScript and React and do not hallucinate or make assumptions, just take data-driven decisions. Ask me how to prioritize this list of features so we can proceed accordingly.

- Need a Homepage (About Tandavalasya school), Past and upcoming Events/Performances/Gallery page, About me page, a space for publishing blogs for admins, Contact me page, course curriculum page
    - I need you to come up with the website content on your own (start from https://www.tandavalasya.com/ to get initial content for this website)
    - All hosted pictures should have a watermark with Tandavalasya logo
    - Stream google reviews/student reviews with excerpts on the home page
- Need a student portal page (sign in with Google/Facebook/Insta) -- Only registered and admin approved emails should be allowed to create Student profiles
    - Students can manage fee payment, setup autopay, view download bills
    - Students should get email notifications prior to class schedules
    - Students view what they learnt for each class, along with learning material and assignments
    - Ability for students to upload homework automatically in the portal (which should alert the admin via email)
    - Only registered students should be able to download teaching material (ONLY for the lessons they've learned)
- Admin dashboard page (ONLY ACCESSIBLE TO THE ADMIN)
    - Student insights, # of students each month, # of classes per student, Lessons taught per month
    - All aggremgated metrics/dashboards
    - Revenue made for the year for tax purposes
    - No. of events/performances, etc.
- Tech Stack:
    - Need a lightweight SPA website that is easy to maintain and manage
    - Able to use AWS S3/AWS APIGW/Amazon Lambda with Cloudwatch integration (if needed as a backend server) (with a well defined CDK package for infra setup)
    - I already have domain name registered with porkbun
    - I can deploy static assets via Netlify (unless you come up with an integrated AWS solution via the above CDK)
    - Need this website to be as cost effective as possible (okay to spend up to 15$ USD per month for infra maintenance) – so should have protection against DOS or DDOS attacks.
- Need a "download resume" option from the website, which should generate a fancy HTML page (with translucent dance poses of Bhargavi) with the resume text neatly rendered. When printed, it should fit a single page PDF. Need this resume to be very creative, modern and fancy (colorful as well).
- I should be able to easily maintain and manage RESUME content, website contents, blogs, etc.. from a single directory somewhere within the project root directory, preferably in markdown.
- I tried creating a website for this but didn't like it much: https://tandavalasya-new.netlify.app/ (you can take concepts from this for reference when buiding your site)

### Resume Requiements

Role: Act as a Specialist Arts & Culture Resume Writer and Biographer.

Task: Generate a comprehensive professional Artist Profile/Resume for Bhargavi Venkataraman.

Directives (Anti-Hallucination Rules):

    Strict Source Adherence: Do NOT invent performances, awards, or locations. Use only the data provided below.

    Tone: Classical, Elegant, Disciplined, and Culturally Rich.

    Formatting: Use clean Markdown with distinct sections.

Source Material (The Truth Source)

1. Candidate Identity

    Name: Bhargavi Venkataraman

    Titles: Classical Danseuse | Choreographer | Artistic Director

    Location: Vancouver, BC (PR Status)

    Website: www.tandavalasya.com

    Email: bhargavi@tandavalasya.com

2. Professional Summary Requirements Draft a narrative summary that includes these specific facts:

    She is a 'Grade B' Doordarshan artist.

    She holds an MFA in Bharatanatyam from SASTRA University.

    Her teaching career began in 2013.

    Her style combines the Vazhuvoor tradition with analytical precision.

    She actively performs and teaches in both Seattle, WA and Vancouver, BC.

3. "Guru Parampara" (Lineage) Section You must list these 4 Gurus in chronological order with their specific contributions:

    Smt. Dakshayanee Ramachandran (Nrithyaarpana): Foundational training (age 8–college); Arangetram at age 11.

    Smt. Bhagyashree Satthish (Om Nrithyakshethra): 10+ years training; Mastered Nattuvangam; Solo career launch; Guinness Record participation.

    Padma Vibhushan Dr. Padma Subrahmanyam: MFA advisor via SASTRA University.

    Kassiyet Adilkhankyzy: Current advanced training (2 years) focusing on Thillana and Padam.

4. Professional Experience & Impact

    Role 1: Founder & Artistic Director @ TandavaLasya

        Metric: Mentors students aged 5 to 75.

        Scope: Students perform/compete in Seattle and Vancouver.

    Role 2: Instructor @ Om Nrithyakshethra

        Duties: Trained junior batches and managed production logistics.

    Role 3: Faculty & Performer @ Rangeela Dance Company

        Role: Classical Dance department faculty and troupe performer.

5. Awards & Major Records (Must Include)

    Guinness World Record: Participant in the "Largest Bharatanatyam Dance Lesson" (Chennai).

    Asia Book of Records: Participant in 'Nitya Akhanda Nrittam'.

    Best Performer (2016): Awarded by Sri Parthasarathy Swami Sabha.

    Historic Event: Selected as one of 1,000 dancers for the Tanjore Brihadeeswarar Temple 1000th Year Celebration.

6. Teaching Philosophy (Quote) Include this exact philosophy: "My methodology integrates physical conditioning with the art form. I utilize Bharatanatyam's geometric postures to enhance core strength and flexibility, proving that classical dance is a rigorous fitness discipline for the body as well as a spiritual discipline for the mind."

Output Structure:

    Header: Name, Titles, Contact Info.

    Summary: (As defined above).

    Lineage: Formatted as a clear list.

    Experience: Role, Organization, and Key Achievements.

    Awards & Highlights: Bulleted list.

    Philosophy: A dedicated blockquote.